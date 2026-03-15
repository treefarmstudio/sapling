// Track prefetched URLs to avoid duplicates
const prefetchedUrls = new Set();

// Check if URL can be prefetched
function canPrefetchUrl(url) {
  if (!navigator.onLine) return false;
  if (isSlowConnection()) return false;

  try {
    const urlObj = new URL(url, location.href);
    return (
      location.origin === urlObj.origin &&
      location.pathname !== urlObj.pathname &&
      !prefetchedUrls.has(url)
    );
  } catch {
    return false;
  }
}

// Check for slow connections
function isSlowConnection() {
  if ("connection" in navigator) {
    const conn = navigator.connection;
    return conn.saveData || /2g/.test(conn.effectiveType);
  }
  return false;
}

// Check if element should be prefetched
function shouldPrefetch(el) {
  return el?.tagName === "A" && el.hasAttribute("data-prefetch");
}

// Prefetch a URL
function prefetch(url) {
  url = url.replace(/#.*/, "");
  if (!canPrefetchUrl(url)) return;

  prefetchedUrls.add(url);

  // Use link prefetch if supported, otherwise fallback to fetch
  if (document.createElement("link").relList?.supports?.("prefetch")) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.append(link);
  } else {
    fetch(url, { priority: "low" });
  }
}

// Handle hover prefetching
let hoverTimeout;
function handleHoverIn(e) {
  const link = e.target.closest("a");
  if (!shouldPrefetch(link)) return;

  if (hoverTimeout) clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => prefetch(link.href), 80);
}

function handleHoverOut() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = 0;
  }
}

// Initialize prefetching
function init() {
  // Handle tap prefetching
  for (const event of ["touchstart", "mousedown"]) {
    document.body.addEventListener(
      event,
      (e) => {
        const link = e.target.closest("a");
        if (shouldPrefetch(link)) prefetch(link.href);
      },
      { passive: true }
    );
  }

  // Handle hover prefetching
  document.body.addEventListener(
    "mouseover",
    (e) => {
      const link = e.target.closest("a");
      if (shouldPrefetch(link)) handleHoverIn(e);
    },
    { passive: true }
  );

  document.body.addEventListener("mouseout", handleHoverOut, { passive: true });
}

init();

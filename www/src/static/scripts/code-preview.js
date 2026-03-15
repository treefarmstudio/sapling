// Make the function globally available
window.switchCodeTab = function(tab) {
  const tabs = ["basic", "counter", "motion"];
  
  tabs.forEach((t) => {
    const tabEl = document.getElementById(t + "-tab");
    const codeEl = document.getElementById(t + "-code");
    const previewEl = document.getElementById(t + "-preview");
    
    if (t === tab) {
      tabEl.className = "px-4 py-2 font-medium text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white";
      codeEl?.classList.remove("hidden");
      previewEl?.classList.remove("hidden");
    } else {
      tabEl.className = "px-4 py-2 font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700";
      codeEl?.classList.add("hidden");
      previewEl?.classList.add("hidden");
    }
  });
};

import SaplingLogo from "./SaplingLogo.tsx";
import { Button } from "./Button.tsx";


export function Nav() {
  const mobileMenuScript = `
    const mobileMenuButton =
      document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");

    function closeMenu() {
      if (!mobileMenu || !menuIcon) return;
      mobileMenu.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      menuIcon.setAttribute("icon", "material-symbols:menu");
    }

    function toggleMenu(event) {
      if (!mobileMenu || !menuIcon) return;
      event.stopPropagation();
      const isOpen = !mobileMenu.classList.contains("hidden");
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
        menuIcon.setAttribute("icon", "material-symbols:close");
      }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenu || !mobileMenuButton) return;
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = mobileMenuButton.contains(
        event.target
      );

      if (
        !isClickInsideMenu &&
        !isClickOnButton &&
        !mobileMenu.classList.contains("hidden")
      ) {
        closeMenu();
      }
    });

    // Prevent clicks inside menu from bubbling to document
    if (mobileMenu) {
        mobileMenu.addEventListener("click", (event) => {
          event.stopPropagation();
        });
    }
  `;

  return (
    <nav
      className="sticky top-0 z-50 bg-background border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <sapling-island>
            <a
              id="nav-sapling-logo"
              className="flex items-center"
              href="/"
              title="Home"
              data-prefetch
            >
              <SaplingLogo width={100} height={24} />
            </a>
          </sapling-island>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <a href="/docs" className="hover:text-gray-600" data-prefetch>Docs</a>
            <a href="/showcase" className="hover:text-gray-600" data-prefetch>
              Showcase
            </a>
            <Button
              leadingIcon="mdi:github"
              trailingIcon="material-symbols:north-east"
              href="https://github.com/treefarmstudio/sapling"
              inline={true}
            >
              GitHub
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <sapling-island className="md:hidden">
            <template>
              <script dangerouslySetInnerHTML={{ __html: mobileMenuScript }} />
            </template>
            <button
              id="mobile-menu-button"
              className="p-2 rounded-lg"
              aria-label="Menu"
            >
              <iconify-icon
                id="menu-icon"
                icon="material-symbols:menu"
                width="24"
              />
            </button>
          </sapling-island>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className="absolute top-full left-0 right-0 bg-background z-40 md:hidden border-b border-gray-200 dark:border-gray-800 shadow-lg hidden"
      >
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
          <a
            href="/docs"
            className="text-lg text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
            data-prefetch
          >
            Docs
          </a>
          <a
            href="/showcase"
            className="text-lg text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
            data-prefetch
          >
            Showcase
          </a>
          <div className="flex">
            <Button
              leadingIcon="mdi:github"
              trailingIcon="material-symbols:north-east"
              href="https://github.com/treefarmstudio/sapling"
              inline
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

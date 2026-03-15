import SaplingLogo from "./SaplingLogo.tsx";

export function Footer() {
  return (
    <footer className="py-12 border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-8">
        {/* Logo */}
        <div className="mb-8">
          <a
            title="Sapling Home"
            href="/"
            className="text-2xl font-heading font-bold text-gray-900 dark:text-white"
          >
            <SaplingLogo
              width={100}
              height={100}
            />
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Resources */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/docs"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >Documentation
                  </a>
              </li>
              <li>
                <a
                  href="/docs/ai-skill"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >AI Agent Skill
                  </a>
              </li>
              <li>
                <a
                  href="/showcase"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >Showcase</a>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/treefarmstudio/sapling"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          {/* Social Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://github.com/treefarmstudio/sapling"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="GitHub"
            >
              <iconify-icon icon="mdi:github" width="24"></iconify-icon>
            </a>
            <a
              href="https://x.com/saplingdotland"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="X"
            >
              <iconify-icon
                icon="fa6-brands:x-twitter"
                width="24"
              ></iconify-icon>
            </a>
            <a
              href="https://youtube.com/@jaydanurwin"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="YouTube"
            >
              <iconify-icon icon="mdi:youtube" width="24"></iconify-icon>
            </a>
          </div>

          {/* Status and Copyright */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 dark:text-gray-400"
              >© {new Date().getFullYear()} Sapling</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

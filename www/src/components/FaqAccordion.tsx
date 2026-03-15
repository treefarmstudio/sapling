
export interface FaqItem {
  question: string;
  answer: string;
}

// Script content as a string
// Note: document.currentScript might not work as expected here.
// Consider alternative ways to target elements if issues arise.
const faqScript = `
  (() => {
    // Attempt to find the sapling-island relative to the script's location
    const scriptElement = document.currentScript;
    if (!scriptElement) return; // Exit if document.currentScript is null

    const island = scriptElement.closest('sapling-island');
    if (!island) return; // Exit if sapling-island isn't found

    const button = island.querySelector('button');
    const content = island.querySelector('[data-content]');
    const icon = island.querySelector('[data-rotate]');

    if (button && content && icon) {
      button.addEventListener('click', () => {
        const isHidden = content.classList.toggle('hidden');
        icon.style.transform = isHidden ? '' : 'rotate(180deg)';
        button.setAttribute('aria-expanded', String(!isHidden));
      });

      // Set initial aria-expanded state
      button.setAttribute('aria-expanded', String(!content.classList.contains('hidden')));
    }
  })();
`;

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg">
          <sapling-island loading="visible">
            {/*
              The template tag might be specific to sapling-island's hydration.
              It's kept here, but review sapling-island docs if behavior changes.
            */}
            <template>
              <script dangerouslySetInnerHTML={{ __html: faqScript }} />
            </template>
            <button
              type="button"
              className="w-full flex justify-between items-center p-4 text-left"
              aria-expanded="false" // Initial state managed by script
            >
              <h3 className="text-xl font-medium">{item.question}</h3>
              <span className="transform transition-transform duration-200" data-rotate>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"     // Changed to camelCase
                  strokeLinecap="round" // Changed to camelCase
                  strokeLinejoin="round" // Changed to camelCase
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
            <div
              className="hidden" // Initial state
              data-content
            >
              <div className="p-4 pt-0">
                <p>{item.answer}</p>
              </div>
            </div>
          </sapling-island>
        </div>
      ))}
    </div>
  );
}

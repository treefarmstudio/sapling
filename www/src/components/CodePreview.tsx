import { renderMarkdown } from "@sapling/markdown";
import { html } from "hono/html";

const counterScript = html`
  <script type="module">
  import canvasConfetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm";
  let count = 0;
  window.increment = () => {
    count++;
    const counterElement = document.getElementById("counter-count");
    if (counterElement) {
        counterElement.textContent = count.toString();
    }
    if (count === 3) {
      canvasConfetti({
        particleCount: 100,
        colors: ["#cdac26", "#d0d0d1", "#292929", "#1b791f"],
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };
  </script>
`;

const motionScript = html`
<script type="module">
  import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
  animate(
    ".motion-box",
    { rotate: 90 },
    { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
  );
</script>
`;

const codeExamples = {
  basic: {
    code: `\`\`\`tsx
export function HelloWorld() {
  return (
    <!-- Yup, Tailwind is built in -->
    <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
      <p className="py-4 px-6 text-4xl text-white">Hello, World!</p>
    </div>
  );
}
\`\`\``,
    output: (
      <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
        <p className="py-4 px-6 text-4xl text-white">Hello, World!</p>
      </div>
    ),
  },
  counter: {
    code: `\`\`\`tsx

const counterScript = html\`
<script type="module">
  import canvasConfetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm";
  let count = 0;
  window.increment = () => {
    count++;
    const counterElement = document.getElementById("counter-count");
    if (counterElement) {
        counterElement.textContent = count.toString();
    }
    if (count === 3) {
      canvasConfetti({ particleCount: 100, colors: ["#cdac26", "#d0d0d1", "#292929", "#1b791f"], spread: 70, origin: { y: 0.6 } });
    }
  };
</script>
\`;

export function Counter() {
  return (
    <sapling-island loading="visible">
      <template dangerouslySetInnerHTML={{ __html: counterScript.toString() }}></template>
      <div className="w-full h-full flex items-center justify-center">
        <button
          id="counter-button"
          onclick="window.increment?.()" 
          className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition duration-150 flex items-center gap-2">
          Click Count: <span id="counter-count">0</span>
        </button>
      </div>
    </sapling-island>
  );
}
\`\`\``,
    output: (
      <sapling-island loading="visible">
        <template dangerouslySetInnerHTML={{ __html: counterScript.toString() }}></template>
        <div class="w-full h-full flex items-center justify-center">
          <button
            id="counter-button"
            onclick="window.increment?.()" // Call global function
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition duration-150 flex items-center gap-2"
          >
            Click Count <span id="counter-count">0</span>
          </button>
        </div>
      </sapling-island>
    ),
  },
  motion: {
    code: `\`\`\`tsx
const motionScript = html\`
<script type="module">
import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
animate(
  ".motion-box",
  { rotate: 90 },
  { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
);
</script>
\`;

export function MotionExample() {
  return (
    <sapling-island loading="visible">
      <template dangerouslySetInnerHTML={{ __html: motionScript.toString() }}></template>
      <div className="w-full h-full flex items-center justify-center">
        <div className="motion-box w-[100px] h-[100px] bg-foreground rounded-lg"></div>
      </div>
    </sapling-island>
  );
}
\`\`\``,
    output: (
      <sapling-island loading="visible">
        <template dangerouslySetInnerHTML={{ __html: motionScript.toString() }}></template>
        <div className="w-full h-full flex items-center justify-center">
          <div className="motion-box w-[100px] h-[100px] bg-foreground rounded-lg"></div>
        </div>
      </sapling-island>
    ),
  },
};



export const CodePreview = async () => {
  // Render all code examples
  const renderedExamples: Record<string, string> = {};
  for (const [key, example] of Object.entries(codeExamples)) {
    renderedExamples[key] = await renderMarkdown(example.code, {
      gfm: true,
      shikiOptions: {
        
        themes: {
          light: "vitesse-light",
          dark: "vitesse-dark",
        },
        colorReplacements: {
          "vitesse-light": {
            "#ffffff": "#f9f9f9",
          },
        },
      },
    });
  }

  const gridStyle = {
    "--grid-size": "50px",
    backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
    backgroundSize: 'var(--grid-size) var(--grid-size)',
  }/* as React.CSSProperties*/;


  return (
    <section className="my-16 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 px-6">
      {/* Grid Background */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0"
          style={gridStyle}
        ></div>
      </div>
      {/* Content Container */}
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
          {/* Tabs */}
          {/* Note: This island still relies on a global script */}
          <sapling-island>
            <template>
              <script src="/scripts/code-preview.js" type="module"></script>
            </template>
            <div className="flex border-b border-gray-200 dark:border-gray-800 bg-background/80 dark:bg-black/80 backdrop-blur-sm">
              <button
                id="basic-tab"
                className="px-4 py-2 font-medium text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
                onclick="window.switchCodeTab?.('basic')"
              >
                HelloWorld.tsx
              </button>
              <button
                id="counter-tab"
                className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                 onclick="window.switchCodeTab?.('counter')"
              >
                Counter.tsx
              </button>
              <button
                id="motion-tab"
                className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                 onclick="window.switchCodeTab?.('motion')"
              >
                MotionExample.tsx
              </button>
            </div>
          </sapling-island>
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {/* Code Section */}
            <div className="code-section md:border-r border-b border-gray-200 dark:border-gray-800 md:border-b-0 p-6 bg-background/80 dark:bg-black/80 backdrop-blur-sm">
              <div
                id="basic-code"
                className="prose max-w-none dark:prose-invert text-sm"
                dangerouslySetInnerHTML={{ __html: renderedExamples.basic }}
              ></div>
              <div
                id="counter-code"
                className="hidden prose max-w-none dark:prose-invert text-sm"
                dangerouslySetInnerHTML={{ __html: renderedExamples.counter }}
              ></div>
              <div
                id="motion-code"
                className="hidden prose max-w-none dark:prose-invert text-sm"
                dangerouslySetInnerHTML={{ __html: renderedExamples.motion }}
              ></div>
            </div>
            {/* Preview Section */}
            <div className="preview-section p-6 bg-background/80 dark:bg-black/80 backdrop-blur-sm">
              <div id="basic-preview" className="w-full h-full">
                {codeExamples.basic.output}
              </div>
              <div id="counter-preview" className="hidden w-full h-full">
                {codeExamples.counter.output}
              </div>
              <div id="motion-preview" className="hidden w-full h-full">
                {codeExamples.motion.output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePreview; 

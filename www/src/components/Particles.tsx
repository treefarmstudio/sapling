
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  vx?: number;
  vy?: number;
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const scriptContent = `
import { ParticlesEffect } from "/scripts/particles.js";

const canvas = document.querySelector("#particles-canvas");
const container = canvas.parentElement;

// Initialize the particles effect
const particles = new ParticlesEffect(canvas, {
  quantity: ${quantity},
  staticity: ${staticity},
  ease: ${ease},
  size: ${size},
  color: "${color}",
  vx: ${vx},
  vy: ${vy}
});

// Clean up when the component is removed
document.addEventListener("beforeunload", () => {
  particles.destroy();
});
  `;

  return (
    <sapling-island>
      <template>
        <script type="module" dangerouslySetInnerHTML={{ __html: scriptContent }} />
      </template>
      <div className={`pointer-events-none ${className}`} aria-hidden="true">
        <canvas id="particles-canvas" className="w-full h-full"></canvas>
      </div>
    </sapling-island>
  );
} 
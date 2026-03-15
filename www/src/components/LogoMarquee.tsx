
import { css } from "hono/css";
export function LogoMarquee() {
  return (
    <sapling-island>
      <template>
        <style>{css`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </template>
      <div className="relative flex overflow-x-hidden">
        <div className="animate-scroll flex items-center gap-12 py-4">
          {/* First set of logos */}
          <img
            src="https://api.logoipsum.com/logo/1"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/2"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/3"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/4"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/5"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          {/* Duplicate set for seamless scrolling */}
          <img
            src="https://api.logoipsum.com/logo/1"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/2"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/3"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/4"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
          <img
            src="https://api.logoipsum.com/logo/5"
            alt="Company logo"
            className="w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            loading="lazy"
          />
        </div>
      </div>
    </sapling-island>
  );
}

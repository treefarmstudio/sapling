function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

function remapValue(value, start1, end1, start2, end2) {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

class ParticlesEffect {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = window.devicePixelRatio || 1;
    this.options = {
      quantity: options.quantity || 100,
      staticity: options.staticity || 50,
      ease: options.ease || 50,
      size: options.size || 0.4,
      color: options.color || "#ffffff",
      vx: options.vx || 0,
      vy: options.vy || 0,
    };

    this.mouse = { x: 0, y: 0 };
    this.canvasSize = { w: 0, h: 0 };
    this.circles = [];
    this.rafID = null;
    this.rgb = hexToRgb(this.options.color);

    this.initCanvas();
    this.bindEvents();
    this.animate();
  }

  initCanvas() {
    const container = this.canvas.parentElement;
    this.canvasSize.w = container.offsetWidth;
    this.canvasSize.h = container.offsetHeight;

    this.canvas.width = this.canvasSize.w * this.dpr;
    this.canvas.height = this.canvasSize.h * this.dpr;
    this.canvas.style.width = `${this.canvasSize.w}px`;
    this.canvas.style.height = `${this.canvasSize.h}px`;
    this.ctx.scale(this.dpr, this.dpr);

    this.circles = [];
    for (let i = 0; i < this.options.quantity; i++) {
      const circle = this.circleParams();
      this.drawCircle(circle);
    }
  }

  circleParams() {
    const x = Math.floor(Math.random() * this.canvasSize.w);
    const y = Math.floor(Math.random() * this.canvasSize.h);
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + this.options.size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }

  drawCircle(circle, update = false) {
    const { x, y, translateX, translateY, size, alpha } = circle;
    this.ctx.translate(translateX, translateY);
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, 2 * Math.PI);
    this.ctx.fillStyle = `rgba(${this.rgb.join(", ")}, ${alpha})`;
    this.ctx.fill();
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    if (!update) {
      this.circles.push(circle);
    }
  }

  clearContext() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  }

  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const { w, h } = this.canvasSize;
    const x = event.clientX - rect.left - w / 2;
    const y = event.clientY - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      this.mouse.x = x;
      this.mouse.y = y;
    }
  }

  animate() {
    this.clearContext();
    this.circles.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        this.canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        this.canvasSize.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );

      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx + this.options.vx;
      circle.y += circle.dy + this.options.vy;
      circle.translateX +=
        (this.mouse.x / (this.options.staticity / circle.magnetism) -
          circle.translateX) /
        this.options.ease;
      circle.translateY +=
        (this.mouse.y / (this.options.staticity / circle.magnetism) -
          circle.translateY) /
        this.options.ease;

      this.drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > this.canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > this.canvasSize.h + circle.size
      ) {
        this.circles.splice(i, 1);
        const newCircle = this.circleParams();
        this.drawCircle(newCircle);
      }
    });

    this.rafID = window.requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("resize", () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.initCanvas();
      }, 200);
    });
  }

  destroy() {
    if (this.rafID) {
      window.cancelAnimationFrame(this.rafID);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("resize", this.initCanvas);
  }
}

// Export the class for use in other files
export { ParticlesEffect };

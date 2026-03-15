---
name: sapling
description: Guide for using the <sapling-island> web component to implement selective hydration and islands architecture. Use this skill when asked to use Sapling for an interactive section, contact form, or to add animations triggered by visibility or other loading strategies using sapling-island.
---

# Sapling

This skill provides guidance on how to use the `sapling-island` web component for implementing selective hydration.

## Core Concepts

Sapling is a zero-dependency, framework-agnostic web component that allows you to progressively hydrate parts of your page. It keeps most of the page as static HTML, loading JavaScript and styles only when specific conditions are met.

### 1. The `<sapling-island>` Component

Wrap any content that requires JavaScript in a `<sapling-island>` component. The JavaScript (and optionally CSS) that should be loaded lazily must be placed inside a `<template>` tag within the island.

## Loading Strategies

The hydration is controlled by the `loading` attribute. Sapling supports several loading strategies using standard Web APIs:

1. **Load Immediately (Default)**: `loading="load"`
2. **Load on Visibility**: `loading="visible"` (Uses `IntersectionObserver`)
3. **Load on Idle**: `loading="idle"` (Uses `requestIdleCallback`)
4. **Load on Media Query**: `loading="(min-width: 768px)"` (Uses `matchMedia`)
5. **Load with Timeout**: `timeout="5000"` (Time in milliseconds)

## Implementation Patterns

When asked to implement a feature using Sapling, you will typically use one of two patterns: Vanilla HTML/JS or JSX/React.

### Pattern A: JSX / React Implementation (Preferred for React Projects)

When working within a JSX or React environment, use template literals (`html` tag) for the script content and inject it into the `<template>` using `dangerouslySetInnerHTML`.

```jsx
// 1. Define the script as a template string
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

// 2. Render the component
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
```

**Global Handlers in JSX:**
If you need event handlers, attach them to the `window` object in the script, and call them via inline handlers (e.g., `onclick="window.increment?.()"`).

```jsx
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
      canvasConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };
</script>
`;

export function Counter() {
  return (
    <sapling-island loading="visible">
      <template dangerouslySetInnerHTML={{ __html: counterScript.toString() }}></template>
      <div className="w-full h-full flex items-center justify-center">
        <button onclick="window.increment?.()">
          Click Count: <span id="counter-count">0</span>
        </button>
      </div>
    </sapling-island>
  );
}
```

### Pattern B: Vanilla HTML & Static JS Implementation

**CRITICAL RULE: Always place the JavaScript code required for the interactive section in a separate, static `.js` file.** Do not write inline JavaScript within the template unless explicitly requested. Reference it using a `<script type="module" src="...">` tag inside the `<template>`.

```html
<!-- index.html -->
<sapling-island loading="visible">
  <template>
    <!-- Always link to a static JS file in Vanilla HTML -->
    <script type="module" src="/scripts/my-interactive-feature.js"></script>
    <style>
      .interactive-element { transition: opacity 0.3s; }
    </style>
  </template>
  
  <div class="interactive-element">Initial static content</div>
</sapling-island>
```

```javascript
// /scripts/my-interactive-feature.js
const island = document.querySelector('sapling-island[loading="visible"]');
const element = island.querySelector('.interactive-element');

element.addEventListener('click', () => {
  console.log('Interacted!');
});
```
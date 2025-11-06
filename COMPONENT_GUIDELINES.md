# HyperUI Component Guidelines

## Core Philosophy

HyperUI is a **component library for developers**. Components should be:

1. **Clean and neutral** - Use minimal styling that focuses on structure and usability
2. **Easily customizable** - Avoid unnecessary decorative styling (gradients, excessive color) that developers can't easily override
3. **Semantic and accessible** - Proper HTML structure, accessible markup, ARIA labels where needed
4. **Production-ready** - Components that can be dropped directly into projects with Tailwind CSS
5. **Copy-paste friendly** - Developers should understand and be able to modify the code easily

## What We DON'T Do

- ❌ Decorative gradients on backgrounds (unless essential to component function)
- ❌ Overly branded styling with proprietary color schemes
- ❌ Unnecessary animations or effects that don't improve UX
- ❌ External dependencies (date pickers, carousels, third-party libraries)
- ❌ Opinionated styling that forces a specific design direction

## What We DO Do

- ✅ Neutral color palettes (grays, blacks, whites, primary accent color)
- ✅ Tailwind CSS utilities only (no custom CSS where possible)
- ✅ Clear semantic HTML structure
- ✅ Accessibility-first approach
- ✅ Multiple variants that show different use cases, not different "themes"
- ✅ Components that are **blocks developers can build with**, not marketing fluff

## Styling Approach

- **Primary accent color**: Use indigo-600 for consistent CTAs and interactive elements
- **Neutrals**: Grays for borders, text, secondary content
- **Backgrounds**: Prefer white/transparent or very subtle grays
- **Hover states**: Subtle color changes, not dramatic transformations
- **Text hierarchy**: Use font weights and sizes, not colors

## Component Structure

Each component should have:

1. Clear, descriptive title
2. Semantic HTML
3. Accessible ARIA attributes where needed
4. Responsive design (if applicable)
5. Obvious primary/secondary actions
6. No unnecessary decoration

## Examples of What to Avoid

❌ **Bad**: Empty state with gradient background, colorful icons, and playful illustrations

```html
<body class="bg-gradient-to-br from-blue-50 to-indigo-100">
  <svg class="text-blue-400">...</svg>
  <p class="text-purple-600">Oopsie woopsie!</p>
</body>
```

✅ **Good**: Empty state with clean structure, neutral styling, actionable content

```html
<body class="flex items-center justify-center p-6">
  <div class="max-w-md text-center">
    <svg class="text-gray-400">...</svg>
    <h3 class="text-lg font-semibold text-gray-900">No items yet</h3>
    <button class="bg-indigo-600 text-white">Create Item</button>
  </div>
</body>
```

## For Future Development

When adding new collections or components:

1. Ask: "Can a developer easily customize this?"
2. Ask: "Is this decoration or is it essential?"
3. Ask: "Would this work with any brand's color scheme?"
4. If the answer to any is no, reconsider the approach

**Remember**: We're not designing finished websites. We're providing building blocks that developers can use to build their own designs.

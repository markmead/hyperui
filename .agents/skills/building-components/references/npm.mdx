---
title: NPM
description: How to publish your components to NPM.
type: guide
summary: Publishing component libraries to npm with versioned distribution, Tailwind configuration, TypeScript support, and package.json setup.
prerequisites:
  - /registry
related:
  - /marketplaces
  - /docs
---

NPM packages represent the traditional approach to distributing component libraries. While [registries](/registry) have gained popularity for their flexibility, npm publishing remains a powerful option with distinct advantages for certain use cases.

The fundamental difference between npm packages and registries lies in how they distribute code and manage ownership.

## Package Model

When you publish components as an npm package, you're distributing pre-built, versioned code that users install as a dependency:

```bash title="Terminal"
npm install @acme/ui-components
```

```tsx title="MyApp.tsx"
import { Button } from "@acme/ui-components";

// Component is imported from node_modules
// Source code is not directly editable
```

This offers several compelling advantages that make them the right choice for many component libraries.

### Version Management

As the package author, you control versioning and updates. Users can lock to specific versions, ensuring stability:

```json
{
  "dependencies": {
    "@acme/ui-components": "^2.1.0"
  }
}
```

This centralized version control means you can push updates, security patches, and new features that users receive through standard dependency updates.

### Simplified Installation

NPM packages provide a frictionless installation experience. A single command adds your entire component library:

```bash
npm install @acme/ui-components
```

No need to manually copy files, manage dependencies, or configure build tools. Everything works out of the box.

### Dependency Resolution

NPM automatically handles transitive dependencies. If your components require specific versions of React, Framer Motion, or other libraries, npm resolves these dependencies automatically, preventing version conflicts.

### TypeScript Support

Published packages can include pre-built type definitions, providing immediate TypeScript support without additional configuration:

```json
{
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  }
}
```

## Limitations of NPM Packages

While npm packages excel in distribution, they come with trade-offs that registries specifically address.

### Source Code Ownership

The most significant limitation is the lack of source code access. Users cannot:

- Modify component behavior directly
- Fix bugs without waiting for updates
- Customize implementation details
- Remove unused code

This creates a dependency relationship where users must rely on the package maintainer for all changes.

### Customization Constraints

Tweaking components requires working within the exposed API. While you can provide props for customization:

```tsx
<Button variant="primary" size="large" className="custom-styles" />
```

Users cannot fundamentally alter how the component works without forking the entire package.

### Bundle Size

NPM packages include all components, even if users only need a subset. While tree-shaking helps, it's not always perfect, potentially adding unnecessary weight to applications.

## CSS and Tailwind Configuration

One critical consideration when publishing Tailwind-based components via npm is ensuring styles work correctly in the consuming application.

By default, Tailwind only generates styles for classes it finds in your project files. It doesn't look inside `node_modules`, which means your component styles won't be included.

To fix this, users need to add a `@source` directive to their Tailwind configuration, telling it to scan your package for class names:

```css title="globals.css"
@import "tailwindcss";

/* Tell Tailwind to look for classes in your package */
@source "../node_modules/@acme/ui-components";
```

Always document this requirement prominently in your package README.

## Publishing Your Component Library

To publish your components to npm, you need a properly configured `package.json` which might look like this:

```json title="package.json"
{
  "name": "@acme/ui-components",
  "version": "1.0.0",
  "description": "A collection of accessible React components",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

NPM packages remain a vital part of the component ecosystem. While registries offer compelling benefits for source code ownership and customization, npm packages provide stability, version management, and ease of use that many teams require.

The key is understanding your users' needs and choosing the distribution method that best serves them. Sometimes, that means offering both options and letting developers choose what works best for their project.

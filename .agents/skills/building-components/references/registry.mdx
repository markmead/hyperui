---
title: Registry
description: Understand the concept of component registries, how they work, and why they're revolutionizing how developers share and discover UI components.
type: conceptual
summary: What component registries are, their source-code distribution model, and how to create one using the shadcn ecosystem.
related:
  - /npm
  - /marketplaces
  - /docs
---

Component registries are a way to share and discover UI components. Popularized by [shadcn/ui](https://ui.shadcn.com), they allow you to discover and copy components directly into your projects.

Registries represent a fundamental shift in how developers share and discover UI components. Unlike traditional npm packages, registries rely on an open source model and work through downloading the source code to your project.

## What Makes a Registry?

### 1. Source Code Distribution

Unlike npm packages that distribute compiled code, registries distribute source code:

```typescript
// Traditional npm package
import { Button } from "some-ui-library";

// Registry-based component
// Copy source from registry into your project
// src/components/ui/button.tsx contains the full source
import { Button } from "@/components/ui/button";
```

### 2. Metadata and Configuration

Good registries include rich metadata about components like the name, description, dependencies, and category.

```json
{
  "name": "announcement",
  "type": "registry:component",
  "description": "A compound badge component designed to display announcements with theming support",
  "dependencies": ["class-variance-authority", "lucide-react"],
  "registryDependencies": ["badge"],
  "files": [
    {
      "type": "registry:component",
      "content": "..."
    }
  ],
  "category": "ui"
}
```

### 3. Preview and Documentation

While not downloaded, registry websites typically provide:

- Live component previews
- Interactive examples
- Detailed documentation
- Code snippets ready to copy

## Registry Architecture Benefits

Component registries offer significant advantages for both authors and users, streamlining the process of sharing and adopting UI components.

### For Authors

For component authors, registries make distribution remarkably simple. Once a component is created, it can be added to the registry, making it instantly accessible to users without the need for complex publishing steps. This ease of distribution accelerates the feedback loop and encourages rapid iteration.

Version control is another key benefit. Registries typically track component versions, changelogs, and compatibility information. For example, a component entry might specify its current version, highlight recent changes such as improved accessibility or new features, and indicate which versions of shadcn/ui it supports. This transparency helps maintainers communicate updates and ensures users can select components that fit their project requirements.

Community engagement is also enhanced through registries. Authors can receive direct feedback from users, who are able to report issues, request features, and contribute to collaborative improvements. This fosters a more interactive and responsive development environment, benefiting both creators and consumers.

### For Consumers

From the perspective of component users, registries greatly improve the discovery process. Users can browse components by category, utilize search functionality, view popularity metrics, and explore related components, making it easier to find exactly what they need for their projects.

Before integrating a component, users can preview it in action, experiment with different variants, and review its behavior and code quality. This ability to evaluate components beforehand reduces risk and increases confidence in adoption.

Perhaps most importantly, registries empower users with true ownership. Instead of being locked into a dependency, users copy the source code directly into their projects. This means they can modify components as needed, avoid dependency management headaches, and retain full control over their codebase.

## Creating a Registry

You can create a simple registry quite quickly. Practically speaking, you only need 3 core elements:

### 1. Components

Create a component, or set of components, that you want to share. Make sure you have the source code for the components, and that they are well-documented and easy to understand.

Consider adding things like Markdown documentation, example implementations, and a way to preview the component.

### 2. A public endpoint

Create a public endpoint that serves the components. This can be a simple JSON file, or a more complex website. As long as it is public and accessible, you can use any endpoint you want.

### 3. CLI

Create a CLI that allows you to install the components into your project. This can be as simple as a single command, like `npx myregistry add button`, or a more complex command with options and flags.

## Using the shadcn Registry

Building your own registry is a fantastic way to share your components with the community, but it requires a lot of effort and maintenance. If you just want to share a component or two, you can use the shadcn/ui ecosystem - registry, CLI and variables.

Let's see how we can publish a `MetricCard` component live in less than 5 minutes using [Vercel](https://vercel.com)'s static hosting.

### Step 1: Create a Folder

Make a folder with this structure:

```
my-component/
├── public/
│   └── metric-card.json
└── vercel.json
```

Put your registry item JSON (e.g. `metric-card.json`) in the `public/` folder.

### Step 2: Add a `vercel.json`

Create a `vercel.json` file next to `public/` with the following:

```json title="vercel.json"
{
  "headers": [
    {
      "source": "/(.*).json",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Content-Type",
          "value": "application/json"
        }
      ]
    }
  ]
}
```

This ensures your JSON is served with the correct CORS and content headers.

### Step 3: Deploy to Vercel

From the root of your folder, run:

```bash
vercel --prod
```

and answer the prompts to deploy your project.

When it's done, your file will be live at something like:

```
https://your-project-name.vercel.app/metric-card.json
```

### Step 4: Install the Component

Anyone can now run:

```bash
npx shadcn@latest add https://your-project-name.vercel.app/metric-card.json
```

No npm package, no build step, no complexity.

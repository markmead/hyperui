---
title: Composition
description: The foundation of building modern UI components.
type: conceptual
summary: How to break monolithic components into smaller, focused subcomponents using the compound component pattern and naming conventions.
prerequisites:
  - /definitions
related:
  - /types
  - /state
  - /as-child
  - /polymorphism
---

Composition, or composability, is the foundation of building modern UI components. It is one of the most powerful techniques for creating flexible, reusable components that can handle complex requirements without sacrificing API clarity.

Instead of cramming all functionality into a single component with dozens of props, composition distributes responsibility across multiple cooperating components.

Fernando gave a great talk about this at React Universe Conf 2025, where he shared his approach to rebuilding Slack's Message Composer as a composable component.


## Making a component composable

To make a component composable, you need to break it down into smaller, more focused components. For example, let's take this Accordion component:

```tsx title="accordion.tsx"
import { Accordion } from "@/components/ui/accordion";

const data = [
  {
    title: "Accordion 1",
    content: "Accordion 1 content",
  },
  {
    title: "Accordion 2",
    content: "Accordion 2 content",
  },
  {
    title: "Accordion 3",
    content: "Accordion 3 content",
  },
];

return <Accordion data={data} />;
```

While this Accordion component might seem simple, it's handling too many responsibilities. It's responsible for rendering the container, trigger and content; as well as handling the accordion state and data.

Customizing the styling of this component is difficult because it's tightly coupled. It likely requires global CSS overrides. Additionally, adding new functionality or tweaking the behavior requires modifying the component source code.

To solve this, we can break this down into smaller, more focused components.

### 1. Root Component

First, let's focus on the container - the component that holds everything together i.e. the trigger and content. This container doesn't need to know about the data, but it does need to keep track of the open state.

However, we also want this state to be accessible by child components. So, let's use the Context API to create a context for the open state.

Finally, to allow for modification of the `div` element, we'll extend the default HTML attributes.

We'll call this component the "Root" component.

```tsx title="@/components/ui/accordion.tsx"
type AccordionProps = React.ComponentProps<"div"> & {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AccordionContext = createContext<AccordionProps>({
  open: false,
  setOpen: () => {},
});

export type AccordionRootProps = React.ComponentProps<"div"> & {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Root = ({
  children,
  open,
  setOpen,
  ...props
}: AccordionRootProps) => (
  <AccordionContext.Provider value={{ open, setOpen }}>
    <div {...props}>{children}</div>
  </AccordionContext.Provider>
);
```

### 2. Item Component

The Item component is the element that contains the accordion item. It is simply a wrapper for each item in the accordion.

```tsx title="@/components/ui/accordion.tsx"
export type AccordionItemProps = React.ComponentProps<"div">;

export const Item = (props: AccordionItemProps) => <div {...props} />;
```

### 3. Trigger Component

The Trigger component is the element that opens the accordion when activated. It is responsible for:

- Rendering as a button by default (can be customized with `asChild`)
- Handling click events to open the accordion
- Managing focus when accordion closes
- Providing proper ARIA attributes

Let's add this component to our Accordion component.

```tsx title="@/components/ui/accordion.tsx"
export type AccordionTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export const Trigger = ({ asChild, ...props }: AccordionTriggerProps) => (
  <AccordionContext.Consumer>
    {({ open, setOpen }) => (
      <button onClick={() => setOpen(!open)} {...props} />
    )}
  </AccordionContext.Consumer>
);
```

### 4. Content Component

The Content component is the element that contains the accordion content. It is responsible for:

- Rendering the content when the accordion is open
- Providing proper ARIA attributes

Let's add this component to our Accordion component.

```tsx title="@/components/ui/accordion.tsx"
export type AccordionContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export const Content = ({ asChild, ...props }: AccordionContentProps) => (
  <AccordionContext.Consumer>
    {({ open }) => <div {...props} />}
  </AccordionContext.Consumer>
);
```

### 5. Putting it all together

Now that we have all the components, we can put them together in our original file.

```tsx title="accordion.tsx"
import * as Accordion from "@/components/ui/accordion";

const data = [
  {
    title: "Accordion 1",
    content: "Accordion 1 content",
  },
  {
    title: "Accordion 2",
    content: "Accordion 2 content",
  },
  {
    title: "Accordion 3",
    content: "Accordion 3 content",
  },
];

return (
  <Accordion.Root open={false} setOpen={() => {}}>
    {data.map((item) => (
      <Accordion.Item key={item.title}>
        <Accordion.Trigger>{item.title}</Accordion.Trigger>
        <Accordion.Content>{item.content}</Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);
```

## Naming Conventions

When building composable components, consistent naming conventions are crucial for creating intuitive and predictable APIs. Both shadcn/ui and Radix UI follow established patterns that have become the de facto standard in the React ecosystem.

### Root Components

The `Root` component serves as the main container that wraps all other sub-components. It typically manages shared state and context by providing a context to all child components.

```tsx
<AccordionRoot>{/* Child components */}</AccordionRoot>
```

### Interactive Elements

Interactive components that trigger actions or toggle states use descriptive names:

- `Trigger` - The element that initiates an action (opening, closing, toggling)
- `Content` - The element that contains the main content being shown/hidden

```tsx
<CollapsibleTrigger>Click to expand</CollapsibleTrigger>
<CollapsibleContent>
  Hidden content revealed here
</CollapsibleContent>
```

### Content Structure

For components with structured content areas, use semantic names that describe their purpose:

- `Header` - Top section containing titles or controls
- `Body` - Main content area
- `Footer` - Bottom section for actions or metadata

```tsx
<DialogHeader>
  {/* Dialog title */}
</DialogHeader>
<DialogBody>
  {/* Dialog content */}
</DialogBody>
<DialogFooter>
  {/* Dialog footer */}
</DialogFooter>
```

### Informational Components

Components that provide information or context use descriptive suffixes:

- `Title` - Primary heading or label
- `Description` - Supporting text or explanatory content

```tsx
<CardTitle>Project Statistics</CardTitle>
<CardDescription>
  View your project's performance over time
</CardDescription>
```

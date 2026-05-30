---
title: Polymorphism
description: How to use the `as` prop to change the rendered HTML element while preserving component functionality.
type: reference
summary: The as prop pattern for polymorphic components, compared with Radix UI's Slot-based asChild approach with TypeScript best practices.
prerequisites:
  - /composition
  - /types
related:
  - /as-child
  - /accessibility
---

The `as` prop is a fundamental pattern in modern React component libraries that allows you to change the underlying HTML element or component that gets rendered.

Popularized by libraries like [Styled Components](https://styled-components.com/), [Emotion](https://emotion.sh/), and [Chakra UI](https://chakra-ui.com/), this pattern provides flexibility in choosing semantic HTML while maintaining component styling and behavior.

The `as` prop enables polymorphic components - components that can render as different element types while preserving their core functionality:

```tsx
<Button as="a" href="/home">
  Go Home
</Button>

<Button as="button" type="submit">
  Submit Form
</Button>

<Button as="div" role="button" tabIndex={0}>
  Custom Element
</Button>
```

## Understanding `as`

The `as` prop allows you to override the default element type of a component. Instead of being locked into a specific HTML element, you can adapt the component to render as any valid HTML tag or even another React component.

For example:

```tsx
// Default renders as a div
<Box>Content</Box>

// Renders as a section
<Box as="section">Content</Box>

// Renders as a nav
<Box as="nav">Content</Box>
```

This renders different HTML elements:

```html
<!-- Default -->
<div>Content</div>

<!-- With as="section" -->
<section>Content</section>

<!-- With as="nav" -->
<nav>Content</nav>
```

## Implementation Methods

There are two main approaches to implementing polymorphic components: a manual implementation and using Radix UI's `Slot` component.

### Manual Implementation

The `as` prop implementation uses dynamic component rendering:

```tsx
// Simplified implementation
function Component({ as: Element = "div", children, ...props }) {
  return <Element {...props}>{children}</Element>;
}

// More complete implementation with TypeScript
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

function Component<E extends React.ElementType = "div">({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Element = as || "div";
  return <Element {...props}>{children}</Element>;
}
```

The component:

1. Accepts an `as` prop with a default element type
2. Uses the provided element or fallback to default
3. Spreads all other props to the rendered element
4. Maintains type safety with TypeScript generics

### Using Radix UI Slot

[Radix UI](https://www.radix-ui.com/) provides a `Slot` component that offers a more powerful alternative to the `as` prop pattern. Instead of just changing the element type, `Slot` merges props with the child component, enabling composition patterns.

First, install the package:

```package-install
npm install @radix-ui/react-slot
```

The `asChild` pattern uses a boolean prop instead of specifying the element type:

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const itemVariants = cva("rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-white",
      primary: "bg-blue-500 text-white",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-3",
      lg: "h-12 px-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

Now you can use it in two ways:

```tsx
// Default: renders as a div
<Item variant="primary">Content</Item>

// With asChild: merges props with child component
<Item variant="primary" asChild>
  <a href="/home">Link with Item styles</a>
</Item>
```

The `Slot` component:

1. Clones the child element
2. Merges the component's props (className, data attributes, etc.) with the child's props
3. Forwards refs correctly
4. Handles event handler composition

### Comparison: `as` vs `asChild`

**`as` prop (manual implementation):**

```tsx
// Explicit element type
<Button as="a" href="/home">Link Button</Button>
<Button as="button" type="submit">Submit Button</Button>

// Simple, predictable API
// Limited to element types
```

**`asChild` with Slot:**

```tsx
// Implicit from child
<Button asChild>
  <a href="/home">Link Button</a>
</Button>

<Button asChild>
  <button type="submit">Submit Button</button>
</Button>

// More flexible composition
// Works with any component
// Better prop merging
```

**Key differences:**

| Feature                   | `as` prop           | `asChild` + Slot                 |
| ------------------------- | ------------------- | -------------------------------- |
| **API Style**             | `<Button as="a">`   | `<Button asChild><a /></Button>` |
| **Element Type**          | Specified in prop   | Inferred from child              |
| **Component Composition** | Limited             | Full support                     |
| **Prop Merging**          | Basic spread        | Intelligent merging              |
| **Ref Forwarding**        | Manual setup needed | Built-in                         |
| **Event Handlers**        | May conflict        | Composed correctly               |
| **Library Size**          | No dependency       | Requires `@radix-ui/react-slot`  |

### When to Use Each Approach

**Use `as` prop when:**

- You want a simpler API surface
- You're primarily switching between HTML elements
- You want to avoid additional dependencies
- The component is simple and doesn't need complex prop merging

**Use `asChild` + Slot when:**

- You need to compose with other components
- You want automatic prop merging behavior
- You're building a component library similar to Radix UI or shadcn/ui
- You need reliable ref forwarding across different component types

## Key Benefits

### 1. Semantic HTML Flexibility

The `as` prop ensures you can always use the most semantically appropriate HTML element:

```tsx
// Navigation container
<Container as="nav" className="navigation">
  <NavItems />
</Container>

// Main content area
<Container as="main" className="content">
  <Article />
</Container>

// Sidebar
<Container as="aside" className="sidebar">
  <Widgets />
</Container>
```

### 2. Component Reusability

One component can serve multiple purposes without creating variants:

```tsx
// Text component used for different elements
<Text as="h1" size="2xl">Page Title</Text>
<Text as="p" size="md">Body paragraph</Text>
<Text as="span" size="sm">Inline text</Text>
<Text as="label" size="sm">Form label</Text>
```

### 3. Accessibility Improvements

Choose elements that provide the best accessibility for each context:

```tsx
// Link that looks like a button
<Button as="a" href="/signup">
  Sign Up Now
</Button>

// Button that submits a form
<Button as="button" type="submit">
  Submit
</Button>

// Heading with button styles
<Button as="h2" role="presentation">
  Section Title
</Button>
```

### 4. Style System Integration

Maintain consistent styling while changing elements:

```tsx
const Card = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// Same styles, different elements
<Card as="article">Article content</Card>
<Card as="section">Section content</Card>
<Card as="li">List item content</Card>
```

## Common Use Cases

### Typography Components

Create flexible text components:

```tsx
function Text({
  as: Element = 'span',
  variant = 'body',
  ...props
}) {
  const className = cn(
    'text-base',
    variant === 'heading' && 'text-2xl font-bold',
    variant === 'body' && 'text-base',
    variant === 'caption' && 'text-sm text-gray-600',
    props.className
  );

  return <Element className={className} {...props} />;
}

// Usage
<Text as="h1" variant="heading">Title</Text>
<Text as="p" variant="body">Paragraph</Text>
<Text as="figcaption" variant="caption">Caption</Text>
```

### Layout Components

Build semantic layouts:

```tsx
function Flex({ as: Element = 'div', ...props }) {
  return (
    <Element
      className={cn('flex', props.className)}
      {...props}
    />
  );
}

// Semantic HTML
<Flex as="header" className="justify-between">
  <Logo />
  <Navigation />
</Flex>

<Flex as="main" className="flex-col">
  <Content />
</Flex>
```

### Interactive Elements

Handle different interaction types:

```tsx
function Clickable({ as: Element = 'button', ...props }) {
  const isButton = Element === 'button';
  const isAnchor = Element === 'a';

  return (
    <Element
      role={!isButton && !isAnchor ? 'button' : undefined}
      tabIndex={!isButton && !isAnchor ? 0 : undefined}
      {...props}
    />
  );
}

// Various clickable elements
<Clickable as="button" onClick={handleClick}>Button</Clickable>
<Clickable as="a" href="/link">Link</Clickable>
<Clickable as="div" onClick={handleClick}>Div Button</Clickable>
```

## TypeScript Best Practices

### Generic Component Types

Create fully type-safe polymorphic components:

```tsx
type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

type PolymorphicProps<E extends React.ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithoutRef<E>, keyof Props> & {
    as?: E;
  };

// Component with full type safety
function Component<E extends React.ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E, { customProp?: string }>) {
  const Element = as || "div";
  return <Element {...props} />;
}
```

### Inferring Props

Automatically infer props based on the element:

```tsx
// Props are inferred from the element type
<Component as="a" href="/home">Home</Component>  // ✅ href is valid
<Component as="div" href="/home">Home</Component> // ❌ TS error: href not valid on div

<Component as="button" type="submit">Submit</Component> // ✅ type is valid
<Component as="span" type="submit">Submit</Component>   // ❌ TS error
```

### Discriminated Unions

Use discriminated unions for element-specific props:

```tsx
type ButtonProps =
  | { as: "button"; type?: "submit" | "button" | "reset" }
  | { as: "a"; href: string; target?: string }
  | { as: "div"; role: "button"; tabIndex: number };

function Button(props: ButtonProps & { children: React.ReactNode }) {
  const Element = props.as;
  return <Element {...props} />;
}
```

## Best Practices

### 1. Default to Semantic Elements

Choose meaningful defaults that represent the most common use case:

```tsx
// ✅ Good defaults
function Article({ as: Element = "article", ...props }) {}
function Navigation({ as: Element = "nav", ...props }) {}
function Heading({ as: Element = "h2", ...props }) {}

// ❌ Too generic
function Component({ as: Element = "div", ...props }) {}
```

### 2. Document Valid Elements

Clearly specify which elements are supported:

```tsx
interface BoxProps {
  /**
   * The HTML element to render as
   * @default 'div'
   * @example 'section', 'article', 'aside', 'main'
   */
  as?: "div" | "section" | "article" | "aside" | "main" | "header" | "footer";
}
```

### 3. Validate Element Appropriateness

Warn when inappropriate elements are used:

```tsx
function Button({ as: Element = "button", ...props }) {
  if (__DEV__ && Element === "div" && !props.role) {
    console.warn(
      'Button: When using as="div", provide role="button" for accessibility',
    );
  }

  return <Element {...props} />;
}
```

### 4. Handle Event Handlers Properly

Ensure event handlers work across different elements:

```tsx
function Interactive({ as: Element = "button", onClick, ...props }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (Element !== "button" && (e.key === "Enter" || e.key === " ")) {
      onClick?.(e as any);
    }
  };

  return (
    <Element
      onClick={onClick}
      onKeyDown={Element !== "button" ? handleKeyDown : undefined}
      {...props}
    />
  );
}
```

## Common Pitfalls

### Invalid HTML Nesting

Be careful about HTML nesting rules:

```tsx
// ❌ Invalid - button inside button
<Button as="button">
  <Button as="button">Nested</Button>
</Button>

// ❌ Invalid - div inside p
<Text as="p">
  <Box as="div">Invalid nesting</Box>
</Text>

// ✅ Valid nesting
<Text as="div">
  <Box as="div">Valid nesting</Box>
</Text>
```

### Missing Accessibility Attributes

Remember to add appropriate ARIA attributes:

```tsx
// ❌ Missing accessibility
<Box as="nav">
  <MenuItems />
</Box>

// ✅ Proper accessibility
<Box as="nav" aria-label="Main navigation">
  <MenuItems />
</Box>
```

### Type Safety Loss

Avoid using overly permissive types:

```tsx
// ❌ Too permissive - no type safety
function Component({ as: Element = "div", ...props }: any) {
  return <Element {...props} />;
}

// ✅ Type safe
function Component<E extends React.ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Element = as || "div";
  return <Element {...props} />;
}
```

### Performance Considerations

Be aware of re-render implications:

```tsx
// ❌ Creates new component on every render
function Parent() {
  const CustomDiv = (props) => <div {...props} />;
  return <Component as={CustomDiv} />;
}

// ✅ Stable component reference
const CustomDiv = (props) => <div {...props} />;
function Parent() {
  return <Component as={CustomDiv} />;
}
```

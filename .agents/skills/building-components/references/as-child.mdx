---
title: asChild
description: How to use the `asChild` prop to render a custom element within the component.
type: reference
summary: Using the asChild prop to replace default markup with custom elements while preserving component functionality and event handlers.
prerequisites:
  - /composition
  - /types
related:
  - /polymorphism
  - /state
---

The `asChild` prop is a powerful pattern in modern React component libraries. Popularized by [Radix UI](https://www.radix-ui.com/primitives/docs/guides/composition) and adopted by [shadcn/ui](https://ui.shadcn.com), this pattern allows you to replace default markup with custom elements while maintaining the component's functionality.

## Understanding `asChild`

At its core, `asChild` changes how a component renders. When set to `true`, instead of rendering its default DOM element, the component merges its props, behaviors, and event handlers with its immediate child element.

### Without `asChild`

```tsx
<Dialog.Trigger>
  <button>Open Dialog</button>
</Dialog.Trigger>
```

This renders nested elements:

```html
<button data-state="closed">
  <button>Open Dialog</button>
</button>
```

### With `asChild`

```tsx
<Dialog.Trigger asChild>
  <button>Open Dialog</button>
</Dialog.Trigger>
```

This renders a single, merged element:

```html
<button data-state="closed">Open Dialog</button>
```

The Dialog.Trigger's functionality is composed onto your button, eliminating unnecessary wrapper elements.

## How It Works

Under the hood, `asChild` uses React's composition capabilities to merge components:

```tsx
// Simplified implementation
function Component({ asChild, children, ...props }) {
  if (asChild) {
    // Clone child and merge props
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      // Merge event handlers
      onClick: (e) => {
        props.onClick?.(e);
        children.props.onClick?.(e);
      },
    });
  }

  // Render default element
  return <button {...props}>{children}</button>;
}
```

The component:

1. Checks if `asChild` is true
2. Clones the child element
3. Merges props from both parent and child
4. Combines event handlers
5. Returns the enhanced child

## Key Benefits

### 1. Semantic HTML

`asChild` lets you use the most appropriate HTML element for your use case:

```tsx
// Use a link for navigation
<AlertDialog.Trigger asChild>
  <a href="/delete">Delete Account</a>
</AlertDialog.Trigger>

// Use a custom button component
<Tooltip.Trigger asChild>
  <IconButton icon={<InfoIcon />} />
</Tooltip.Trigger>
```

### 2. Clean DOM Structure

Traditional composition often creates deeply nested DOM structures. `asChild` eliminates this "wrapper hell":

```tsx
// Without asChild: Nested wrappers
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <button>
        <span>Hover me</span>
      </button>
    </TooltipTrigger>
  </Tooltip>
</TooltipProvider>

// With asChild: Clean structure
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
  </Tooltip>
</TooltipProvider>
```

### 3. Design System Integration

`asChild` enables seamless integration with your existing design system components:

```tsx
import { Button } from "@/components/ui/button";

<DropdownMenu.Trigger asChild>
  <Button variant="outline" size="icon">
    <MoreVertical className="h-4 w-4" />
  </Button>
</DropdownMenu.Trigger>;
```

Your Button component receives all the necessary dropdown trigger behavior without modification.

### 4. Component Composition

You can compose multiple behaviors onto a single element:

```tsx
<Dialog.Trigger asChild>
  <Tooltip.Trigger asChild>
    <button>Open dialog (with tooltip)</button>
  </Tooltip.Trigger>
</Dialog.Trigger>
```

This creates a button that both opens a dialog and shows a tooltip on hover.

## Common Use Cases

### Custom Trigger Elements

Replace default triggers with custom components:

```tsx
// Custom link trigger
<Collapsible.Trigger asChild>
  <a href="#" className="text-blue-600 underline">
    Toggle Details
  </a>
</Collapsible.Trigger>

// Icon-only trigger
<Popover.Trigger asChild>
  <IconButton>
    <Settings className="h-4 w-4" />
  </IconButton>
</Popover.Trigger>
```

### Accessible Navigation

Maintain proper semantics for navigation elements:

```tsx
<NavigationMenu.Link asChild>
  <Link href="/products" className="nav-link">
    Products
  </Link>
</NavigationMenu.Link>
```

### Form Integration

Integrate with form libraries while preserving functionality:

```tsx
<FormField
  control={form.control}
  name="acceptTerms"
  render={({ field }) => (
    <FormItem>
      <Checkbox.Root asChild>
        <input type="checkbox" {...field} className="sr-only" />
      </Checkbox.Root>
    </FormItem>
  )}
/>
```

## Best Practices

### 1. Maintain Accessibility

When changing element types, ensure accessibility is preserved:

```tsx
// ✅ Good - maintains button semantics
<Dialog.Trigger asChild>
  <button type="button">Open</button>
</Dialog.Trigger>

// ⚠️ Caution - ensure proper ARIA attributes
<Dialog.Trigger asChild>
  <div role="button" tabIndex={0}>Open</div>
</Dialog.Trigger>
```

### 2. Document Component Requirements

Clearly document when components support `asChild`:

```tsx
interface TriggerProps {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   *
   * @default false
   */
  asChild?: boolean;
  children: React.ReactNode;
}
```

### 3. Test Child Components

Verify that custom components work correctly with `asChild`:

```tsx
// Test that props are properly forwarded
const TestButton = (props) => {
  console.log("Received props:", props);
  return <button {...props} />;
};

<Tooltip.Trigger asChild>
  <TestButton>Test</TestButton>
</Tooltip.Trigger>;
```

### 4. Handle Edge Cases

Consider edge cases like conditional rendering:

```tsx
// Handle conditional children
<Dialog.Trigger asChild>
  {isLoading ? (
    <Skeleton className="h-10 w-20" />
  ) : (
    <Button>Open Dialog</Button>
  )}
</Dialog.Trigger>
```

## Common Pitfalls

### Not Spreading Props

As discussed in [Types](/docs/types), you should always spread props to the underlying element.

```tsx
// ❌ Won't receive trigger behavior
const BadButton = ({ children }) => <button>{children}</button>;

// ✅ Properly receives all props
const GoodButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
```

### Multiple Children

Don't pass multiple children to a component that supports `asChild`. This will cause an error as the component will not know which child to use.

```tsx
// ❌ Error - asChild expects single child
<Trigger asChild>
  <button>One</button>
  <button>Two</button>
</Trigger>

// ✅ Single child element
<Trigger asChild>
  <button>Single Button</button>
</Trigger>
```

### Fragment Children

Don't pass a fragment to a component that supports `asChild`. This will cause an error as fragments are not valid elements.

```tsx
// ❌ Fragment is not a valid element
<Trigger asChild>
  <>Button</>
</Trigger>

// ✅ Actual element
<Trigger asChild>
  <button>Button</button>
</Trigger>
```

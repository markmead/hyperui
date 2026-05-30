---
title: Data Attributes
description: Using data attributes for declarative styling and component identification.
type: reference
summary: Using data-state for declarative visual state styling and data-slot for stable component identification in Tailwind-based systems.
prerequisites:
  - /composition
  - /styling
related:
  - /design-tokens
  - /accessibility
---

Data attributes provide a powerful way to expose component state and structure to consumers, enabling flexible styling without prop explosion. Modern component libraries use two primary patterns: `data-state` for visual states and `data-slot` for component identification.

## Styling state with data-state

One of the most common anti-patterns in component styling is exposing separate className props for different states.

In less modern components, you'll often see APIs like this:

```tsx
<Dialog
  openClassName="bg-black"
  closedClassName="bg-white"
  classes={{
    open: "opacity-100",
    closed: "opacity-0",
  }}
/>
```

This approach has several problems:

- It couples the component's internal state to its styling API
- It creates an explosion of props as components grow more complex
- It makes the component harder to use and maintain
- It prevents styling based on state combinations

### The solution: data-state attributes

Instead, use `data-*` attributes to expose component state declaratively. This allows consumers to style components based on state using standard CSS selectors:

```tsx title="component.tsx"
const Dialog = ({ className, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn("transition-all", className)}
      {...props}
    />
  );
};
```

Now consumers can style the component based on state from the outside:

```tsx title="app.tsx"
<Dialog className="data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
```

### Benefits of this approach

1. **Single className prop** - No need for multiple state-specific className props
2. **Composable** - Combine multiple data attributes for complex states
3. **Standard CSS** - Works with any CSS-in-JS solution or plain CSS
4. **Type-safe** - TypeScript can infer data attribute values
5. **Inspectable** - States are visible in DevTools as HTML attributes

### Common state patterns

Use data attributes for all kinds of component state:

```tsx
// Open/closed state
<Accordion data-state={isOpen ? 'open' : 'closed'} />

// Selected state
<Tab data-state={isSelected ? 'active' : 'inactive'} />

// Disabled state (in addition to disabled attribute)
<Button data-disabled={isDisabled} disabled={isDisabled} />

// Loading state
<Button data-loading={isLoading} />

// Orientation
<Slider data-orientation="horizontal" />

// Side/position
<Tooltip data-side="top" />
```

### Styling with Tailwind

Tailwind supports arbitrary variants, making data attribute styling elegant:

```tsx
<Dialog
  className={cn(
    // Base styles
    "rounded-lg border p-4",
    // State-based styles
    "data-[state=open]:animate-in data-[state=open]:fade-in",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out",
    // Multiple attributes
    "data-[state=open][data-side=top]:slide-in-from-top-2",
  )}
/>
```

For commonly-used states, you can extend Tailwind's configuration:

```js title="tailwind.config.js"
module.exports = {
  theme: {
    extend: {
      data: {
        open: 'state="open"',
        closed: 'state="closed"',
        active: 'state="active"',
      },
    },
  },
};
```

Now you can use shorthand:

```tsx
<Dialog className="data-open:opacity-100 data-closed:opacity-0" />
```

### Integration with Radix UI

This pattern is used extensively by [Radix UI](https://www.radix-ui.com/), which automatically applies data attributes to its primitives:

```tsx
import * as Dialog from "@radix-ui/react-dialog";

<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    {/* Radix automatically adds data-state="open" | "closed" */}
    <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out" />
    <Dialog.Content className="data-[state=open]:fade-in data-[state=closed]:fade-out" />
  </Dialog.Portal>
</Dialog.Root>;
```

Other data attributes Radix provides include:

- `data-state` - open/closed, active/inactive, on/off
- `data-side` - top/right/bottom/left (for positioned elements)
- `data-align` - start/center/end (for positioned elements)
- `data-orientation` - horizontal/vertical
- `data-disabled` - present when disabled
- `data-placeholder` - present when showing placeholder

## Component identification with data-slot

While `data-state` tracks visual states, `data-slot` identifies component types within a composition. This pattern, popularized by [shadcn/ui](https://ui.shadcn.com/), allows parent components to target and style specific child components without relying on fragile class names or element selectors.

### The problem with child targeting

Traditional approaches to styling child components have significant limitations:

```tsx
// Relies on element types - breaks if implementation changes
<form className="[&_input]:rounded-lg [&_button]:mt-4" />

// Relies on class names - breaks if classes change
<form className="[&_.text-input]:rounded-lg" />

// Requires passing classes through props - verbose
<form>
  <input className={inputClasses} />
  <button className={buttonClasses} />
</form>
```

### The solution: data-slot attributes

Use `data-slot` to give components stable identifiers that can be targeted by parents:

```tsx title="field-set.tsx"
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        // Target specific child slots
        "has-[>[data-slot=checkbox-group]]:gap-3",
        "has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}
```

```tsx title="checkbox-group.tsx"
function CheckboxGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}
```

### Benefits of data-slot

1. **Stable identifiers** - Won't break when implementation details change
2. **Semantic targeting** - Target based on component purpose, not structure
3. **Encapsulation** - Internal classes remain private
4. **Composable** - Works with arbitrary nesting and composition
5. **Type-safe** - Can be validated and documented

### Using `has-[]` for parent-aware styling

Tailwind's `has-[]` selector combined with `data-slot` creates powerful parent-aware styling:

```tsx title="form.tsx"
function Form({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="form"
      className={cn(
        "space-y-4",
        // Adjust spacing when specific slots are present
        "has-[>[data-slot=form-section]]:space-y-6",
        "has-[>[data-slot=inline-fields]]:space-y-2",
        // Style based on slot states
        "has-[[data-slot=submit-button][data-loading=true]]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
```

### Using `[&_]` for descendant targeting

For deeper nesting, use the `[&_selector]` pattern to target any descendant:

```tsx title="card.tsx"
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-lg border p-4",
        // Target any descendant with data-slot
        "[&_[data-slot=card-header]]:mb-4",
        "[&_[data-slot=card-title]]:text-lg [&_[data-slot=card-title]]:font-semibold",
        "[&_[data-slot=card-description]]:text-sm [&_[data-slot=card-description]]:text-muted-foreground",
        "[&_[data-slot=card-footer]]:mt-4 [&_[data-slot=card-footer]]:border-t [&_[data-slot=card-footer]]:pt-4",
        className,
      )}
      {...props}
    />
  );
}
```

### Global CSS with data-slot

Data slots work beautifully with global CSS for theme-wide consistency:

```css title="globals.css"
/* Style all buttons within forms */
[data-slot="form"] [data-slot="button"] {
  @apply w-full sm:w-auto;
}

/* Style submit buttons specifically */
[data-slot="form"] [data-slot="submit-button"] {
  @apply bg-primary text-primary-foreground;
}

/* Adjust inputs within inline layouts */
[data-slot="inline-fields"] [data-slot="input"] {
  @apply flex-1;
}

/* Style based on state combinations */
[data-slot="dialog"][data-state="open"] [data-slot="dialog-content"] {
  @apply animate-in fade-in;
}
```

### Naming conventions

Follow these conventions for consistent `data-slot` naming:

1. **Use kebab-case** - `data-slot="form-field"` not `data-slot="formField"`
2. **Be specific** - `data-slot="submit-button"` not `data-slot="button"`
3. **Match component purpose** - Name reflects what it does, not how it looks
4. **Avoid implementation details** - `data-slot="user-avatar"` not `data-slot="rounded-image"`

```tsx
// Good examples
data-slot="search-input"
data-slot="navigation-menu"
data-slot="error-message"
data-slot="submit-button"
data-slot="card-header"

// Avoid
data-slot="input"           // Too generic
data-slot="blueButton"      // Includes styling
data-slot="div-wrapper"     // Implementation detail
data-slot="mainContent"     // Use camelCase
```

## When to use data attributes vs props

Understanding when to use each pattern is key to a clean API:

### `data-state` use cases

- **Visual states** - open/closed, active/inactive, loading, etc.
- **Layout states** - orientation, side, alignment
- **Interaction states** - hover, focus, disabled (when you need to style children)

### `data-slot` use cases

- **Component identification** - Stable identifiers for targeting
- **Composition patterns** - Parent-child relationships
- **Global styling** - Theme-wide component styling
- **Variant-independent targeting** - Target any variant of a component

### `props` use cases

- **Variants** - Different visual designs (primary, secondary, destructive)
- **Sizes** - sm, md, lg
- **Behavioral configuration** - controlled/uncontrolled, default values
- **Event handlers** - onClick, onChange, etc.

### Combined approach

A well-designed component uses all three patterns appropriately:

```tsx title="button.tsx"
type ButtonProps = {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      // Slot for targeting
      data-slot="button"
      // State for conditional styling
      data-loading={loading}
      data-disabled={disabled}
      className={cn(
        // Variant styles via props
        buttonVariants({ variant, size }),
        // Additional state styling allowed via className
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};
```

Now the button can be used and styled in multiple ways:

```tsx
// Basic usage with variants
<Button variant="primary" size="lg">Submit</Button>

// Parent targeting via data-slot
<form className="[&_[data-slot=button]]:w-full">
  <Button>Submit</Button>
</form>

// State-based styling via data-state
<Button
  loading={isLoading}
  className="data-[loading=true]:opacity-50"
>
  Submit
</Button>

// Global CSS can target any button
// [data-slot="button"][data-loading="true"] { ... }
```

Data attributes provide a robust foundation for styling modern component libraries. By using `data-state` for visual states and `data-slot` for component identification, you create a flexible, maintainable API that scales from simple components to complex design systems.

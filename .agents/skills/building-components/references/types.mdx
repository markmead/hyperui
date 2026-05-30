---
title: Types
description: Extending the browser's native HTML elements for maximum customization.
type: reference
summary: Patterns for extending native HTML attributes, single-element wrapping, exporting prop types, and avoiding prop name conflicts.
prerequisites:
  - /composition
related:
  - /as-child
  - /polymorphism
  - /state
---

When building reusable components, proper typing is essential for creating flexible, customizable, and type-safe interfaces. By following established patterns for component types, you can ensure your components are both powerful and easy to use.

## Single Element Wrapping

Each exported component should ideally wrap a single HTML or JSX element. This principle is fundamental to creating composable, customizable components.

When a component wraps multiple elements, it becomes difficult to customize specific parts without prop drilling or complex APIs. Consider this anti-pattern:

```tsx title="@/components/ui/card.tsx"
const Card = ({ title, description, footer, ...props }) => (
  <div {...props}>
    <div className="card-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className="card-footer">{footer}</div>
  </div>
);
```

As we discussed in [Composition](/composition), this approach creates several problems:

- You can't customize the header styling without adding more props
- You can't control the HTML elements used for title and description
- You're forced into a specific DOM structure

Instead, each layer should be its own component. This allows you to customize each layer independently, and to control the exact HTML elements used for the title and description.

The benefits of this approach are:

- **Maximum customization** - Users can style and modify each layer independently
- **No prop drilling** - Props go directly to the element that needs them
- **Semantic HTML** - Users can see and control the exact DOM structure
- **Better accessibility** - Direct control over ARIA attributes and semantic elements
- **Simpler mental model** - One component = one element

## Extending HTML Attributes

Every component should extend the native HTML attributes of the element it wraps. This ensures users have full control over the underlying HTML element.

### Basic Pattern

```tsx
export type CardRootProps = React.ComponentProps<"div"> & {
  // Add your custom props here
  variant?: "default" | "outlined";
};

export const CardRoot = ({ variant = "default", ...props }: CardRootProps) => (
  <div {...props} />
);
```

### Common HTML Attribute Types

React provides type definitions for all HTML elements. Use the appropriate one for your component:

```tsx
// For div elements
type DivProps = React.ComponentProps<"div">;

// For button elements
type ButtonProps = React.ComponentProps<"button">;

// For input elements
type InputProps = React.ComponentProps<"input">;

// For form elements
type FormProps = React.ComponentProps<"form">;

// For anchor elements
type LinkProps = React.ComponentProps<"a">;
```

### Handling Different Element Types

When a component can render as different elements, use generics or union types:

```tsx
// Using discriminated unions
export type ButtonProps =
  | (React.ComponentProps<"button"> & { asChild?: false })
  | (React.ComponentProps<"div"> & { asChild: true });

// Or with a polymorphic approach
export type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;
```

### Extending custom components

If you're extending an existing component, you can use the `ComponentProps` type to get the props of the component.

```tsx title="@/components/ui/share-button.tsx"
import type { ComponentProps } from "react";

export type ShareButtonProps = ComponentProps<"button">;

export const ShareButton = (props: ShareButtonProps) => <button {...props} />;
```

## Exporting Types

Always export your component prop types. This makes them accessible to consumers for various use cases.

Exporting types enables several important patterns:

```tsx
// 1. Extracting specific prop types
import type { CardRootProps } from "@/components/ui/card";
type variant = CardRootProps["variant"];

// 2. Extending components
export type ExtendedCardProps = CardRootProps & {
  isLoading?: boolean;
};

// 3. Creating wrapper components
const MyCard = (props: CardRootProps) => (
  <CardRoot {...props} className={cn("my-custom-class", props.className)} />
);

// 4. Type-safe prop forwarding
function useCardProps(): Partial<CardRootProps> {
  return {
    variant: "outlined",
    className: "custom-card",
  };
}
```

Your exported types should be named `<ComponentName>Props`. This is a convention that helps other developers understand the purpose of the type.

## Best Practices

### 1. Always Spread Props Last

Ensure users can override any default props:

```tsx
// ✅ Good - user props override defaults
<div className="default-class" {...props} />

// ❌ Bad - defaults override user props
<div {...props} className="default-class" />
```

### 2. Avoid Prop Name Conflicts

Don't use prop names that conflict with HTML attributes unless intentionally overriding:

```tsx
// ❌ Bad - conflicts with HTML title attribute
export type CardProps = React.ComponentProps<"div"> & {
  title: string; // This conflicts with the HTML title attribute
};

// ✅ Good - use a different name
export type CardProps = React.ComponentProps<"div"> & {
  heading: string;
};
```

### 3. Document Custom Props

Add JSDoc comments to custom props for better developer experience:

```tsx
export type DialogProps = React.ComponentProps<"div"> & {
  /** Whether the dialog is currently open */
  open: boolean;
  /** Callback when the dialog requests to be closed */
  onOpenChange: (open: boolean) => void;
  /** Whether to render the dialog in a portal */
  modal?: boolean;
};
```

---
title: Styling
description: Conditional and composable styling with Tailwind classes.
type: guide
summary: Using tailwind-merge, clsx, the cn utility, and Class Variance Authority for conditional and composable component styling.
prerequisites:
  - /composition
related:
  - /design-tokens
  - /data-attributes
---

Modern component libraries need flexible styling systems that can handle complex requirements without sacrificing developer experience. The combination of Tailwind CSS with intelligent class merging has emerged as a powerful pattern for building customizable components.

This approach solves the fundamental tension between providing sensible defaults and allowing complete customization - a challenge that has plagued component libraries for years.

## The problem with traditional styling

Traditional CSS approaches often lead to specificity wars, style conflicts, and unpredictable overrides. When you pass `className="bg-blue-500"` to a component that already has `bg-red-500`, which one wins?

Without proper handling, both classes apply and the result depends on a lot of factors - CSS source order, the specificity of the classes, the bundler's class merging algorithm, etc.

## Merging classes intelligently

The `tailwind-merge` library solves this by understanding Tailwind's class structure and intelligently resolving conflicts. When two classes target the same CSS property, it keeps only the last one.

```tsx title="Without tailwind-merge"
// Both bg-red-500 and bg-blue-500 apply - unpredictable result
<Button className="bg-blue-500" />
// Renders: className="bg-red-500 bg-blue-500"
```

```tsx title="With tailwind-merge"
import { twMerge } from "tailwind-merge";

// bg-blue-500 wins as it comes last
const className = twMerge("bg-red-500", "bg-blue-500");
// Returns: "bg-blue-500"
```

This works for all Tailwind utilities:

```tsx
twMerge("px-4 py-2", "px-8"); // Returns: "py-2 px-8"
twMerge("text-sm", "text-lg"); // Returns: "text-lg"
twMerge("hover:bg-red-500", "hover:bg-blue-500"); // Returns: "hover:bg-blue-500"
```

The library understands Tailwind's modifier system too:

```tsx
// Modifiers are handled correctly
twMerge("hover:bg-red-500 focus:bg-red-500", "hover:bg-blue-500");
// Returns: "focus:bg-red-500 hover:bg-blue-500"
```

## Conditional classes

Often you need to apply classes conditionally based on props or state. The `clsx` library provides a clean API for this:

```tsx title="Using clsx"
import clsx from "clsx";

// Basic conditionals
clsx("base", isActive && "active");
// Returns: "base active" (if isActive is true)

// Object syntax
clsx("base", {
  active: isActive,
  disabled: isDisabled,
});

// Arrays
clsx(["base", isLarge ? "text-lg" : "text-sm"]);

// Mixed
clsx(
  "base",
  ["array-item"],
  { "object-conditional": true },
  isActive && "conditional",
);
```

A common pattern is to merge a default set of classes with incoming props, as well as any custom logic we have:

```tsx title="component.tsx"
const Component = ({ className, ...props }: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg border bg-white shadow-sm",
        isOpen && "bg-blue-500",
        className,
      )}
      {...props}
    />
  );
};
```

## The `cn` utility function

The `cn` function, popularized by [shadcn/ui](https://ui.shadcn.com/), combines `clsx` and `tailwind-merge` to give you both conditional logic and intelligent merging:

```tsx title="lib/utils.ts"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

The power comes from the ordering - base styles first, conditionals second, user overrides last. This ensures predictable behavior while maintaining full customization.

## Class Variance Authority (CVA)

For complex components with many variants, manually managing conditional classes becomes unwieldy. [Class Variance Authority (CVA)](https://cva.style/docs) provides a declarative API for defining component variants.

For example, here's an extract from the [Button](https://ui.shadcn.com/docs/components/button) component from shadcn/ui:

```tsx title="@/components/ui/button.tsx"
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

## Best practices

### 1. Order matters

Always apply classes in this order:

1. Base styles (always applied)
2. Variant styles (based on props)
3. Conditional styles (based on state)
4. User overrides (className prop)

```tsx
className={cn(
  'base-styles',            // 1. Base
  variant && variantStyles, // 2. Variants
  isActive && 'active',     // 3. Conditionals
  className                 // 4. User overrides
)}
```

### 2. Document your variants

Use TypeScript and JSDoc to document what each variant does:

```tsx
type ButtonProps = {
  /**
   * The visual style of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "destructive" | "ghost";

  /**
   * The size of the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
};
```

### 3. Extract repeated patterns

If you find yourself writing the same conditional logic repeatedly, extract it:

```tsx title="utils/styles.ts"
export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
export const disabled = 'disabled:pointer-events-none disabled:opacity-50';

// Use in components
className={cn(focusRing, disabled, className)}
```

## Migration guide

If you're migrating from a different styling approach, here's how to adapt common patterns:

### From CSS Modules

```tsx title="Before - CSS Modules"
import styles from "./Button.module.css";

<button className={`${styles.button} ${styles[variant]} ${className}`} />;
```

```tsx title="After - cn + Tailwind"
import { cn } from "@/lib/utils";

<button
  className={cn(
    "px-4 py-2 rounded-lg",
    variant === "primary" && "bg-blue-500 text-white",
    className,
  )}
/>;
```

### From styled-components

```tsx title="Before - styled-components"
const Button = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  background: ${(props) => (props.$primary ? "blue" : "gray")};
`;
```

```tsx title="After - cn + Tailwind"
function Button({ primary, className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2",
        primary ? "bg-blue-500" : "bg-gray-500",
        className,
      )}
      {...props}
    />
  );
}
```

## Performance considerations

Both `clsx` and `tailwind-merge` are highly optimized, but keep these tips in mind:

1. **Define variants outside components** - CVA variants should be defined outside the component to avoid recreation on every render.

2. **Memoize complex computations** - If you have expensive conditional logic, consider memoizing:

```tsx
const className = useMemo(
  () => cn(baseStyles, expensiveComputation(props), className),
  [props, className],
);
```

3. **Use CSS variables for dynamic values** - Instead of generating classes dynamically, use CSS variables:

```tsx title="Prefer CSS variables"
// Good
<div
  className="bg-[var(--color)]"
  style={{ '--color': dynamicColor } as React.CSSProperties}
/>

// Avoid
<div className={`bg-[${dynamicColor}]`} />
```

The combination of Tailwind CSS, intelligent class merging, and variant APIs provides a robust foundation for component styling. This approach scales from simple buttons to complex design systems while maintaining predictability and developer experience.

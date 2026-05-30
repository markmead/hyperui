---
title: State
description: How to manage state in a component, as well as merging controllable and uncontrolled state.
type: reference
summary: Controlled vs uncontrolled state patterns and merging both modes with useControllableState from Radix UI.
prerequisites:
  - /composition
  - /types
related:
  - /as-child
---

Building flexible components that work in both controlled and uncontrolled modes is a hallmark of professional components.

## Uncontrolled State

Uncontrolled state is when the component manages its own state internally. This is the default usage pattern for most components.

For example, here's a simple `Stepper` component that manages its own state internally:

```tsx title="stepper.tsx"
import { useState } from "react";

export const Stepper = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

## Controlled State

Controlled state is when the component's state is managed by the parent component. Rather than keeping track of the state internally, we delegate this responsibility to the parent component.

Let's rework the `Stepper` component to be controlled by the parent component:

```tsx title="stepper.tsx"
type StepperProps = {
  value: number;
  setValue: (value: number) => void;
};

export const Stepper = ({ value, setValue }: StepperProps) => (
  <div>
    <p>{value}</p>
    <button onClick={() => setValue(value + 1)}>Increment</button>
  </div>
);
```

## Merging states

The best components support both controlled and uncontrolled state. This allows the component to be used in a variety of scenarios, and to be easily customized.

[Radix UI](https://www.radix-ui.com/) maintain an internal utility for merging controllable and uncontrolled state called [`use-controllable-state`](https://github.com/radix-ui/primitives/tree/main/packages/react/use-controllable-state). While not intended for public use, registries like [Kibo UI](https://www.kibo-ui.com) have implemented this utility to build their own Radix-like components.

Let's install the hook:

```package-install
npm install @radix-ui/react-use-controllable-state
```

This lightweight hook gives you the same state management patterns used internally by Radix UI's component library, ensuring your components behave consistently with industry standards.

The hook accepts three main parameters and returns a tuple with the current value and setter. Let's use it to merge the controlled and uncontrolled state of the `Stepper` component:

```tsx title="stepper.tsx"
import { useControllableState } from "@radix-ui/react-use-controllable-state";

type StepperProps = {
  value: number;
  defaultValue: number;
  onValueChange: (value: number) => void;
};

export const Stepper = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
}: StepperProps) => {
  const [value, setValue] = useControllableState({
    prop: controlledValue, // The controlled value prop
    defaultProp: defaultValue, // Default value for uncontrolled mode
    onChange: onValueChange, // Called when value changes
  });

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

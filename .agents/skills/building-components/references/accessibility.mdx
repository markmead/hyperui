---
title: Accessibility
description: Building components that are usable by everyone, including users with disabilities who rely on assistive technologies.
type: guide
summary: Semantic HTML, keyboard navigation, ARIA patterns, focus management, color contrast, and common accessibility pitfalls.
prerequisites:
  - /definitions
  - /composition
related:
  - /data-attributes
  - /types
---

Accessibility (a11y) is not an optional feature—it's a fundamental requirement for modern web components. Every component must be usable by everyone, including people with visual, motor, auditory, or cognitive disabilities.

This guide is a non-exhaustive list of accessibility principles and patterns that you should follow when building components. It's not a comprehensive guide, but it should give you a sense of the types of issues you should be aware of.

If you use a linter with strong accessibility rules like [Ultracite](https://www.ultracite.ai), these types of issues will likely be caught automatically, but it's still important to understand the principles.

## Core Principles

### 1. Semantic HTML First

Always start with the most appropriate HTML element. Semantic HTML provides built-in accessibility features that custom implementations often miss.

```tsx
// ❌ Don't reinvent the wheel
<div onClick={handleClick} className="button">
  Click me
</div>

// ✅ Use semantic elements
<button onClick={handleClick}>
  Click me
</button>
```

Semantic elements come with proper role announcements, keyboard interaction, focus management, and form participation.

### 2. Keyboard Navigation

Every interactive element must be keyboard accessible. Users should be able to navigate, activate, and interact with all functionality using only a keyboard.

```tsx
// ✅ Complete keyboard support
function Menu() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        focusNextItem();
        break;
      case "ArrowUp":
        focusPreviousItem();
        break;
      case "Home":
        focusFirstItem();
        break;
      case "End":
        focusLastItem();
        break;
      case "Escape":
        closeMenu();
        break;
    }
  };

  return (
    <div role="menu" onKeyDown={handleKeyDown}>
      {/* menu items */}
    </div>
  );
}
```

### 3. Screen Reader Support

Ensure all content and interactions are announced properly to screen readers using ARIA attributes when necessary.

```tsx
// ✅ Proper ARIA labeling
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ✅ Dynamic content announcements
<div aria-live="polite" aria-atomic="true">
  {isLoading && <span>Loading results...</span>}
  {results && <span>{results.length} results found</span>}
</div>
```

### 4. Visual Accessibility

Support users with visual impairments through proper contrast, focus indicators, and responsive text sizing.

```css
/* ✅ Visible focus indicators */
button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* ✅ Sufficient color contrast (4.5:1 for normal text, 3:1 for large text) */
.text {
  color: #333; /* Against white: 12.6:1 ratio */
  background: white;
}

/* ✅ Responsive text sizing */
.text {
  font-size: 1rem; /* Respects user preferences */
}
```

## ARIA Patterns

### Understanding ARIA

ARIA (Accessible Rich Internet Applications) provides semantic information about elements to assistive technologies. Use ARIA to enhance, not replace, semantic HTML.

It has a few rules that you should follow:

1. Don't use ARIA if you can use semantic HTML
2. Don't change native semantics unless necessary
3. All interactive elements must be keyboard accessible
4. Don't hide focusable elements from assistive technologies
5. All interactive elements must have accessible names

### Common ARIA Attributes

#### Roles

Define what an element is:

```tsx
// Widget roles
<div role="button" tabIndex={0} onClick={handleClick}>
  Custom Button
</div>

// Landmark roles
<div role="navigation" aria-label="Breadcrumb">
  {/* breadcrumb items */}
</div>

// Live region roles
<div role="alert">
  Error: Invalid email address
</div>
```

#### States

Describe the current state of an element:

```tsx
// Checked state
<div
  role="checkbox"
  aria-checked={isChecked}
  tabIndex={0}
>
  Accept terms
</div>

// Expanded state
<button
  aria-expanded={isOpen}
  aria-controls="panel-1"
>
  Toggle Panel
</button>
<div id="panel-1" hidden={!isOpen}>
  Panel content
</div>

// Selected state
<li
  role="option"
  aria-selected={isSelected}
>
  Option 1
</li>
```

#### Properties

Provide additional information:

```tsx
// Labels and descriptions
<input
  aria-label="Search"
  aria-describedby="search-help"
  type="search"
/>
<span id="search-help">Press Enter to search</span>

// Relationships
<button aria-controls="modal-1">Open Modal</button>
<div id="modal-1" role="dialog">{/* modal content */}</div>

// Required and invalid
<input
  aria-required="true"
  aria-invalid={hasError}
  aria-errormessage="email-error"
/>
<span id="email-error">Please enter a valid email</span>
```

## Component Patterns

### Modal/Dialog

Modals require careful focus management and keyboard trapping:

```tsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement as HTMLElement;

      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus
      previousFocus.current?.focus();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }

    if (e.key === "Tab") {
      // Trap focus within modal
      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusables && focusables.length > 0) {
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="modal"
    >
      <button
        onClick={onClose}
        aria-label="Close dialog"
        className="close-button"
      >
        ×
      </button>
      {children}
    </div>
  );
}
```

### Dropdown Menu

Dropdowns need proper ARIA attributes and keyboard navigation:

```tsx
function DropdownMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
        } else {
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
        }
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (selectedIndex >= 0) {
          items[selectedIndex].onClick();
          setIsOpen(false);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="dropdown">
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      {isOpen && (
        <ul
          id="dropdown-menu"
          role="menu"
          ref={menuRef}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              role="menuitem"
              tabIndex={-1}
              aria-selected={index === selectedIndex}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Tabs

Tab interfaces require specific ARIA patterns and keyboard navigation:

```tsx
function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowLeft":
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case "ArrowRight":
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveTab(newIndex);

    // Focus the newly selected tab
    const tabElement = document.getElementById(`tab-${newIndex}`);
    tabElement?.focus();
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${index}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

### Forms

Forms need clear labels, error messages, and validation feedback:

```tsx
function AccessibleForm() {
  const [errors, setErrors] = useState({});

  return (
    <form aria-label="Contact form">
      <div className="form-group">
        <label htmlFor="email">
          Email Address
          <span aria-label="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : "email-help"}
        />
        <span id="email-help" className="help-text">
          We'll never share your email
        </span>
        {errors.email && (
          <span id="email-error" role="alert" className="error">
            {errors.email}
          </span>
        )}
      </div>

      <fieldset>
        <legend>Notification Preferences</legend>
        <div>
          <input
            id="notify-email"
            type="checkbox"
            name="notifications"
            value="email"
          />
          <label htmlFor="notify-email">Email notifications</label>
        </div>
        <div>
          <input
            id="notify-sms"
            type="checkbox"
            name="notifications"
            value="sms"
          />
          <label htmlFor="notify-sms">SMS notifications</label>
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Focus Management

### Focus Visible

Show focus indicators only for keyboard navigation:

```css
/* Remove default outline */
*:focus {
  outline: none;
}

/* Show outline only for keyboard focus */
*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Custom focus styles for specific components */
.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
```

### Focus Trapping

Keep focus within a specific region:

```tsx
function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableSelector =
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])';

    const focusableElements =
      element.querySelectorAll<HTMLElement>(focusableSelector);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    firstFocusable?.focus();

    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  }, [ref, isActive]);
}
```

### Focus Restoration

Return focus to the appropriate element after interactions:

```tsx
function useRestoreFocus() {
  const previousFocus = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousFocus.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    previousFocus.current?.focus();
  };

  return { saveFocus, restoreFocus };
}
```

## Live Regions

Announce dynamic content changes to screen readers:

### Status Messages

```tsx
// Polite announcement (waits for screen reader to finish)
<div role="status" aria-live="polite">
  {savedMessage && "Settings saved successfully"}
</div>

// Assertive announcement (interrupts screen reader)
<div role="alert" aria-live="assertive">
  {errorMessage && `Error: ${errorMessage}`}
</div>

// Loading states
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? "Loading..." : `${items.length} items loaded`}
</div>
```

### Progress Indicators

```tsx
function ProgressBar({ value, max = 100 }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label="Upload progress"
    >
      <div
        className="progress-fill"
        style={{ width: `${(value / max) * 100}%` }}
      />
      <span className="sr-only">
        {Math.round((value / max) * 100)}% complete
      </span>
    </div>
  );
}
```

## Color and Contrast

### Contrast Requirements

Follow WCAG guidelines for color contrast:

```css
/* Normal text (< 18pt or < 14pt bold) */
.text {
  color: #595959; /* 7:1 ratio against white */
  background: white;
}

/* Large text (≥ 18pt or ≥ 14pt bold) */
.heading {
  color: #767676; /* 4.5:1 ratio against white */
  font-size: 1.5rem;
  font-weight: bold;
}

/* Non-text elements (icons, borders) */
.icon {
  color: #949494; /* 3:1 ratio against white */
}
```

### Color Independence

Never convey information through color alone:

```tsx
// ❌ Color only
<span className="text-red-500">Error</span>

// ✅ Color with text/icon
<span className="text-red-500">
  <ErrorIcon aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>

// ✅ Multiple indicators
<input
  className={hasError ? 'border-red-500' : 'border-gray-300'}
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : undefined}
/>
{hasError && (
  <span id="error-message" className="text-red-500">
    <ErrorIcon aria-hidden="true" /> This field is required
  </span>
)}
```

## Mobile Accessibility

### Touch Targets

Ensure touch targets are large enough:

```css
/* Minimum 44x44px for iOS, 48x48dp for Android */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Add invisible touch area for small icons */
.icon-button {
  position: relative;
  padding: 8px;
}

.icon-button::before {
  content: "";
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
```

### Viewport and Zoom

Allow users to zoom:

```html
<!-- ✅ Allows zooming -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- ❌ Prevents zooming -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
```

## Common Pitfalls

### Placeholder Text as Labels

Don't use placeholders as the only label:

```tsx
// ❌ Placeholder disappears when typing
<input placeholder="Email address" />

// ✅ Persistent label
<label>
  Email address
  <input type="email" />
</label>

// ✅ Floating label pattern
<div className="form-field">
  <input id="email" placeholder=" " />
  <label htmlFor="email">Email address</label>
</div>
```

### Empty Buttons

Always provide accessible text for icon buttons:

```tsx
// ❌ No accessible name
<button onClick={handleDelete}>
  <TrashIcon />
</button>

// ✅ Screen reader text
<button onClick={handleDelete} aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>

// ✅ Visually hidden text
<button onClick={handleDelete}>
  <TrashIcon aria-hidden="true" />
  <span className="sr-only">Delete item</span>
</button>
```

### Disabled Form Elements

Disabled elements aren't focusable, which can confuse users:

```tsx
// ❌ User can't understand why button is disabled
<button disabled={!isValid}>
  Submit
</button>

// ✅ Use aria-disabled and explain
<button
  aria-disabled={!isValid}
  aria-describedby="submit-help"
  onClick={isValid ? handleSubmit : undefined}
  className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
>
  Submit
</button>
<span id="submit-help">
  {!isValid && 'Please fill in all required fields'}
</span>
```

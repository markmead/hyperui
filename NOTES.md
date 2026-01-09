# HyperUI Development Notes

Future improvements and considerations identified during code review (January 2026).

## Bugs to Address

### Tabs Component ARIA Issues

**Location:** `public/components/application/tabs/`

The tabs component needs proper ARIA associations:

- Tab buttons should have `aria-controls` pointing to their panel IDs
- Tab panels should have `aria-labelledby` pointing to their tab IDs
- Hidden panels should exist in DOM with `hidden` attribute for screen readers

### Toggle Component Accessible Name

**Location:** `public/components/application/toggles/`

The toggle checkbox has a generic label but lacks visible text explaining what the toggle controls. Consider adding descriptive text or ensuring the surrounding context provides meaning.

---

## Feature Considerations

### Copy as JSX Option

Some developers use React/JSX. A toggle to copy components with JSX syntax (`className` instead of `class`, self-closing tags, etc.) could be valuable. Would need client-side transformation logic.

---

## Style Consistency Notes

### Border Radius Standardization

Components use varying border radius values (`rounded-sm`, `rounded-md`, `rounded-lg`). While intentional variation is fine, worth reviewing for consistency within similar component types.

### GitHub Stars Count

**Location:** `src/components/Social.astro`

The star count is hardcoded as `11k`. Options:

1. Fetch dynamically at build time via GitHub API
2. Remove the number entirely
3. Keep as-is (current approach)

Not a priority fix, but worth noting.

### Responsive Images

Marketing components with placeholder images don't use `srcset` or `sizes` attributes. For components that ship with images, this could improve performance guidance.

---

## Completed Items (This Review)

- ✅ Fixed HeaderLink class prop naming
- ✅ Fixed ComponentCard type definitions
- ✅ Fixed TypeScript workaround in ComponentPost
- ✅ Added preconnect resource hints
- ✅ Optimized font loading in component.css
- ✅ Added error handling in search
- ✅ Added ARIA live regions for search results
- ✅ Added skip link to site
- ✅ Added component counts to category pages
- ✅ Added Schema.org markup to component pages
- ✅ Removed .DS_Store from content folder

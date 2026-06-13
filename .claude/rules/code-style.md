---
paths:
  - 'src/**/*.astro'
  - 'src/**/*.ts'
  - 'src/**/*.js'
  - 'constants/**/*.js'
  - 'scripts/**/*.js'
---

# Code style

These rules apply to all JavaScript and Astro component scripts in this project.

## Naming: be explicit and contextual

Names must be full and descriptive. Single-word names and abbreviations are not acceptable. The name must say what the value represents in _this_ context, not just what type it is.

```js
// Good
const matchedRule = configData.rules[ruleIndex]
const clickTarget = event.target
const parsedShadeNumber = parseInt(shadeString, 10)
const ruleCount = this.generatorConfig.rules.length
const rulesCountDisplay = this.querySelector('[data-rules-count]')

// Bad
const rule = configData.rules[ruleIndex]
const target = event.target
const shadeNum = parseInt(shadeString, 10)
const count = this.generatorConfig.rules.length
const el = this.querySelector('[data-rules-count]')
```

## Naming: booleans

All boolean variables use an `is*`, `has*`, `can*`, or `all*` prefix:

```js
const isEnabled = ruleData.enabled
const isNaN = Number.isNaN(parsedNumber)
const isLastSeparator = index === -1
```

## Naming: suffixes by type

Use consistent suffixes to encode the kind of value:

| Suffix     | Use for                       | Example                              |
| ---------- | ----------------------------- | ------------------------------------ |
| `*Count`   | numeric totals                | `ruleCount`, `answeredCount`         |
| `*Index`   | array positions               | `ruleIndex`, `activeQuestionIndex`   |
| `*Id`      | identifiers and timer handles | `ruleId`, `debounceTimerId`          |
| `*Element` | DOM elements                  | `inspectorElement`, `rulesContainer` |
| `*Input`   | form input elements           | `nameInput`, `shadeInput`            |
| `*Display` | read-only display elements    | `nameDisplay`, `rulesCountDisplay`   |
| `*Map`     | lookup objects keyed by value | `shadeMap`, `colorMap`               |
| `*Number`  | parsed numeric values         | `parsedShadeNumber`                  |

## Naming: methods — verb + object

Method names must follow the `verb + object` pattern. The object should be specific enough that the method name reads like a sentence:

```js
// Good
private refreshUtilityToggles() { ... }
private refreshShadeMap() { ... }
private openInspector(ruleId) { ... }
private closeInspector() { ... }
private bindInspectorDismiss() { ... }
private bindHtmlInput() { ... }
private transformAndRender() { ... }
private updatePreviewFrames(lightHtml, darkHtml) { ... }
private saveConfiguration() { ... }
function buildRuleListItem(ruleData, ruleIndex, callbacks) { ... }
function applyRules(utilityName, colorFamily, shadeNumber, tagName, configData) { ... }
function splitVariantPrefix(className) { ... }

// Bad
private refresh() { ... }
private open(id) { ... }
private bind() { ... }
private transform() { ... }
private save() { ... }
function build(data, index) { ... }
```

## Naming: constants

Static lookup objects/maps defined at module level use ALL_CAPS:

```js
const SHADE_MAP = { 100: 900, 200: 800, ... }
const COLOR_FAMILIES = ['red', 'orange', ...]
const DEBOUNCE_DELAY_MS = 300
const STORAGE_KEY = 'hyperui:dark-mode-generator'
```

## Destructuring: in callbacks and iterators

Destructure inline in `.map()`, `.find()`, `.filter()`, and `for...of` callbacks rather than accessing properties via the full object when only specific properties are needed:

```js
// Good
configData.rules.filter(({ id }) => id !== deletedRuleId)
ruleRecord.colors.filter((colorItem) => typeof colorItem === 'string')

for (const [shadeKey, shadeValue] of Object.entries(rawData)) { ... }
for (const [lightColor, darkColor] of Object.entries(configData.colorMap)) { ... }

// Bad
configData.rules.filter((rule) => rule.id !== deletedRuleId)
```

## Naming: loop and iterator variables

Loop variables must be contextually descriptive — no bare single-word names. Use a qualified compound noun or append `Item` when the bare noun would be too generic:

```js
// Good
for (const activeRule of configData.rules) { ... }
for (const [shadeKey, shadeValue] of Object.entries(configData.shadeMap)) { ... }
ruleRecord.utilities.filter((utilityItem) => typeof utilityItem === 'string')
colorsInput.value.split(',').map((rawEntry) => rawEntry.trim())

// Bad
for (const rule of configData.rules) { ... }
for (const [k, v] of Object.entries(configData.shadeMap)) { ... }
ruleRecord.utilities.filter((u) => typeof u === 'string')
colorsInput.value.split(',').map((e) => e.trim())
```

## Naming: callback parameters

Arrow function parameters in event listeners and DOM queries must be descriptive:

```js
// Good
document.addEventListener('pointerdown', (pointerEvent) => { ... })
nameInput.addEventListener('keydown', (keyEvent) => { ... })
this.querySelector<HTMLElement>('[data-rules]')!

// Bad
document.addEventListener('pointerdown', (e) => { ... })
nameInput.addEventListener('keydown', (e) => { ... })
```

---
title: Adding Text Shadow Support to Taiwind CSS
slug: text-shadow-with-tailwindcss
date: 26/03/2022
emoji: 👤
seo:
  title: How to Add Text Shadow Support to Taiwind CSS
  description: Text shadow support is one of the most requested features to be added in Tailwind CSS, but did you know it's easy to add it yourself?
---

## Why No Support? 🤷‍♂️

At the moment, there is no official support for `text-shadow` classes in Tailwind CSS and in fact in a recent tweet Adam Wathan, the creator of Tailwind CSS said this:

> What CSS feature that Tailwind doesn't have baked in do you find yourself getting the most irrationally angry about? Need ideas for v3.1 😅

> In before `text-shadow` — harder than it sounds, one day, I'm sorry 👀

[Tweet on Twitter](https://twitter.com/adamwathan/status/1507431966412611591?s=20&t=augWHUcu8eIqNRWNCAAn9Q)

It seems that the day we can write `text-shadow-xl` is a little off in the future so for now we can add it ourself.

## Adding Text Shadow

First thing to do is update the `tailwind.config.js` file with the following:

```js
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
```

### How Does it Work?

There's no magic here, it's all copied and pasted from the documentation and the updated for `text-shadow` classes.

[Tailwind CSS plugin documentation](https://tailwindcss.com/docs/plugins#adding-utilities)

The classes added are:

- `text-shadow`
- `text-shadow-sm`
- `text-shadow-lg`

All of these will appear in [Tailwind CSS IntelliSense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code).

In these classes we make use of `var(--tw-shadow-color)` which allows us to use `shadow-` classes from Tailwind CSS to color the text shadow.

Another feature is we can use arbitrary values such as `text-shadow-[0_4px_8px_#6366f1]`.

```html
<p class="text-shadow-lg shadow-indigo-500/50">Shadow</p>

<p class="text-shadow-[0_4px_8px_#6366f1]">Shadow</p>
```

You can [view the example](https://play.tailwindcss.com/wJi9jhaOyb) on the Tailwind CSS play sandbox.

And that's all there is to add `text-shadow` classes to Tailwind CSS in a way that supports shadow colors and arbitrary values.

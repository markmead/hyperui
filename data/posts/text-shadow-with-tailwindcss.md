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

[View tweet on Twitter](https://twitter.com/adamwathan/status/1507431966412611591?s=20&t=augWHUcu8eIqNRWNCAAn9Q)

The reason for this is justified, it's not the implementation that's difficult (as you will see), it's the execution.

> The hard part is choosing the default shadows to include. I've spent probably 20 hours on the problem so far and still haven't come up with a good way to approach it. What are all the problems they solve, how many sizes do we need, do they need to support colors, etc.

[View tweet on Twitter](https://twitter.com/adamwathan/status/1507433677927727104?s=20&t=NTtEa-65fs_7MWFxra0Icw)

What to do while we wait? Let's implement `text-shadow` classes ourselves.

## Adding Text Shadow Classes to Tailwind CSS

In your `tailwind.config.js` add the following:

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

And that's it. We can now write `text-shadow shadow-red-500` for example and have a beautiful red text shadow using Tailwind CSS.

There's no magic here, I followed the [adding plugins documenation](https://tailwindcss.com/docs/plugins#adding-utilities) and it worked a treat.

The classes that have been added are:

- `text-shadow`
- `text-shadow-sm`
- `text-shadow-lg`

But you can add as many as you like.

The classes that are added will appear in [Tailwind CSS IntelliSense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) when writing something like `text-sh` for example.

It's worth noting the use of `var(--tw-shadow-color)`.

This is important as it allows us to use Tailwind CSS `shadow-[color]` classes with the added `text-shadow` classes.

Something else to note is we have full access to JIT and can use arbitrary values such as; `text-shadow-[0_4px_8px_#6366f1]`.

Want to see more? You can view the [full example](https://play.tailwindcss.com/wJi9jhaOyb) on the Tailwind CSS play sandbox.

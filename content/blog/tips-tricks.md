---
title: Tips, Tricks and Experiments for Tailwind CSS
description:
  Tailwind CSS offers a wide array of options and there is much to learn. In
  this eBook, I aim to simplify the learning process by sharing useful tips and
  tricks that I've utilized since I started using Tailwind CSS over five years
  ago.
date: 03/07/2025
emoji: 📚
---

# {{ title }}

Updated: {{ date }}

{{ description }}

## Consolidate Repeated Classes into the Parent Element

**Tips & Tricks**

The recent addition of the `*` variant expands the possibilities of this
approach.

Consider the following example.

```html
<ul class="space-y-2">
  <li class="rounded border bg-white p-4 text-sm font-medium">Item A</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item B</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item C</li>
</ul>
```

The classes `font-medium text-sm` can be moved to the `<ul>` element (parent) as
they will cascade down to the child elements. However, this can't be done with
the classes `bg-white p-4 rounded border` as they will style the `<ul>` element
itself.

Therefore, the first step to remove repeated classes is to move the
`font-medium text-sm` classes to the `<ul>`. This alone is sufficient, but if
you want to go a step further, you can use the `*:` variant as follows:

```html
<ul class="space-y-2 text-sm font-medium *:rounded *:border *:bg-white *:p-4">
  <li>Item A</li>

  <li>Item B</li>

  <li>Item C</li>
</ul>
```

Personally, I prefer to style the parent to affect the child elements. Consider
using `flex gap-2` instead of adding `mr-2` to each child element. However, in
this example with the `*:`, it might be a bit excessive.

[https://play.tailwindcss.com/DK7cR3b7SV](https://play.tailwindcss.com/DK7cR3b7SV)

## Evenly Space Child Content with Flow Root

**Tips & Tricks**

Almost every frontend developer will face this challenge at some point. Imagine
a design of a list where each element, except the first, has a top border. You
need to create some spacing between the border lines, so you might consider the
following approach:

```html
<ul class="space-y-2 divide-y divide-gray-300">
  <li class="pt-2 text-sm font-medium">Item A</li>

  <li class="pt-2 text-sm font-medium">Item B</li>

  <li class="pt-2 text-sm font-medium">Item C</li>
</ul>
```

Great, you've completed it. However, there's an issue. You've added spacing,
`pt-2` in this case, to the first element. This creates unnecessary space
between that element and the one above it.

Check out this demo that highlights the extra space:
[https://play.tailwindcss.com/mx5pBHlxcQ](https://play.tailwindcss.com/mx5pBHlxcQ)

To avoid this, don't add the space to the first element. This can complicate the
markup because you now need to check for the first item and add a class if it's
not the first one. Although it's not overly complex, it is avoidable.

Step in, `flow-root`.

```html
<div class="flow-root">
  <ul class="-my-2 divide-y divide-gray-300">
    <li class="py-2 text-sm font-medium">Item A</li>

    <li class="py-2 text-sm font-medium">Item B</li>

    <li class="py-2 text-sm font-medium">Item C</li>
  </ul>
</div>
```

Although it requires a bit of extra markup, no additional logic is needed, and
all child elements can share the same classes. The result perfectly aligns with
our objectives.

[https://play.tailwindcss.com/9AwleOe645](https://play.tailwindcss.com/9AwleOe645)

Here are the two approaches compared side by side:
[https://play.tailwindcss.com/mWliTrI0Ya](https://play.tailwindcss.com/mWliTrI0Ya)

## Evenly Space Content from the Parent

**Tips & Tricks**

I often see Tailwind CSS developers writing code in this manner.

```html
<ul class="text-sm font-medium">
  <li class="mt-2 rounded border bg-white p-4">Item A</li>

  <li class="mt-2 rounded border bg-white p-4">Item B</li>

  <li class="mt-2 rounded border bg-white p-4">Item C</li>
</ul>
```

I believe the `space-y` and `space-x` classes are not being used due to a lack
of understanding. These classes are specifically designed for this purpose.
Rather than adding spacing, such as `mt-2`, to each child element, you can add
`space-y-2` to the parent element.

```html
<ul class="space-y-2 text-sm font-medium">
  <li class="rounded border bg-white p-4">Item A</li>

  <li class="rounded border bg-white p-4">Item B</li>

  <li class="rounded border bg-white p-4">Item C</li>
</ul>
```

Clearly, if each item requires custom spacing, don't rely on this. However, if
the spacing is even, definitely use the `space-y` and `space-x` classes. It's
important to note that if necessary, you can override the `space-y` classes per
item.

```html
<ul class="space-y-2 text-sm font-medium">
  <li class="rounded border bg-white p-4">Item A</li>

  <li class="rounded border bg-white p-4">Item B</li>

  <li class="!mt-4 rounded border bg-white p-4">Item C</li>
</ul>
```

In this instance, I've opted to use `mt-4` over the previously applied `mt-2`
from the `space-y-2` classes, by assigning importance to the `mt-4` classes. If
you're interested in seeing how this operates, feel free to check out the
following link:
[https://play.tailwindcss.com/88MYSj3FTn](https://play.tailwindcss.com/88MYSj3FTn)

## Overriding Classes with the Important Modifier

**Tips & Tricks**

In the last example, we demonstrated how to mark classes as `!important` in
Tailwind CSS. This is particularly useful when you need to override CSS from an
external library. Suppose you wanted to override classes from Bootstrap. If
you're considering transitioning from Bootstrap to Tailwind CSS, there's a more
efficient method.

Here's an example:
[https://play.tailwindcss.com/u2hXTRqdGO](https://play.tailwindcss.com/u2hXTRqdGO)

In this instance, the `bg-indigo-600` class isn't applied. However, we can
enforce its application by changing it to `!bg-indigo-600`. This modification
ensures that the button uses the Tailwind CSS color:
[https://play.tailwindcss.com/eUiXyGMqYY](https://play.tailwindcss.com/eUiXyGMqYY)

As illustrated in the previous example, you can also use the important modifier
to override other Tailwind CSS classes.

## Use `/` in Class Names for Fewer Class Names

**Tips & Tricks**

This may seem strange, but there are several CSS properties in Tailwind CSS that
allow you to add a `/` to the class name to apply a modifier.

```html
<p class="bg-red-500 bg-opacity-5 text-lg leading-relaxed">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis eum
  laboriosam ipsum eaque quidem accusamus maiores fugiat, asperiores aliquid
  delectus magni facere cumque aspernatur corrupti reiciendis vitae molestiae
  ipsam! Est!
</p>
```

Notice how `text-lg leading-relaxed` form one group and
`bg-red-500 bg-opacity-5` form another. This could be simplified.

```html
<p class="bg-red-500/5 text-lg/relaxed">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis eum
  laboriosam ipsum eaque quidem accusamus maiores fugiat, asperiores aliquid
  delectus magni facere cumque aspernatur corrupti reiciendis vitae molestiae
  ipsam! Est!
</p>
```

## Injecting Dynamic Values into Tailwind CSS Classes

**Tips & Tricks**

This method is particularly useful when designing a component that must support
diverse UIs. For instance, a grid may need to be three-wide at times and
two-wide at others, among other configurations.

Instead of creating separate components for each scenario or using complex
logic, you can define a variable in the `style` property and reference it in our
Tailwind CSS class.

```html
<ul
  class="grid grid-cols-[repeat(var(--grid-cols),_1fr)] gap-4"
  style="--grid-cols: 3"
>
  <li class="rounded border bg-white p-4 text-sm font-medium">Item A</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item B</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item C</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item D</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item E</li>

  <li class="rounded border bg-white p-4 text-sm font-medium">Item F</li>
</ul>
```

Here, we use the `--grid-cols` variable, set to 3, to create the following CSS:
`grid-template-columns: repeat(3, 1fr)`. You can use the same component with
`--grid-cols: 2` for a different layout.

This method is especially effective with frameworks like Vue or React, where you
can pass properties into a component.

```html
<template>
  <ul
    class="grid grid-cols-[repeat(var(--grid-cols),_1fr)] gap-4"
    :style="`--grid-cols: ${gridCols}`"
  >
    <li class="rounded border bg-white p-4 text-sm font-medium">Item A</li>

    <li class="rounded border bg-white p-4 text-sm font-medium">Item B</li>

    <li class="rounded border bg-white p-4 text-sm font-medium">Item C</li>

    <li class="rounded border bg-white p-4 text-sm font-medium">Item D</li>

    <li class="rounded border bg-white p-4 text-sm font-medium">Item E</li>

    <li class="rounded border bg-white p-4 text-sm font-medium">Item F</li>
  </ul>
</template>

<script setup>
  defineProps({
    gridCols: {
      type: Number,
      default: 3,
    },
  })
</script>
```

Here is an example of how to use it:

```html
<Grid :grid-cols="2" />

// Defaults to 3
<Grid />

<Grid :grid-cols="4" />
```

You can see it in action in the
[Create a Progress Bar with a Single HTML Element](https://www.hyperui.dev/blog/simple-progress-bar)
blog post.

## Animated Background Image in Text

**Experiments**

Our aim is to create something eye-catching, a deviation from the standard hero
sections typically seen on websites. Consequently, we're planning to present
large text with an animating background image. Please be aware, things might get
complex from here on out.

Below is the working code. Please note, it's likely too wide for the eBook
format.

```html
<div
  class="animate-sliding-background h-[400px] w-screen overflow-hidden text-center"
  style="background: url(https://images.unsplash.com/photo-1715273157640-b0c2a2bec178?q=80&w=2694&auto=format&fit=crop) no-repeat left / 120%"
>
  <h1
    class="bg-white text-[20vw]/[400px] font-black tracking-wider mix-blend-lighten [text-shadow:_1px_1px_#000,_2px_2px_#000,_3px_3px_#000,_4px_4px_#000,_5px_5px_#000,_6px_6px_#000,_7px_7px_#000,_8px_8px_#000,_9px_9px_#000,_10px_10px_#000,_11px_11px_#000,_12px_12px_#000,_13px_13px_#000,_14px_14px_#000,_15px_15px_#000] before:absolute before:-ml-px before:-mt-px before:text-white before:content-['My_Title']"
  >
    My Title
  </h1>
</div>
```

To understand its functionality, viewing the example linked below is
recommended. Here's a brief explanation:

- A new animation `animate-sliding-background`, visible in the "Config" tab of
  the linked example, is introduced.
- A `style` tag with a `background` property has been added, including the URL,
  repeat rule, position, and size.

<Callout>
  👋 Note: We couldn't use `bg-[url(...)]` since it creates the `background-image` property, but we
  need the `background` property.
</Callout>

- The `mix-blend-lighten` is utilized to hide our black shadows on the white
  background.
- Text-shadow, which isn't available in Tailwind CSS (we'll discuss how to add
  it later), has been added, along with an incrementing black shadow from 1 to
  15px.
- A `::before` that has the same content as the `<h1>` is present.

The result is this eye-catching effect:
[https://play.tailwindcss.com/ADGV9g21AV?layout=horizontal](https://play.tailwindcss.com/ADGV9g21AV?layout=horizontal)

You can adjust this effect to your preference.

## Using Tailwind CSS with Bootstrap

**Tips & Tricks**

While it's not the recommended approach, sometimes migrating from Bootstrap to
Tailwind CSS without completely removing Bootstrap is unavoidable.

To manage this, you can set a prefix for Tailwind CSS classes in the
configuration.

```js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  prefix: 'tw-',
  plugins: [],
}
```

This means that every Tailwind CSS class will now start with `tw-`. For example,
instead of using `flex`, you would use `tw-flex`. If you attempt to use a
Tailwind CSS class without the `tw-` prefix, it will not work.

Take a look at the following link:
[https://play.tailwindcss.com/BpcPhFsm4I](https://play.tailwindcss.com/BpcPhFsm4I).
Notice how the wrapper classes `min-h-screen bg-slate-50 p-6` are not applied,
but all the classes starting with `tw-` are.

You can customize this prefix as you wish. For instance, you could use
`sore-throat-flex`.

## Multi Line Text Underline Hover Effect

**Experiments**

This is a neat effect that's simple to add to Tailwind CSS. Here's the code.
However, it might be cut off due to its wide layout.

```html
<h1 class="group text-5xl/relaxed font-black">
  <span
    class="bg-[linear-gradient(transparent_calc(65%_-_5px),_var(--tw-gradient-to)_5px)] to-indigo-300 bg-[length:_0] bg-no-repeat transition-[background-size] duration-1000 group-hover:bg-[length:_100%]"
  >
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique ea
    inventore magni ipsa vel quo cumque maiores ratione explicabo est?
  </span>
</h1>
```

We're using a background gradient to create a thick underline that underlays the
text. This can be adjusted by modifying the values. For a more underline-like
effect, you could use.

```
bg-[linear-gradient(transparent_calc(100%_-_5px),_var(--tw-gradient-to)_5px)]
```

This results in a `5px` underline that partially underlays the text.

The size of this background is set to `0`, and when the `<h1>` is hovered over,
we set this value to `100%`. You can view the demo at this link:
[https://play.tailwindcss.com/fIMoR7iPQC](https://play.tailwindcss.com/fIMoR7iPQC)

### Strike-through?

That's simple. Just change the `bg-[linear-gradient...]` class as follows. As
always, adjust the values according to your needs:
[https://play.tailwindcss.com/RxQkY31g97](https://play.tailwindcss.com/RxQkY31g97)

## Sort Items with Tailwind CSS

**Experiments**

Let's give this a try. Here is the full example:
[https://play.tailwindcss.com/BgHml3qAAP](https://play.tailwindcss.com/BgHml3qAAP)

This involves the HTML structure and the `peer` classes. Ensure that the radio
buttons are on the same level as the list wrapper, in this case, a `<ul>`. They
should also have a `peer` class. For this example, they'll be `peer/a` and
`peer/b`.

Next, add `data-group="a"` or `data-group="b"` to the child elements in the
list. After that, target the elements based on their `data-group` and move them
to the top of the list using the `order-first` class. Here's how this class
appears in Tailwind CSS.

```
peer-checked/a:[&_[data-group=a]]:order-first peer-checked/b:[&_[data-group=b]]:order-first
```

Indeed, the most complex part is now completed for you. As mentioned, it's all
about the HTML structure and ensuring that you are using named `peer` classes.

You can also modify the list from `flex flex-col` to `grid grid-cols-3`, for
instance. The `order` CSS property will function for both.

## Remove Number Input Spinners

**Tips & Tricks**

While spinners in the number input are standard, they can make the UI look
outdated. To address this, we can remove them in a clean and reusable way by
adding a new class to Tailwind CSS.

```css
@layer components {
  .no-spinner {
    -moz-appearance: textfield;
  }

  .no-spinner::-webkit-outer-spin-button,
  .no-spinner::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
}
```

This will allow us to use `no-spinner` as a class in our HTML and it will also
be suggested in
[Tailwind CSS Intellisense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code).

## Avoid Using Container

**Tips & Tricks**

The `container` class in Tailwind CSS, much like its Bootstrap counterpart,
creates a responsive experience when adjusting the viewport size.

However, using the `max-w` class instead can result in a smoother, more fluid
resizing process.

Check out this example for a hands-on experience:
[https://play.tailwindcss.com/nqoB23bqkJ?layout=horizontal&size=2018x720](https://play.tailwindcss.com/nqoB23bqkJ?layout=horizontal&size=2018x720)

Try resizing the viewport. You’ll notice that the `container` class provides a
responsive experience, switching between different max-width values. Meanwhile,
the `max-w-screen-2xl` class reaches its limit on large screens but offers a
smoother resizing experience.

Remember, there's no absolute right or wrong. If you prefer using the
`container` class, go ahead.

## Text with a Background Gradient

**Experiments**

This is a neat effect that several websites use, and it's quite simple to
implement, especially with Tailwind CSS.

You only need the following classes.

```html
<h1 class="bg-clip-text text-transparent">My Title</h1>
```

Afterwards, you can add a gradient of your choice:
[https://play.tailwindcss.com/z7TZBhP3HD?layout=horizontal](https://play.tailwindcss.com/z7TZBhP3HD?layout=horizontal)

Keep an eye on line-height. Depending on your font, you may need to increase it
beyond the usual requirement. This is not a major issue, and it often works well
with something like `leading-tight`.

## Adding Text Shadow Support

**Experiments**

At present, Tailwind CSS lacks a built-in implementation for `text-shadow`.
However, adding it is straightforward, and it can even support arbitrary values.

You can use JIT to add non-Tailwind CSS properties by enclosing them in square
brackets. Doing so creates the desired text-shadow effect.

```html
[text-shadow:_0_4px_8px_var(--tw-shadow-color)]
```

We are creating a text-shadow here and using a CSS variable, which can be seen
with a shadow color class like `shadow-red-500`. Tailwind CSS includes built-in
shadow color classes.

Naturally, you wouldn't want to write this every time. Also, consider a
situation where you have five different shadow styles and you need to adjust the
blur on one of them in the future. It would be cumbersome to update numerous
`[text-shadow:...]` and you might even miss some.

So, let’s add a new plugin to Tailwind CSS which is very straightforwad as the
functionality of adding a plugin is already built into Tailwind CSS.

Here’s how our config looks.

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

We're adding support for `text-shadow` classes and initializing some values from
our `textShadow` object within the `extend` object. You can add as many as you
want. I've chosen the following class names:

- `text-shadow` (DEFAULT in the object)
- `text-shadow-sm`
- `text-shadow-lg`

These classes will also be integrated into
[Tailwind CSS Intellisense](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code).

To see the configuration and examples, or to try adding your own `text-shadow`
classes, explore this environment:
[https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code)

## Adding a “Skip to Main Content” Button

**Tips & Tricks**

A commonly overlooked feature when building a website is the accessibility
functionality "Skip to main content." This allows keyboard-only users to jump
directly to the main content of the page, avoiding the header, which typically
contains numerous links they would otherwise have to tab through.

The example will most likely be cut off in the PDF. However, I’ve since added
this to HyperUI and will link to the pull request:
[https://github.com/markmead/hyperui/pull/467](https://github.com/markmead/hyperui/pull/467)

```html
<body class="scroll-smooth">
  <a
    href="#mainContent"
    class="absolute left-1/2 z-50 -translate-x-1/2 -translate-y-full bg-black px-5 py-3 text-white transition-transform focus:translate-y-0"
  >
    Skip to Main Content
  </a>

  <main id="mainContent">
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim aliquid
      <a href="#" class="underline"> quae dolorem</a> repudiandae voluptatum
      molestiae nam esse, eligendi cumque
      <a href="#" class="underline">repellat facere vero</a> culpa neque
      doloribus natus. Distinctio, animi! Ut, quaerat!
    </p>
  </main>
</body>
```

As illustrated, I've added `scroll-smooth` to the body to smooth out the
scrolling to the content. However, this step is entirely optional.

## Adding a Shadow to a PNG Image

**Tips & Tricks**

We can apply a shadow to an image using the CSS filter effect `drop-shadow`. It
is widely supported, as indicated on
[https://caniuse.com/?search=drop-shadow](https://caniuse.com/?search=drop-shadow).
If support is lacking, the shadow simply won't render.

This example demonstrates the difference between `drop-shadow` and `box-shadow`.
As you can observe, when applied to a PNG image, `drop-shadow` produces the
desired effect. You can view the demonstration here:
[https://play.tailwindcss.com/Fs0uiRy1JV](https://play.tailwindcss.com/Fs0uiRy1JV).

### Changing the Colour

At present, classes like `shadow-red-500` are not operational. However, using
JIT, we can enable this feature, albeit it requires writing out the full drop
shadow class. Perhaps in the future, shadow color classes will be supported.

```bash
shadow-red-500 drop-shadow-[0_35px_35px_var(--tw-shadow-color)]
```

This will create a large, red drop shadow around the image. Consider applying it
to the example provided above.

### Image as the Shadow

Another approach is to use the image as a shadow. This method requires extra
markup since the image needs to be duplicated, but it creates an impressive
effect:
[https://play.tailwindcss.com/omKX48IkHm](https://play.tailwindcss.com/omKX48IkHm)

## Text Stroke and Comic Book Shadow Effects

**Experiments**

Here's a screenshot of our end goal. Initially, we'll use JIT, then refine this
by integrating some Tailwind CSS plugins to streamline the code.

<Callout>
  👋 Please be aware that we're utilizing CSS features not fully supported across all platforms. For
  your reference, further information can be found at
  [https://caniuse.com/?search=text-stroke](https://caniuse.com/?search=text-stroke).
</Callout>

![](Screenshot_2024-05-22_at_09.23.01.png)

As you can see, we have several effects here:

- Text stroke with offset shadow and transparent text
- Text stroke with offset shadow and filled text
- Text stroke with offset shadow and a halftone effect
- Text stroke with offset colored shadow and a halftone effect

### With JIT

Consider the following example that uses JIT:
[https://play.tailwindcss.com/wr9ULVU1vX](https://play.tailwindcss.com/wr9ULVU1vX).
Let's dissect the key components of how it operates:

- `[-webkit-text-fill-color:_<color>]`

We use this to set the text color, along with `text-black`, as shown in the
examples. This is done to ensure that if a user is on a browser that doesn't
support `text-stroke`, it will revert to `text-black`. If we use `text-white` or
`text-transparent` there's a risk of the text becoming invisible on unsupported
browsers.

- `[-webkit-text-stroke:_2px_#000]`

This sets the stroke width and color using shorthand syntax. Previously, you
would have needed to set the stroke width and color in separate rules.

- `[text-shadow:_8px_8px_0_var(--tw-shadow-color)]`

We've previously discussed text shadow in this eBook. If you'd like to move
forward, you can incorporate it into your Tailwind CSS configuration based on
the previous example.

### With Plugins

No installation is required as we will add plugins directly into Tailwind CSS.
For example, refer to the "Config" tab in the following link:
[https://play.tailwindcss.com/fvjxvuiQDZ](https://play.tailwindcss.com/fvjxvuiQDZ).
Let's break it down:

- `text-stroke-2 ring-black`

We've introduced the `text-stroke` classes that inherit sizing from the
`ringWidth` group. You can view these values by typing `text-stroke` in the
provided example. As these are part of the configuration, they will be suggested
as a class.

We're also utilizing `ring-<color>` classes to define the stroke color as we can
use the variable it sets on the element. While this method provides access to
the full range of Tailwind CSS color classes, it might be considered excessive
if you only use a few stroke colors. Additionally, the use of `ring-<color>`
classes could lead to confusion, as they're typically used for focus effects. An
alternative approach will be outlined at the end of this section.

```js
const plugin = require('tailwindcss/plugin')

plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			'text-stroke': (value) => ({
			  '-webkit-text-stroke': `${value} var(--tw-ring-color)`,
		  }),
		},
		{ values: theme('ringWidth') },
	)
}),
```

- `text-fill-<color>`

We're introducing a new class `text-fill-<color>`, which is a specific class
that we could use for stroke color, instead of using `ring-<color>` classes. For
the plugin part, we're using the same approach as before, but we're referring to
the newly created CSS key/value pairs in the `textFillColor` property.

```js
const plugin = require('tailwindcss/plugin')

// Adding the values
theme: {
	extend: {
	  textFillColor: (theme) => ({
	    black: theme('colors.black'),
	    white: theme('colors.white'),
	    transparent: theme('colors.transparent'),
	  }),
	},
},

// Adding the plugin
plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
	  {
	    'text-fill': (value) => ({
	      '-webkit-text-fill-color': value,
	    }),
	  },
	  { values: theme('textFillColor') },
	)
}),
```

- `shadow-indigo-500 text-shadow`

Earlier in this eBook, we discussed how to add text shadows. You can find this
information by searching for "Adding Text Shadow Support".

**Avoid Using Ring Classes for Color**

This method is demonstrated in the example at
[https://play.tailwindcss.com/27TyBHLffF](https://play.tailwindcss.com/27TyBHLffF).
In brief, we're adding colors to the `text-stroke` class, based on the colors
we've added for the `text-fill-<color>` classes. As a result, we can now use
`text-stroke-2 text-stroke-black`. On reflection, this is a preferable approach
that I plan to use in the future.

This means we're no longer using the shorthand syntax to add a text stroke.

```js
const plugin = require('tailwindcss/plugin')

plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-stroke': (value) => ({
        '-webkit-text-stroke-width': value,
      }),
    },
    { values: theme('ringWidth') },
  )
}),
plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-stroke': (value) => ({
        '-webkit-text-stroke-color': value,
      }),
    },
    { values: theme('textFillColor') },
  )
}),
```

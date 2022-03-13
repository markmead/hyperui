---
title: Custom Gradients with JIT in Tailwind CSS (No Custom CSS)
slug: custom-gradients-with-tailwindcss-jit
date: 07/03/2022
emoji: 🎨
seo:
  title: How to Create Custom Gradients in Tailwind CSS with JIT
  description: Tailwind CSS v3 meant JIT become the standard, learn how to use JIT to create custom gradients in Tailwind CSS without any custom CSS.
---

## What is JIT?

Since v3, JIT has been the default in Tailwind CSS and has bought a lot of power to the framework. One of the best additions are [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values), these allow you to replace custom CSS with Tailwind CSS like classes.

### Without Tailwind CSS JIT

```
<div class="absolute p-4 floating-alert">
  Hello World! 👋
</div>

<style>
  .floating-alert {
    bottom: 5px;
    right: 5px;
  }
</style>
```

### With Tailwind CSS JIT

```
<div class="absolute p-4 bottom-[5px] right-[5px]">
  Hello World! 👋
</div>
```

The benefit here is keeping everything within the HTML, this means:

- Less switching between files
- No need to update Tailwind CSS config
- Easily use Tailwind CSS breakpoints `top-[2px] sm:top-[3px] lg:top-[5px]`

## Creating Gradients with Tailwind CSS JIT

If you are using these gradients more than once, it's worth adding them to the Tailwind CSS config.

The syntax for creating a gradient looks confusing, but it's easy to understand once you realise that spaces are replaced with underscores. Take the following example:

```
<div class="bg-[linear-gradient(180deg,_#005BBB_49.9%,_#FFD500_50%)]"></div>
```

In CSS this would be:

```
background-image: linear-gradient(180deg, #005BBB 49.9%, #FFD500 50%);
```

The underscores after commas are personal choice, I leave them in for readability but you can remove them.

Here's a [preview of the example](https://play.tailwindcss.com/0Q0oaPLA4I) create in Tailwind CSS play sandbox.

Let's try something a little tougher.

## Conic Gradients in Tailwind CSS with JIT

For this I've used [Hypercolor](https://hypercolor.dev) to find a `conic-gradient` for the example.

![](/posts/conic-gradient-example.jpeg)

Here's the code written to replicate the example:

```
<div class="bg-[conic-gradient(at_left_center,_#eab308,_#a855f7,_#3b82f6)]"></div>
```

Which results in the follow CSS:

```
background-image: conic-gradient(at left center, #eab308, #a855f7, #3b82f6);
```

## Radial Gradients in Tailwind CSS with JIT

Once again I'm using [Hypercolor](https://hypercolor.dev) to find a `radial-gradient` for the example.

![](/posts/radial-gradient-example.jpeg)

Here's the code written to replicate the example:

```
<div class="bg-[radial-gradient(at_center_bottom,_#fde68a,_#7c3aed,_#0c4a6e)]"></div>
```

Which results in the follow CSS:

```
background-image: radial-gradient(at center bottom, #fde68a, #7c3aed, #0c4a6e);
```

And that's all it takes to add custom gradients, even styles that don't exist in Tailwind CSS to Tailwind CSS with JIT. Checkout [Hypercolor](https://hypercolor.dev) for more gradients including; mesh gradients, grainy gradients and a gradient generator.

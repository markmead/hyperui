# HyperUI

HyperUI is a free, open source Tailwind CSS component library.

## How Does it Work?

Search through the website for a component you like, when you find one you can view it at the following breakpoints:

- 340px
- 640px
- 768px
- 1024px
- 1348px

If it does the job you have the following options:

**Copy Code**

Copy the HTML to your clipboard ready to be pasted wherever you need it.

**View Code**

View the HTML and check if there any Tailwind CSS plugins, CSS or JavaScript required for it to work as it is displayed.

**Save Component**

Don't need the component now? Save it and come back to it later - [https://hyperui.dev/saved](https://hyperui.dev/saved)

## Contributing

### Setup

1. Clone Repo
2. Run `yarn`
3. Run `yarn dev`
4. Run `yarn css -w`

Step 4 is optional, but if you find your new components missing Tailwind CSS classes then you'll need to run `yarn css -w`.

### Adding Components

All components and collections are stored in `/public/components/[collection]/[component]`.

**Adding to Existing Collection**

Let's say you've created a new footer component.

Create a new file in `/public/components/footers/` called `10.html` (or whatever the next number is).

You'll then need to add the new component to the footer collection.

Head to `/lib/components.ts` and search for "footers". You should see something that looks like:

```js
export const footers = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
]
```

Here you can add your new component like so:

```js
export const footers = [
  { id: 1 },
  // ...
  { id: 9 },
  { id: 10 }, // New component
]
```

If needed, you can override the default spacing for the collection:

```js
export const footers = [
  { id: 1 },
  // ...
  { id: 9 },
  { id: 10, spacing: 'max-w-3xl mx-auto' }, // New component
]
```

**Adding a New Collection**

If you want to add a new component and a new collection then follow the steps above but add the new collection folder to `/public/components` first.

Let's say you've created a new checkout component, first you'd need a checkout collection.

Create `/public/components/checkouts/1.html`.

You'll then want to add the component to `/lib/components.ts`.

```js
export const checkouts = [{ id: 1 }]
```

Then add the new collection to the `collections` array in `/lib/collections.ts`.

First, import the `checkouts` array that you just created:

_This is done at the top of the file_

```js
import {
  alerts,
  // ...
  reviews,
  checkouts,
} from './components'
```

Then you can add the new collection like this:

```js
{
  id: 'checkouts',
  title: 'Checkouts',
  components: checkouts,
  count: checkouts.length,
  emoji: '💸',
  spacing: '', // Optional
  ecommerce: '', // Optional
},
```

And that's it, nice and simple!

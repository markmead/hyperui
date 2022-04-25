![image](https://user-images.githubusercontent.com/50486078/165143091-fa908559-33ac-4488-a05c-a2951a67bdb7.png)

# HyperUI

HyperUI is a free, open source Tailwind CSS component library.

## How Does it Work?

Search through the website for components, view the preview, the source code and copy the HTML to your clipboard.

## Contributing

### Setup

1. Clone Repo
2. Run `yarn`
3. Run `yarn dev`
4. Run `yarn watch`

### Adding Components

All components and collections are stored in `/public/components/[collection]/[id]`.

**Adding to Existing Collection**

Let's say you've created a new footer component.

Create a new file in `/public/components/footers/` called `10.html`.

Then add the new component to the footer collection.

Head to `/data/components/footers.mdx`, here you will see the markdown for `/components/footers` as well as the frontmatter.

```md
---
title: Footers
emoji: ⚽️
seo:
  title: Footer Components
  description: Footer components created with Tailwind CSS
components:
  1:
    title: Large with Newsletter Form
  2:
    title: Simple Stacked
  3:
    title: Simple Row
  4:
    title: Call to Action with Gradient
  5:
    title: Split with Company Info, Links and Image
  6:
    title: Simple with Service Status
  7:
    title: Centered with Social Links as Priority
  8:
    title: Split with Company Info, Links and Call to Action
---

Content...
```

You can add your new component like this:

```md
---
components:
  1:
    title: Large with Newsletter Form
  10:
    title: [Description]
    spacing [Adjustments] // Optional
---
```

**Adding a New Collection**

If you want to add a new collection then follow the steps above but add the new collection folder to `/public/components` first.

Let's say you've created a new checkout component, first you'd need a checkout collection.

Create `/public/components/checkouts/1.html`.

You'll then want to create a `/data/components/checkouts.mdx` file. (Just duplicate an existing file and rename it)

Update the content to represent the new collection and add your new components.

And that's it, nice and simple!

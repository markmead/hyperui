---
title: What's New in HyperUI? Biggest Update Yet!
slug: whats-new-in-hyperui
date: 03/13/2022
emoji: 👌
seo:
  title: What's New in HyperUI?
  description: Find out what's new in HyperUI as the project goes through its biggest update to date, featuring an easier process for contributors.
---

## What is HyperUI?

HyperUI is a collection of free Tailwind CSS components that are open source.

## HyperUI v2

The new version of HyperUI loads faster, is friendlier for developers that want to contribute and now has a great base to build from in 2022.

### File Management

#### Goodbye JavaScript

It's worth understanding how HyperUI created pages such as `/components/footers` before the update. This was managed through JavaScript arrays and helper functions that I'd use with `getStaticProps`. Here is how that looked:

```
export async function getStaticProps({ params: { id } }: Params) {
  const collection = currentCollection(id)
  const components = currentCollectionComponents(id)

  return {
    props: {
      collection,
      components,
    },
  }
}
```

You can view how this code works in [/lib/collections.ts](https://github.com/markmead/hyperui/blob/464b9670faeb7aa0d4bba79e39a1cc3a6a70cdb8/lib/collections.ts).

This is taking in the `id` from the URL, for example `footers` and finding the `footers` object in the collections array, it then gets the collection data and components which are then used for rendering.

This works fine but if I wanted to add specific content to `/components/footers` I'd need to update multiple files. Therefore, this is not friendly for contributors and has a massive drawback in that you can't update collections individually.

Here is a preview of how the collections and components array would look:

**Collections**

```
[
  {
    name: 'Alerts',
    id: 'alerts',
    emoji: '🚨',
    spacing: 'max-w-sm mx-auto p-8',
    count: alertComponents.length,
    components: alertComponents,
  }
]
```

[View the full file](https://github.com/markmead/hyperui/blob/464b9670faeb7aa0d4bba79e39a1cc3a6a70cdb8/lib/collections.ts).

**Alerts Component**

```
[
  { id: 1, title: 'Simple' },
  { id: 2, title: 'With Close' },
  ...
  { id: 7, title: 'With Description', spacing: 'max-w-lg mx-auto p-8' }
]
```

[View the full file](https://github.com/markmead/hyperui/blob/464b9670faeb7aa0d4bba79e39a1cc3a6a70cdb8/lib/components.ts).

#### Hello Markdown

I knew I wanted to use markdown and specifically MDX after using [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) on the [HyperJS website](https://www.hyperjs.dev/).

The rebuild needed to replicate what was currently working on HyperUI, therefore the checklist would be:

- Manage Collection
- Manage Components
- Collection Spacing
- Component Spacing

And the new features I wanted are:

- Manage SEO Content
- Isolated Content

If you take a look at the [data/components folder](https://github.com/markmead/hyperui/tree/main/data/components) you will notice each collection has their own MDX file. This instantly ticks "Isolated Content" off the checklist.

The rest of the checklist can be handled with frontmatter. If you're not sure what frontmatter is, it's key/value pairs within a YAML block. As HyperUI used JavaScript objects for collections, all of the data was in key/value pairs already.

Here's how the MDX file looked with the collection, components and SEO data:

```
---
title: Announcements
emoji: 📣
spacing: flex flex-col gap-4
seo:
  title: Announcement Components
  description: Announcement components created with Tailwind CSS
components:
  1:
    title: Simple
  2:
    title: With Icon
  3:
    title: Floating with Close
    spacing: relative
  4:
    title: With Slider
---

# Announcement Components

<List items={examples} name={name} spacing={spacing} />
```

This has now ticked everything off the checklist as it's taken the old collection object writting JavaScript and converted it to frontmatter.

### Collection Content

Thanks to the `.prose` class from Tailwind CSS, the process of adding content has been streamlined. The days of adding content to JavaScript files and conditionally rendering the content are in the past, now all I have to do is write markdown.

### Speed, Speed and Speed

It's no secret to me that HyperUI needed a performance rework and in HyperUI v2 I'm pleased to say there has been some massive improvements.

All of these changes has seen results of HyperUI loading **5-8x faster** and now has **100/100** Lighthouse scrores across the board.

#### Component Loading

For reference, HyperUI loads components by using `fetch` to grab the HTML from `/components/[collection]/[id].html` and then render the response in an `<iframe>`.

For example, if you went to `/components/alerts` HyperUI would do the following:

```
fetch('/components/alerts/1.html')
fetch('/components/alerts/2.html')
...
fetch('/components/alerts/7.html')
```

And this would all happen on page load. Not great, right? Especially when you consider some collections have 10+ components.

Fixing this was something I've tried in the past but for some reason I could not get `intersectionObserver` to play nice. Enter [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer).

How does it work now?

You land on `/components/alerts` and the first component loads `fetch('/components/alerts/1.html')`. Start scrolling and as components enter the viewport another `fetch` is fired off for that component.

When I saw this working I was beyond thrilled! I ran a test and pages were loading 5-8x faster. It's a testament to [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) that it worked this well out of the box, I only changed one setting and that was to stop `fetch` being re-called when scrolling back up.

#### Less Renders

If you're wondering how HyperUI passes the CSS to these components it's quite simple.

When the component HTML is fetched it adds in:

```
<head>
  <link rel="stylesheet" href="/build.css">
</head>
```

Currently, `/build.css` is a tiny file and doesn't have too much of an impact on the performance. However, one thing I noticed was `/build.css` being loaded in each time you toggled back to the preview of the component from the source code.

This was happening because the component was being re-rendered as it was wrapped in:

```
{view ? <Preview /> : <Code />}
```

I've changed this now to use CSS class names to toggle between the preview and the source code, this results in `/build.css` not being re-loaded.

#### Bug Fixes

During the rebuild I noticed that components were loaded multiple times.

For example, `/components/alerts` has 7 components but there were times that 14/21 requests were sent. This was an issue for speed and one that I'm surprised didn't show up earlier, although it might have been created in the rebuild process.

This was fixed by adding `[id]` to the `useEffect` hook that was fetching the component data. Small change, but has resulted in a big improvement.

#### Limit Passed Data

As I was updating HyperUI I noticed there was a few cases of unnecessary data being passed via props. The biggest culprit was the collection cards.

In the past these would recieved the entire collection object as a prop, however, with the new update to HyperUI you specify what attributes you want back and only they will be returned, therefore limiting the data that is passed around.

Currently that filtering is an optional parameter on the helper function, in the future I'll be making it required.

### UI Updates

You'll notice a few changes to the UI, these are quite minimal:

- Loading Indicator for Components
- Improved Collection Page
- Improved Mobile Menu
- New Component Card
- Removed Search (will return with a better UI)
- Removed Favourites (wasn't used)
- Removed Breadcrumb

### General Updates

There were a few updates that happened during the build that weren't related to the build:

- Improve Typescript Checking
  - More Interfaces
  - More Type Checks
- Improve SEO
- Removed Unused Packages

And that's all I can remember. There was so much to this update and it's given HyperUI a fantastic base to build on for 2022. I've already added a few components to HyperUI after the rebuild went live and I can confirm the process has improved greatly.

I can't wait to see how far HyperUI can go in 2022.

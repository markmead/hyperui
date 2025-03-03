<script setup lang="ts">
useHead({
  titleTemplate: '%s | HyperUI',
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr',
    class: 'scroll-pt-20 scroll-smooth',
  },
  bodyAttrs: {
    class: 'font-sans antialiased',
  },
})

// prettier-ignore
useSeoMeta({
  title: 'Free Open Source Tailwind CSS v4 Components',
  description: 'Discover free Tailwind CSS v4 components for your next project, designed to enhance your web development with the latest features and styles.',
  ogTitle: 'Free Open Source Tailwind CSS v4 Components',
  ogDescription: 'Discover free Tailwind CSS v4 components for your next project, designed to enhance your web development with the latest features and styles.',
  ogImage: 'https://www.hyperui.dev/og.jpg',
  ogSiteName: 'HyperUI',
  ogUrl: 'https://www.hyperui.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Free Open Source Tailwind CSS v4 Components',
  twitterDescription: 'Discover free Tailwind CSS v4 components for your next project, designed to enhance your web development with the latest features and styles.',
  twitterImage: 'https://www.hyperui.dev/og.jpg',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: filter 0.2s, opacity 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(16px);
}
</style>

<script setup lang="ts">
const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('blog')
    .select('path', 'title', 'emoji', 'date', 'tag')
    .all()
})

const items = computed(() => {
  return posts.value.sort(
    (postA, postB) => new Date(postB.date) - new Date(postA.date)
  )
})

// prettier-ignore
useSeoMeta({
  title: 'Tailwind CSS Blog',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  ogTitle: 'Tailwind CSS Blog',
  ogDescription: 'Tips and tricks for using Tailwind CSS in your projects.',
  twitterTitle: 'Tailwind CSS Blog',
  twitterDescription: 'Tips and tricks for using Tailwind CSS in your projects.',
})
</script>

<template>
  <div>
    <PageBanner title="Blog" subtitle="Tailwind CSS Blog with Tips and Tricks">
      Learn Tailwind CSS tips and tricks that you can use in your work to help
      write cleaner, more maintainable code and help you be more productive.
    </PageBanner>

    <PageContainer class="pb-8 lg:pb-12">
      <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="post in items" :key="post.path" :post="post" />
      </ul>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

const schema = computed(() => {
  if (!page.value) {
    return {}
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.hyperui.dev${page.value.path}`,
    },
    headline: page.value.title,
    author: {
      '@type': 'Organization',
      name: 'HyperUI',
    },
    datePublished: page.value.date,
    dateModified: page.value.date,
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema.value),
    },
  ],
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  twitterTitle: page.value?.title,
  twitterDescription: page.value?.description,
})
</script>

<template>
  <PageContainer class="py-8 lg:py-12">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="mx-auto prose prose-a:in-[h2]:font-bold prose-a:in-[h2]:no-underline"
    />

    <div v-else class="prose">
      <h1>Page Not Found</h1>

      <p>Oops! The content you're looking for doesn't exist.</p>

      <NuxtLink to="/"> Go back home </NuxtLink>
    </div>
  </PageContainer>
</template>

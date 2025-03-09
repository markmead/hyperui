<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('about').path(route.path).first()
})

const schema = computed(() => {
  if (!page.value || !page?.value?.faqs) {
    return {}
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': page.value?.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
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

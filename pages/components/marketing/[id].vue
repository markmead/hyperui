<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('marketing').path(route.path).first()
})

useSeoMeta({
  title: `${page.value?.title} Components`,
  description: page.value?.description,
  ogTitle: `${page.value?.title} Components`,
  ogDescription: page.value?.description,
  twitterTitle: `${page.value?.title} Components`,
  twitterDescription: page.value?.description,
})
</script>

<template>
  <PageContainer class="py-8 lg:py-12">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="mx-auto prose max-w-none prose-ul:list-none prose-ul:p-0 prose-li:p-0 prose-p:max-w-prose prose-p:text-pretty"
    />

    <div v-else class="prose">
      <h1>Page Not Found</h1>

      <p>Oops! The content you're looking for doesn't exist.</p>

      <NuxtLink to="/"> Go back home </NuxtLink>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('components').path(route.path).first()
})

const { data: components } = await useAsyncData(
  `/application/${route.path}`,
  () => {
    return queryCollection('application')
      .select('path', 'title', 'tag', 'emoji', 'components')
      .all()
  }
)

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
  <div v-if="page">
    <PageBanner :title="page.title" :subtitle="page.subtitle">
      {{ page.description }}
    </PageBanner>

    <PageContainer class="pb-8 lg:pb-12">
      <ContentRenderer :value="page" class="mx-auto prose" />

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ComponentCard
          v-for="component in components"
          :key="component.path"
          :component="component"
        />
      </ul>
    </PageContainer>
  </div>

  <PageContainer v-else class="py-8 lg:py-12">
    <div class="prose">
      <h1>Page Not Found</h1>

      <p>Oops! The content you're looking for doesn't exist.</p>

      <NuxtLink to="/"> Go back home </NuxtLink>
    </div>
  </PageContainer>
</template>

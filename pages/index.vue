<script setup lang="ts">
const { data: application } = await useAsyncData('/application', () => {
  return queryCollection('application')
    .select('path', 'title', 'tag', 'emoji', 'components')
    .all()
})

const { data: marketing } = await useAsyncData('/marketing', () => {
  return queryCollection('marketing')
    .select('path', 'title', 'tag', 'emoji', 'components')
    .all()
})
</script>

<template>
  <div>
    <PageBanner
      title="HyperUI"
      subtitle="Free Open Source Tailwind CSS v4 Components"
    >
      Discover 350+ free Tailwind CSS v4 components for building responsive
      marketing websites, admin dashboards, and eCommerce stores. HyperUI
      provides ready-to-use UI elements optimized for modern web development
      with zero dependencies.
    </PageBanner>

    <PageContainer class="py-8 lg:py-12 space-y-8">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
          Application
        </h2>

        <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
          <ComponentCard
            v-for="component in application"
            :key="component.path"
            :component="component"
          />
        </ul>
      </div>

      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900"> Marketing </h2>

        <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
          <ComponentCard
            v-for="component in marketing"
            :key="component.path"
            :component="component"
          />
        </ul>
      </div>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="bg-white text-center">
    <PageContainer class="py-8 lg:py-12 flex flex-col gap-4">
      <h1 class="text-lg font-medium text-gray-700 text-pretty">
        {{ subtitle }}
      </h1>

      <h2
        class="order-first text-5xl font-bold text-gray-900 sm:text-6xl text-pretty"
      >
        {{ title }}
      </h2>

      <div class="mx-auto max-w-prose">
        <p class="text-base/relaxed text-pretty text-gray-700">
          <slot />
        </p>

        <PageBannerUsps class="mt-6" />
      </div>
    </PageContainer>
  </section>
</template>

<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="post.path">
    <div
      class="bg-white rounded-md shadow-sm border border-gray-300 px-4 pb-4 sm:px-6 sm:pb-6 pt-12 sm:pt-16 hover:shadow-none transition-shadow h-full"
    >
      <span aria-hidden="true" role="img" class="text-2xl sm:text-3xl">
        {{ post.emoji }}
      </span>

      <div class="flex items-center gap-3 mt-4">
        <time class="text-sm text-gray-700">
          {{ post.date }}
        </time>

        <CardTag v-if="post.tag" :tag="post.tag" />
      </div>

      <strong
        class="mt-1 block text-lg font-medium text-pretty text-gray-900 sm:text-xl"
      >
        {{ post.title }}
      </strong>
    </div>
  </RouterLink>
</template>

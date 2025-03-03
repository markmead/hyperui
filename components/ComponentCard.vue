<script setup lang="ts">
const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
})

const count = computed(() => {
  return props.component.components.reduce((total, component) => {
    return total + (component.dark ? 2 : 1)
  }, 0)
})
</script>

<template>
  <RouterLink :to="component.path">
    <div
      class="bg-white rounded-md shadow-sm border border-gray-300 p-4 sm:p-6 hover:shadow-none transition-shadow h-full"
    >
      <div class="flex items-center justify-between gap-4">
        <span aria-hidden="true" role="img" class="text-xl sm:text-2xl">
          {{ component.emoji }}
        </span>

        <CardTag v-if="component.tag" :tag="component.tag" />
      </div>

      <strong
        class="mt-4 block font-medium text-pretty text-gray-900 sm:text-lg"
      >
        {{ component.title }}
      </strong>

      <p class="mt-1 text-sm text-gray-700">
        {{ count }}
        Components
      </p>
    </div>
  </RouterLink>
</template>

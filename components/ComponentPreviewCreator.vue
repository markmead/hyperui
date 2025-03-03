<script setup lang="ts">
defineProps({
  creator: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <p class="text-sm text-gray-700">
    Creator:
    <a
      :href="`https://github.com/${creator}`"
      target="_blank"
      rel="noreferrer"
      class="inline-block font-medium underline underline-offset-2 transition hover:text-gray-900 hover:no-underline"
    >
      {{ creator }}
    </a>
  </p>
</template>

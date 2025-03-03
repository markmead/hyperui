<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span
    class="rounded-full inline-block px-2.5 py-1 text-xs/none font-medium whitespace-nowrap capitalize"
    :class="{
      'bg-blue-100 text-blue-700': tag === 'updated',
      'bg-green-100 text-green-700': tag === 'new' || tag === 'v3',
    }"
  >
    {{ tag }}
  </span>
</template>

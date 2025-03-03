<script setup lang="ts">
const items = computed(() => ['No install', 'No config', 'No setup'])
</script>

<template>
  <ul class="flex items-center justify-center gap-6">
    <li
      v-for="(item, itemIndex) in items"
      :key="itemIndex"
      class="inline-flex items-center gap-1"
    >
      <span role="img" aria-hidden="true"> ✅ </span>
      <span class="text-sm font-medium text-gray-900">{{ item }}</span>
    </li>
  </ul>
</template>

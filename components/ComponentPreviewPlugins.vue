<script setup lang="ts">
defineProps({
  plugins: {
    type: Array as () => string[],
    required: true,
  },
})
</script>

<template>
  <p class="text-sm text-gray-700">
    Plugins:

    <span v-for="(plugin, index) in plugins" :key="plugin">
      <a
        :href="`https://www.npmjs.com/package/${plugin}`"
        target="_blank"
        rel="noreferrer"
        class="inline-block font-medium underline underline-offset-2 transition hover:text-gray-900 hover:no-underline"
      >
        {{ plugin }}
      </a>

      <span v-if="index !== plugins.length - 1">, </span>
    </span>
  </p>
</template>

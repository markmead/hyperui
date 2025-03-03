<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <pre
    class="h-[400px] overflow-auto rounded p-4 ring-2 ring-gray-900 lg:h-[600px]"
  ><code>{{ code }}</code></pre>
</template>

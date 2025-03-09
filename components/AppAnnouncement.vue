<script setup lang="ts">
import { useStorageAsync } from '@vueuse/core'

const announcement = useStorageAsync('announcement', true)
</script>

<template>
  <div
    v-if="announcement"
    role="alert"
    class="fixed bottom-0 inset-x-0 z-auto p-6"
  >
    <div
      class="bg-white rounded-md shadow-sm border border-gray-300 p-4 flex items-center gap-4 justify-between"
    >
      <p class="text-gray-900 font-medium">
        HyperUI is currently moving from
        <a
          href="https://github.com/markmead/hyperui/pull/556"
          rel="noreferrer"
          target="_blank"
          class="underline"
          >Next to Nuxt</a
        >. Please be patient as components, pages, and features are updated.
      </p>

      <button
        type="button"
        class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium"
        @click="announcement = false"
      >
        <span role="img" aria-hidden="true"> 👍 </span>

        <span>OK</span>
      </button>
    </div>
  </div>
</template>

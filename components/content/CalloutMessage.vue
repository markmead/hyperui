<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const infoEl = useTemplateRef<HTMLElement | null>('infoEl')
const buttonEl = useTemplateRef<HTMLButtonElement | null>('buttonEl')

const showInfo = ref(false)

onClickOutside(
  infoEl,
  () => {
    showInfo.value = false
  },
  {
    ignore: [buttonEl],
  }
)
</script>

<template>
  <div v-auto-animate class="relative">
    <button
      type="button"
      ref="buttonEl"
      class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium text-gray-900"
      @click.stop="showInfo = !showInfo"
    >
      <span role="img" aria-hidden="true"> 💡 </span>

      <span> Find out more </span>
    </button>

    <div
      v-if="showInfo"
      ref="infoEl"
      class="absolute top-12 bg-white border border-gray-300 shadow-xl rounded z-50 p-4 prose-p:m-0"
    >
      <slot />
    </div>
  </div>
</template>

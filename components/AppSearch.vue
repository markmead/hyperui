<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

type Results = {
  title: string
  items: {
    title: string
    path: string
    emoji?: string
  }[]
}

defineProps({
  results: {
    type: Array as () => Results[],
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['search:close'])

const searchEl = useTemplateRef<HTMLElement | null>('searchEl')

const { deactivate } = useFocusTrap(searchEl, { immediate: true })

onClickOutside(searchEl, () => {
  deactivate()
  emit('search:close')
})
</script>

<template>
  <div
    class="fixed inset-0 bg-white/25 backdrop-blur-lg z-auto pt-[10vh] px-4"
    @keydown.escape="emit('search:close')"
  >
    <div
      ref="searchEl"
      class="bg-white max-w-xl max-h-96 rounded-md border border-gray-300 shadow-xl overflow-auto mx-auto"
    >
      <div class="flex items-center justify-between p-3 gap-4">
        <slot />

        <button
          type="button"
          class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium"
          @click="emit('search:close')"
        >
          <span role="img" aria-hidden="true"> ❌ </span>

          <span>Close</span>
        </button>
      </div>

      <div v-auto-animate class="divide-y divide-gray-200">
        <ul
          v-for="(result, index) in results"
          :key="index"
          class="divide-y divide-gray-200 first-of-type:border-t first-of-type:border-gray-200"
        >
          <li v-for="item in result.items" :key="item.path">
            <NuxtLink
              :to="item.path"
              class="flex items-center justify-between gap-4 p-3 hover:bg-gray-100"
            >
              <div class="flex items-center gap-2">
                <span v-if="item.emoji" role="img" aria-hidden="true">
                  {{ item.emoji }}
                </span>

                <span class="line-clamp-1 font-medium">
                  {{ item.title }}
                </span>
              </div>

              <span class="shrink-0">
                {{ result.title }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

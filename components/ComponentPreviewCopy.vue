<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})

const source = ref('')

const { copy, copied } = useClipboard({
  source,
  legacy: true,
})

watch(
  () => props.code,
  () => {
    source.value = props.code
  }
)

const isLoaded = inject('isLoaded')
const codeLoaded = inject('codeLoaded')
</script>

<template>
  <button
    class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium disabled:opacity-50"
    :disabled="!isLoaded || !codeLoaded"
    type="button"
    @click="copy(source)"
  >
    <span role="img" aria-hidden="true">
      {{ copied ? '🎉' : '📋' }}
    </span>

    <span>
      {{ copied ? 'Copied!' : 'Copy' }}
    </span>
  </button>
</template>

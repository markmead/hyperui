<script setup lang="ts">
const props = defineProps({
  index: {
    type: String,
    required: true,
  },
})

const htmlFor = computed(() => `View${props.index}`)

const modelValue = defineModel({
  type: Boolean,
  default: true,
})

const isLoaded = inject('isLoaded')
const codeLoaded = inject('codeLoaded')
</script>

<template>
  <label
    :for="htmlFor"
    class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium has-disabled:opacity-50"
  >
    <span role="img" aria-hidden="true">
      {{ modelValue ? '👀' : '👾' }}
    </span>

    <span>
      {{ modelValue ? 'View' : 'Code' }}
    </span>

    <input
      :id="htmlFor"
      v-model="modelValue"
      :disabled="!isLoaded || !codeLoaded"
      type="checkbox"
      class="sr-only"
    />
  </label>
</template>

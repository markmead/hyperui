<script setup lang="ts">
type Breakpoint = {
  name: string
  emoji: string
  width: string
}

const props = defineProps({
  index: {
    type: String,
    required: true,
  },
  breakpoint: {
    type: Object as () => Breakpoint,
    required: true,
  },
})

const htmlFor = computed(() => `${props.index}${props.breakpoint.width}`)
const htmlName = computed(() => `Breakpoint${props.index}`)

const modelValue = defineModel({
  type: String,
  default: '100%',
})

const isLoaded = inject('isLoaded')
</script>

<template>
  <label
    :for="htmlFor"
    class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium has-disabled:opacity-50"
  >
    <span>
      <span role="img" aria-hidden="true">
        {{ breakpoint.emoji }}
      </span>

      {{ breakpoint.name }}
    </span>

    <input
      :id="htmlFor"
      v-model="modelValue"
      :disabled="!isLoaded"
      type="radio"
      :value="breakpoint.width"
      :name="htmlName"
      class="sr-only"
    >
  </label>
</template>

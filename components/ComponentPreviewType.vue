<script setup lang="ts">
const props = defineProps({
  index: {
    type: String,
    required: true,
  },
})

const htmlFor = computed(() => `Type${props.index}`)

const modelValue = defineModel({
  type: String,
  default: 'html',
})

const isLoaded = inject('isLoaded')
</script>

<template>
  <label :for="htmlFor">
    <span class="sr-only"> Type </span>

    <select
      v-model="modelValue"
      :id="htmlFor"
      :disabled="!isLoaded"
      class="rounded shadow-sm border border-gray-300 h-10 pl-3 font-medium disabled:opacity-50"
    >
      <option value="html"> HTML </option>
      <option value="vue"> Vue </option>
      <option value="jsx"> JSX </option>
    </select>
  </label>
</template>

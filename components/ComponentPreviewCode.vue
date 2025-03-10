<script setup lang="ts">
import { codeToHtml } from 'shiki'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'html',
  },
})

const html = ref<string>('')

onMounted(async () => {
  html.value = await codeToHtml(props.code, {
    lang: props.type,
    theme: 'github-dark-dimmed',
  })
})
</script>

<template>
  <div
    v-html="html"
    class="h-[400px] rounded shadow-sm ring ring-gray-300 bg-gray-100 overflow-hidden prose-pre:m-0 prose-pre:rounded-none"
  ></div>
</template>

<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

type Component = {
  index: string
  title: string
  dark: boolean
  wrapper: string
  creator: string
  plugins?: string[]
}

const props = defineProps({
  component: {
    type: Object as () => Component,
    required: true,
  },
})

const route = useRoute()

const iframeEl = useTemplateRef<HTMLIFrameElement | null>('iframeEl')

const iframeVisible = useElementVisibility(iframeEl, {
  threshold: 0.25,
})

const isLoaded = ref<boolean>(false)

const ltr = ref<boolean>(true)
const width = ref<string>('100%')
const code = ref<string>('')

const src = computed(() => {
  const path = `${route.path}/${props.component.index}.html`

  return path.replace(/\/{2,}/g, '/')
})

const breakpoints = computed(() => [
  {
    name: 'Mobile',
    emoji: '📱',
    width: '340px',
  },
  {
    name: 'Small',
    emoji: '🐛',
    width: '640px',
  },
  {
    name: 'Medium',
    emoji: '🦭',
    width: '768px',
  },
  {
    name: 'Large',
    emoji: '🐴',
    width: '1024px',
  },
  {
    name: 'Full',
    emoji: '🌕',
    width: '100%',
  },
])

watch(
  () => ltr.value,
  (ltr) => {
    iframeEl.value?.contentWindow?.document.documentElement.setAttribute(
      'dir',
      ltr ? 'ltr' : 'rtl'
    )
  }
)

watchOnce(
  () => iframeVisible.value,
  () => {
    isLoaded.value = true
  }
)

watchOnce(
  () => isLoaded.value,
  () => {
    setTimeout(() => {
      code.value
        = iframeEl.value?.contentWindow?.document?.body?.innerHTML || ''
    }, 50)
  }
)

provide('isLoaded', isLoaded)
</script>

<template>
  <h2> {{ component.title }} </h2>

  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <ComponentPreviewDir v-model="ltr" :index="component.index" />

      <ComponentPreviewCopy :code="code" />
    </div>

    <div class="hidden lg:flex lg:items-center lg:gap-2">
      <p class="text-sm font-medium text-gray-700">
        {{ width }}
      </p>

      <ComponentPreviewBreakpoint
        v-for="breakpoint in breakpoints"
        :key="breakpoint.width"
        v-model="width"
        :breakpoint="breakpoint"
        :index="component.index"
      />
    </div>
  </div>

  <div v-auto-animate="{ duration: 300 }">
    <ComponentPreviewDisplay
      :class="[
        isLoaded ? 'opacity-100 blur-none' : 'opacity-0 blur-sm',
        'transition-[filter,_opacity] duration-300',
      ]"
    >
      <iframe
        ref="iframeEl"
        class="w-full lg:transition-all lg:duration-300"
        :src="src"
        :style="{ maxWidth: width }"
        :class="[
          component.wrapper,
          component.dark ? 'bg-gray-900' : 'bg-white',
        ]"
        :title="component.title"
      />
    </ComponentPreviewDisplay>
  </div>

  <div class="flex gap-2 items-center">
    <ComponentPreviewCreator :creator="component.creator" />

    <template v-if="component.plugins?.length">
      <span class="text-gray-300">/</span>

      <ComponentPreviewPlugins :plugins="component.plugins" />
    </template>
  </div>
</template>

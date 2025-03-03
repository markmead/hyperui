<script setup lang="ts">
type Component = {
  title: string
  dark?: boolean
  creator?: string
  plugins?: string[]
}

const props = defineProps({
  components: {
    type: Array as () => Component[],
    required: true
  },
  wrapper: {
    type: String,
    default: ''
  }
})

const items = computed(() => {
  return props.components.flatMap((component, index) => {
    const realIndex = index + 1

    const item = {
      ...component,
      index: `${realIndex}`,
      wrapper: props.wrapper ?? 'h-[400px] lg:h-[600px]',
      creator: component?.creator ?? 'markmead',
      dark: false
    }

    if (component.dark) {
      const darkItem = {
        ...item,
        index: `${realIndex}-dark`,
        title: `${item.title} (Dark)`,
        dark: true
      }

      return [item, darkItem]
    }

    return item
  })
})
</script>

<template>
  <ul class="space-y-8">
    <li
      v-for="component in items"
      :key="component.title"
      class="space-y-4"
    >
      <ComponentPreview :component="component" />
    </li>
  </ul>
</template>

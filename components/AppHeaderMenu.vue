<script setup lang="ts">
interface MenuLink {
  href: string
  title: string
}

interface Props {
  showMenu: boolean
  menuLinks: MenuLink[]
}

defineProps<Props>()

const emit = defineEmits(['menu:toggle'])
</script>

<template>
  <div class="flex items-center md:hidden">
    <button class="text-gray-900" @click="emit('menu:toggle')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <span class="sr-only">Toggle menu</span>
    </button>

    <div v-if="showMenu" class="absolute inset-x-0 top-14 px-2">
      <AppHeaderLinks
        :menu-links="menuLinks"
        nav-class="bg-white border p-4 border-gray-200 shadow-lg rounded-md"
        ul-class="space-y-4"
      />
    </div>
  </div>
</template>

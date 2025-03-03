<script setup lang="ts">
interface MenuLink {
  href: string
  title: string
}

interface Props {
  navClass?: string
  ulClass?: string
  menuLinks: MenuLink[]
}

defineProps<Props>()
</script>

<template>
  <nav :class="navClass">
    <ul :class="ulClass">
      <li v-for="menuLink in menuLinks" :key="menuLink.href">
        <NuxtLink
          :to="menuLink.href"
          class="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:opacity-75"
        >
          {{ menuLink.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

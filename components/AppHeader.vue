<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

const router = useRouter()

const { data: application } = await useAsyncData('application', () =>
  queryCollection('application').select('path', 'title', 'emoji', 'terms').all()
)

const { data: marketing } = await useAsyncData('marketing', () =>
  queryCollection('marketing').select('path', 'title', 'emoji', 'terms').all()
)

const { data: blog } = await useAsyncData('blog', () =>
  queryCollection('blog').select('path', 'title', 'terms').all()
)

const search = shallowRef('')
const debounced = refDebounced(search, 300)

const showMenu = ref(false)
const showSearch = ref(false)

const headerLinks = computed(() => [
  {
    title: 'Application',
    href: '/components/application',
  },
  {
    title: 'Marketing',
    href: '/components/marketing',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
])

const grouped = computed(() => [
  {
    title: 'Application',
    items: application,
  },
  {
    title: 'Marketing',
    items: marketing,
  },
  {
    title: 'Blog',
    items: blog,
  },
])

const results = computed(() => {
  const query = debounced.value.toLowerCase()

  return grouped.value
    .map((group) => {
      const filteredItems
        = group.items?.value?.filter((item) => {
          return (
            item.title.toLowerCase().includes(query)
            || group.title.toLowerCase().includes(query)
            || item.terms?.some(term => term.toLowerCase().includes(query))
          )
        }) || []

      // Sort to prioritize items with matching titles
      const sortedItems = [...filteredItems].sort((itemA, itemB) => {
        const titleA = itemA.title.toLowerCase().includes(query)
        const titleB = itemB.title.toLowerCase().includes(query)

        return titleA && !titleB ? -1 : !titleA && titleB ? 1 : 0
      })

      return {
        ...group,
        items: sortedItems,
      }
    })
    .filter(({ items }) => items.length)
})

watch(router.currentRoute, () => {
  showMenu.value = false
  showSearch.value = false
})

watch(
  () => showSearch.value,
  () => {
    if (!showSearch.value) {
      search.value = ''
    }
  }
)
</script>

<template>
  <header
    v-auto-animate
    class="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white"
  >
    <PageContainer
      class="relative flex h-16 items-center justify-between gap-4 sm:gap-8"
    >
      <div class="flex items-center gap-4">
        <AppLogo />

        <AppHeaderLinks
          :menu-links="headerLinks"
          nav-class="hidden md:block"
          ul-class="gap-4 flex"
        />
      </div>

      <div class="flex flex-1 items-center justify-end gap-2 sm:gap-4">
        <button
          type="button"
          class="rounded shadow-sm border border-gray-300 h-10 px-3 inline-flex items-center gap-1.5 font-medium"
          @click="showSearch = true"
        >
          <span role="img" aria-hidden="true"> 🔍 </span>

          <span>Search</span>
        </button>

        <AppGitHub />

        <AppHeaderMenu
          :show-menu="showMenu"
          :menu-links="headerLinks"
          @menu:toggle="showMenu = !showMenu"
        />
      </div>
    </PageContainer>

    <AppSearch
      v-if="showSearch"
      :results="results"
      :search="debounced"
      @search:close="showSearch = false"
    >
      <label for="Search" class="block w-full">
        <span class="sr-only"> Search </span>

        <input
          id="Search"
          v-model="search"
          type="text"
          class="w-full rounded shadow-sm font-medium border-gray-300"
          placeholder="Search..."
        >
      </label>
    </AppSearch>
  </header>
</template>

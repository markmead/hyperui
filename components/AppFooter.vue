<script setup lang="ts">
const footerLinks = computed(() => [
  {
    title: 'FAQs',
    href: '/about/faqs',
  },
  {
    title: 'Acknowledgements',
    href: '/about/acknowledgements',
  },
])
</script>

<template>
  <footer class="border-t border-gray-200 bg-white">
    <PageContainer class="py-8 lg:py-12">
      <AppLogo class="text-lg" />

      <div class="mt-6">
        <p class="max-w-md text-pretty leading-relaxed text-gray-700">
          Free open source Tailwind CSS components for marketing and eCommerce
          websites, as well as application UI.
        </p>

        <div class="mt-4 lg:flex lg:items-end lg:justify-between">
          <ul class="flex gap-4">
            <li v-for="menuLink in footerLinks" :key="menuLink.href">
              <a
                :href="menuLink.href"
                class="block text-sm font-medium text-gray-900 hover:opacity-75"
              >
                {{ menuLink.title }}
              </a>
            </li>
          </ul>

          <p class="mt-4 text-sm text-gray-700 lg:mt-0">
            Created by
            <a
              href="https://github.com/markmead"
              rel="noreferrer"
              target="_blank"
              class="inline-block font-medium hover:text-gray-900"
            >
              Mark Mead
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  </footer>
</template>

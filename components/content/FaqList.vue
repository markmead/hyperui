<script setup lang="ts">
interface Faq {
  question: string
  answer: string
}

defineProps({
  faqs: {
    type: Array as () => Faq[],
    required: true,
  },
})
</script>

<template>
  <div v-for="(faq, index) in faqs" :key="index">
    <h2>{{ faq.question }}</h2>

    <p>{{ faq.answer }}</p>
  </div>
</template>

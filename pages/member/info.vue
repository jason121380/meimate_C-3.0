<template>
  <section class="w-full max-w-[768px] mx-auto">
    <nuxt-child />
  </section>
</template>
<script>
export default {
  name: 'info-index',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  }
}
</script>

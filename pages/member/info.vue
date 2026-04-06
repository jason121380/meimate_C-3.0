<template>
  <section class="w-full max-w-[768px] mx-auto">
    <nuxt-child keep-alive :keep-alive-props="{ include: ['member-info'] }" :transition="{ name: 'none', mode: '' }" />
  </section>
</template>
<script>
export default {
  name: 'info-index',
  head() {
    return {
      meta: [
        {
          hid: 'theme-color', name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  }
}
</script>

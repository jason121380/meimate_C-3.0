<template>
  <section class="w-full max-w-[768px] mx-auto pb-20">
    <HeaderTitle :title="'偏好設定'" :back_home="back_home" />
    <nuxt-child />
  </section>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      back_home: true
    }
  },
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
}
</script>

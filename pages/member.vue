<template>
    <section class="member__container w-full min-h-full lg:pt-0 bg-[#FAFAFA]"
      :class="[routeIsMember ? ' pb-4' : 'pb-8']"
    >
      <nuxt-child keep-alive :keep-alive-props="{ max: 10 }" :transition="pageTransition" />
    </section>
</template>

<script>
export default {
  name: 'member',
  data() {
    return {
      pageTransition: {
        name: 'none',
        mode: 'out-in',
        css: false,
        enter(el, done) { done() },
        leave(el, done) { done() }
      }
    }
  },
  mounted() {
    document.body.addEventListener('dblclick', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    const vm = this
    const notToHomeList = ['member-info']
    window.addEventListener('popstate', () => {
      if (notToHomeList.includes(vm.$route.name)) vm.$router.push('/member')
    })

  },
  computed: {
    routeIsMember() {
      return this.$route.path === '/member' || this.$route.path === '/member/'
    }
  }
}
</script>
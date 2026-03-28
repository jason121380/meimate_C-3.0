<template>
  <section class="safe-area-container">
    <client-only>
      <SmallLoading></SmallLoading>
      <div :class="isMemberRoute ? 'member-content-padding' : ''">
        <Nuxt></Nuxt>
      </div>
      <BottomTabBar v-if="isMemberRoute" />
    </client-only>
  </section>
</template>

<script>
export default {
  computed: {
    isMemberRoute() {
      return this.$route.path.startsWith('/member')
    }
  }
}
</script>

<style scoped>
.safe-area-container {
  padding-top: env(safe-area-inset-top, 0px);
}
.member-content-padding {
  padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px));
}
</style>
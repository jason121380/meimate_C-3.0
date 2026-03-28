<template>
  <section class="safe-area-container">
    <client-only>
      <SmallLoading></SmallLoading>
      <div class="app-scroll-container" :class="isMemberRoute ? 'member-content-padding' : ''">
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.app-scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}
.member-content-padding {
  padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px));
}
</style>

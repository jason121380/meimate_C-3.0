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
  },
  mounted() {
    // 從外部頁面（如 LINE）返回時，清除卡住的 loading 狀態
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        this.$store.dispatch('loading/isLoading', false)
        this.$store.dispatch('itemLoading/isLoading', false)
      }
    })
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
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
}
</style>

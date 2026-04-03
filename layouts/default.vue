<template>
  <section class="safe-area-container">
    <client-only>
      <SmallLoading></SmallLoading>
      <div ref="scrollContainer" class="app-scroll-container" :class="isMemberRoute ? 'member-content-padding' : ''">
        <keep-alive :include="cachedPages">
          <Nuxt></Nuxt>
        </keep-alive>
      </div>
      <BottomTabBar v-if="isMemberRoute" />
    </client-only>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // 需要快取的底部 tab 頁面（對應各頁的 name）
      cachedPages: [
        'member-index',
        'member-info',
        'member-appointmentRecord',
        'appointment-index'
      ]
    }
  },
  computed: {
    isMemberRoute() {
      return this.$route.path.startsWith('/member')
    }
  },
  watch: {
    '$route'() {
      // 切換頁面時捲動回頂部
      if (this.$refs.scrollContainer) {
        this.$refs.scrollContainer.scrollTop = 0
      }
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
  padding-bottom: calc(84px + env(safe-area-inset-bottom, 0px));
}
</style>

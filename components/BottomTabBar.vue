<template>
  <nav class="fixed inset-x-0 bottom-0 z-50 flex w-full justify-center"
       style="padding-bottom: env(safe-area-inset-bottom, 0px)">
    <div class="glass-bar mx-auto mb-2 flex w-[calc(100%-2rem)] max-w-[480px] items-center justify-around rounded-full p-1">
      <button v-for="tab in displayTabs" :key="tab.path" @click="navigate(tab)"
        class="relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full py-2"
        :class="isActive(tab) ? 'glass-pill' : ''">
        <div v-html="tab.icon" class="h-5 w-5"
          :class="isActive(tab) ? 'text-gmb-orange-500' : 'text-gray-400'"></div>
        <span class="text-[10px] font-semibold leading-tight"
          :class="isActive(tab) ? 'text-gmb-orange-500' : 'text-gray-400'">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BottomTabBar',
  data() {
    return {
      tabs: [
        {
          label: '首頁',
          path: '/member',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>'
        },
        {
          label: '立即預約',
          path: '/member/appointment',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>'
        },
        {
          label: '預約紀錄',
          path: '/member/appointmentRecord',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>'
        },
        {
          label: '個人中心',
          path: '/member/info',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>'
        }
      ]
    }
  },
  computed: {
    isGetCloseCustomerBookingForCustomer() {
      return this.$store.state.merchant.isCloseCustomerBookingForCustomer;
    },
    displayTabs() {
      if (this.isGetCloseCustomerBookingForCustomer === true) {
        return this.tabs.filter(tab => tab.path !== '/member/appointment')
      }
      return this.tabs
    }
  },
  methods: {
    navigate(tab) {
      if (this.$route.path !== tab.path) {
        this.$router.push(tab.path)
      }
    },
    isActive(tab) {
      if (tab.path === '/member') {
        return this.$route.path === '/member' || this.$route.path === '/member/'
      }
      if (tab.path === '/member/appointment') {
        return this.$route.path === '/member/appointment' || this.$route.path.startsWith('/member/appointment/')
      }
      return this.$route.path.startsWith(tab.path)
    }
  }
}
</script>

<style scoped>
.glass-bar {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.45);
  box-shadow:
    0 1px 6px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
</style>

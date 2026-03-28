<template>
  <section v-if="false">
    <div class="fixed top-0 left-0 right-0 bg-white z-10 transition-none">
      <div class="relative bg-white border-b border-gray-100 py-3 px-4">
        <div class="max-w-[768px] mx-auto flex items-center justify-between">
          <!-- 左側返回按鈕 -->
          <div class="w-10 flex justify-start">
            <div v-if="display" @click="back_home ? $router.push('/member') : backTo()" class="cursor-pointer p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z"
                  fill="#333" />
              </svg>
            </div>
          </div>
          <!-- 中間標題 -->
          <div class="flex flex-col items-center">
            <h2 class="text-base font-semibold text-gray-900 tracking-wide">{{ title }}</h2>
            <p v-if="subtitle" class="text-[11px] text-gray-400 mt-0.5">{{ subtitle }}</p>
          </div>
          <!-- 右側關閉按鈕 -->
          <div class="w-10 flex justify-end">
            <div v-if="showClose" @click="handleClose" class="cursor-pointer p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Spacer -->
    <div class="h-[52px]"></div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => false
    },
    subtitle: {
      type: String,
      default: () => ''
    },
    display: {
      type: Boolean,
      default: () => true
    },
    back_home: {
      type: Boolean,
      default: () => false
    },
    showClose: {
      type: Boolean,
      default: () => false
    }
  },
  name: 'Header',
  methods: {
    backTo() {
      const data = [
        'member-appointmentRecord', 'member-ticket', 'member-consumption',
        'member-appointment', 'member-addValue', 'member-customerBonus',
        'member-customerBonus', 
      ]
      if (data.includes(this.$route.name)) {
        this.$router.push('/member')
      } else {
        this.$router.go(-1)
      }
    },
    toHome() {
      !this.$route.path.includes('line') && this.$router.push('/member')
    },
    handleClose() {
      this.$router.push('/member')
    }
  },
}
</script>

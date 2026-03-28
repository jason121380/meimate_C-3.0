<template>
  <div class="w-full min-h-[calc(100vh-68px)] flex flex-col items-center justify-center">
    <img src="@/static/images/error/error.svg" alt="error">
    <h2 class="text-lg">將在 <span class="text-xl font-bold text-[#232D4E]">{{ errorTimer }}</span> 秒後導向至首頁</h2>
  </div>
</template>
<script>
export default {
  name: 'Error',
  data () {
    return {
      errorTimer: 5,
      timer: null
    }
  },
  methods: {
    setErrorTime () {
      this.timer = window.setInterval(() => {
        this.errorTimer -= 1

        if (this.errorTimer <= 0) {
          window.clearInterval(this.timer)
          this.$router.push('/member')
        }
      }, 1000)
    }
  },
  mounted () {
    this.setErrorTime()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>

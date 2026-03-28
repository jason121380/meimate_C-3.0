<template>
  <section>
    <transition name="fade">
      <div @click.stop="" v-if="isLoading"
        class="fixed w-full h-screen top-0 left-0 flex items-center justify-center overflow-hidden z-[999] bg-white/50  backdrop-blur-[1px]">
        <div
          class="border-[5px] border-[#e2e2e2] border-t-[5px] border-t-gmb-orange-500 rounded-full w-10 h-10 animate-spin-slow">
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  }
}
</script>

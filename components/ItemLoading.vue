<template>
  <section>
    <transition name="fade">
      <div v-if="isLoading" class="w-full min-h-[100px] flex items-center justify-center pointer-events-none z-50">
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
      return this.$store.state.itemLoading.isLoading
    }
  }
}
</script>

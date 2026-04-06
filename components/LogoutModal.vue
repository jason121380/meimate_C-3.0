<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl relative z-[-1] text-gray-900 shadow-lg">
          <!-- 標題列 -->
          <div class="flex shrink-0 justify-between items-center px-7 py-5 border-b border-gray-100">
            <p class="font-bold text-lg text-gray-900">提醒</p>
            <button @click="closeModal" class="text-gray-400 active:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-7">
            <div class="text-center text-gray-900 font-semibold text-lg">
              確定要登出嗎?
            </div>
            <div class="grid grid-cols-2 gap-x-4 mt-6 pt-2">
              <button @click="closeModal" class="py-3 px-6 rounded-full bg-gray-100 text-gray-600 font-medium active:bg-gray-200">取消</button>
              <button @click="logOut"
                class="py-3 px-6 rounded-full bg-gmb-orange-500 text-white font-medium active:bg-gmb-orange-600 shadow-sm">登出</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <StatusModal :showModal="showSuccessModal" content="會員已登出" @close="redirect" :timeout="1500" />
  </section>
</template>
  
<script>
import { removeToken } from "@/plugins/cookies";
export default {
  name: 'LogoutModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
  },
  data() {
    return {
      showSuccessModal: false
    }
  },
  methods: {
    closeModal() {
      this.showSuccessModal = false
      this.$emit('close')
    },
    logOut() {
      this.showSuccessModal = true
      removeToken();
      window.localStorage.clear();
    },
    redirect() {
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  },
}
</script>
  
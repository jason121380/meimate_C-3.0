<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl relative z-[-1] shadow-lg">
          <div class="flex shrink-0 justify-between items-center px-7 py-5 border-b border-gray-100">
            <span class="font-bold text-lg text-gray-900">確定要取消預約嗎?</span>
            <!-- 關閉按鈕 -->
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-7">
            <div class="text-center font-semibold text-lg text-gray-900">
              {{ appointment }} <br />
            </div>
            <div class="grid grid-cols-2 gap-x-4 mt-6 pt-2">
              <button @click="closeModal" class="py-3 px-6 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">取消</button>
              <button @click="cancel"
                class="py-3 rounded-full bg-gmb-orange-500 text-white font-semibold hover:bg-gmb-orange-600 transition-colors shadow-sm whitespace-nowrap">取消預約</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'CancelAppointmentModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
    appointment: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    cancel() {
      this.$emit('cancel')
    }
  },
}
</script>
  
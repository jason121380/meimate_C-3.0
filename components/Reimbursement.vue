<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal" @click="cancelModalEmit($event)"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div data-aos="flip-left" data-aos-duration="400"
          class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-md p-5 relative z-[-1]">

          <!-- 關閉按鈕 -->
          <button @click="cancelModalEmit($event)" v-if="showCancelBtn" class="absolute right-5 top-5 cancel">
            <i @click="cancelModalEmit($event)" class="bi bi-x-lg text-3xl cancel"/>
          </button>

          <div class="flex flex-col items-center mt-5">
            <h2 class="mb-5">核銷</h2>
            <input type="text"
              class="border border-bs-gray-50 rounded-xl placeholder:text-bs-gray-50 w-[90%] mb-7 px-2 py-2.5"
              placeholder="請輸入核銷密碼">
            <button data-mdb-ripple="true" data-mdb-ripple-color="light"
              class="py-2.5 px-14 bg-mm-accent rounded-lg text-white font-bold">確認</button>
          </div>

        </div>
      </div>
    </transition>

  </section>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
    showCancelBtn: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    cancelModalEmit(e) {
      this.$emit('cancelModal', e)
    }
  }
}
</script>

<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal" @click="cancelModalEmit($event)" class=" fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel
      shadow-[0_0.25rem_0.5rem_rgba(0, 0, 0, 0.1)]">
        <div class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-[2.1rem] relative z-[-1]">
          <div class="flex shrink-0 justify-between items-center px-7 py-5 border-b justify-content-between">
            <slot name="header"></slot>
            <!-- 關閉按鈕 -->
            <button @click="cancelModalEmit($event)" v-if="showCancelBtn">
              <span class="text-3xl cancel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3"
                    d="M6 19.7C5.7 19.7 5.5 19.6 5.3 19.4C4.9 19 4.9 18.4 5.3 18L18 5.3C18.4 4.9 19 4.9 19.4 5.3C19.8 5.7 19.8 6.29999 19.4 6.69999L6.7 19.4C6.5 19.6 6.3 19.7 6 19.7Z"
                    fill="currentColor" />
                  <path
                    d="M18.8 19.7C18.5 19.7 18.3 19.6 18.1 19.4L5.40001 6.69999C5.00001 6.29999 5.00001 5.7 5.40001 5.3C5.80001 4.9 6.40001 4.9 6.80001 5.3L19.5 18C19.9 18.4 19.9 19 19.5 19.4C19.3 19.6 19 19.7 18.8 19.7Z"
                    fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
          <!-- 是否為會籍說明 -->
          <div v-if="isMemberRules" class="flex justify-center items-center gap-1.5 mb-5 mt-10">
            <i class="bi bi-question-circle text-xl"/>
            <span class="text-lg font-bold">會籍說明</span>
          </div>
          <div class="m-5">
            <slot></slot>
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
    isMemberRules: {
      type: Boolean,
      default: () => false
    },
    showCancelBtn: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    cancelModalEmit(e) {
      this.$emit('cancelModal', e)
    }
  }
}
</script>

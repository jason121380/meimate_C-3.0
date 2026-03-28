<template>
  <section>
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"
      ></div>
    </transition>
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]"
      >
        <div
          data-aos="flip-left"
          data-aos-duration="400"
          class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-mm relative z-[-1] text-gray-dark"
        >
          <div class="p-7">
            <p class="text-center text-xl font-semibold text-gray-dark">請問要綁定LINE帳號嗎?</p>
            <div class="grid grid-cols-2 gap-x-8 mt-10">
              <button @click="closeModal('cancel')" class="btn btn-light">
                取消
              </button>
              <button
                @click="closeModal('comfirm')"
                class="py-2 px-8 rounded-mm bg-mm-accent text-white whitespace-nowrap"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "BindLineModal",
  props: {
    showModal: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    closeModal(type) {
      this.$emit("close", type);
    },
  },
};
</script>
<style scoped>


</style>

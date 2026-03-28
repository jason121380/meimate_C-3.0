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
            <p class="text-center text-xl font-semibold text-mm-accent">這是您綁定的帳號嗎？</p>
            <img v-if="cusInfo.avatarUrl" :src="cusInfo.avatarUrl" class="my-5 mx-auto w-28 h-28 rounded-full">
            <div v-else class="my-5 mx-auto w-28 h-28">
              <svg
                fill="#cccccc"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"
                ></path>
              </svg>
            </div>
            <div class="mx-auto w-fit flex-col">
              <p>姓名: {{ cusInfo.name }}</p>
              <p>手機: {{ cusInfo.cellphone }}</p>
            </div>
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
  name: "LogoutModal",
  props: {
    showModal: {
      type: Boolean,
      default: () => false,
    },
    cusInfo: {
      type: Object,
      default: () => {
        return {
          name: '',
          cellphone: '',
          avatarUrl: '',
        }
      }
    }
  },
  data() {
    return {
      showSuccessModal: false,
    };
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

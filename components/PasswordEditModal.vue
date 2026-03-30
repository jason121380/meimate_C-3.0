<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div class="w-full max-w-[768px] max-h-[80vh] bg-white rounded-2xl relative z-[-1] shadow-lg overflow-hidden">
          <!-- 關閉按鈕 -->
          <button @click="closeModal" class="absolute right-6 top-5 text-gray-400 hover:text-gray-600 transition-colors cancel">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(setpassword)">
              <div class="p-7 pt-10">
                <h3 class="text-lg font-bold text-gray-900 mb-6">修改密碼</h3>
                <div class="mb-5">
                  <label v-pre for="password1Input" class="text-gray-500 text-xs font-medium mb-2 block">新密碼</label>
                  <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                    <input name="密碼" v-model="password" onpaste="return false" id="password1Input" type="password"
                      class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                      placeholder="請輸入新密碼"
                      :class="{ '!border-red-400': errors.length > 0 }">
                    <span v-if="errors.length > 0" class="text-red-400 text-xs mt-1 block pl-4">{{
                      errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mb-2">
                  <label v-pre for="password2Input" class="text-gray-500 text-xs font-medium mb-2 block">再次輸入新密碼</label>
                  <ValidationProvider name="再次輸入密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                    <input id="password2Input" name="再次輸入密碼" v-model="passwordCheck" type="password"
                      class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                      placeholder="請再次輸入密碼"
                      :class="{ '!border-red-400': errors.length > 0 || !isSame }">
                    <span v-if="errors.length > 0 || !isSame"
                      class="text-red-400 text-xs mt-1 block pl-4">{{ errors[0] }}{{ isSame ? '' :
                        '密碼不一致' }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="border-t border-gray-100 p-5 flex justify-end bg-gray-50/30">
                <button :disabled="isComfirm" type="submit"
                  class="py-2.5 px-8 flex items-center gap-2 text-white text-[15px] font-semibold bg-gmb-orange-500 rounded-full hover:bg-gmb-orange-600 transition-all shadow-sm"
                  :class="{ '!bg-gray-300 !shadow-none': isComfirm }">
                  <i v-if="isComfirm" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                  確認
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </transition>
    <StatusModal :showModal="showSuccessModal" content="編輯成功" @close="closeModal" :timeout="1500" />
  </section>
</template>

<script>
export default {
  name: 'PasswordEditModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      password: '',
      passwordCheck: '',
      isComfirm: false,
      isSame: true,
      showSuccessModal: false
    }
  },
  methods: {
    closeModal() {
      this.showSuccessModal = false
      this.$emit('close')
    },
    setpassword() {
      if (this.isSame) {
        this.isComfirm = true
        const formData = {
          password: `${this.password}`,
          passwordCheck: `${this.passwordCheck}`
        }
        this.$api.customerSetPassword(formData).then(res => {
          if (res.data.customerSetPassword) {
            this.showSuccessModal = true
          } else {
            this.isComfirm = false
          }
        }).catch(error => {
          this.isComfirm = false
          console.log('error: ', error);
        })
      }
    },
    checkPassword() {
      if (this.password && this.passwordCheck) {
        this.isSame = this.password === this.passwordCheck
      } else {
        this.isSame = true
      }
    },
    init() {
      this.password = ''
      this.passwordCheck = ''
      this.isSame = true
      this.isComfirm = false
    },
    success() {
      this.$swal.fire({
        icon: "success",
        title: `<h3 class="text-xl font-semibold text-gray-900">編輯成功</h3>`,
        background: "#fff",
        iconColor: "#FF6B2C",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: { popup: '!rounded-2xl !shadow-lg' }
      }).then(() => {
        this.closeModal()
      });
    }
  },
  watch: {
    password() {
      this.checkPassword()
    },
    passwordCheck() {
      this.checkPassword()
    },
    showModal() {
      this.showModal && this.init()
    }
  },
}
</script>

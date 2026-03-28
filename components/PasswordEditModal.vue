<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal"
        class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div data-aos="flip-left" data-aos-duration="400" class="card w-full max-w-[768px] max-h-[80vh] relative z-[-1]">
          <!-- 關閉按鈕 -->
          <button @click="closeModal" class="absolute right-8 top-6 cancel">
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
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(setpassword)">
              <div class="card-body !p-9 !pt-12">
                <div class="grid grid-cols-3 items-center gap-y-4">
                  <label v-pre for="phoneInput"
                    class="col-span-3 md:col-span-1 text-gray-dark text-md font-bold">新密碼：</label>
                  <div class="form-group relative mb-5 mt-2 col-span-3 md:col-span-2">
                    <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                      <input name="密碼" v-model="password" onpaste="return false" id="password1Input" type="password"
                        class="form-control form-control-sm form-control-solid"
                        :class="{ 'border border-danger': errors.length > 0 }">
                      <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{
                        errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="grid grid-cols-3 items-center mt-4">
                  <label v-pre for="verifyInput"
                    class="col-span-3 md:col-span-1 text-gray-dark text-md font-bold">再次輸新入密碼：</label>
                  <div class="form-group relative mb-8 mt-2 col-span-3 md:col-span-2">
                    <ValidationProvider name="再次輸入密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                      <input id="password2Input" name="再次輸入密碼" v-model="passwordCheck" type="password"
                        class="form-control form-control-sm form-control-solid"
                        :class="{ 'border border-danger': errors.length > 0 }">
                      <span v-if="errors.length > 0 || !isSame" name="password_confirmation"
                        class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{ errors[0] }}{{ isSame ? '' :
                          '密碼不一致' }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="card-footer flex justify-end !py-6 !px-9">
                <button :disabled="isComfirm" type="submit"
                  class="py-3 px-10 flex items-center gap-1 text-white bg-mm-accent rounded-mm shadow-md duration-300"
                  :class="{ 'bg-[#555555]': isComfirm }">
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
        title: `<h3 class="text-2xl">編輯成功</h3>`,
        background: "#fff",
        iconColor: "#FEB401",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
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

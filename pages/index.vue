<template>
  <section>
    <client-only v-if="!isLoading">
      <section class="min-h-screen bg-[#FAFAFA] flex flex-col justify-center">
        <!-- 主內容區 -->
        <div class="w-full max-w-[768px] mx-auto px-5 py-10">
          <!-- 歡迎語 -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 leading-tight tracking-tight">Hi,</h1>
            <h2 class="text-base text-gray-400 leading-relaxed mt-1">今天想做什麼服務呢？</h2>
          </div>

          <!-- 表單卡片 -->
          <div>
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-mm">
              <h3 class="text-[15px] font-semibold text-gray-900 mb-5">手機登入</h3>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(login)">
                  <label v-pre for="phoneInput" class="text-gray-500 text-xs font-medium mb-2 block">手機號碼</label>
                  <div class="form-group relative mb-6">
                    <ValidationProvider name="手機" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                      <input :readonly="readonly" ref="phoneRef" v-model="member.phone" onpaste="return false" maxlength="10"
                        id="phoneInput" type="tel"
                        class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                        placeholder="請輸入手機號碼"
                        :class="{ '!border-red-400': errors.length > 0, '!bg-gray-100 !text-gray-500': readonly }">
                      <button v-if="readonly" @click="resetToStep1" type="button"
                        class="absolute right-1.5 top-1 bottom-1 px-4 text-gmb-orange-500 text-sm font-medium rounded-full hover:bg-gmb-orange-100/30 transition-colors">
                        修改
                      </button>
                      <span v-if="errors.length > 0" class="absolute left-4 -bottom-5 text-red-400 text-xs">{{
                        errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <template v-if="step === 2">
                    <label v-pre for="verifyInput" class="text-gray-500 text-xs font-medium mb-2 block">驗證碼</label>
                    <div class="form-group relative mb-6">
                      <ValidationProvider name="驗證碼" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                        <input v-model="member.verifyCode" minlength="5" maxlength="5" id="verifyInput" type="tel"
                          class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                          placeholder="請輸入驗證碼">
                        <span v-if="errors.length > 0" class="absolute left-4 -bottom-5 text-red-400 text-xs">{{
                          errors[0] }}</span>
                        <button @click="getVerifyCode" type="button" :disabled="getCodeWaitingTimer || getingCode"
                          :class="{ 'bg-gmb-orange-500': !getCodeWaitingTimer, 'bg-gray-300': getCodeWaitingTimer || getingCode }"
                          class="absolute right-1.5 top-1 bottom-1 px-4 text-white text-sm rounded-full flex items-center gap-1 transition-colors">
                          <i v-if="getingCode" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                          取得驗證碼
                          <p v-if="getCodeWaitingTimer">({{ getCodeWaitingTimer }})</p>
                        </button>
                      </ValidationProvider>
                    </div>
                  </template>

                  <template v-if="step === 3">
                    <label v-pre for="verifyInput" class="text-gray-500 text-xs font-medium mb-2 block">密碼</label>
                    <div class="form-group relative">
                      <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                        <input v-model="member.password" id="verifyInput" type="password"
                          class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                          placeholder="請輸入密碼"
                          :class="{ '!border-red-400': errors.length > 0 }">
                        <span v-if="errors.length > 0" class="absolute left-4 -bottom-5 text-red-400 text-xs">{{
                          errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="flex justify-end py-2">
                      <p @click="forgetPassword" class="cursor-pointer text-gmb-orange-500 text-sm font-medium">忘記密碼？</p>
                    </div>
                  </template>

                  <template v-if="step === 1">
                    <button :disabled="getingPassword" type="submit"
                      class="w-full py-3 text-white text-[15px] font-semibold mt-5 bg-gmb-orange-500 rounded-full flex justify-center items-center gap-3 duration-300 hover:bg-gmb-orange-600 transition-all shadow-sm hover:shadow-md"
                      :class="{ '!bg-gray-300 !shadow-none': getingPassword }">
                      <i v-if="getingPassword" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                      下一步
                    </button>
                  </template>

                  <template v-if="step !== 1">
                    <button :disabled="isLogin" type="submit"
                      class="w-full py-3 text-white text-[15px] font-semibold mt-5 bg-gmb-orange-500 rounded-full flex justify-center items-center gap-3 duration-300 hover:bg-gmb-orange-600 transition-all shadow-sm hover:shadow-md"
                      :class="{ '!bg-gray-300 !shadow-none': isLogin }">
                      <i v-if="isLogin" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                      登入
                    </button>
                  </template>
                </form>
              </ValidationObserver>
            </div>
          </div>

          <!-- 版本標示 -->
          <div class="mt-10 flex justify-center items-center pointer-events-none">
            <span class="text-[11px] text-gray-300 tracking-wider font-medium font-sans">v3.0 powered by BOS</span>
          </div>
        </div>
      </section>
      <StatusModal :showModal="showModal" :content="modalContent" @close="showModal = false" :timeout="timer"
        :state="status" />
    </client-only>
  </section>
</template>

<script>
import pageLinks from "./../static/pageLinks.js";
export default {
  name: 'IndexPage',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    readonly() {
      return this.step !== 1
    }
  },
  data() {
    return {
      member: {
        phone: '',
        verifyCode: '',
        password: ''
      },
      isLogin: false,
      getingCode: false,
      getingPassword: false,
      getCodeWaitingTimer: null,
      step: 1,
      passwordOnSet: false,
      showModal: false,
      modalContent: '',
      timer: 0,
      status: 'success',
      merchantId: null
    }
  },
  methods: {
    resetToStep1() {
      this.step = 1
      this.member.verifyCode = ''
      this.member.password = ''
      this.getingPassword = false
      this.$nextTick(() => {
        this.$refs.phoneRef?.focus()
      })
    },
    getVerifyCode() {
      if (!this.member.phone) {
        this.modalContent = '請輸入手機號碼'
        this.timer = 1500
        this.status = 'error'
        this.showModal = true
        setTimeout(() => {
          const phoneRef = this.$refs.phoneRef
          phoneRef.focus()
        }, 300)
        return
      }

      this.getingCode = true
      let smsTimer = null

      this.$api.customerLoginSMSWithTKN(this.member.phone)
        .then((res) => {
          this.getingCode = false
          this.getCodeWaitingTimer = 60

          smsTimer = setInterval(() => {
            if (this.getCodeWaitingTimer <= 1) {
              clearInterval(smsTimer)
              this.getCodeWaitingTimer = null
            } else {
              this.getCodeWaitingTimer--
            }
          }, 1000)

          if (!res.hasError) {
            this.modalContent = `已傳送簡訊至${this.member.phone}`
            this.timer = 1500
            this.status = 'success'
            this.showModal = true
          } else {
            clearInterval(smsTimer)
            this.getCodeWaitingTimer = null
          }
        })
        .catch((err) => {
          if (smsTimer) clearInterval(smsTimer)
          console.log(err)
          this.getCodeWaitingTimer = null
          this.getingCode = false
          this.modalContent = '發生錯誤，請稍後再試'
          this.timer = 1500
          this.status = 'error'
          this.showModal = true
        })
    },
    login() {
      if (this.step === 1) {
        this.getingPassword = true
        this.$api.checkIsCustomerPasswordSet(this.member.phone).then(res => {
          const onSet = res.data.checkIsCustomerPasswordSet
          if (onSet !== null) {
            this.passwordOnSet = onSet
            this.step = onSet ? 3 : 2
          } else {
            console.log(res.data)
            this.getingPassword = false
          }
        }).catch(error => {
          this.getingPassword = false
          console.log('error: ', error);
        })
        return
      }
      if (this.isLogin) return

      this.isLogin = true

      const input = {
        cellphone: this.member.phone,
        code: this.member.verifyCode
      }

      const needKey = `
        token,
        name,
        cellphone,
        isNewCustomer
        merchants{
          id,
          name,
          address,
          availableBookingTime{
            time
          }
        },
        currentMerchant{
          id,
          name,
          address,
          shopURL,
          rankingURL,
          availableBookingTime{
            time
          }
        }
      `

      if (this.step === 2) {
        this.$api.customerVerifySMSWithTKN(input, needKey)
          .then((res) => {
            if (!res.hasError) {
              this.$cookieMethods.setToken(res.data.customerVerifySMSWithTKN.token)
              localStorage.setItem('allMerchants', JSON.stringify(res.data.customerVerifySMSWithTKN.merchants))
              localStorage.setItem("isNewCustomer", JSON.stringify(res.data.customerVerifySMSWithTKN.isNewCustomer));
              let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
              localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
              if (this.merchantId) {
                this.api.updateCustomerCuttentMerchant(this.merchantId).then(() => {
                  this.customerGetCurrentMerchantSetting()
                })
              } else {
                this.customerGetCurrentMerchantSetting()
              }
            } else {
              this.isLogin = false
            }
          })
          .catch((err) => {
            this.isLogin = false
            console.log(err)
          })
      } else if (this.step === 3) {
        this.$api.customerLoginWithPassword({
          cellphone: input.cellphone,
          password: this.member.password
        }, needKey)
          .then((res) => {
            if (!res.hasError) {
              this.$cookieMethods.setToken(res.data.customerLoginWithPassword.token)
              localStorage.setItem('allMerchants', JSON.stringify(res.data.customerLoginWithPassword.merchants))
              localStorage.setItem("isNewCustomer", JSON.stringify(res.data.customerLoginWithPassword.isNewCustomer));
              let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
              localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
              if (this.merchantId) {
                this.api.updateCustomerCuttentMerchant(this.merchantId).then(() => {
                  this.customerGetCurrentMerchantSetting()
                })
              } else {
                this.customerGetCurrentMerchantSetting()
              }
            } else {
              this.isLogin = false
            }
          })
          .catch((err) => {
            this.isLogin = false
            console.log(err)
          })
      }
    },
    customerGetCurrentMerchantSetting() {
      this.$api.customerGetCurrentMerchantSetting()
        .then((res) => {
          if (!res.data.hasError) {
            const responseData = res.data.customerGetCurrentMerchantSetting
            localStorage.setItem('allMerchants', JSON.stringify(responseData.consumedMerchants))
            localStorage.setItem('merchant', JSON.stringify(responseData.currentMerchant))
            localStorage.setItem('preferDesigner', JSON.stringify(responseData.preferDesigner))
            responseData.isLineBinded !== undefined && localStorage.setItem('isLineBinded', JSON.stringify(responseData.isLineBinded))

            this.modalContent = '登入成功'
            this.timer = 1500
            this.status = 'success'
            this.showModal = true
            setTimeout(() => {
              if (this.step === 2) {
                let url = '/password'
                if (pageLinks.includes(this.$route.query.to)) {
                  url += `?to=${this.$route.query.to}&arrowDisplay=true`;
                }
                this.$router.push(url)
              } else {
                let url = '/member'
                if (pageLinks.includes(this.$route.query.to)) {
                  url = `/member/${this.$route.query.to}?arrowDisplay=true`;
                }
                this.$router.push(url)
              }
            }, 500);
          }
          this.isLogin = false
        })
        .catch((err) => {
          this.isLogin = false
          console.log(err)
        })
    },
    forgetPassword() {
      this.step = 2
    }
  },
  mounted() {
    document.body.addEventListener('dblclick', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    window.addEventListener('load', function () {
      if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker
          .register('sw.js')
          .then(() => { console.log('Service Worker 設定完成'); })
          .catch(() => { console.log('Service Worker 設定失敗'); });
      }
    })

    this.merchantId = this.$route.query.merchantId || null

  }
}
</script>

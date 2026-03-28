<template>
  <section>
    <div class="w-full max-w-[768px] mx-auto mt-10 lg:mt-[9.5rem] md:px-0">
      <p class="text-center font-extrabold mb-4">留下資料以便設計師聯絡您☺️</p>
      <OrderDetailCollapse v-if="OrderDetailCollapse"/>
      <div data-aos="fade-up" data-aos-once="true" data-aos-delay="250" data-aos-duration="700" class="mt-4 card flex flex-col w-full justify-start">
        <ValidationObserver v-if="!cusDataDisplay" v-slot="{ handleSubmit }" class="p-5 md:p-9">
          <form @submit.prevent="handleSubmit(step === 1 ? handleChangeStep : login)">
            <label v-pre for="phoneInput" class="text-gray-dark text-md">手機：</label>
            <div class="form-group relative mb-10 mt-2">
              <ValidationProvider name="手機" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                <input :readonly="readonly" ref="phoneRef" v-model="cellphone" onpaste="return false" maxlength="10"
                  id="phoneInput" type="tel" class="form-control form-control-sm form-control-solid"
                  :class="{ 'border border-danger': errors.length > 0 }">
                <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{
                  errors[0] }}</span>
              </ValidationProvider>
            </div>

            <template v-if="step === 2">
              <label v-pre for="verifyInput" class="text-gray-dark text-md">驗證碼：</label>
              <div class="form-group relative mb-10 mt-2">
                <ValidationProvider name="驗證碼" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                  <input v-model="member.verifyCode" minlength="5" maxlength="5" id="verifyInput" type="tel"
                    class="form-control form-control-sm form-control-solid">
                  <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{
                    errors[0] }}</span>
                  <button @click="getVerifyCode" type="button" :disabled="getCodeWaitingTimer || getingCode"
                    :class="{ 'bg-mm-primary': !getCodeWaitingTimer, 'bg-gray': getCodeWaitingTimer || getingCode }"
                    class="absolute right-0 bottom-0 h-full p-2.5 text-white text-sm rounded-[0_30px_30px_0] flex items-center gap-1">
                    <i v-if="getingCode" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                    取得驗證碼
                    <p v-if="getCodeWaitingTimer">({{ getCodeWaitingTimer }})</p>
                  </button>
                </ValidationProvider>
              </div>
            </template>

            <template v-if="step === 3">
              <label v-pre for="verifyInput" class="text-gray-dark text-md">密碼：</label>
              <div class="form-group relative mt-2">
                <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                  <input v-model="member.password" id="verifyInput" type="password"
                    class="form-control form-control-sm form-control-solid"
                    :class="{ 'border border-danger': errors.length > 0 }">
                  <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{
                    errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="flex justify-end py-1">
                <p @click="forgetPassword" class="cursor-pointer italic text-gray-600 text-sm font-light">忘記密碼</p>
              </div>
            </template>

            <template v-if="step === 1">
              <button v-if="nextButton" type="submit"
                class="mx-auto md:max-w-[450px] w-full py-3 text-white text-sm mt-10 bg-mm-accent rounded-mm shadow-md flex justify-center items-center gap-3 duration-300"
              >
                {{  nextButtonLabel }}
              </button>
              <button v-if="lineButton" @click.prevent="lineLogin"
                class="mx-auto md:max-w-[450px] relative w-full py-3 text-white text-sm mt-5 bg-[#06C755] rounded-mm shadow-md flex justify-center items-center gap-3 duration-300"
              >
              <span class=" absolute -top-9 text-xs text-danger "v-if="(!isNewCus && !isPasswordSet && isLineBinded)">
                此電話號碼僅可使用LINE登入<br/>
                請點選下方按鈕
              </span>
                {{(isNewCus && !cellphoneRegex) ? '使用LINE註冊' : 'LINE登入'}}
              </button>
            </template>

            <template v-if="step !== 1">
              <button :disabled="isLogin" type="submit"
                class="mx-auto md:max-w-[450px] w-full py-3 text-white text-sm mt-10 bg-mm-accent rounded-mm shadow-md flex justify-center items-center gap-3 duration-300"
                :class="{ 'bg-gray': isLogin }">
                <i v-if="isLogin" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                預約
              </button>
            </template>
          </form>
        </ValidationObserver>
        <ValidationObserver v-slot="{ handleSubmit }" v-if="cusDataDisplay">
          <form @submit.prevent="handleSubmit(SMSVerifyAndBooking)">
            <div class="card-body flex flex-col text-sm gap-4 !p-5 md:p-9">

              <!-- 手機 -->
              <ValidationProvider name="手機" rules="required|onlyNumber" v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                    <label for="phoneInput">
                      <p>電話</p>
                    </label>
                  </div>
                  <div class="relative col-span-3 md:col-span-2">
                    <input disabled id="phoneInput" type="tel" maxlength="10" v-model="cellphone"
                      class="form-control form-control-sm form-control-solid !bg-transparent !border-none"
                      :class="{ 'border border-danger': errors.length > 0 }" />
                  </div>
                </div>
              </ValidationProvider>

              <!-- 姓名 -->
              <ValidationProvider name="姓名" rules="required|max:20" v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                    <label for="nameInput">
                      <p>姓名<sup class="ml-1" style="color:red">*</sup></p>
                    </label>
                  </div>
                  <div class="relative col-span-3 md:col-span-2">
                    <input id="nameInput" type="text" maxlength="20" v-model="name"
                      class="form-control form-control-sm form-control-solid"
                      :class="{ 'border border-danger': errors.length > 0 }" />
                    <span class="text-danger text-xs" v-if="errors.length > 0">姓名為必填</span>
                  </div>
                </div>
              </ValidationProvider>
  
              <div class="grid grid-cols-3 items-center">
                <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                  <p>性別<sup class="ml-1" style="color:red">*</sup></p>
                </div>
                <ValidationProvider rules="oneOf:MALE,FEMALE" :name="gender" v-slot="{ errors }"
                  class="col-span-3 md:col-span-2 mt-2">
                  <div class="flex items-center gap-7">
                    <div class="flex items-center gap-2">
                      <input type="radio" v-model="gender" id="genderMale" value="MALE"
                        class="w-4 h-4 bg-gray-100 border-gray-300 accent-mm-accent focus:outline-none focus:ring-1 focus:ring-mm-accent" />
                      <label for="genderMale">男</label>
                    </div>
  
                    <div class="flex items-center gap-2">
                      <input type="radio" v-model="gender" id="genderFemale" value="FEMALE"
                        class="w-4 h-4 bg-gray-100 border-gray-300 accent-mm-accent focus:outline-none focus:ring-1 focus:ring-mm-accent" />
                      <label for="genderFemale">女</label>
                    </div>
  
                    <span class="text-danger text-sm" v-if="errors.length > 0">請輸入性別</span>
                  </div>
                </ValidationProvider>
              </div>

              <!-- 暱稱 -->
              <ValidationProvider v-if="checkDisplay('NICKNAME')" name="暱稱" rules='required' v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div class="col-span-3 md:col-span-1 py-2.5">
                    <p>暱稱<sup class="ml-1" style="color:red">*</sup></p>
                  </div>
                  <div class="col-span-3 md:col-span-2">
                    <input type="text" v-model="nickName"
                      class="form-control form-control-sm form-control-solid" 
                      :class="{ 'border border-danger': errors.length > 0 }" />
                    <span class="text-danger text-xs" v-if="errors.length > 0">暱稱為必填</span>
                  </div>
                </div>
              </ValidationProvider>

              <!-- email -->
              <ValidationProvider v-if="checkDisplay('EMAIL')" rules='required|email' name="Email" v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div class="col-span-3 md:col-span-1 py-2.5">
                    <label for="emailInput">
                      <p>Email<sup class="ml-1" style="color:red">*</sup></p>
                    </label>
                  </div>
                  <div class="relative col-span-3 md:col-span-2">
                    <input id="emailInput" type="email" v-model="email"
                      class="form-control form-control-sm form-control-solid"
                      :class="{ 'border border-danger': errors.length > 0 }" />
                    <span class="text-danger text-xs" v-if="errors.length > 0">{{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>

              <!-- Line ID -->
              <ValidationProvider v-if="checkDisplay('LINEID')" rules='required' name="lineID" v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div class="col-span-3 md:col-span-1 py-2.5">
                    <p>Line ID<sup class="ml-1" style="color:red">*</sup></p>
                  </div>
                  <div class="col-span-3 md:col-span-2">
                    <input type="text" v-model="lineId" class="form-control form-control-sm form-control-solid" 
                    :class="{ 'border border-danger': errors.length > 0 }" />
                    <span class="text-danger text-xs" v-if="errors.length > 0">Line ID為必填</span>
                  </div>
                </div>
              </ValidationProvider>

              <!-- 生日 -->
              <ValidationProvider v-if="checkDisplay('BIRTHDAY')" name="birthday" rules='required' v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div class="col-span-3 md:col-span-1 py-2.5">
                    <p>生日<sup class="ml-1" style="color:red">*</sup></p>
                  </div>
                  <div class="col-span-3 md:col-span-2">
                    <v-date-picker locale="zh-TW" :first-day-of-week="2" v-model="birthday" mode="date">
                      <template v-slot="{ inputEvents, inputValue }">
                        <p v-on="inputEvents"
                          class="flex w-full p-3 justify-between items-center gap-3 rounded-mm bg-gray-light"
                          :class="{ 'border border-danger': errors.length > 0 }" >
                          <input type="text" v-model="inputValue" hidden>
                          <span v-formatDate="'date'">{{ inputValue }}</span>
                          <span class="text-mm-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              class="bi bi-calendar-week" viewBox="0 0 16 16">
                              <path
                                d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                              <path
                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                            </svg>
                          </span>
                        </p>
                        <span class="text-danger text-xs" v-if="errors.length > 0">生日為必填</span>
                      </template>
                    </v-date-picker>
                  </div>
                </div>
              </ValidationProvider>

              <!-- 地址 -->
              <ValidationProvider v-if="checkDisplay('ADDRESS')" rules='required' name="address" v-slot="{ errors }">
                <div class="grid grid-cols-3 items-center">
                  <div class="col-span-3 md:col-span-1 py-2.5">
                    <p>地址<sup class="ml-1" style="color:red">*</sup></p>
                  </div>
                  <div class="col-span-3 md:col-span-2">
                    <input type="text" v-model="address" class="form-control form-control-sm form-control-solid" 
                    :class="{ 'border border-danger': errors.length > 0 }" />
                    <span class="text-danger text-xs" v-if="errors.length > 0">地址為必填</span>
                  </div>
                </div>
              </ValidationProvider>

              <label v-pre for="verifyInput" class="text-gray-dark text-md mt-4">驗證碼：</label>
              <div class="form-group relative mb-10 mt-2">
                <ValidationProvider name="驗證碼" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                  <input v-model="member.verifyCode" minlength="5" maxlength="5" id="verifyInput" type="tel"
                    class="form-control form-control-sm form-control-solid">
                  <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-danger text-xs">{{
                    errors[0] }}</span>
                  <button @click="getVerifyCode" type="button" :disabled="getCodeWaitingTimer || getingCode"
                    :class="{ 'bg-mm-primary': !getCodeWaitingTimer, 'bg-gray': getCodeWaitingTimer || getingCode }"
                    class="absolute right-0 bottom-0 h-full p-2.5 text-white text-sm rounded-[0_30px_30px_0] flex items-center gap-1">
                    <i v-if="getingCode" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                    取得驗證碼
                    <p v-if="getCodeWaitingTimer">({{ getCodeWaitingTimer }})</p>
                  </button>
                </ValidationProvider>
              </div>

              <button :disabled="btnDisabled" type="submit"
                class="mx-auto md:max-w-[450px] w-full py-3 text-white text-sm bg-mm-accent rounded-mm shadow-md flex justify-center items-center gap-3 duration-300"
                :class="{ 'bg-gray': btnDisabled }">
                <i v-if="btnDisabled" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                送出預約
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <StatusModal :showModal="showModal" :content="modalContent" @close="closeModal" :timeout="timer" :status="status" />
  </section>
</template>

<script>

export default {
  name: 'LoginData',
  data() {
    return {
      member: {
        phone: '',
        verifyCode: '',
        password: '',
        perferDesignerOnset: false
      },
      memberInfo: {},
      isLogin: false,
      getingCode: false,
      getingPassword: false,
      getCodeWaitingTimer: null,
      step: 1,
      isNewCus: false,
      isPasswordSet: false,
      cusDataDisplay: false,
      showModal: false,
      orderId: '',
      modalContent: '',
      timer: 0,
      status: 'success',
      btnDisabled: false,
      preferDesignerOnSet: false,
      cellphoneRegex: true,
      isLineBinded: false,
      OrderDetailCollapse: false,
      nextButton: false,
      lineButton: true
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    readonly() {
      return this.step !== 1
    },
    cellphone: {
      get() {
        return this.$store.state.appointmentData.newCusData.cellphone
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'cellphone', value })
      }
    },
    gender: {
      get() {
        return this.$store.state.appointmentData.newCusData.gender
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'gender', value })
      }
    },
    name: {
      get() {
        return this.$store.state.appointmentData.newCusData.name
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'name', value })
      }
    },
    address: {
      get() {
        return this.$store.state.appointmentData.newCusData.address
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'address', value })
      }
    },
    birthday: {
      get() {
        return this.$store.state.appointmentData.newCusData.birthday
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'birthday', value })
      }
    },
    email: {
      get() {
        return this.$store.state.appointmentData.newCusData.email
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'email', value })
      }
    },
    lineId: {
      get() {
        return this.$store.state.appointmentData.newCusData.lineId
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'lineId', value })
      }
    },
    nickName: {
      get() {
        return this.$store.state.appointmentData.newCusData.nickName
      },
      set(value) {
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'nickName', value })
      }
    },
    checkDisplay() {
      return (type) => {
        return this.$store.state.appointmentData.requiredInput.includes(type)
      }
    },
    nextButtonLabel() {
      if (this.isNewCus && !this.isPasswordSet && !this.isLineBinded) {
        this.lineButton = true
        return '註冊'
      } else if (!this.isNewCus && !this.isPasswordSet && !this.isLineBinded) {
        this.lineButton = false
        return '登入'
      } else if (!this.isNewCus && this.isPasswordSet && !this.isLineBinded) {
        this.lineButton = false
        return '預約'
      } else if (!this.isNewCus && !this.isPasswordSet && this.isLineBinded) {
        this.lineButton = true
        this.nextButton = false
        return '登入'
      } else if (!this.isNewCus && this.isPasswordSet && this.isLineBinded) {
        this.lineButton = true
        return '密碼登入'
      }
    }
  },
  methods: {
    async SMSVerifyAndBooking() {
      this.btnDisabled = true
      await this.handleSetCacheData()
      const input = {
        cellphone: this.cellphone,
        code: this.member.verifyCode
      }
      if (this.$route.query.getLineData === 'true') {
        if (this.$store.state.appointmentData.lineAvatar) {
          input.lineAvatar = this.$store.state.appointmentData.lineAvatar
        }
        input.lineUserId = this.$store.state.appointmentData.lineUserId
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
      try {
        const res = await this.$api.customerVerifySMSWithTKN(input, needKey)
        if (!res.hasError) {
          this.isPasswordSet = false
          this.$cookieMethods.setToken(res.data.customerVerifySMSWithTKN.token)
          localStorage.setItem('allMerchants', JSON.stringify(res.data.customerVerifySMSWithTKN.merchants))
          localStorage.setItem("isNewCustomer", JSON.stringify(res.data.customerVerifySMSWithTKN.isNewCustomer));
          let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
          localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
          await this.api.updateCustomerCuttentMerchant(this.$store.state.appointmentData.merchantId)
          await this.customerSelfUpdate()
          await this.customerGetCurrentMerchantSetting()
          if (this.$store.state.appointmentData.designerId === 1 || this.$store.state.appointmentData.designerId === '1') {
            await this.handleNonDesignationBooking()
          } else {
            await this.handleBooking()
          }
        } else {
          this.btnDisabled = false
        }
      } catch (error) {
        this.btnDisabled = false
        console.log(error)
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    handleChangeStep() {
      if (this.isNewCus && !this.isPasswordSet && !this.isLineBinded) {
        this.cusDataDisplay = true
      } else if (!this.isNewCus && !this.isPasswordSet && !this.isLineBinded) {
        this.step = 2
      } else if (!this.isNewCus && this.isPasswordSet && !this.isLineBinded) {
        this.step = 3
      } else if (!this.isNewCus && this.isPasswordSet && this.isLineBinded) {
        this.step = 3
      }
    },
    async login() {
      if (this.step === 1) {
        this.getingPassword = true
        try {
          await this.handleSetCacheData()
          const res = await this.$api.customerExistStatusNoLogin({
            cellphone: this.cellphone,
            storeId: this.$store.state.appointmentData.merchantId
          })
          const { isNewCus, isPasswordSet, isPreferDesignerSet, isLineBinded } = res.data.customerExistStatusNoLogin
          this.isPasswordSet = isPasswordSet
          this.isNewCus = isNewCus
          this.preferDesignerOnSet = isPreferDesignerSet
          this.isLineBinded = isLineBinded
          this.getingPassword = false
        } catch (error) {
          console.log('error: ', error);
          this.getingPassword = false
          this.modalContent = error.message
          this.timer = 1500
          this.status = 'error'
          this.showModal = true
        }
        return
      }
      if (this.isLogin) return

      this.isLogin = true

      const input = {
        cellphone: this.cellphone,
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
        try {
          if (this.$route.query.getLineData === 'true') {
            if (this.$store.state.appointmentData.lineAvatar) {
              input.lineAvatar = this.$store.state.appointmentData.lineAvatar
            }
            input.lineUserId = this.$store.state.appointmentData.lineUserId
          }
          const res = await this.$api.customerVerifySMSWithTKN(input, needKey)
          if (!res.hasError) {
            this.isPasswordSet = false
            this.$cookieMethods.setToken(res.data.customerVerifySMSWithTKN.token)
            localStorage.setItem('allMerchants', JSON.stringify(res.data.customerVerifySMSWithTKN.merchants))
            localStorage.setItem("isNewCustomer", JSON.stringify(res.data.customerVerifySMSWithTKN.isNewCustomer));
            let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
            localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
            await this.api.updateCustomerCuttentMerchant(this.$store.state.appointmentData.merchantId)
            if (this.isNewCus) {
              await this.customerSelfUpdate()
            }
            await this.customerGetCurrentMerchantSetting()
            if (this.$store.state.appointmentData.timestamp) {
              this.$store.dispatch('appointmentData/handleSetTime', { time: '', timestamp: this.$store.state.appointmentData.timestamp || this.$store.state.appointmentData.cacheTimeStamp })
            }
            if (this.$store.state.appointmentData.designerId === 1 || this.$store.state.appointmentData.designerId === '1') {
              await this.handleNonDesignationBooking()
            } else {
              await this.handleBooking()
            }
          } else {
            this.isLogin = false
          }
        } catch (error) {
          this.isLogin = false
          console.log(error)
          this.showModal = true
          this.modalContent = error.message
          this.timer = 1500
          this.status = 'error'
        }
      } else if (this.step === 3) {
        try {
          const res = await this.$api.customerLoginWithPassword({
            cellphone: input.cellphone,
            password: this.member.password
          }, needKey)
          if (!res.hasError) {
            this.$cookieMethods.setToken(res.data.customerLoginWithPassword.token)
            localStorage.setItem('allMerchants', JSON.stringify(res.data.customerLoginWithPassword.merchants))
            localStorage.setItem("isNewCustomer", JSON.stringify(res.data.customerLoginWithPassword.isNewCustomer));
            let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
            localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
            await this.api.updateCustomerCuttentMerchant(this.$store.state.appointmentData.merchantId)
            await this.customerGetCurrentMerchantSetting()
            if (this.$store.state.appointmentData.timestamp) {
              this.$store.dispatch('appointmentData/handleSetTime', { time: '', timestamp: this.$store.state.appointmentData.timestamp || this.$store.state.appointmentData.cacheTimeStamp })
            }
            if (this.$store.state.appointmentData.designerId === 1 || this.$store.state.appointmentData.designerId === '1') {
              await this.handleNonDesignationBooking()
            } else {
              await this.handleBooking()
            }
          } else {
            this.isLogin = false
          }
        } catch (error) {
          this.isLogin = false
          console.log(error)
          this.showModal = true
          this.modalContent = error.message
          this.timer = 1500
          this.status = 'error'
        }
      }
    },
    async handleSetCacheData() {
      try {
        const res = await this.$api.cacheBookingData({
          input: {
            bookingData: {
              cellphone: this.cellphone,
              name: '',
              dateTime: this.$store.state.appointmentData.timestamp || this.$store.state.appointmentData.cacheTimeStamp,
              designerId: this.$store.state.appointmentData.designerId,
              merchantId: this.$store.state.appointmentData.merchantId,
              designerServiceIds: this.$store.state.appointmentData.designerServiceIds.map(({ id }) => id),
              remarkForCustomer: this.$store.state.appointmentData.remarkForCustomer
            },
            isNewCus: this.$store.state.appointmentData.isNewCus,
            newCusData: this.$store.state.appointmentData.newCusData,
            staticInfo: this.$store.state.appointmentData.staticData
          }
        })
        const orderToken = res.data.cacheBookingData
        window.localStorage.setItem('orderToken', orderToken)
      } catch (error) {
        console.log(error); 
        this.isLogin = false
        this.getingPassword = false
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    async customerGetCurrentMerchantSetting() {
      try {
        const res = await this.$api.customerGetCurrentMerchantSetting()
        if (!res.data.hasError) {
          const responseData = res.data.customerGetCurrentMerchantSetting
          localStorage.setItem('allMerchants', JSON.stringify(responseData.consumedMerchants))
          localStorage.setItem('merchant', JSON.stringify(responseData.currentMerchant))
          localStorage.setItem('preferDesigner', JSON.stringify(responseData.preferDesigner))
          responseData.isLineBinded !== undefined && localStorage.setItem('isLineBinded', JSON.stringify(responseData.isLineBinded))
        }
      } catch (error) {
        this.isLogin = false
        console.log(error)
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    //(指定)預約處理
    async handleBooking() {
      try {
        if (this.isSubmitting) return;

        this.isSubmitting = true;

        const personalData = await this.api.getCustomerPersonalData("name cellphone")
        this.$store.dispatch("indexCache/handleSetUserInfo", personalData.data.getCustomerPersonalData);
        const remark = this.$store.state.appointmentData.remarkForCustomer
        const service = this.$store.state.appointmentData.designerServiceIds
        const input = {
          designerId: this.$store.state.appointmentData.designerId,
          dateTime: this.$store.state.appointmentData.timestamp || this.$store.state.appointmentData.cacheTimeStamp,
          cellphone: this.$store.state.indexCache.userInfo.cellphone,
          merchantId: this.$store.state.appointmentData.merchantId,
          name: this.$store.state.indexCache.userInfo.name,
          reference: this.$store.state.appointmentData.reference,
          remarkForCustomer: `${service.map(item => item.name).join('、')} ${remark}`,
          designerServiceIds: service.map(({ id }) => id),
          companionCount: this.$store.state.appointmentData.companionCount,
        };
        const res = await this.api.bookingV2(input)
        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.bookingV2)
          );
          window.localStorage.removeItem('orderToken')
          this.orderId = res.data.bookingV2.id
          if (this.$store.state.appointmentData.setPreferDesigner && !this.preferDesignerOnSet) {
            await this.handleSetPreferDesigner()
          }
          this.showModal = true;
          this.modalContent = '預約成功'
          this.timer = 1500
          this.status = 'success'
        } else {
          this.$router.push('/member/appointment?getCacheData=true')
        }
      } catch (error) {
        console.log(error);
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    //(不指定)預約處理
    async handleNonDesignationBooking() {
      try {
        if (this.isSubmitting) return;

        this.isSubmitting = true;

        let cellphone = this.$store.state.indexCache.userInfo.cellphone;
        let name = this.$store.state.indexCache.userInfo.name;
        if (!cellphone || !name) {
          const res = await this.api.getCustomerPersonalData("name cellphone")
          this.$store.dispatch("indexCache/handleSetUserInfo", res.data.getCustomerPersonalData);
        }
        const remark = this.$store.state.appointmentData.remarkForCustomer
        const service = this.$store.state.appointmentData.designerServiceIds
        const input = {
          bookingDate: this.$store.state.appointmentData.timestamp || this.$store.state.appointmentData.cacheTimeStamp,
          cellphone: this.$store.state.indexCache.userInfo.cellphone,
          customerName: this.$store.state.indexCache.userInfo.name,
          storeId: this.$store.state.appointmentData.merchantId,
          remarkForCustomer: `${service.map(item => item.name).join('、')} ${remark}`,
          bookingItemIds: service.map(({ id }) => id),
        };
        const res = await this.api.nonDesignationBooking(input)
        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.nonDesignationBooking)
          );
          this.orderId = res.data.nonDesignationBooking.id
          this.showModal = true
          this.modalContent = '預約成功'
          this.status = 'success'
        } else {
          this.$router.push('/member/appointment?getCacheData=true')
        }
      } catch (error) {
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    async getVerifyCode() {
      this.getingCode = true;

      this.$api
        .customerLoginSMSWithTKN(this.cellphone, this.merchantId, this.designerId)
        .then((res) => {
          this.getingCode = false;
          this.getCodeWaitingTimer = 60;

          const timer = setInterval(() => {
            if (this.getCodeWaitingTimer <= 1) {
              clearInterval(timer);
              this.getCodeWaitingTimer = null;
            } else {
              this.getCodeWaitingTimer--;
            }
          }, 1000);

          if (!res.hasError) {
            this.status = 'success'
            this.modalContent = `已傳送簡訊至${this.cellphone}`
            this.timer = 1500
            this.showModal = true
          } else {
            clearInterval(timer);
            this.getCodeWaitingTimer = null;
          }
        })
        .catch((error) => {
          clearInterval(timer);
          this.getCodeWaitingTimer = null;
          this.getingCode = false;
          this.status = 'error'
          this.modalContent = '發生錯誤，請稍後再試'
          this.timer = 1500
          this.showModal = true
        });
    },
    async customerSelfUpdate() {
      const isNewCustomer = JSON.parse(localStorage.getItem("isNewCustomer"));
      const merchantId = this.$store.state.appointmentData.merchantId;
      const inputData = {
        name: this.name,
        gender: this.gender,
        nickName: ''
      };
      const inputArr = ['nickName', 'lineId', 'email', 'birthday', 'address']

      inputArr.forEach(element => {
        if (this[element]) {
          inputData[element] = (element === 'birthday') ? new Date(this[element]).getTime() : this[element]
        }
      });

      let resp = await this.api.customerSelfUpdate(inputData, "category");
      if (resp.hasError) return;
      if (isNewCustomer && merchantId) {
        await this.api.applyCustomerPersoanlDataToMerchant({ merchantId: merchantId });
      }
      if (isNewCustomer) localStorage.setItem("isNewCustomer", false);
    },
    async handleSetPreferDesigner() {
      await this.api.updateCustomerPreferDesigner(
        this.$store.state.appointmentData.designerId,
        this.$store.state.appointmentData.merchantId
      )
    },
    async getCachedBookingData (token) {
      try {
        const res = await this.$api.getCachedBookingData({ token })
        if (res.data) {
          const {
            bookingData, newCusData, isNewCus, staticInfo
          } = res.data.getCachedBookingData
          const {
            designerId, designerServiceIds, merchantId, dateTime,
            remarkForCustomer
          } = bookingData
          this.$store.dispatch('appointmentData/handleSetStaticData', staticInfo)
          const staticData = JSON.parse(staticInfo)
          const { name } = JSON.parse(window.localStorage.getItem("merchant"))
          const appointmentData = {
            merchantId: merchantId,
            merchantName: name,
            designerId: designerId,
            designerName: '',
            designerNickName: ''
          }
          if (staticInfo) {
            const filtsService = staticData.serviceItem.filter(({ id }) => designerServiceIds.includes(`${id}`))
            appointmentData.designerName = staticData.designerName
            this.$store.dispatch('appointmentData/handleSetService', filtsService)
          }
          this.$store.dispatch('appointmentData/handleSetDesignerAndMerchant', appointmentData)
          this.$store.dispatch('appointmentData/handleSetCacheTimeStamp', dateTime)
          this.$store.dispatch('appointmentData/handleSetRemarkForCustomer', remarkForCustomer)
          if (this.$route.query.getLineData === 'true') {
            const cusData = {...this.$store.state.appointmentData.newCusData, cellphone: newCusData.cellphone}
            this.$store.dispatch('appointmentData/handleSetNewCusData', { isNewCus, newCusData: cusData })
          } else {
            this.$store.dispatch('appointmentData/handleSetNewCusData', { isNewCus, newCusData })
          }
        } else {
          window.localStorage.removeItem('orderToken')
        }
      } catch (error) {
        console.log(error)
      }
    },
    forgetPassword() {
      this.step = 2
    },
    closeModal() {
      this.isSubmitting = false;
      this.showModal = false;
      if (this.modalContent === '預約成功') {
        let url = `check/${this.orderId}`
        if (this.isNewCus) {
          url += '?isNewCus=true'
        } else if (!this.isPasswordSet) {
          url += '?setPassword=true'
        }
        this.$router.push(url);
      } else {
        this.btnDisabled = false
      }
    },
    async handleGetBindLink() {
      this.$store.dispatch("loading/isLoading", true);
      const res = await this.api.getLineBindLinkForCustomer(this.$store.state.appointmentData.merchantId);
      const link = res.data.getLineBindLinkForCustomer
      let url = `${window.location.origin}/lineRedirect`;
      if (this.isNewCus) {
        url += '?getLineData=true'
      }
      window.location.href = link +`&redirect_uri=${url}`
    },
    async lineLogin() {
      await this.handleSetCacheData()
      await this.handleGetBindLink()
    },
  },
  async mounted() {
    const token = window.localStorage.getItem('orderToken')
    if (this.$route.query.fromLINE === 'true' && token) {
      await this.getCachedBookingData(token)
      this.OrderDetailCollapse = true
    }
    this.OrderDetailCollapse = true
    if (this.$route.query.getLineData === 'true') {
      this.cusDataDisplay = true
    }
  },
  watch: {
    cellphone: {
      async handler() {
        this.cellphoneRegex = !this.cellphone.match(/^09\d{8}$/)
        if (this.cellphoneRegex) {
          this.lineButton = true
          this.nextButton = false
        } else {
          await this.login()
          this.nextButton = true
        }
      },
      immediate:true
    }
  }
}
</script>
<template>
  <!-- 這頁是在處理，如果消費者直接帶入帶有店家ID、消費者ID參數網址登入時的動作 -->
  <section class="min-h-screen bg-white flex flex-col">
    <client-only v-if="!isLoading">
      <!-- Header: Logo 居中 -->
      <div class="w-full border-b border-gray-100 py-4 px-6">
        <div class="max-w-[768px] mx-auto flex justify-center">
          <img v-bind:src="'/logo.png'" alt="Meimate" class="w-36 h-10 object-contain">
        </div>
      </div>

      <!-- 主內容區 -->
      <div class="flex-1 w-full max-w-[768px] mx-auto px-6 md:px-8 pt-10 pb-8">
        <!-- 歡迎語 -->
        <div class="mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">Hi,</h1>
          <h2 class="text-lg md:text-xl text-gray-400 leading-relaxed mt-1">今天想做什麼服務呢？</h2>
        </div>

        <!-- 表單卡片 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">手機登入</h3>
          <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(login)">
                <label v-pre for="phoneInput" class="text-gray-500 text-sm font-medium mb-2 block">手機號碼</label>
                <div class="form-group relative mb-6">
                  <ValidationProvider name="手機" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                    <input :readonly="readonly" ref="phoneRef" v-model="member.phone" onpaste="return false" maxlength="10"
                      id="phoneInput" type="tel"
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200"
                      placeholder="請輸入手機號碼"
                      :class="{ '!border-red-400': errors.length > 0 }">
                    <span v-if="errors.length > 0" class="absolute left-3 -bottom-5 text-red-400 text-xs">{{
                      errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <template v-if="step === 2">
                  <label v-pre for="verifyInput" class="text-gray-500 text-sm font-medium mb-2 block">驗證碼</label>
                  <div class="form-group relative mb-6">
                    <ValidationProvider name="驗證碼" rules="required|onlyNumber" v-slot="{ errors }" class="w-full">
                      <input v-model="member.verifyCode" minlength="5" maxlength="5" id="verifyInput" type="tel"
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200"
                        placeholder="請輸入驗證碼">
                      <span v-if="errors.length > 0" class="absolute left-3 -bottom-5 text-red-400 text-xs">{{
                        errors[0] }}</span>
                      <button @click="getVerifyCode" type="button" :disabled="getCodeWaitingTimer || getingCode"
                        :class="{ 'bg-gmb-orange-500': !getCodeWaitingTimer, 'bg-gray-300': getCodeWaitingTimer || getingCode }"
                        class="absolute right-1 top-1 bottom-1 px-4 text-white text-sm rounded-lg flex items-center gap-1">
                        <i v-if="getingCode" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                        取得驗證碼
                        <p v-if="getCodeWaitingTimer">({{ getCodeWaitingTimer }})</p>
                      </button>
                    </ValidationProvider>
                  </div>
                </template>

                <template v-if="step === 3">
                  <label v-pre for="verifyInput" class="text-gray-500 text-sm font-medium mb-2 block">密碼</label>
                  <div class="form-group relative">
                    <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                      <input v-model="member.password" id="verifyInput" type="password"
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200"
                        placeholder="請輸入密碼"
                        :class="{ '!border-red-400': errors.length > 0 }">
                      <span v-if="errors.length > 0" class="absolute left-3 -bottom-5 text-red-400 text-xs">{{
                        errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="flex justify-end py-2">
                    <p @click="forgetPassword" class="cursor-pointer text-gmb-orange-500 text-sm font-medium">忘記密碼？</p>
                  </div>
                </template>

                <template v-if="step === 1">
                  <button :disabled="getingPassword" type="submit"
                    class="w-full py-3.5 text-white text-base font-semibold mt-4 bg-gmb-orange-500 rounded-xl flex justify-center items-center gap-3 active:bg-gmb-orange-600 shadow-lg shadow-gmb-orange-200"
                    :class="{ '!bg-gray-300 !shadow-none': getingPassword }">
                    <i v-if="getingPassword" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                    下一步
                  </button>
                </template>

                <template v-if="step !== 1">
                  <button :disabled="isLogin" type="submit"
                    class="w-full py-3.5 text-white text-base font-semibold mt-4 bg-gmb-orange-500 rounded-xl flex justify-center items-center gap-3 active:bg-gmb-orange-600 shadow-lg shadow-gmb-orange-200"
                    :class="{ '!bg-gray-300 !shadow-none': isLogin }">
                    <i v-if="isLogin" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                    登入
                  </button>
                </template>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
      <StatusModal :showModal="showModal" :content="modalContent" @close="handleColse" :timeout="timer"
        :status="status" />
    </client-only>
  </section>
</template>
<script>
import { getToken } from "@/plugins/cookies.js";
import pageLinks from "./../static/pageLinks.js";
export default {
  name: "login",
  data() {
    return {
      member: {
        phone: "",
        verifyCode: "",
      },
      isLogin: false,
      getingCode: false,
      getCodeWaitingTimer: null,
      token: getToken() || "",
      step: 1,
      passwordOnSet: false,
      getingPassword: false,
      merchantId: "",
      designerId: "",
      showModal: false,
      modalContent: '',
      timer: 0,
      status: 'success'
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    readonly() {
      return this.step !== 1
    }
  },
  methods: {
    getVerifyCode() {
      if (!this.member.phone) {
        this.status = 'error'
        this.modalContent = '請輸入手機號碼'
        this.timer = 1500
        this.showModal = true
        const phoneRef = this.$refs.phoneRef;
        phoneRef.focus();
      }

      this.getingCode = true;

      this.$api
        .customerLoginSMSWithTKN(this.member.phone, this.merchantId, this.designerId)
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
            this.modalContent = `已傳送簡訊至${this.member.phone}`
            this.timer = 1500
            this.showModal = true
          } else {
            clearInterval(timer);
            this.getCodeWaitingTimer = null;
          }
        })
        .catch((err) => {
          clearInterval(timer);
          this.getCodeWaitingTimer = null;
          this.getingCode = false;
          this.status = 'error'
          this.modalContent = '發生錯誤，請稍後再試'
          this.timer = 1500
          this.showModal = true
        });
    },


    //帶入網址時，尚未東入時執行
    async login() {
      if (this.step === 1) {
        this.getingPassword = true
        this.$api.checkIsCustomerPasswordSet(this.member.phone).then(res => {
          const onSet = res.data.checkIsCustomerPasswordSet
          if (onSet !== null) {
            this.passwordOnSet = onSet
            this.step = onSet ? 3 : 2
          } else {
            this.getingPassword = false
          }
        }).catch(error => {
          this.getingPassword = false
        })
        return
      }
      if (this.isLogin) return;
      this.isLogin = true;
      const input = {
        cellphone: this.member.phone,
        code: this.member.verifyCode,
      };
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
      `;

      try {
        if (this.step === 2) {
          const SMSLoginRes = await this.$api.customerVerifySMSWithTKN(input, needKey)
          this.setLocalStorageData(SMSLoginRes, 'customerVerifySMSWithTKN')

          await this.api.updateCustomerCuttentMerchant(this.merchantId)

          if (this.designerId) {
            await this.api.updateCustomerPreferDesigner(this.designerId, this.merchantId)
          }
          
          const merchantSettingRes = await this.api.customerGetCurrentMerchantSetting()
          const dt = merchantSettingRes.data.customerGetCurrentMerchantSetting;
          this.setLocalStorage(dt)
          this.alertLoginSuccess()

        } else if (this.step === 3) {
          const passLoginRes = await this.$api.customerLoginWithPassword({
            cellphone: input.cellphone,
            password: this.member.password
          }, needKey)
          this.setLocalStorageData(passLoginRes, 'customerLoginWithPassword')

          await this.api.updateCustomerCuttentMerchant(this.merchantId)

          if (this.designerId) {
            await this.api.updateCustomerPreferDesigner(this.designerId, this.merchantId)
          }
          const merchantSettingRes = await this.api.customerGetCurrentMerchantSetting()
          const dt = merchantSettingRes.data.customerGetCurrentMerchantSetting;
          this.setLocalStorage(dt)
          this.alertLoginSuccess()
        }
      } catch (error) {
        this.isLogin = false;
      }
    },
    setLocalStorageData(data, key) {
      this.$cookieMethods.setToken(data.data[key].token);
      localStorage.setItem("allMerchants", JSON.stringify(data.data[key].merchants));
      localStorage.setItem("isNewCustomer", JSON.stringify(data.data[key].isNewCustomer));
      let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
      localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
    },
    //帶入網址時，已經是登入狀態執行
    updateCurrentMerchantAndDesigner() {
      this.api.updateCustomerCuttentMerchant(this.merchantId)
        .then(async () => {
          if (!this.designerId) {
            await this.ifhasLoginGetCurrentMerchantSetting()
            return;
          }
          await this.api.updateCustomerPreferDesigner(this.designerId, this.merchantId)
            .then(async () => {
              await this.ifhasLoginGetCurrentMerchantSetting()
            });
        })
        .catch((err) => {
          this.isLogin = false;
        });
    },
    //登入狀態時必須取得目前資料
    async ifhasLoginGetCurrentMerchantSetting() {
      await this.api.customerGetCurrentMerchantSetting()
        .then((res) => {
          if (!res.data.hasError) {
            const dt = res.data.customerGetCurrentMerchantSetting;
            this.setLocalStorage(dt)
            this.saveDataAndDoRouter();
          }
        });
    },
    setLocalStorage(dt) {
      localStorage.setItem("allMerchants", JSON.stringify(dt.consumedMerchants));
      localStorage.setItem("merchant", JSON.stringify(dt.currentMerchant));
      localStorage.setItem("preferDesigner", JSON.stringify(dt.preferDesigner));
      dt.isLineBinded !== undefined && localStorage.setItem('isLineBinded', JSON.stringify(dt.isLineBinded))
    },
    async alertLoginSuccess() {
      this.status = 'success'
      this.modalContent = '登入成功'
      this.timer = 1500
      this.showModal = true
    },
    saveDataAndDoRouter() {
      const merchant = JSON.parse(localStorage.getItem("merchant")) || {};
      const designer = JSON.parse(localStorage.getItem("preferDesigner"));
      
      const data = {
        merchantId: merchant.id,
        merchantName: merchant.name,
        designerId: designer ? designer.id : "",
        designerName: designer ? designer.name : "",
        designerNickName: designer ? designer.nickName : "",
      };
      
      this.$store.dispatch("appointmentData/handleSetDesignerAndMerchant", data);
      this.isLogin = false;
      if (this.step === 2) {
        let url = '/password?toAppointment=true'
        if (pageLinks.includes(this.$route.query.to)) {
          url += `&to=${this.$route.query.to}&arrowDisplay=true`;
        }
        this.$router.push(url)
      } else {
        let url = '/member'
        if (pageLinks.includes(this.$route.query.to)) {
          url = `/member/${this.$route.query.to}?arrowDisplay=true`;
          if (this.$route.query.to === 'appointment') {
            url += '&getLoginCacheData=true'
          }
        }
        this.$router.push(url)
      }
    },
    forgetPassword() {
      this.step = 2
    },
    handleColse() {
      this.showModal = false
      if (this.modalContent === '登入成功') {
        this.saveDataAndDoRouter();
      }
    }
  },

  mounted() {
    this.$store.dispatch("loading/isLoading", true);

    this.merchantId = this.$route.query.merchantId || null;
    this.designerId = this.$route.query.designerId || null;

    if (!this.token) this.$store.dispatch("loading/isLoading", false);
    else this.updateCurrentMerchantAndDesigner();
  },
};
</script>

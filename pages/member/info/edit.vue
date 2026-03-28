<template>
  <section id="firstPos" v-if="!isLoading" class="w-full max-w-[768px] mx-auto pb-20 bg-gray-50/50 min-h-screen">
    <div class="px-5 pt-6 w-full">
      <!-- 頂端導覽列 + 返回按鈕 -->
      <div class="flex items-center justify-between mb-6 relative">
        <button @click="$router.back()" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 transition-colors z-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500 absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">修改個人資料</h1>
        <div class="w-10 pointer-events-none"></div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" data-aos="fade-up" data-aos-duration="300" data-aos-once="true">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(customerSelfUpdate)">
            <div class="flex flex-col text-sm gap-5 p-5 md:p-7">
            <!-- 姓名 -->
            <ValidationProvider name="姓名" rules="required|max:20" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                  <label for="nameInput">
                    <p>姓名<sup class="ml-1" style="color:red">*</sup></p>
                  </label>
                </div>
                <div class="relative col-span-3 md:col-span-2">
                  <input id="nameInput" type="text" maxlength="20" v-model="memberInfo.name"
                    class="form-control form-control-sm form-control-solid"
                    :class="{ 'border border-danger': errors.length > 0 }" />
                  <span class="text-danger text-xs" v-if="errors.length > 0">姓名為必填</span>
                </div>
              </div>
            </ValidationProvider>

            <!-- 手機 -->
            <ValidationProvider name="手機" rules="required|onlyNumber" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                  <label for="phoneInput">
                    <p>電話</p>
                  </label>
                </div>
                <div class="relative col-span-3 md:col-span-2">
                  <input disabled id="phoneInput" type="tel" maxlength="10" v-model="memberInfo.cellphone"
                    class="form-control form-control-sm form-control-solid"
                    :class="{ 'border border-danger': errors.length > 0 }" />
                </div>
              </div>
            </ValidationProvider>

            <!-- 暱稱 -->
            <ValidationProvider v-if="checkDisplay('NICKNAME')" name="暱稱" :rules="`${checkRequiredSymbol('NICKNAME') ? 'required' : ''}`" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div class="col-span-3 md:col-span-1 py-2.5">
                  <p>暱稱<sup v-if="checkRequiredSymbol('NICKNAME')" class="ml-1" style="color:red">*</sup></p>
                </div>
                <div class="col-span-3 md:col-span-2">
                  <input type="text" v-model="memberInfo.nickName"
                    class="form-control form-control-sm form-control-solid" 
                    :class="{ 'border border-danger': errors.length > 0 }" />
                  <span class="text-danger text-xs" v-if="errors.length > 0">暱稱為必填</span>
                </div>
              </div>
            </ValidationProvider>
            
            <!-- 性別 -->
            <div class="grid grid-cols-3 items-center">
              <div v-pre class="col-span-3 md:col-span-1 py-2.5">
                <p>性別<sup class="ml-1" style="color:red">*</sup></p>
              </div>
              <ValidationProvider rules="oneOf:MALE,FEMALE" :name="memberInfo.gender" v-slot="{ errors }"
                class="col-span-3 md:col-span-2 mt-2">
                <div class="flex items-center gap-7">
                  <div class="flex items-center gap-2">
                    <input type="radio" v-model="memberInfo.gender" id="genderMale" value="MALE"
                      class="w-4 h-4 bg-gray-100 border-gray-300 accent-mm-accent focus:outline-none focus:ring-1 focus:ring-mm-accent" />
                    <label for="genderMale">男</label>
                  </div>

                  <div class="flex items-center gap-2">
                    <input type="radio" v-model="memberInfo.gender" id="genderFemale" value="FEMALE"
                      class="w-4 h-4 bg-gray-100 border-gray-300 accent-mm-accent focus:outline-none focus:ring-1 focus:ring-mm-accent" />
                    <label for="genderFemale">女</label>
                  </div>

                  <span class="text-danger text-sm" v-if="errors.length > 0">請輸入性別</span>
                </div>
              </ValidationProvider>
            </div>

            <!-- email -->
            <ValidationProvider v-if="checkDisplay('EMAIL')" :rules="`${checkRequiredSymbol('EMAIL') ? 'required|email' : 'email'}`" name="Email" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div class="col-span-3 md:col-span-1 py-2.5">
                  <label for="emailInput">
                    <p>Email<sup v-if="checkRequiredSymbol('EMAIL')" class="ml-1" style="color:red">*</sup></p>
                  </label>
                </div>
                <div class="relative col-span-3 md:col-span-2">
                  <input id="emailInput" type="email" v-model="memberInfo.email"
                    class="form-control form-control-sm form-control-solid"
                    :class="{ 'border border-danger': errors.length > 0 }" />
                  <span class="text-danger text-xs" v-if="errors.length > 0">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>

            <!-- Line ID -->
            <ValidationProvider v-if="checkDisplay('LINEID')" :rules="`${checkRequiredSymbol('LINEID') ? 'required' : ''}`" name="lineID" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div class="col-span-3 md:col-span-1 py-2.5">
                  <p>Line ID<sup v-if="checkRequiredSymbol('LINEID')" class="ml-1" style="color:red">*</sup></p>
                </div>
                <div class="col-span-3 md:col-span-2">
                  <input type="text" v-model="memberInfo.lineId" class="form-control form-control-sm form-control-solid" 
                  :class="{ 'border border-danger': errors.length > 0 }" />
                  <span class="text-danger text-xs" v-if="errors.length > 0">Line ID為必填</span>
                </div>
              </div>
            </ValidationProvider>

            <!-- 生日 -->
            <ValidationProvider v-if="checkDisplay('BIRTHDAY')"  name="birthday" :rules="`${checkRequiredSymbol('BIRTHDAY') ? 'required' : ''}`" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div class="col-span-3 md:col-span-1 py-2.5">
                  <p>生日<sup v-if="checkRequiredSymbol('BIRTHDAY')" class="ml-1" style="color:red">*</sup></p>
                </div>
                <div class="col-span-3 md:col-span-2">
                  <v-date-picker locale="zh-TW" :first-day-of-week="2" v-model="memberInfo.birthday" mode="date">
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
            <ValidationProvider v-if="checkDisplay('ADDRESS')" :rules="`${checkRequiredSymbol('ADDRESS') ? 'required' : ''}`" name="address" v-slot="{ errors }">
              <div class="grid grid-cols-3 items-center">
                <div class="col-span-3 md:col-span-1 py-2.5">
                  <p>地址<sup v-if="checkRequiredSymbol('ADDRESS')" class="ml-1" style="color:red">*</sup></p>
                </div>
                <div class="col-span-3 md:col-span-2">
                  <input type="text" v-model="memberInfo.address" class="form-control form-control-sm form-control-solid" 
                  :class="{ 'border border-danger': errors.length > 0 }" />
                  <span class="text-danger text-xs" v-if="errors.length > 0">地址為必填</span>
                </div>
              </div>
            </ValidationProvider>
            </div>
            <div class="border-t border-gray-50 p-5 bg-gray-50/30">
              <button type="submit" class="w-full rounded-full py-3.5 bg-gmb-orange-500 text-white font-medium hover:bg-gmb-orange-600 transition-colors shadow-sm tracking-wide">
                儲存修改
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <StatusModal :showModal="showSuccessModal" content="編輯成功" @close="closeModal" />
  </section>
</template>

<script>
import Consumption from '../consumption.vue';
import pageLinks from "./../../../static/pageLinks.js";
export default {
  name: "member-info-edit",
  data() {
    return {
      attributes: {
        content: "#FEB401",
      },
      memberInfo: {},
      showSuccessModal: false,
      inputRequired: {
        display: true,
        requiredInputs: []
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    checkDisplay() {
      return (type) => {
        if (this.inputRequired.display) {
          return true
        } else {
          return this.inputRequired.requiredInputs.includes(type)
        }
      }
    },
    checkRequiredSymbol() {
      return (type) => {
        return this.inputRequired.requiredInputs.includes(type)
      }
    }
  },
  methods: {
    getCustomerPersonalData() {
      this.$store.dispatch("loading/isLoading", true);

      const needKey =
        "name, cellphone, nickName, gender, email, lineId, birthday, address";

      this.api
        .getCustomerPersonalData(needKey)
        .then((res) => {
          this.memberInfo = res.data.getCustomerPersonalData;
          if (this.memberInfo.name === '無名字') {
            this.memberInfo.name = ''
          }

          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async customerSelfUpdate() {
      this.$store.dispatch("loading/isLoading", true);
      const isNewCustomer = JSON.parse(localStorage.getItem("isNewCustomer"));
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const merchantId = merchant ? merchant.id : null;
      const inputData = {
        name: this.memberInfo.name,
        nickName: this.memberInfo.nickName || '',
        gender: this.memberInfo.gender,
        email: this.memberInfo.email ? this.memberInfo.email : "",
        lineId: this.memberInfo.lineId ? this.memberInfo.lineId : "",
        birthday: this.memberInfo.birthday
          ? new Date(this.memberInfo.birthday).getTime()
          : null,
        address: this.memberInfo.address ? this.memberInfo.address : "",
      };

      let resp = await this.api.customerSelfUpdate(inputData, "category");
      if (resp.hasError) return;
      if (isNewCustomer && merchantId) {
        await this.api.applyCustomerPersoanlDataToMerchant({ merchantId: merchantId });
      }
      if (isNewCustomer) localStorage.setItem("isNewCustomer", false);

      this.$store.dispatch("loading/isLoading", false);
      this.showSuccessModal = true
    },
    async getInputSetting() {
      try {
        const res = await this.api.getRequiredColumnSetting()
        this.inputRequired = res.data.getRequiredColumnSetting
      } catch (error) {
        console.log(error.message)
      }
    },

    closeModal() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const merchantId = merchant ? merchant.id : null;
      const toAppointment = this.$route.query.toAppointment === 'true'
      const isNewCus = this.$route.query?.isNewCus === 'true'

      if (isNewCus) {
        this.$router.push('/member/appointmentRecord?arrowDisplay=true')
        return
      }

      if (toAppointment) {
        let url = "/member/appointment";
        if (pageLinks.includes(this.$route.query.to)) {
          url += `?to=${this.$route.query.to}&arrowDisplay=true`;
        }
        this.$router.push(url)
      }  else if (merchantId && pageLinks.includes(this.$route.query.to)) {
        this.$router.push(`/member/${this.$route.query.to}?arrowDisplay=true`)
      } else if (merchantId) {
        this.$router.push("/member");
      } else {
        let url = "/member/setting/edit";
        if (pageLinks.includes(this.$route.query.to)) {
          url += `?to=${this.$route.query.to}&arrowDisplay=true`;
        }
        this.$router.push(url)
      };
    }
  },
  mounted() {
    this.getCustomerPersonalData();
    const merchantId = JSON.parse(window.localStorage.getItem('merchant'))?.id
    const newCustomer = JSON.parse(window.localStorage.getItem('isNewCustomer'))
    if (merchantId && newCustomer) {
      this.getInputSetting()
    }
  },
};
</script>

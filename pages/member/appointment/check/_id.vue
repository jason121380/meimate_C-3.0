<template>
  <section v-if="!isLoading">
    <div class="w-full max-w-[768px] mx-auto px-5 lg:px-10 mt-8">
      <Breadcrumb v-if="!isLine" :title="'立即預約'" />
      <!-- <p v-if="isLine" class='text-center'>恭喜你～預約完成囉🔥</p>
      <h3 v-else class="text-center text-3xl font-extrabold mt-5">預約完成</h3> -->
      <!-- 大打勾 icon -->
      <div v-if="checkInfo.status === '預約成功' || checkInfo.status === '已完成'" class="flex justify-center mb-2">
        <div class="w-20 h-20 rounded-full bg-gmb-orange-100 flex items-center justify-center">
          <svg class="w-10 h-10 text-gmb-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <div class="py-1.5 px-4 rounded-full text-[15px] font-medium relative w-fit my-4 mx-auto tracking-widest shadow-sm flex items-center gap-1.5" :class="{
        'text-white bg-gray-400': checkInfo.status === '設計師已取消',
        'text-white bg-gmb-orange-500':
          checkInfo.status === '預約成功' || checkInfo.status === '已完成',
        'text-white bg-gmb-orange-400':
          checkInfo.status !== '預約成功' &&
          checkInfo.status !== '已完成' &&
          checkInfo.status !== '設計師已取消',
      }">
        <svg v-if="checkInfo.status === '預約成功' || checkInfo.status === '已完成'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        <span v-if="checkInfo.status !== '設計師已取消'">{{
          checkInfo.status
        }}</span>
        <span v-if="checkInfo.status === '設計師已取消'">已取消</span>
        <div class="absolute text-gray-400 text-xs -bottom-6 left-1/2 -translate-x-1/2 w-max" v-if="checkInfo.status === '未完成'">
          (待設計師確認後才算預約完成)
        </div>
      </div>
      <div class="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col shadow-sm mt-5">
        <div>
          <div class="flex gap-5">
            <div class="flex flex-col items-center">
              <div class="relative w-[3.5rem] h-[3.5rem] overflow-hidden bg-gray-100 rounded-full flex justify-center items-center shrink-0">
                <img v-if="checkInfo.designer.avatar" class="w-full h-full object-cover object-center" :src="checkInfo.designer.avatar" alt="" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512" class="text-gray-300">
                  <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
              <p class="text-[15px] font-medium text-gray-900 mt-2">
                {{ checkInfo.designer.nameForCustomerSide }}
              </p>
            </div>
            <div class="flex flex-col gap-2.5 pt-0.5 min-w-0">
              <div v-formatDate="'time'" class="flex text-gray-900 text-[20px] font-bold tracking-wide pl-0.5">
                {{ checkInfo.date }}
              </div>
              <div v-if="checkInfo.merchant.name">
                <p class="font-medium text-[15px] text-gray-800 tracking-wide">
                  {{ checkInfo.merchant.name }}
                </p>
              </div>
              <div class="flex gap-2.5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[18px] h-[18px] text-gray-800 shrink-0">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                </svg>
                <a :href="telLink" class="text-[15px] text-gray-700 tracking-wide font-sans mt-0.5">
                  {{ checkInfo.merchant.tel }}
                </a>
              </div>
              <div @click="
                windowAssign(
                  `http://maps.google.com/?q=${checkInfo.merchant.address}`
                )
                " class="flex gap-2.5 items-start mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-[18px] h-[18px] text-gray-800 shrink-0 mt-1">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <p class="text-[15px] text-gray-700 leading-snug pl-0.5 mt-0.5">{{ checkInfo.merchant.address }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <p class="text-center mt-9 mb-5 text-[17px] font-medium text-gray-900 tracking-wide">其他需求?</p>

      <!-- 備註輸入 -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold text-gmb-orange-500 mb-2">備註</h4>
        <input type="text" v-model="remarkForCustomer"
          placeholder="若預約不指定設計師，可於此處備註需要的服務項目。"
          class="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200">
      </div>

      <div class="flex flex-col gap-4 mb-20">
        <input v-if="companionDisplay"  type="number" placeholder="同行人數" oninput="value=value.replace(/[^0-9]/g,'')"
          v-model.number="companionCount" class="w-full bg-white border border-gray-200 focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 text-gray-900 text-[15px] rounded-full px-5 py-3.5 appearance-none focus:outline-none" />
        
        <div class="w-full relative col-span-3 md:col-span-2">
          <select v-model="selectReference" class="w-full bg-white border border-gray-200 focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 text-gray-900 text-[15px] rounded-full px-5 py-3.5 appearance-none focus:outline-none">
            <option value="" selected disabled>哪裡得知我們？</option>
            <option v-for="item in customerReference" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <span class="absolute right-5 top-1/2 -translate-y-1/2 text-gmb-orange-500 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" stroke="currentColor" />
            </svg>
          </span>
        </div>

        <button class="w-full bg-gmb-orange-500 text-white rounded-full py-3.5 mt-1 text-[15px] font-semibold active:bg-gmb-orange-600 flex items-center justify-center gap-2 shadow-sm" :disabled="isSubmit"
          @click="handleSubmit">
          <i v-if="isSubmit" class="bi bi-arrow-repeat text-xl inline-block animate-spin-slow"/>
          確認
        </button>
      </div>
    </div>
    <StatusModal :status="type" :showModal="showModal" :content="message" @close="onClose" :timeout="1500" />
  </section>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: "appointment-check",
  validate({ params }) {
    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
      params.id
    );
  },
  data() {
    return {
      checkInfo: {},
      isLoading: true,
      companionCount: null,
      customerReference: [],
      selectReference: "",
      isSubmit: false,
      showModal: false,
      message: "",
      type: "success",
      display: false,
      telLink: '',
      isLine: false,
      showBindLineModal: false,
      companionDisplay: true,
      remarkForCustomer: ''
    };
  },
  methods: {
    forMatDate(obj) {
      if (obj < 10) return "0" + obj;
      return obj;
    },
    windowAssign(url) {
      window.location.href = url;
    },
    openModal(message, type) {
      this.message = message;
      this.type = type;
      this.showModal = true;
    },
    onClose() {
      if (this.type === "success") {
        if (this.$route.query.setPassword === 'true') {
          this.handleDoRoute()
        } else if (localStorage.isLineBinded === 'false' && localStorage.isNewCustomer === 'false') {
          this.showModal = false;
          Swal.fire({
            html: `<p class="text-base text-gray-700 leading-relaxed">您尚未綁定LINE服務<br/>點選綁定以收取預約提醒通知</p>`,
            showCloseButton: true,
            confirmButtonText: '立即綁定',
            allowOutsideClick: false,
            customClass: {
              popup: '!rounded-2xl !shadow-lg',
              confirmButton: "!bg-gmb-orange-500 !rounded-full !px-8 !py-2.5 !text-[15px] !font-semibold focus:!shadow-none hover:!bg-gmb-orange-600",
              closeButton: '!text-gray-400 hover:!text-gray-600'
            }
          }).then((result) => {
            this.onBindLineClose(result.isConfirmed ? 'comfirm' : 'cancel')
          });
        } else {
          this.handleDoRoute()
        }
      } else {
        this.showModal = false;
      }
    },
    async handleGetBindLink() {
      this.$store.dispatch("loading/isLoading", true);
      try {
        const merchant = JSON.parse(localStorage.getItem("merchant"));
        const res = await this.api.getLineBindLinkForCustomer(merchant.id);
        const link = res.data.getLineBindLinkForCustomer
        const uri = window.location.origin
        localStorage.setItem('lineBindAction', 'bind')
        const redirectUri = encodeURIComponent(`${uri}/lineRedirect?bindAccount=true`)
        this.windowAssign(link + `&redirect_uri=${redirectUri}`)
      } catch (err) {
        console.log(err);
        this.$store.dispatch("loading/isLoading", false);
      }
    },
    onBindLineClose(type) {
      if (type === 'comfirm') {
        this.handleGetBindLink();
      } else {
        this.handleDoRoute()
      }
    },
    handleDoRoute() {
      const isNewCus = this.$route.query?.isNewCus === 'true'
      const setPassword = this.$route.query?.setPassword === 'true'
      if (isNewCus) {
        this.$router.push("/password?isNewCus=true");
      } else if (setPassword) {
        if (localStorage.isLineBinded === 'false' && localStorage.isNewCustomer === 'false') {
          this.$router.push("/password?setPassword=true&bindLine=true");
        } else {
          this.$router.push("/password?setPassword=true");
        }
      } else if (this.isLine) {
        this.$router.push("/member/appointmentRecord?arrowDisplay=true");
      } else {
        this.$router.push("/member/appointmentRecord");
      }
    },
    async getOrderDetail() {
      const resData = await this.$api.getCustomerReservationRecord(
        this.$route.params.id
      );
      this.checkInfo = resData.data.getCustomerReservationRecord;
      // 備註預設為空，讓使用者自行輸入
      // this.remarkForCustomer = this.checkInfo.remarkForCustomer || '';
      this.telLink = `tel:+886-${resData.data.getCustomerReservationRecord.merchant.tel.slice(1)}`
    },
    async getCustomerReference() {
      const res = await this.api.getCustomerReference();
      this.customerReference = res.data.getCustomerReference;
    },
    async handleSubmit() {
      this.isSubmit = true;
      try {
        await this.$api.customerUpdateBookingRefs({
          bookingId: this.$route.params.id,
          companionCount: this.companionCount || 0,
          reference: this.selectReference,
        });
        this.openModal("預約完成", "success");
      } catch (error) {
        this.openModal(error.message, "error");
        this.isSubmit = false;
      }
    },
    async getBookingPeerDisplay() {
      const resData = await this.api.getBookingPeerDisplay()
      this.companionDisplay = resData.data.getBookingPeerDisplay
    }
  },
  mounted() {
    this.$store.dispatch("appointmentData/handleClearData");
    this.isLine = this.$route.path.includes('line')
    this.$emit('inCheck') // 告知父層在預約完成的頁面
    Promise.all([
        this.getOrderDetail(),
        this.getCustomerReference(),
        this.getBookingPeerDisplay()
      ]).then(
      () => (this.isLoading = false)
    ).catch((err) => {
      console.log(err)
      this.isLoading = false
    });
  },
};
</script>

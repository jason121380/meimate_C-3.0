<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <div class="px-5 pt-6 w-full">
      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6">
        <button @click="$router.go(-1)" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">預約紀錄</h1>
      </div>
      <!-- 類別 Tab -->
      <div class="flex border-b border-gray-100 mb-6">
        <button @click="(selectTab = '未完成'), (currentPage = 0), getOrders()"
          class="flex-1 py-3.5 text-[15px] font-medium transition-colors relative" 
          :class="selectTab === '未完成' ? 'text-gmb-orange-500' : 'text-gray-400 hover:text-gray-600'">
          未完成
          <div v-show="selectTab === '未完成'" class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gmb-orange-500 rounded-t-full"></div>
        </button>
        <button @click="(selectTab = '已結束'), (currentPage = 0), getOrders()"
          class="flex-1 py-3.5 text-[15px] font-medium transition-colors relative" 
          :class="selectTab === '已結束' ? 'text-gmb-orange-500' : 'text-gray-400 hover:text-gray-600'">
          已結束
          <div v-show="selectTab === '已結束'" class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gmb-orange-500 rounded-t-full"></div>
        </button>
      </div>

      <!-- 預約記錄列表 -->
      <div id="orderList" v-if="appointmentRecord.length > 0" class="flex flex-col gap-y-4">
        <div v-for="item in appointmentRecord" :key="item.id"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
          <div class="p-4 md:p-5">
            <!-- 頂部：日期與狀態 -->
            <div class="flex justify-between items-center mb-2">
              <p v-formatDate="'time'" class="text-gray-900 font-bold tracking-tight text-[15px]">
                {{ item.date }}
              </p>
              <div class="flex flex-col items-end gap-1">
                <div class="px-2 py-0.5 rounded text-[11px] font-medium tracking-wide"
                  :class="{ 
                    'text-gray-500 bg-gray-100': item.status === '設計師已取消' || item.status === '設計師已拒絕', 
                    'text-green-700 bg-green-50': item.status === '預約成功' || item.status === '已完成', 
                    'text-gmb-orange-600 bg-gmb-orange-50': item.status === '未完成',
                    'text-gray-600 bg-gray-50': item.status !== '預約成功' && item.status !== '已完成' && item.status !== '設計師已取消' && item.status !== '未完成' && item.status !== '設計師已拒絕'
                  }">
                  <span v-if="item.status !== '設計師已取消'">{{ item.status }}</span>
                  <span v-if="item.status === '設計師已取消'">已取消</span>
                </div>
                <div class="text-[10px] text-gmb-orange-500 font-medium" v-if="item.status === '未完成'">待確認</div>
              </div>
            </div>

            <!-- 次行：店名｜設計師｜人數 -->
            <div class="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm mb-3">
              <p v-if="item.merchant.name" class="flex items-center gap-1 text-gray-500">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" /></svg>
                <span>{{ item.merchant.name }}</span>
              </p>
              <span v-if="item.merchant.name" class="text-gray-300">|</span>
              <p class="flex items-center gap-1 text-gray-900 font-medium">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ item.designer ? item.designer.nameForCustomerSide : '不指定' }}
              </p>
              <span class="text-gray-300">|</span>
              <p class="text-gray-500">{{ item.companionCount }} 人</p>
            </div>

            <!-- 報到狀態 -->
            <div v-if="isBookingCheckinEnabled" class="flex items-center gap-1.5 mb-3">
              <span v-if="item.isCheckin" class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span v-else class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <p class="text-xs font-medium" :class="item.isCheckin ? 'text-green-600' : 'text-gray-500'">
                {{ item.isCheckin ? '已報到' : '未報到'}}
              </p>
            </div>

            <!-- 備註與留言 (精簡版) -->
            <div v-if="item.remarkForCustomer || item.messageForCustomer" class="space-y-1.5 mt-2 pt-2 border-t border-gray-50 break-words">
              <div v-if="item.remarkForCustomer" class="flex items-start gap-2 text-[13px]">
                <span class="text-gray-400 shrink-0 select-none">備註</span>
                <span class="text-gray-700 leading-relaxed">{{ item.remarkForCustomer }}</span>
              </div>
              <div v-if="item.messageForCustomer" class="flex items-start gap-2 text-[13px]">
                <span class="text-amber-500 shrink-0 select-none">留言</span>
                <span class="text-gray-700 leading-relaxed">{{ item.messageForCustomer }}</span>
              </div>
            </div>

            <!-- 修改提示 -->
            <div v-if="item.isEdit" class="mt-2 text-blue-500 text-[11px] font-medium flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              記錄已由設計師修改
            </div>
          </div>

          <!-- Bottom Actions -->
          <div v-if="item.status === '設計師已取消' || item.status === '設計師已拒絕' || item.status === '已完成' || !isHidden(item) || (item.troubleShooting && item.troubleShooting.length > 0)" 
            class="flex items-center justify-end px-4 py-3 bg-gray-50/50 border-t border-gray-100 gap-2.5">
            
            <button v-show="item.troubleShooting && item.troubleShooting.length > 0"
              class="mr-auto w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition-colors" 
              @click="getQuestionAnswer(item.id)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </button>

            <button @click="$router.push('/member/appointment')" v-if="item.status === '設計師已取消' || item.status === '設計師已拒絕' || item.status === '已完成' || item.status === '客戶已取消'" 
              class="py-2.5 px-6 text-white text-sm font-medium bg-gmb-orange-500 rounded-full hover:bg-gmb-orange-600 transition-colors shadow-md shadow-gmb-orange-200">
              重新預約
            </button>
            
            <button @click="cancelReservation(item.id, item.date, item.designer)" v-if="!(item.status === '設計師已取消' || item.status === '設計師已拒絕' || item.status === '已完成' || item.status === '客戶已取消') && !isHidden(item)"
              class="py-2.5 px-5 bg-white border border-gmb-orange-500 text-gmb-orange-500 text-sm font-medium flex items-center justify-center gap-2 rounded-full transition-colors shadow-sm" 
              :class="isCancel === item.id ? 'opacity-50 pointer-events-none' : 'hover:bg-gmb-orange-500 hover:text-white'">
              <i v-if="isCancel === item.id" class="bi bi-arrow-repeat flex animate-spin"/>
              取消預約
            </button>
          </div>
        </div>
        <ItemLoading />
      </div>

      <!-- 無資料顯示 -->
      <div v-if="appointmentRecord.length === 0 && !isFetching" class="mt-8">
        <div class="bg-gray-50 border border-gray-100 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-gray-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z"/></svg>
          </div>
          <h3 class="text-gray-900 font-semibold mb-1">目前無資料</h3>
          <p class="text-sm text-gray-500">該分類下沒有預約紀錄</p>
        </div>
      </div>

      <CancelAppointmentModal :showModal="cancelModal" :appointment="cancelContent" @close="cancelModal = false"
        @cancel="confirmCancel" />
      <StatusModal :showModal="showModal" :content="modalContent" @close="showModal = false" :timeout="timeout"
        :status="modalStatus" />
    </div>
  </section>
</template>

<script>
import { cacelPendingForBookingRecords } from "@/utils/cancelToken.js";
export default {
  name: "member-appointmentRecord",
  head() {
    return {
      title: "預約紀錄",
      meta: [
        {
          hid: "theme-color", name: "theme-color",
          content: "#ffffff",
        },
      ],
    };
  },
  data() {
    return {
      appointmentRecord: [],
      selectTab: "未完成",
      currentPage: 0,
      totalPage: 0,
      isGetting: false,
      isEnd: false,
      getting: "",
      isFetching: false,
      isCancel: "",
      showModal: false,
      modalContent: '',
      timeout: 0,
      modalStatus: 'none',
      cancelModal: false,
      cancelContent: '',
      cancelModalOrderId: '',
      display: true,
      isBookingCheckinEnabled: false
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  watch: {
    appointmentRecord(newVal) {
      if (this.selectTab === '未完成' && newVal.length > 0) {
        this.$store.commit('indexCache/setAppointmentRecords', newVal)
      }
    }
  },
  methods: {
    // 取得未完成紀錄
    async getOrders() {
      const storeId = this.$route.query.storeId || null
      cacelPendingForBookingRecords();
      this.isFetching = true;

      if (!this.appointmentRecord.length) {
        this.appointmentRecord = [];
      }
      this.isEnd = false;
      this.currentPage = 0;
      
      const needKey =
        "id, no, date,merchant{name,tel,address} , designer{nameForCustomerSide,avatar}, status, remarkForCustomer, messageForCustomer, troubleShooting, companionCount, isCheckin";
      try {
        const res = await this.api.getCustomerReservationRecordsV2(needKey, this.currentPage, this.selectTab === '已結束', storeId)
        this.appointmentRecord = res.data.getCustomerReservationRecordsV2.orders;
        // 計算總頁數
        this.totalPage = Math.ceil(
          res.data.getCustomerReservationRecordsV2.totalCount / 20
        );
        // 判斷是否可滾動加載
        if (this.totalPage <= 1) this.isEnd = true;
        if (this.totalPage > 1) {
          this.getScrollTarget() && this.getScrollTarget().addEventListener("scroll", this.scrollGetOrders);
        }
        this.getting = "";
        this.isFetching = false;
      } catch (error) {
        this.getting = "";
        this.isFetching = false;
        console.log(error);
      }
    },
    getScrollTarget() {
      return document.querySelector('.app-scroll-container')
    },
    // 滾動加載
    async scrollGetOrders() {
      const storeId = this.$route.query.storeId || null
      const orderList = document.querySelector("#orderList");
      const triggerDistance = 200;
      const distance =
        orderList.getBoundingClientRect().bottom - window.innerHeight;

      if (!this.isGetting && !this.isEnd && distance < triggerDistance) {
        this.$store.dispatch("itemLoading/isLoading", true);
        this.isGetting = true;
        this.isEnd = false;
        this.currentPage++;

        if (this.currentPage === this.totalPage - 1) {
          this.isEnd = true;
          this.getScrollTarget() && this.getScrollTarget().removeEventListener("scroll", this.scrollGetOrders);
        }

        const needKey =
          "id, no, date,merchant{name,tel,address}, designer{nameForCustomerSide,avatar}, status, remarkForCustomer,messageForCustomer, companionCount, troubleShooting";
        try {
          const res = await this.api.getCustomerReservationRecordsV2(needKey, this.currentPage, this.selectTab === '已結束', storeId)
          this.appointmentRecord = this.appointmentRecord.concat(
            res.data.getCustomerReservationRecordsV2.orders
          );
          // 計算總頁數
          this.totalPage = Math.ceil(
            res.data.getCustomerReservationRecordsV2.totalCount / 20
          );
          // 判斷是否可滾動加載
          if (this.totalPage <= 1) this.isEnd = true;

          this.isGetting = false;
          this.$store.dispatch("itemLoading/isLoading", false);
        } catch (error) {
          this.getting = "";
          console.log(error);
        }
      }
    },
    // 判斷隱藏取消預約按鈕
    isHidden(item) {
      const toDay = Date.now();
      if (
        item.date < toDay &&
        (item.status === "預約成功" || item.status === "未完成")
      )
        return true;
      return false;
    },
    // 取消預約
    cancelReservation(orderId, timestamp, designerName) {
      const newDate = new Date(timestamp);
      const year = newDate.getFullYear();
      const month = this.formatDate(newDate.getMonth() + 1);
      const date = this.formatDate(newDate.getDate());
      const hours = this.formatDate(newDate.getHours());
      const min = this.formatDate(newDate.getMinutes());

      const name = designerName.nameForCustomerSide;
      this.cancelContent = `${year}/${month}/${date} ${hours}:${min} ${name}`
      this.cancelModalOrderId = orderId
      this.cancelModal = true
    },
    confirmCancel() {
      this.isCancel = this.cancelModalOrderId;
      this.cancelModalOrderId = ""
      this.cancelModal = false
      this.api
        .customerCancelReservation(this.isCancel)
        .then((res) => {
          this.isCancel = "";
          if (!res.hasOwnProperty("errors")) {
            this.getOrders()
            this.modalContent = '取消預約成功'
            this.timeout = 1500
            this.modalStatus = 'success'
            this.showModal = true
          } else {
            this.modalContent = res.errors[0].message
            this.timeout = 0
            this.modalStatus = 'error'
            this.showModal = true
          }
        })
        .catch((err) => {
          this.isCancel = "";
          console.log(err);
        });
    },
    getQuestionAnswer(id) {
      let goalarray = this.appointmentRecord.filter((item) => {
        return item.id === id;
      });
      let troubleShooting = goalarray ? goalarray[0].troubleShooting : "";
      // QuestionModal
      this.modalContent = troubleShooting
      this.timeout = 0
      this.modalStatus = 'none'
      this.showModal = true
    },
    // 轉換日期
    formatDate(obj) {
      if (obj < 10) return `0${obj}`;
      return obj;
    },
  },
  mounted() {
    this.getOrders();
    this.isBookingCheckinEnabled = Boolean(JSON.parse(localStorage.merchant)?.isBookingCheckinEnabled)
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-appointmentRecord"
    ) {
      const isArrowDisplayForLine = JSON.parse(
        localStorage.getItem("merchant")
      )?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
  },
  activated() {
    // keep-alive 回來時重新掛載 scroll listener（deactivated 時已移除）
    if (this.totalPage > 1 && !this.isEnd) {
      const target = this.getScrollTarget()
      if (target) target.addEventListener("scroll", this.scrollGetOrders);
    }
  },
  deactivated() {
    const target = document.querySelector('.app-scroll-container')
    if (target) target.removeEventListener("scroll", this.scrollGetOrders);
  },
  beforeDestroy() {
    const target = document.querySelector('.app-scroll-container')
    if (target) target.removeEventListener("scroll", this.scrollGetOrders);
  },
};
</script>

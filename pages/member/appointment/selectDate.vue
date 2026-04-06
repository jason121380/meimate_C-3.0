<template>
  <section v-if="!isLoading" id="firstPos">
    <div class="w-full max-w-[768px] mx-auto px-5 mt-4 pb-36">


      <!-- 日曆 -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
        <Calendar :filterOldDay="true" :disabledDate="disabledDate" :isGettingDate="isGettingDate"
          @selectDate="selectDate($event)" @changeMonth="changeMonth($event)" :defaultDate="defaultDate" :cacheTimeStamp="cacheTimeStamp" />
      </div>

      <!-- 選擇時間 / 時段卡片 -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <template v-if="bookingTimes && filterTimeRange.length > 0">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">選擇時段</h4>
          <div class="grid grid-cols-3 gap-2">
            <div @click="selectTime(item)" v-for="item in filterTimeRange" :key="item.time"
              class="time-slot"
              :class="{
                'time-slot--active': userSelect.time === item.time,
                'time-slot--disabled': filterOldTimes(item.time)
              }">
              <p v-formatDate="'onlyTime'" class="text-sm font-medium">{{ item.time }}</p>
            </div>
          </div>
        </template>

        <template v-else-if="filterTimeRange.length === 0 && userSelect.date">
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="text-sm text-gray-400">尚未選擇日期</p>
          </div>
        </template>

        <template v-else>
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <p class="text-sm text-gray-400">尚未選擇日期</p>
          </div>
        </template>
      </div>
    </div>

    <!-- 底部操作欄 -->
    <div class="fixed left-0 right-0 bg-white border-t border-gray-100 z-20 safe-area-bottom" style="bottom: calc(72px + env(safe-area-inset-bottom, 0px));">
      <div class="max-w-[768px] mx-auto px-5 py-2">
        <!-- 已選項目摘要 -->
        <div v-if="selectService.length > 0" class="mb-2">
          <p class="text-xs text-gray-500">
            <span v-for="(item, idx) in selectService" :key="item.id">
              {{ idx + 1 }}. {{ selectDesigner || '不指定' }} / {{ item.serviceMinutes ? formatDuration(item.serviceMinutes) : item.name }}
              <span v-if="idx < selectService.length - 1">、</span>
            </span>
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="$router.go(-1)" class="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 active:bg-gray-50">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </button>
          <button @click="submit()"
            class="flex-1 py-3.5 text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2"
            :disabled="!userSelect.time || !userSelect.date || isSubmitting"
            :class="{
              'bg-gray-200 text-gray-400 pointer-events-none': isSubmitting || !userSelect.time || !userSelect.date,
              'bg-gmb-orange-500 hover:bg-gmb-orange-600 shadow-lg shadow-gmb-orange-200': userSelect.time && userSelect.date && !isSubmitting,
            }">
            <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            完成預約
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <StatusModal :showModal="showModal" content="預約成功" @close="closeModal" :timeout="1500" />
  </section>
</template>

<script>
import { cancelAllPending } from '@/utils/cancelToken.js'
export default {
  name: "appointment-selectDate",
  data() {
    return {
      disabledDate: [],
      userSelect: {
        date: '',
        time: ''
      },
      isGettingDate: false,
      bookingDate: [],
      bookingTimes: [],
      morningRange: [],
      afterNoonRange: [],
      nightRange: [],
      isSubmitting: false,
      timeRange: [],
      showModal: false,
      orderId: '',
      reFetch: false,
      defaultDate: null,
      isLine: false,
    };
  },
  computed: {
    designerId() {
      return this.$store.state.appointmentData.designerId
    },
    cacheTimeStamp() {
      return this.$store.state.appointmentData.cacheTimeStamp
    },
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    selectDesigner() {
      return this.$store.state.appointmentData.designerName
    },
    selectDesignerNickName() {
      return this.$store.state.appointmentData.designerNickName
    },
    filterTimeRange() {
      return this.timeRange
    },
    selectService() {
      return this.$store.state.appointmentData.designerServiceIds
    },
    nextLabel() {
      return this.isLine ? '下一步' : '送出預約'
    }
  },
  methods: {
    formatDuration(minutes) {
      if (!minutes) return ''
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return mins > 0 ? `${hours}小時${mins}分鐘` : `${hours}小時`
      }
      return `${minutes}分鐘`
    },
    getMonthRange(year, month) {
      const firstDate = new Date(year, month, 1).getTime()
      const lastDate = new Date(year, month + 1, 1).getTime()
      return `${firstDate}, ${lastDate}`
    },
    async getDesignerBookingTimesWithRange(input) {
      if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) {
        this.$store.dispatch('loading/isLoading', false)
        this.$router.push('/member/appointment')
        return
      }

      this.disabledDate = []

      try {
        const res = await this.api.getDesignerBookingTimesWithRange(input)
        if (res) {
          let todaysDate = this.cacheTimeStamp || new Date();
          res.data.getDesignerBookingTimesWithRange.forEach((item) => {
            let itemDate = new Date(item.date);
            itemDate = `${itemDate.getFullYear()}/${itemDate.getMonth() + 1}/${itemDate.getDate()}`
            if (item.bookingTimes.findIndex((item) => item.status === '可預約') !== -1 || itemDate === todaysDate) {
              this.bookingDate.push(item)
            } else {
              this.disabledDate.push(item.date)
            }
          })

          this.$store.dispatch('loading/isLoading', false)
          this.isGettingDate = false
          if (this.cacheTimeStamp) {
            const flatTimes = this.bookingDate.map(items => items.bookingTimes.map(item => item)).flat()
            const findTime = flatTimes.find(d => d.time === this.cacheTimeStamp)
            findTime && this.selectTime(findTime)
            this.selectDate(this.cacheTimeStamp)
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('loading/isLoading', false)
      }
    },
    async getNonDesignateBookingTimesWithRange(input) {
      if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) {
        this.$store.dispatch('loading/isLoading', false)
        this.$router.push('/member/appointment')
        return
      }

      this.disabledDate = []

      try {
        const res = await this.api.getNonDesignateBookingTimesWithRange(input)
        if (res) {
          let todaysDate = new Date();
          res.data.getNonDesignateBookingTimesWithRange.forEach((item) => {
            let itemDate = new Date(item.date);
            itemDate = `${itemDate.getFullYear()}/${itemDate.getMonth() + 1}/${itemDate.getDate()}`
            if (item.bookingTimes.findIndex((item) => item.status === '可預約') !== -1 || itemDate === todaysDate) {
              this.bookingDate.push(item)
            } else {
              this.disabledDate.push(item.date)
            }
          })

          this.$store.dispatch('loading/isLoading', false)
          this.isGettingDate = false
          if (this.cacheTimeStamp) {
            const flatTimes = this.bookingDate.map(items => items.bookingTimes.map(item => item)).flat()
            const findTime = flatTimes.find(d => d.time === this.cacheTimeStamp)
            findTime && this.selectTime(findTime)
            this.selectDate(this.cacheTimeStamp)
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('loading/isLoading', false)
      }
    },
    getDesignerBookingTimes(input) {
      if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) {
        this.$store.dispatch('loading/isLoading', false)
        this.$router.push('/member/appointment')
        return
      }

      this.disabledDate = []
      this.bookingDate = []
      this.reFetch = true
      this.api.getDesignerBookingTimesWithRange(input)
        .then((res) => {
          let todaysDate = new Date(this.userSelect.date);
          todaysDate = `${todaysDate.getFullYear()}/${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`
          res.data.getDesignerBookingTimesWithRange.forEach((item) => {
            let itemDate = new Date(item.date);
            itemDate = `${itemDate.getFullYear()}/${itemDate.getMonth() + 1}/${itemDate.getDate()}`
            if (item.bookingTimes.findIndex((item) => item.status === '可預約') !== -1 || itemDate === todaysDate) {
              this.bookingDate.push(item)
            } else {
              this.disabledDate.push(item.date)
            }
          })
          this.$store.dispatch('loading/isLoading', false)
          this.defaultDate = this.userSelect.date
          this.selectDate(this.userSelect.date)
          this.isGettingDate = false
          this.reFetch = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeMonth(date) {
      const designerId = this.$store.state.appointmentData.designerId

      this.isGettingDate = true

      const monthRange = this.getMonthRange(date.getFullYear(), date.getMonth())
      const splitDate = monthRange.split(',')

      const input = {
        designerId: this.$store.state.appointmentData.designerId,
        storeId: this.$store.state.appointmentData.merchantId,
        dateRange: {
          startDate: splitDate[0],
          endDate: splitDate[1]
        },
        designerServiceIds: this.selectService.map(({ id }) => id)
      }

      if (designerId !== 1) {
        this.getDesignerBookingTimesWithRange(input)
      } else {
        this.getNonDesignateBookingTimesWithRange({
          input: {
            storeId: this.$store.state.appointmentData.merchantId,
            dateRange: {
              startDate: splitDate[0],
              endDate: splitDate[1]
            },
            bookingItemIds: this.selectService.map(({ id }) => id)
          }
        })
      }
    },
    selectTime(item) {
      if (item.status !== '可預約') return
      this.userSelect.time = item.time
    },
    selectDate(date) {
      this.morningRange = []
      this.afterNoonRange = []
      this.nightRange = []
      this.timeRange = []

      const designerId = this.$store.state.appointmentData.designerId

      if (!this.reFetch) {
        this.userSelect.date = date
      }
      this.bookingTimes = []

      const targetDate = this.bookingDate.find((item) => item.date === date)
      this.bookingTimes = targetDate?.bookingTimes

      if (this.bookingTimes) {
        this.bookingTimes.forEach((item) => {
          if (item.status === '可預約' && !this.filterOldTimes(item.time)) {
            this.timeRange.push(item)
          }
        })
      }
    },
    forMatDate(obj) {
      if (obj < 10) return '0' + obj
      return obj
    },
    setAppointmentDate() {
      const time = new Date(this.userSelect.time)
      const year = time.getFullYear()
      const month = this.forMatDate(time.getMonth() + 1)
      const date = this.forMatDate(time.getDate())
      const hours = this.forMatDate(time.getHours())
      const min = this.forMatDate(time.getMinutes())

      const data = {
        time: `${year}/${month}/${date} ${hours}:${min}`,
        timestamp: this.userSelect.time
      }

      this.$store.dispatch('appointmentData/handleSetTime', data)
    },
    filterOldTimes(time) {
      const newDate = Date.now()
      if ((newDate + 1800000) >= time) return true
      return false
    },
    submit() {
      if (this.isLine) {
        this.noLoginBooking()
      } else if (this.designerId !== 1) {
        this.handleBooking();
      } else {
        this.handleNonDesignationBooking();
      }
    },
    cancelService(item) {
      this.$store.dispatch("appointmentData/handleCancelService", item)
    },
    async handleBooking() {
      try {
        this.isSubmitting = true;
        this.setAppointmentDate()
        if (this.$route.query.getLoginCacheData === 'true') await this.handleCacheBookingData()
        let cellphone = this.$store.state.indexCache.userInfo.cellphone;
        let name = this.$store.state.indexCache.userInfo.name;
        if (!cellphone || !name) {
          const res = await this.api.getCustomerPersonalData("name cellphone")
          this.$store.dispatch("indexCache/handleSetUserInfo", res.data.getCustomerPersonalData);
        }
        const remark = this.$store.state.appointmentData.remarkForCustomer
        const service = this.$store.state.appointmentData.designerServiceIds
        const input = {
          designerId: this.$store.state.appointmentData.designerId,
          dateTime: this.$store.state.appointmentData.timestamp,
          cellphone: this.$store.state.indexCache.userInfo.cellphone,
          merchantId: this.$store.state.appointmentData.merchantId,
          name: this.$store.state.indexCache.userInfo.name,
          reference: this.$store.state.appointmentData.reference,
          remarkForCustomer: `${service.map(item => item.name).join('、')} ${remark}`,
          designerServiceIds: this.selectService.map(({ id }) => id),
          companionCount: this.$store.state.appointmentData.companionCount,
        };
        const res = await this.api.bookingV2(input)
        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.bookingV2)
          );

          this.orderId = res.data.bookingV2.id
          this.showModal = true;
          window.localStorage.removeItem('orderToken')
        } else {
          this.isSubmitting = false;
          this.$router.push("/member/appointment/selectDate");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleNonDesignationBooking() {
      try {
        this.isSubmitting = true;
        
        this.setAppointmentDate()
      if (this.$route.query.getLoginCacheData === 'true') await this.handleCacheBookingData()

        let cellphone = this.$store.state.indexCache.userInfo.cellphone;
        let name = this.$store.state.indexCache.userInfo.name;
        if (!cellphone || !name) {
          const res = await this.api.getCustomerPersonalData("name cellphone")
          this.$store.dispatch("indexCache/handleSetUserInfo", res.data.getCustomerPersonalData);
        }
        const remark = this.$store.state.appointmentData.remarkForCustomer
        const service = this.$store.state.appointmentData.designerServiceIds
        const input = {
          bookingDate: this.$store.state.appointmentData.timestamp,
          cellphone: this.$store.state.indexCache.userInfo.cellphone,
          customerName: this.$store.state.indexCache.userInfo.name,
          storeId: this.$store.state.appointmentData.merchantId,
          remarkForCustomer: `${service.map(item => item.name).join('、')} ${remark}`,
          bookingItemIds: this.selectService.map(({ id }) => id),
        };
        const res = await this.api.nonDesignationBooking(input)
        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.nonDesignationBooking)
          );
          this.orderId = res.data.nonDesignationBooking.id
          this.showModal = true

        }
        else {
          window.localStorage.removeItem('orderToken')
          this.$router.push("/member/appointment/selectDate");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async noLoginBooking() {
      this.isSubmitting = true;
      this.setAppointmentDate()
      try {
        const res = await this.$api.cacheBookingData({
          input: {
            bookingData: {
              cellphone: '',
              name: '',
              dateTime: this.$store.state.appointmentData.timestamp,
              designerId: this.$store.state.appointmentData.designerId,
              merchantId: this.$store.state.appointmentData.merchantId,
              designerServiceIds: this.selectService.map(({ id }) => id),
              remarkForCustomer: this.$store.state.appointmentData.remarkForCustomer
            },
            isNewCus: this.$store.state.appointmentData.isNewCus,
            newCusData: this.$store.state.appointmentData.newCusData,
            staticInfo: this.$store.state.appointmentData.staticData
          }
        })
        const orderToken = res.data.cacheBookingData
        window.localStorage.setItem('orderToken', orderToken)
        this.$router.push('loginData')
        this.isSubmitting = false
      } catch (error) {
        console.log(error);
        this.isSubmitting = false
      }
    },
    async handleCacheBookingData() {
      this.isSubmitting = true
      try {
        const res = await this.$api.cacheBookingData({
          input: {
            bookingData: {
              cellphone: '',
              name: '',
              dateTime: this.$store.state.appointmentData.timestamp,
              designerId: this.$store.state.appointmentData.designerId,
              merchantId: this.$store.state.appointmentData.merchantId,
              designerServiceIds: this.selectService.map(({ id }) => id),
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
        this.isSubmitting = false
      }
    },
    closeModal() {
      this.isSubmitting = false;
      if (this.$route.query.getLoginCacheData === 'true') {
        this.$router.push(`/member/line/check/${this.orderId}`);
      } else {
        this.$router.push(this.$route.matched[1].path + `/check/${this.orderId}`);
      }
    }
  },
  watch: {
    selectService: {
      async handler() {
        if (this.$store.state.appointmentData.designerId == 1) return
        const date = new Date(this.userSelect.date);
        const monthRange = await this.getMonthRange(
          date.getFullYear(),
          date.getMonth()
        );
        const splitDate = monthRange.split(",");
        const input = {
          designerId: this.$store.state.appointmentData.designerId,
          storeId: this.$store.state.appointmentData.merchantId,
          dateRange: {
            startDate: splitDate[0],
            endDate: splitDate[1],
          },
          designerServiceIds:
          this.selectService.map(({ id }) => id),
        };
        this.$store.dispatch("loading/isLoading", true);
        this.getDesignerBookingTimes(input);
      },
      immediate: false
    },
    "userSelect.date"() {
      if (this.isLine) {
        this.defaultDate = this.userSelect.date
      }
    }
  },
  async mounted() {
    const designerId = this.$store.state.appointmentData.designerId
    this.isLine = this.$route.path.includes('line')
    this.isGettingDate = true
    this.$store.dispatch('loading/isLoading', true)

    if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) this.$router.push('/member/appointment')

    let date = new Date(Date.now())
    if (this.$store.state.appointmentData.timestamp) {
      this.cacheTimeStamp = this.$store.state.appointmentData.timestamp
    }
    if (this.cacheTimeStamp) {
      date = new Date(this.cacheTimeStamp)
    }
    const monthRange = await this.getMonthRange(date.getFullYear(), date.getMonth())
    const splitDate = monthRange.split(',')

    const input = {
      designerId: this.$store.state.appointmentData.designerId,
      storeId: this.$store.state.appointmentData.merchantId,
      dateRange: {
        startDate: splitDate[0],
        endDate: splitDate[1]
      },
      designerServiceIds: this.selectService.map(({ id }) => id)
    }
    if (designerId !== 1) {
      this.getDesignerBookingTimesWithRange(input)
    } else {
      this.getNonDesignateBookingTimesWithRange({
        input: {
          storeId: this.$store.state.appointmentData.merchantId,
          dateRange: {
            startDate: splitDate[0],
            endDate: splitDate[1]
          },
          bookingItemIds: this.selectService.map(({ id }) => id)
        }
      })
    }
  }
}
</script>

<style scoped>
.time-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  cursor: pointer;
  background: white;
  color: #374151;
}

.time-slot:active {
  background: #fafafa;
}

.time-slot--active {
  border: 2px solid #FF6B2C;
  background: #FFF5F0;
  color: #FF6B2C;
  font-weight: 600;
}

.time-slot--disabled {
  color: #d1d5db;
  pointer-events: none;
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>

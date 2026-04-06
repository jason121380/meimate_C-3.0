<template>
  <section v-if="!isGlobalLoading" id="firstPos">
    <div class="w-full max-w-[768px] mx-auto px-5 mt-4 pb-36">
      <!-- 可選擇多個項目 (移除) -->

      <!-- 目前選擇 設計師 -->
      <div class="designer-selected-card mb-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center flex-shrink-0">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-gray-400">目前選擇</span>
            <span class="text-[15px] font-semibold text-gray-900">{{ selectDesigner || '不指定' }}</span>
          </div>
        </div>
      </div>

      <!-- 推薦預約項目 -->
      <div v-if="checkHasServiceItem">
        <!-- 分類 Tab -->
        <div class="flex items-center gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar">
          <button @click="(selectTab = 'all'), (selectTabId = '')"
            class="service-tab"
            :class="{ 'service-tab--active': selectTab === 'all' }">
            全部
          </button>
          <button v-for="(tab, idx) in serviceItem" :key="tab.id"
            @click="(selectTab = idx + 1), (selectTabId = tab.id)"
            class="service-tab"
            :class="{ 'service-tab--active': selectTab === idx + 1 }">
            {{ tab.name }}
          </button>
        </div>

        <h3 class="text-lg font-bold text-gray-900 mb-4">選擇項目 (可多選)</h3>

        <!-- 服務卡片列表 -->
        <div v-if="filterServiceList.length > 0" class="flex flex-col gap-3">
          <div v-for="list in filterServiceList" :key="list.id"
            @click="selectServiceFn(list)"
            class="service-card"
            :class="{ 'service-card--active': isSelectedService(list.id) }">
            <div class="flex flex-col w-full min-w-0 pr-4">
              <div class="flex justify-between items-start gap-4">
                <h4 class="text-[15px] font-semibold leading-snug" :class="isSelectedService(list.id) ? 'text-gmb-orange-600' : 'text-gray-900'">
                  {{ list.name }}
                </h4>
                <div v-if="priceDisplay" class="text-[14px] font-medium text-gray-500 whitespace-nowrap shrink-0">
                  <span v-if="(list.highestPrice) == null">NT${{ list.lowestPrice }}起</span>
                  <span v-if="(list.highestPrice) == (list.lowestPrice)">NT${{ list.lowestPrice }}</span>
                  <span v-if="(list.highestPrice) !== (list.lowestPrice) && (list.highestPrice) !== null">NT${{ list.lowestPrice }}-{{ list.highestPrice }}</span>
                </div>
              </div>
              
              <div v-if="list.serviceMinutes" class="flex items-center gap-1 text-gray-400 text-[13px] mt-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ formatDuration(list.serviceMinutes) }}</span>
              </div>
            </div>
            <div v-if="isSelectedService(list.id)" class="check-icon shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
        </div>

        <p v-else class="text-gray-400 text-sm py-4 text-center">
          該類別暫無服務項目
        </p>
      </div>

    </div>

    <!-- 底部操作欄 -->
    <div class="fixed left-0 right-0 bg-white border-t border-gray-100 z-20 safe-area-bottom" style="bottom: calc(72px + env(safe-area-inset-bottom, 0px));">
      <div class="max-w-[768px] mx-auto px-5 py-2">
        <!-- 統計列 -->
        <div v-if="checkHasServiceItem" class="flex justify-between items-center mb-2">
          <p class="text-xs text-gray-500">
            已選擇 {{ selectService.length }} 項 / {{ totalMinutes }}分鐘 / NT${{ totalPrice }}
          </p>
          <button v-if="selectService.length > 0" @click="clearAll" class="text-sm font-medium text-gmb-orange-600">清空</button>
        </div>
        <div class="flex items-center gap-3">
          <button @click="$router.go(-1)" class="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </button>
          <button @click="toSelectDate()"
            class="flex-1 py-3.5 text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2"
            :class="(!checkHasServiceItem || selectService.length > 0) ? 'bg-gmb-orange-500 hover:bg-gmb-orange-600 shadow-lg shadow-gmb-orange-200' : 'bg-gray-200 text-gray-400 pointer-events-none'">
            選擇日期和時間
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "appointment-selectService",
  data() {
    return {
      serviceItem: [],
      selectTab: "all",
      selectTabId: "",
      remarkForCustomer: "",
      customerReference: [],
      selectReference: "",
      checkHasServiceItem: false,
      companionCount: 0,
      isLine: false,
      priceDisplay: false
    };
  },
  computed: {
    designerId() {
      return this.$store.state.appointmentData.designerId;
    },
    selectDesigner() {
      return this.$store.state.appointmentData.designerName;
    },
    switchTabStyle() {
      switch (this.selectTab) {
        case "all":
          return `left: 0px; width: 68px;`;
        default:
          const selectIdx = this.selectTab;
          let tabWidth = document.querySelector(
            `.service__tab-${selectIdx}`
          ).clientWidth;
          let offsetLeft = document.querySelector(
            `.service__tab-${selectIdx}`
          ).offsetLeft;
          return `left: ${offsetLeft}px; width: ${tabWidth}px;`;
      }
    },
    filterServiceList() {
      switch (this.selectTabId) {
        case "":
          let allList = [];
          this.serviceItem.forEach((item) => {
            item.bookingItem.forEach((bookingItem) =>
              allList.push(bookingItem)
            );
          });
          return allList;
        default:
          const list = this.serviceItem.find(
            (item) => item.id === this.selectTabId
          );
          return list.bookingItem;
      }
    },
    isGlobalLoading() {
      return this.$store.state.loading.isLoading;
    },
    selectService() {
      return this.$store.state.appointmentData.designerServiceIds
    },
    totalMinutes() {
      return this.selectService.reduce((sum, item) => sum + (item.serviceMinutes || 0), 0)
    },
    totalPrice() {
      return this.selectService.reduce((sum, item) => sum + (item.lowestPrice || 0), 0)
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
    clearAll() {
      this.selectService.forEach(item => {
        this.$store.dispatch("appointmentData/handleCancelService", item)
      })
    },
    changeCompanionCountInput(e) {
      if (this.companionCount == '') {
        this.companionCount = 0
      }
    },
    selectServiceFn(item) {
      this.$store.dispatch("appointmentData/handleSelectService", item)
    },
    isSelectedService(id) {
      return this.selectService.map((item) => item.id).includes(id);
    },
    cancelService(item) {
      this.$store.dispatch("appointmentData/handleCancelService", item)
    },
    getBookingItemCategoryForCustomer() {
      const input = {
        storeId: this.$store.state.appointmentData.merchantId,
        designerId: this.$store.state.appointmentData.designerId,
      };

      this.api
        .getBookingItemCategoryForCustomer(input)
        .then((res) => {
          if (!res.hasError) {
            res.data.getBookingItemCategoryForCustomer =
              res.data.getBookingItemCategoryForCustomer.sort((a, b) => {
                return a["sort"] - b["sort"];
              });

            this.serviceItem = res.data.getBookingItemCategoryForCustomer;

            let count = 0;

            this.serviceItem.forEach((item) => {
              item.bookingItem.sort((a, b) => a["sort"] - b["sort"]);
              if (item?.bookingItem.length !== 0) count++;
            });

            if (count) this.checkHasServiceItem = true;
          }

          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("loading/isLoading", false);
        });
    },
    getNDBookingItemCategory() {
      const merchantId = this.$store.state.appointmentData.merchantId

      this.api
        .getNDBookingItemCategory(merchantId)
        .then((res) => {
          if (!res.hasError) {
            res.data.getNDBookingItemCategory =
              res.data.getNDBookingItemCategory.sort((a, b) => {
                return a["sort"] - b["sort"];
              });

            this.serviceItem = res.data.getNDBookingItemCategory;

            let count = 0;

            this.serviceItem.forEach((item) => {
              item.bookingItem.sort((a, b) => a["sort"] - b["sort"]);
              if (item?.bookingItem.length !== 0) count++;
            });

            if (count) this.checkHasServiceItem = true;
          }

          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("loading/isLoading", false);
        });
    },
    getCustomerReference() {
      this.api
        .getCustomerReference()
        .then((res) => {
          if (!res.data.hasError) {
            this.customerReference = res.data.getCustomerReference;
          }

          const designerId = this.$store.state.appointmentData.designerId;

          if (designerId === '1')
            this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async toSelectDate() {
      if (this.isLine || this.$route.query.getLoginCacheData === 'true') {
        try {
          const staticInfo = JSON.stringify({
            merchantId: this.$store.state.appointmentData.merchantId,
            designerName: this.$store.state.appointmentData.designerName,
            setPreferDesigner: this.$store.state.appointmentData.setPreferDesigner,
            requiredInput: this.$store.state.appointmentData.requiredInput,
            notRequiredInputDisplay: this.$store.state.appointmentData.notRequiredInputDisplay,
            serviceItem: this.serviceItem.map(({ bookingItem }) => (
              bookingItem.map(item => item)
            )).flat()
          })
          const res = await this.$api.cacheBookingData({
            input: {
              bookingData: {
                cellphone: '',
                name: '',
                dateTime: this.$store.state.appointmentData.cacheTimeStamp,
                designerId: this.$store.state.appointmentData.designerId,
                merchantId: this.$store.state.appointmentData.merchantId,
                designerServiceIds: this.selectService.map(({ id }) => id),
                remarkForCustomer: this.remarkForCustomer,
              },
              isNewCus: this.$store.state.appointmentData.isNewCus,
              newCusData: this.$store.state.appointmentData.newCusData,
              staticInfo: staticInfo
            }
          })
          this.$store.dispatch('appointmentData/handleSetStaticData', staticInfo)
          const orderToken = res.data.cacheBookingData
          window.localStorage.setItem('orderToken', orderToken)
        } catch (error) {
          console.log(error);
        }
      }
      const appointmentData = {
        reference: this.selectReference,
        remarkForCustomer: this.remarkForCustomer,
        companionCount: this.companionCount
      }
      let page = '/selectDate'
      if (this.$route.query.getLoginCacheData === 'true') {
        page += '?getLoginCacheData=true'
      }
      this.$store.dispatch("appointmentData/handleSetAppointmentData", appointmentData)
      this.$router.push(this.$route.matched[1].path + page);
    },
    async getPriceDisplay() {
      try {
        const res = await this.$api.getBookingItemPriceDisplay({
          input: this.$store.state.appointmentData.merchantId
        })
        this.priceDisplay = res.data.getBookingItemPriceDisplay
      } catch (error) {
        console.log('error: ', error);
      }
    }
  },
  async mounted() {
    this.isLine = this.$route.path.includes('line') || this.$route.query.getLoginCacheData === 'true'
    const designerId = this.$store.state.appointmentData.designerId;
    if (!designerId) return this.$router.push("/member/appointment/");

    if (designerId !== 1) {
      this.getBookingItemCategoryForCustomer();
    } else {
      this.getNDBookingItemCategory()
    }
    this.getCustomerReference();
    await this.getPriceDisplay();
    this.remarkForCustomer = this.$store.state.appointmentData.remarkForCustomer
  },
  watch: {
    serviceItem() {
      const items = this.serviceItem.map(({ bookingItem }) => (
        bookingItem.map(item => item)
      )).flat()
      const cacheServiceIds = this.$store.state.appointmentData.cacheServiceIds
      if (this.isLine && cacheServiceIds.length && items.length) {
        const selectService = items.filter(d => cacheServiceIds.includes(`${d.id}`))
        this.$store.dispatch('appointmentData/handleSetService', selectService)
        this.$store.dispatch('appointmentData/handleClearCacheServiceIds')
      }
    }
  }
};
</script>

<style scoped>
.designer-selected-card {
  display: flex;
  align-items: center;
  padding: 16px 18px;
  background: #f9fafb;
  border-radius: 14px;
}

.service-tab {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #9ca3af;
  background: #f3f4f6;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.service-tab--active {
  background: #FF6B2C;
  color: white;
}

.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  cursor: pointer;
  background: white;
}

.service-card:active:not(.service-card--active) {
  background: #fafafa;
  background: #fafafa;
}

.service-card--active,
.service-card--active:hover {
  border-color: #FF6B2C;
  background: #FFF5F0;
}

.check-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FF6B2C;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

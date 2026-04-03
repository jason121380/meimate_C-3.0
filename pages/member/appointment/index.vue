<template>
  <section id="firstPos">
    <div class="w-full max-w-[768px] mx-auto px-5 pt-6 pb-28">

      <!-- 標題 -->
      <div class="flex items-center mb-6">
        <h1 class="text-xl font-bold text-gmb-orange-500">立即預約</h1>
      </div>

      <!-- 設計師列表 -->
      <div v-if="!searchingDesigners" class="flex flex-col gap-3">
        <!-- 不指定 -->
        <template v-if="isCusNonDesBookingUsing">
          <div @click="selectDesigner({ nameForCustomerSide: '不指定', id: 1 })"
            class="designer-card"
            :class="{ 'designer-card--active': isSelectDesigner(1) }">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center flex-shrink-0">
                <span class="text-xl font-bold text-gray-400">不</span>
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-gray-900 text-[15px]">不指定</span>
              </div>
            </div>
            <div v-if="isSelectDesigner(1)" class="check-icon">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
        </template>

        <!-- 喜好設計師 -->
        <div v-if="defaultDesigner && defaultDesigner.id" 
          @click="selectDesigner(defaultDesigner)"
          class="designer-card"
          :class="{ 'designer-card--active': isSelectDesigner(defaultDesigner.id) }">
          <div class="flex items-center gap-4">
            <img :src="defaultDesigner.avatar" :alt="defaultDesigner.nameForCustomerSide"
              class="w-12 h-12 rounded-full object-cover object-center flex-shrink-0 bg-gray-100" />
            <div class="flex flex-col">
              <h4 class="font-medium text-gray-900 text-[15px]">{{ defaultDesigner.nameForCustomerSide }}</h4>
              <p v-if="defaultDesigner.selfIntroduction" class="text-xs text-gray-400 mt-0.5">{{ defaultDesigner.selfIntroduction }}</p>
            </div>
          </div>
          <div v-if="isSelectDesigner(defaultDesigner.id)" class="check-icon">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <!-- 其他設計師 -->
        <template v-if="!isCusBookingPreferDesOnly">
          <div v-for="item in filterNonfavoriteDesigners" :key="item.id"
            @click="selectDesigner(item)"
            class="designer-card"
            :class="{ 'designer-card--active': isSelectDesigner(item.id) }">
            <div class="flex items-center gap-4">
              <template v-if="item.nameForCustomerSide !== '不指定'">
                <img :src="item.avatar" :alt="item.nameForCustomerSide"
                  class="w-12 h-12 rounded-full object-cover object-center flex-shrink-0 bg-gray-100" />
              </template>
              <template v-else>
                <div class="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center flex-shrink-0">
                  <span class="text-xl font-bold text-gray-400">不</span>
                </div>
              </template>
              <div class="flex flex-col">
                <h4 class="font-medium text-gray-900 text-[15px]">{{ item.nameForCustomerSide }}</h4>
                <p v-if="item.selfIntroduction" class="text-xs text-gray-400 mt-0.5">
                  <a v-if="item.selfIntroductionLink"
                    @click.stop
                    :href="item.selfIntroductionLink"
                    target="_blank"
                    class="underline text-blue-400">
                    {{ item.selfIntroduction }}
                  </a>
                  <span v-else>{{ item.selfIntroduction }}</span>
                </p>
              </div>
            </div>
            <div v-if="isSelectDesigner(item.id)" class="check-icon">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
        </template>
      </div>

      <!-- Loading -->
      <div v-else class="min-h-[200px] w-full flex items-center justify-center">
        <div class="border-3 border-t-gmb-orange-500 border-gray-200 rounded-full w-10 h-10 animate-spin"></div>
      </div>
    </div>

    <!-- 底部操作欄 -->
    <div class="fixed left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.02)] border-t border-gray-100 z-20" style="bottom: calc(72px + env(safe-area-inset-bottom, 0px));">
      <div class="max-w-[768px] mx-auto px-5 py-3">
        <button @click="toSelectService()"
          class="w-full py-3.5 text-white text-[15px] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300"
          :class="{
            'bg-gray-200 text-gray-400 pointer-events-none': !userSelect.designerId,
            'bg-gmb-orange-500 hover:bg-gmb-orange-600 shadow-lg shadow-gmb-orange-200': userSelect.designerId,
          }">
          選擇服務項目
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "appointment-index",
  head() {
    return {
      title: "立即預約",
    };
  },
  data() {
    return {
      designers: [],
      searchingDesigners: false,
      storeAddress: "",
      userSelect: {
        merchantId: "",
        merchantName: "",
        designerId: "",
        designerName: "",
        designerNickName: "",
        nameForCustomerSide: ""
      },
      isCusBookingPreferDesOnly: false,
      isCusNonDesBookingUsing: false,
      isLine: false
    };
  },

  methods: {
    // 搜尋設計師
    searchDesigner(id) {
      return new Promise((resolve, reject) => {
        this.searchingDesigners = true;
        this.designers = [];

        this.api
          .customerGetMerchantDesigners(id)
          .then((res) => {
            if (!res.data.hasError) {
              this.designers = res.data.customerGetMerchantDesigners;
              this.searchingDesigners = false;
              resolve();
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })
    },
    // 選擇設計師
    selectDesigner(item) {
      this.userSelect.designerId = item.id;
      this.userSelect.designerName = item.nameForCustomerSide;
      this.userSelect.designerNickName = item.nickName ? item.nickName : 1;
    },
    isSelectDesigner(id) {
      if (this.userSelect.designerId === id) return true;
      return false;
    },
    toSelectService() {
      const data = {
        merchantId: this.userSelect.merchantId,
        merchantName: this.userSelect.merchantName,
        designerId: this.userSelect.designerId,
        designerName: this.userSelect.designerName,
        designerNickName: this.userSelect.designerNickName,
      };
      this.$store.dispatch(
        "appointmentData/handleSetDesignerAndMerchant",
        data
      );
      const lastChar = this.$route.path[this.$route.path.length - 1] === '/'
      let nextPage = lastChar ? 'selectService' : '/selectService'
      if (this.$route.query.getLoginCacheData === 'true') {
        nextPage += '?getLoginCacheData=true'
      }
      this.$router.push(this.$route.path + nextPage);
    },
    async getData () {
      if (this.isGetCloseCustomerBookingForCustomer === null) {
        const { data, hasError } = await this.api.getCloseCustomerBookingForCustomer();
        if (hasError) return
        this.$store.commit('merchant/setIsCloseCustomerBookingForCustomer', data.getCloseCustomerBookingForCustomer)
      }
      if (this.isGetCloseCustomerBookingForCustomer) {
        this.$swal.fire({
          icon: 'warning',
          title: '門市未開放線上預約',
          iconColor: '#FF6B2C',
          confirmButtonColor: '#FF6B2C',
          customClass: {
            popup: '!rounded-2xl !shadow-lg',
            confirmButton: '!rounded-full !px-8'
          }
        }).then(() => {
          this.$router.push("/member");
        });
        return;
      } 
      const merchant = JSON.parse(window.localStorage.getItem("merchant"));
      let id = merchant?.id || "";
      this.userSelect.merchantName = merchant.name || "";
      this.userSelect.merchantId = merchant.id || "";
      this.storeAddress = merchant.address || "";

      try {
        const res = await this.api.CustomerBookingLimit()
        this.isCusNonDesBookingUsing = res.data.customerBookingLimit.isCusNonDesBookingUsing
        this.isCusBookingPreferDesOnly = res.data.customerBookingLimit.isCusBookingPreferDesOnly
        await this.searchDesigner(id);
        const designer = this.designers.find(d => d.id === this.$route.query.designerId)
        if (this.defaultDesigner.length === 0) {
          this.isCusBookingPreferDesOnly = false;
        }
        if (this.isCusBookingPreferDesOnly && !this.isCusNonDesBookingUsing) {
          this.selectDesigner(designer || this.defaultDesigner);
          this.toSelectService();
          this.$router.replace("/member/appointment/selectService");
        }
        else {
          if (designer) {
            this.selectDesigner(designer)
            this.toSelectService();
          } else if (this.defaultDesigner) {
            this.selectDesigner(this.defaultDesigner)
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getDataOutsite (merchantId) {
      const storeId = { storeId: merchantId}
      if (this.isGetCloseCustomerBookingForCustomer === null) {
        const { data, hasError } = await this.api.getCloseCustomerBookingForCustomerNoLogin(storeId);
        if (hasError) return
        this.$store.commit('merchant/setIsCloseCustomerBookingForCustomer', data.getCloseCustomerBookingForCustomerNoLogin)
      }
      if (this.isGetCloseCustomerBookingForCustomer) {
        this.$swal.fire({
          icon: 'warning',
          title: '門市未開放線上預約',
          iconColor: '#FF6B2C',
          confirmButtonColor: '#FF6B2C',
          customClass: {
            popup: '!rounded-2xl !shadow-lg',
            confirmButton: '!rounded-full !px-8'
          }
        }).then(() => {
          this.$router.push("/member");
        });
        return;
      }
      const merchantData = await this.api.getMerchantProfile(storeId)
      window.localStorage.setItem('merchant', JSON.stringify(merchantData.data.getMerchantProfile))
      this.userSelect.merchantName = merchantData.data.getMerchantProfile.name;
      this.userSelect.merchantId = merchantId;
      this.storeAddress = merchantData.data.getMerchantProfile.address;
      this.$store.dispatch(
        'appointmentData/handleSetRequiredInput', {
          required: merchantData.data.getMerchantProfile.requiredColumnForNewCustomer,
          display: merchantData.data.getMerchantProfile.isNRCDisplayForNewCus,
        }
      )

      try {
        const res = await this.api.customerBookingLimitNoLogin(storeId)
        this.isCusNonDesBookingUsing = res.data.customerBookingLimitNoLogin.isCusNonDesBookingUsing
        await this.searchDesigner(merchantId);
        const designerId = this.$route.query.designerId
        if (this.isLine && designerId && this.userSelect.designerId !== designerId) {
          const designerData = this.designers.find(({ id }) => id === designerId)
          if (designerData) {
            this.$store.dispatch('appointmentData/handleClearData')
            this.selectDesigner(designerData)
            this.$store.dispatch('appointmentData/handleSetPreferDesigner', true)
            this.toSelectService()
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCachedBookingData () {
      const token = window.localStorage.getItem('orderToken')
      if (!token) return
      try {
        const res = await this.$api.getCachedBookingData({ token })
        if (res.data) {
          const {
            designerId, designerServiceIds, merchantId, dateTime,
            remarkForCustomer
          } = res.data.getCachedBookingData.bookingData
          const {isNewCus, newCusData} = res.data.getCachedBookingData
          if (this.userSelect.merchantId !== merchantId) return

          const designer = this.designers.find(d => d.id === designerId)
          if (designerId === 1 || designerId === '1') {
            this.selectDesigner({ nameForCustomerSide: '不指定', id: 1 })
          } else if (designer) {
            this.userSelect.designerId = designer.id;
            this.userSelect.designerName = designer.nameForCustomerSide;
            this.userSelect.designerNickName = designer.nickName ? designer.nickName : 1;
          }
          this.$store.dispatch('appointmentData/handleSetCacheServiceIds', designerServiceIds)
          dateTime && this.$store.dispatch('appointmentData/handleSetCacheTimeStamp', dateTime)
          this.$store.dispatch('appointmentData/handleSetRemarkForCustomer', remarkForCustomer)
          this.$store.dispatch('appointmentData/handleSetNewCusData', { isNewCus, newCusData })
        } else {
          window.localStorage.removeItem('orderToken')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getCurrentMerchant() {
      if (!this.$cookieMethods.getToken()) return null;
      try {
        const res = await this.$api.customerGetCurrentMerchantSetting()
        return res.data.customerGetCurrentMerchantSetting?.currentMerchant?.id
      } catch (error) {
        return null
      }
    }
  },
  computed: {
    isGetCloseCustomerBookingForCustomer() {
      return this.$store.state.merchant.isCloseCustomerBookingForCustomer;
    },
    filterNonfavoriteDesigners() {
      if (this.defaultDesigner.id)
        return this.designers.filter(
          (item) => item.id !== this.defaultDesigner.id
        );
      return this.designers;
    },
    defaultDesigner() {
      let des = window.localStorage.getItem("preferDesigner");
      if (des != "null" && des !== null) {
        if (des != "") {
          des = JSON.parse(window.localStorage.getItem("preferDesigner"));
          return (this.designers.filter((designer) => designer.id === des.id)[0] || []);
        } else {
          return this.designers = [];
        }
      } else {
        return this.designers = [];
      }
    },
    isTextOverflowList() {
      if (!this.textOverflowList) return []
      const list = []
      for (let i = 0; i < this.textOverflowList.length; i++) {
        const text = this.textOverflowList[i]
        const container = this.textCaontainer
        if (text.offsetWidth > container.offsetWidth) {
          list.push(true)
        } else {
          list.push(false)
        }
      }
      return list
    },
    isDeaultTextOverflow() {
      if (!this.deaultTextOverflow) return false
      const text = this.deaultTextOverflow
      const container = this.textCaontainer
      if (text.offsetWidth > container.offsetWidth) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    const merchantId = this.$route.query.merchantId
    const localMerchantId = JSON.parse(window.localStorage.getItem('merchant'))?.id
    this.isLine = this.$route.path.includes('line')
    if (this.isLine) {
      const currentMerchantId= await this.getCurrentMerchant()
      const merchantIds = [merchantId, localMerchantId, currentMerchantId];
      const areAllMerchantIdsEqual = merchantIds.every(id => id === merchantIds[0]);
      if (areAllMerchantIdsEqual) {
        const designerId = this.$route.query.designerId
        this.$router.push(`/member/appointment?arrowDisplay=true&getLoginCacheData=true${designerId ? `&designerId=${designerId}` : ''}`)
        await this.getData()
        await this.getCachedBookingData()
      } else {
        window.localStorage.clear()
        this.$cookieMethods.removeToken()
        this.userSelect.merchantId = merchantId
        await this.getDataOutsite(merchantId)
        await this.getCachedBookingData()
      }
    } else {
      await this.getData()
      if (this.$route.query.getCacheData === 'true') {
        await this.getCachedBookingData()
        this.toSelectService()
      } else if (this.$route.query.getLoginCacheData === 'true') {
        await this.getCachedBookingData()
      }
    }
  },
};
</script>

<style scoped>
.designer-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border: 1px solid #f0f0f0;
  border-radius: 50rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.designer-card:hover {
  border-color: #e5e5e5;
  background: #fafafa;
}

.designer-card--active {
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
</style>

<template>
  <section id="firstPos">
    <div class="w-full max-w-[768px] mx-auto pb-[120px] px-5 pt-6">

      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6">
        <button @click="$router.back()" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 active:bg-gray-50 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">偏好設定</h1>
      </div>

      <!-- 搜尋框 -->
      <h4 v-pre class="text-base mb-3 font-semibold text-gray-900">選擇登入店家</h4>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input @input="searchMerchants()" v-model="searchInput" type="text" placeholder="搜尋關鍵字"
          class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 ps-11 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200" />
      </div>

      <!-- 偏好門市 -->
      <!-- 預設門市 -->
      <div v-if="isShowDefault && defaultMerchant.id" class="mt-4">
        <div @click="searchDesigner(defaultMerchant.id), selectStore(defaultMerchant)"
          class="store-card cursor-pointer"
          :class="{ 'store-card--active': isSelectedStore(defaultMerchant.id) }">
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full flex justify-center items-center shrink-0 transition-none"
              :class="isSelectedStore(defaultMerchant.id) ? 'bg-gmb-orange-500' : 'border-2 border-gray-200'">
              <svg v-if="isSelectedStore(defaultMerchant.id)" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h4 class="text-[15px] font-medium text-gray-900 line-clamp-1">{{ defaultMerchant.name }}</h4>
          </div>
          <p class="text-gray-400 text-xs mt-0.5 ml-9 line-clamp-1">{{ defaultMerchant.address }}</p>
        </div>
      </div>

      <!-- 門市列表 -->
      <div v-if="merchants.length > 0 && !merchantsIsNull" class="w-full mt-3 flex flex-col gap-3">
        <div v-for="(item, idx) in merchants" :key="item.id"
          @click="searchDesigner(item.id), selectStore(item)"
          class="store-card cursor-pointer"
          :class="{ 'store-card--active': isSelectedStore(item.id) }">
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full flex justify-center items-center shrink-0 transition-none"
              :class="isSelectedStore(item.id) ? 'bg-gmb-orange-500' : 'border-2 border-gray-200'">
              <svg v-if="isSelectedStore(item.id)" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h4 class="text-[15px] font-medium text-gray-900 line-clamp-1">{{ item.name }}</h4>
          </div>
          <p class="text-gray-400 text-xs mt-0.5 ml-9 line-clamp-1">{{ item.address }}</p>
        </div>
      </div>
      <div v-if="merchantsIsNull && !isShowDefault" class="mt-6 text-center text-sm text-gray-400 py-8">
        <svg class="w-6 h-6 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        查無門市
      </div>

      <ItemLoading />

      <!-- 選擇喜好設計師 -->
      <h4 v-pre class="text-base mt-10 mb-4 font-semibold text-gray-900">
        選擇喜好設計師
      </h4>
      <div class="flex flex-col gap-3" :class="{ 'pt-4': designers.length === 0 }">
        <div v-if="searchingDesigners" class="min-h-[150px] w-full flex items-center justify-center">
          <div class="border-3 border-t-gmb-orange-500 border-gray-200 rounded-full w-10 h-10 animate-spin"></div>
        </div>

        <div v-if="designers.length === 0 && !searchingDesigners" class="text-center text-sm text-gray-400 py-8">
          <svg class="w-6 h-6 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          查無資料
        </div>

        <!-- 設計師列表 -->
        <div v-for="(item, idx) in designers" :key="item.id"
          @click="selectDesigner(item.id)"
          class="designer-card"
          :class="{ 'designer-card--active': favoriteInfo.designer === item.id }">
          <div class="flex items-center gap-3">
            <img :src="item.avatar" :alt="item.nameForCustomerSide"
              class="w-11 h-11 rounded-full object-cover object-center flex-shrink-0 bg-gray-100" />
            <div class="flex flex-col min-w-0">
              <h4 class="text-[15px] font-medium text-gray-900 truncate">{{ item.nameForCustomerSide }}</h4>
              <p v-if="item.selfIntroduction" class="text-xs text-gray-400 mt-0.5 truncate">{{ item.selfIntroduction }}</p>
            </div>
          </div>
          <div v-if="favoriteInfo.designer === item.id" class="check-icon shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 底部操作欄 -->
      <div class="fixed left-0 right-0 bottom-0 bg-white border-t border-gray-100 z-20" style="padding-bottom: env(safe-area-inset-bottom, 0px);">
        <div class="max-w-[768px] mx-auto px-5 py-3">
          <button @click="saveFavorite"
            class="w-full py-3.5 text-[15px] font-semibold rounded-full flex items-center justify-center gap-2 transition-none shadow-sm"
            :class="{
              'bg-gray-200 text-gray-400 pointer-events-none': isChanging || !favoriteInfo.id,
              'bg-gmb-orange-500 text-white hover:bg-gmb-orange-600 shadow-gmb-orange-200/50': !isChanging && favoriteInfo.id,
            }">
            <i v-if="isChanging" class="bi bi-arrow-repeat flex animate-spin text-current"></i>
            儲存設定
          </button>
        </div>
      </div>
    </div>
    <StatusModal :showModal="showModal" content="已儲存偏好設定" @close="showModal = false" :timeout="1500" />
  </section>
</template>

<script>
import { cancelAllPending } from "@/utils/cancelToken.js";
import pageLinks from "./../../../static/pageLinks.js";
export default {
  name: "setting-edit",
  data() {
    return {
      designers: [],
      favoriteInfo: {
        id: "",
        name: "",
        designer: "",
      },
      defaultMerchant: {},
      merchants: [],
      merchantsIsNull: true,
      searchInput: "",
      isShowDefault: true,
      searchingDesigners: false,
      isChanging: false,
      showModal: false,
    };
  },
  methods: {
    // 搜尋門市 // 延遲請求
    searchMerchants() {
      let lastTimeVal = this.searchInput;

      setTimeout(() => {
        if (lastTimeVal === this.searchInput) {
          cancelAllPending();

          this.merchants = [];
          this.merchantsIsNull = false;
          this.isShowDefault = false;
          this.$store.dispatch("itemLoading/isLoading", true);

          const input = this.searchInput.trim();

          if (!input) {
            this.isShowDefault = true;
            this.$store.dispatch("itemLoading/isLoading", false);
            return;
          }

          this.api
            .getAllMerchants(input)
            .then((res) => {
              if (res.data.getAllMerchants.length === 0)
                this.merchantsIsNull = true;

              this.merchants = res.data.getAllMerchants;
              this.$store.dispatch("itemLoading/isLoading", false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 500);
    },
    // 搜尋門市可預約設計師
    searchDesigner(id) {
      if (this.favoriteInfo.id === id) return;

      cancelAllPending();

      this.searchingDesigners = true;
      this.designers = [];

      this.api
        .customerGetMerchantDesigners(id)
        .then((res) => {
          this.designers = res.data.customerGetMerchantDesigners;
          this.searchingDesigners = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 選擇門市
    selectStore(item) {
      if (this.favoriteInfo.id === item.id) return;
      this.favoriteInfo.designer = "";
      this.favoriteInfo.id = item.id;
      this.favoriteInfo.name = item.name;
    },
    // 選擇設計師
    selectDesigner(id) {
      this.favoriteInfo.designer = id;
    },
    // 判斷選取到的門市
    isSelectedStore(id) {
      if (this.favoriteInfo.id === id) {
        return true;
      } else {
        return false;
      }
    },
    // 修改偏好
    // 變更完設定後要再打一隻取得 defaultMarchant 的api (customerGetCurrentMerchantSetting)，否則第一次沒有店家的會員不能跳頁面
    saveFavorite() {
      this.isChanging = true;
      let sameMerchant = this.favoriteInfo.id == this.defaultMerchant.id;

      //沒選設計師、沒更新店家
      if (!this.favoriteInfo.designer && sameMerchant) {
        //直接取得目前設定
        // this.customerGetCurrentMerchantSetting();

        // 更新設計師
        this.api
          .updateCustomerPreferDesigner("", this.favoriteInfo.id)
          .then(() => {
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //沒選設計師、更新店家
      if (!this.favoriteInfo.designer && !sameMerchant) {
        //更新店家設定
        this.api
          .updateCustomerCuttentMerchant(this.favoriteInfo.id)
          .then((res) => {
            if (res.data.hasError) throw res.errors;
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //選設計師、更新店家
      if (this.favoriteInfo.designer && !sameMerchant) {
        //先更新店家
        this.api
          .updateCustomerCuttentMerchant(this.favoriteInfo.id)
          .then((res) => {
            if (res.data.hasError) throw res.errors;
            // 再更新設計師
            this.api
              .updateCustomerPreferDesigner(this.favoriteInfo.designer, this.favoriteInfo.id)
              .then(() => {
                this.customerGetCurrentMerchantSetting();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //選設計師、沒更新店家
      if (this.favoriteInfo.designer && sameMerchant) {
        this.api.updateCustomerPreferDesigner(this.favoriteInfo.designer, this.favoriteInfo.id)
          .then(() => {
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    loadData() {
      // 取得門市設計師資料
      let merchant = JSON.parse(window.localStorage.getItem("merchant")) || {};

      if (merchant?.id) this.searchDesigner(merchant?.id);

      // 取得預設門市資料
      this.defaultMerchant = merchant;
      // 選擇門市
      this.selectStore(this.defaultMerchant);
    },
    async getCloseCustomerBookingForCustomer() {
      const { data, hasError } = await this.api.getCloseCustomerBookingForCustomer();
      if (hasError) return
      this.$store.commit('merchant/setIsCloseCustomerBookingForCustomer', data.getCloseCustomerBookingForCustomer)
    },
    // 取得預設門市、設計師、所有門市
    customerGetCurrentMerchantSetting() {
      //取得是否新客且無店家
      let isNewCustomerAndNomerchant = JSON.parse(
        localStorage.getItem("isNewCustomerAndNomerchant")
      );
      const isLineBinded = localStorage.getItem("isLineBinded")
      window.localStorage.clear();
      this.api
        .customerGetCurrentMerchantSetting()
        .then((res) => {
          if (!res.data.hasError) {
            let resData = res.data.customerGetCurrentMerchantSetting
            localStorage.setItem("allMerchants", JSON.stringify(resData.consumedMerchants));
            localStorage.setItem("merchant", JSON.stringify(resData.currentMerchant));
            localStorage.setItem("preferDesigner", JSON.stringify(resData.preferDesigner));
            isLineBinded === 'false' && localStorage.setItem('isLineBinded', isLineBinded)
            this.getCloseCustomerBookingForCustomer()

            this.isChanging = false;

            this.showModal = true
            setTimeout(() => {
              if (isNewCustomerAndNomerchant) {
                let url = "/member/appointment";
                if (pageLinks.includes(this.$route.query.to)) {
                  url = `/member/${this.$route.query.to}?arrowDisplay=true`;
                }
                this.$router.push(url);
              } else {
                this.$router.push("/member");
              }
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadData();
  },
  activated() {
    // keep-alive 快取時 mounted 不會重新執行，需要在 activated 重新載入資料
    this.loadData();
  },
};
</script>

<style scoped>
.store-card {
  padding: 14px 18px;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  background: white;
}

.store-card:active {
  background: #fafafa;
}

.store-card--active {
  border-color: #FF6B2C;
  background: #FFF5F0;
}

.designer-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border: 1px solid #f0f0f0;
  border-radius: 50rem;
  cursor: pointer;
  background: white;
}

.designer-card:active {
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

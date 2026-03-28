<template>
  <section id="firstPos">
    <div class="w-full max-w-[768px] mx-auto pb-[120px] px-5 sm:px-10 md:mt-6">
      <Breadcrumb :title="'偏好設定'" />
      <h4 v-pre class="text-lg mb-3 font-semibold text-gray-dark mt-10">選擇登入店家</h4>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1"
              transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
            <path
              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
              fill="currentColor" />
          </svg>
        </div>
        <input @input="searchMerchants()" v-model="searchInput" type="text" placeholder="搜尋關鍵字"
          class="form-control form-control-sm form-control-solid w-full !px-4 !ps-10 text-sm" />
      </div>

      <!-- 偏好門市 -->
      <!-- 預設門市 -->
      <div v-if="isShowDefault && defaultMerchant.id" class="mt-4">
        <MemberGlobalCard :py="'py-4'" :px="'px-4'" data-aos="fade-up" data-aos-delay="100" data-aos-once="true"
          data-aos-duration="300" data-aos-anchor="#firstPos">
          <div @click="
            searchDesigner(defaultMerchant.id), selectStore(defaultMerchant)
            " class="card-body grid grid-cols-12 items-center w-full p-4">
            <div class="col-span-5 relative">
              <div
                class="w-5 h-5 rounded-full border-2 border-mm-success flex justify-center items-center duration-300 scale-0"
                :class="{ 'scale-100': isSelectedStore(defaultMerchant.id) }">
                <i class="bi bi-check text-xl text-mm-success"/>
              </div>
              <h4 class="text-gray-dark line-clamp-1 duration-300 absolute left-0 top-1/2 -translate-y-1/2"
                :class="{ 'left-8': isSelectedStore(defaultMerchant.id) }">
                {{ defaultMerchant.name }}
              </h4>
            </div>
            <div class="col-span-7">
              <p class="text-gray text-sm line-clamp-1">{{ defaultMerchant.address }}</p>
            </div>
          </div>
        </MemberGlobalCard>
      </div>

      <!-- 門市列表 -->
      <div v-if="merchants.length > 0 && !merchantsIsNull" class="w-full mt-4">
        <MemberGlobalCard v-for="(item, idx) in merchants" :key="item.id" :py="'py-4'" :px="'px-4'" data-aos="fade-up"
          :data-aos-delay="idx * 100" data-aos-once="true" data-aos-duration="300" data-aos-anchor="#firstPos">
          <div @click="searchDesigner(item.id), selectStore(item)" class="grid grid-cols-12 items-center w-full p-4">
            <div class="col-span-5 relative">
              <div
                class="w-5 h-5 rounded-full border-2 border-mm-success flex justify-center items-center duration-300 scale-0"
                :class="{ 'scale-100': isSelectedStore(item.id) }">
                <i class="bi bi-check text-xl text-mm-success"/>
              </div>
              <h4 class="text-gray-dark line-clamp-1 duration-300 absolute left-0 top-1/2 -translate-y-1/2"
                :class="{ 'left-8': isSelectedStore(item.id) }">
                {{ item.name }}
              </h4>
            </div>
            <div class="col-span-7">
              <p class="text-gray text-sm line-clamp-1">{{ item.address }}</p>
            </div>
          </div>
        </MemberGlobalCard>
      </div>
      <div v-if="merchantsIsNull && !isShowDefault" class="mt-6 text-center text-sm text-slate-500">
        <div class="card-body flex justify-center items-center">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              class=" text-mm-primary">
              <path opacity="0.3"
                d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z"
                fill="currentColor" />
              <rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor" />
              <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor" />
              <rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor" />
              <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />
            </svg>
          </div>
          <div class=" text-mm-primary">查無門市</div>
        </div>
      </div>

      <ItemLoading />

      <!-- 選擇喜好設計師 -->
      <h4 v-pre data-aos="fade-up" data-aos-delay="100" data-aos-duration="300" data-aos-once="true"
        data-aos-anchor="#firstPos" class="text-lg mt-12 font-semibold text-gray-dark">
        選擇喜好設計師
      </h4>
      <ul data-aos="fade-up" data-aos-delay="100" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos"
        class="gap-4 mt-4" :class="{ 'pt-4': designers.length === 0 }">
        <div v-if="searchingDesigners" class="min-h-[150px] w-full flex items-center justify-center">
          <div class="border-4 border-t-mm-primary rounded-full w-10 h-10 animate-spin-slow"></div>
        </div>

        <span v-if="designers.length === 0 && !searchingDesigners">
          <div class="card-body flex justify-center items-center">
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class=" text-mm-primary">
                <path opacity="0.3"
                  d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z"
                  fill="currentColor" />
                <rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor" />
                <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor" />
                <rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor" />
                <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />
              </svg>
            </div>
            <div class=" text-mm-primary">查無資料</div>
          </div>
        </span>

        <!-- 設計師列表 -->
        <li @click="selectDesigner(item.id)" v-for="(item, idx) in designers" :key="item.id" data-aos="fade"
          :data-aos-delay="100 + idx * 50" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos"
          class="card card-body my-4">
          <div class="flex items-center justify-between gap-2">
            <div class="flex gap-2 w-11/12 items-center truncate">
              <img :src="item.avatar" :alt="item.nameForCustomerSide"
                class="w-10 h-10 rounded-full object-cover object-center select-none pointer-events-none" />
              <div class="flex flex-col w-[80%]">
                <div class="w-full overflow-hidden">
                  <h4 v-overflow class="text-sm whitespace-nowrap inline-block">
                    {{ item.nameForCustomerSide }}
                  </h4>
                </div>
                <div v-if="item.selfIntroduction"  class="w-full overflow-hidden">
                  <h4 v-overflow class="mt-1 text-xs text-light text-bs-gray-500 whitespace-nowrap inline-block">
                    {{ item.selfIntroduction }}
                  </h4>
                </div>
              </div> 
            </div>
            <div class="flex items-center gap-2 duration-300" :class="{
                'scale-100': favoriteInfo.designer === item.id,
                'scale-0': favoriteInfo.designer !== item.id,
              }">
              <div class="w-6 h-6 border-2 border-mm-success flex justify-center items-center rounded-full">
                <i class="bi bi-check text-xl text-mm-success shrink-0"/>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- 底部操作欄 -->
      <div class="fixed bottom-[56px] left-0 right-0 bg-white border-t border-gray-100 z-20 safe-area-bottom">
        <div class="max-w-[768px] mx-auto px-5 py-3">
          <button @click="saveFavorite"
            class="w-full py-3.5 text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
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
    // 取得門市設計師資料
    let merchant = JSON.parse(window.localStorage.getItem("merchant")) || {};

    if (merchant?.id) this.searchDesigner(merchant?.id);

    // 取得預設門市資料
    this.defaultMerchant = merchant;
    // 選擇門市
    this.selectStore(this.defaultMerchant);
  },
};
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>

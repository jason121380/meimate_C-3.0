<template>
  <div>
    <HomeHeader />

    <!-- 頂部進度條 -->
    <div v-if="pageLoading" class="fixed top-0 left-0 right-0 z-[100]">
      <div class="h-[3px] bg-gray-100">
        <div class="h-full bg-gmb-orange-500 rounded-r-full"
          :style="{ width: loadingProgress + '%' }"></div>
      </div>
    </div>

    <section class="w-full max-w-[768px] mx-auto">
      <div class="px-5 pt-5 pb-2 w-full">

        <!-- 標題 -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-bold text-gmb-orange-500">首頁</h1>
        </div>

        <!-- 會員資訊卡片 -->
        <div class="flex items-center gap-4 mb-5">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <template v-if="memberInfo.name">
              <span class="text-2xl font-bold text-gray-400">{{ memberInfo.name[0] }}</span>
            </template>
            <template v-else>
              <svg class="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </template>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-sm text-gray-400">{{ memberInfo.cellphone ? `+886 ${memberInfo.cellphone?.slice(1, 3)}***${memberInfo.cellphone?.slice(6)}` : '' }}</p>
              <button @click="$router.push('/member/info/edit')" class="text-gray-300 active:text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </button>
            </div>
            <h2 class="text-xl font-bold text-gray-900">{{ memberInfo.name || '' }}</h2>
          </div>
        </div>

        <!-- 立即預約大按鈕 -->
        <div v-if="isGetCloseCustomerBookingForCustomer === null" class="mb-4">
          <div class="w-full h-[64px] bg-gray-100/80 animate-pulse rounded-full"></div>
        </div>
        <div v-else-if="isGetCloseCustomerBookingForCustomer === false" class="mb-4">
          <div @click="$router.push('/member/appointment')" class="w-full bg-gmb-orange-500 rounded-full py-3.5 px-5 shadow-sm flex items-center justify-between cursor-pointer group relative overflow-hidden">
            
            <div class="flex items-center gap-3.5 z-10 relative">
              <div class="w-9 h-9 shrink-0 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm pointer-events-none">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex items-center text-white">
                <h3 class="font-bold text-[17px] tracking-wide">立即預約</h3>
              </div>
            </div>
            
            <div class="text-white z-10 relative pr-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            
            <!-- 裝飾圓圈 (縮減尺寸與模糊度以配合變扁的按鈕) -->
            <div class="absolute -right-4 -top-6 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
            <div class="absolute right-4 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
          </div>
        </div>

        <!-- 四宮格統計卡片 -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <!-- 我的預約 -->
          <div @click="$router.push('/member/appointmentRecord')" class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm text-gray-600">我的預約</span>
              </div>
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <p class="text-2xl font-bold text-gmb-orange-500">{{ latestReservation ? 1 : 0 }}</p>
          </div>

          <!-- 擁有票券 -->
          <div @click="$router.push('/member/ticket')" class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
                <span class="text-sm text-gray-600">我的卡券</span>
              </div>
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <p class="text-2xl font-bold text-gmb-orange-500">{{ ticketCount }}</p>
          </div>

          <!-- 目前儲值金 -->
          <div @click="$router.push('/member/addValue')" class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-sm text-gray-600">我的入金儲值</span>
              </div>
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <p class="text-2xl font-bold text-gmb-orange-500">{{ walletBalance }}</p>
          </div>

          <!-- 紅利兌換 -->
          <div @click="$router.push('/member/customerBonus')" class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                </svg>
                <span class="text-sm text-gray-600">我的紅利點數</span>
              </div>
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <p class="text-2xl font-bold text-gmb-orange-500">{{ bonusPoints }}</p>
          </div>
        </div>

        <!-- 選單列表 -->
        <div class="mb-3">
          <!-- LINE 綁定 -->
          <div @click="!memberInfo.lineId ? handleGetBindLink() : null"
            class="menu-item"
            :class="{ 'cursor-default': memberInfo.lineId }">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" :class="memberInfo.lineId ? 'text-green-500' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              <span class="text-[15px] text-gray-700">Line 綁定推播通知</span>
            </div>
            
            <div v-if="memberInfo.lineId" class="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-semibold tracking-wide rounded-full border border-green-200/50">
              已綁定
            </div>
            <div v-else class="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-semibold tracking-wide rounded-full border border-gray-200/50 flex items-center gap-1.5 active:bg-gray-100">
              未綁定
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>

          <!-- 消費紀錄 -->
          <div @click="$router.push('/member/consumption')" class="menu-item border-b">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-[15px] text-gray-700">消費紀錄</span>
            </div>
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>

          <!-- 偏好設定 -->
          <div @click="showSettingModal = true" class="menu-item border-none">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-[15px] text-gray-700">偏好設定</span>
            </div>
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>


        </div>

        <!-- 版本標示 -->
        <div class="mt-3 mb-2 flex justify-center items-center pointer-events-none">
          <span class="text-[11px] text-gray-300 tracking-wider font-medium font-sans">v3.0 powered by BOS</span>
        </div>

      </div>
    </section>
    <LineModal :showModal="showLineStatus" :binded="isLineBinded" @close="showLineStatus = false" />
    <LogoutModal :showModal="logoutStatus" @close="logoutStatus = false" />
    <SettingModal :showModal="showSettingModal" @close="showSettingModal = false" />
  </div>
</template>

<script>
import { removeToken } from "@/plugins/cookies";
import Swal from 'sweetalert2'
import calendar from './../../static/icons/calendar.svg'
import record from './../../static/icons/record.svg'
import ticket from './../../static/icons/ticket.svg'
import money from './../../static/icons/money.svg'
import point from './../../static/icons/point.svg'
import lottery from './../../static/icons/lottery.svg'
import link from './../../static/icons/link.svg'
export default {
  name: "member-index",
  head() {
    return {
      title: "首頁",
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
      merchantName: (JSON.parse(localStorage.getItem('merchant')) || {}).name || '',
      link: link,
      menuList: [
        {
          id: 1,
          label: "預約",
          icon: calendar,
          path: "/member/appointmentRecord",
        },
        {
          id: 2,
          label: " 消費",
          icon: record,
          path: "/member/consumption",
        },
        {
          id: 3,
          label: "卡券",
          icon: ticket,
          path: "/member/ticket",
        },
        {
          id: 4,
          label: "入金",
          icon: money,
          path: "/member/addValue",
        },
        {
          id: 5,
          label: "點數",
          icon: point,
          path: "/member/customerBonus",
        },
      ],
      isDisplay: {},
      memberInfo: {},
      member: {
        imgUrl: "",
      },
      count: 0,
      externalLink: [],
      memberShipRecord: "",
      latestReservation: false,
      telLink: '',
      isBookingCheckinEnabled: false,
      ticketCount: 0,
      walletBalance: 0,
      bonusPoints: 0,
      showSettingModal: false,
      pageLoading: true,
      loadingProgress: 0,
      loadingTimer: null,
    };
  },
  computed: {
    isGetCloseCustomerBookingForCustomer() {
      return this.$store.state.merchant.isCloseCustomerBookingForCustomer;
    },
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    topExternalLink() {
      return this.externalLink.filter((item) => item.isTop);
    },
    bottomExternalLink() {
      return this.externalLink.filter((item) => !item.isTop);
    },
  },
  methods: {
    startProgress() {
      this.loadingProgress = 0
      this.pageLoading = true
      this.loadingTimer = setInterval(() => {
        if (this.loadingProgress < 40) {
          this.loadingProgress += 12
        } else if (this.loadingProgress < 70) {
          this.loadingProgress += 6
        } else if (this.loadingProgress < 90) {
          this.loadingProgress += 2
        } else if (this.loadingProgress < 98) {
          this.loadingProgress += 0.3
        }
      }, 80)
    },
    finishProgress() {
      clearInterval(this.loadingTimer)
      this.loadingProgress = 100
      setTimeout(() => {
        this.pageLoading = false
      }, 200)
    },
    getUrl() {
      this.handleUrl("線上商城", "shopURL");
      this.handleUrl("服務滿意度調查", "rankingURL");
    },
    handleUrl(label, urlName) {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      let url = merchant ? merchant[urlName] : "";
      if (!url) {
        this.menuList = this.menuList.filter((item) => item.label != label);
      } else {
        this.menuList.map((item) => {
          if (item.label === label) item.url = url;
        });
      }
    },
    handleDisplay() {
      let hideList = [];
      let needHandleDisplayList = new Map([
        ["ServiceRecord", " 消費"],
        ["TicketRecord", "卡券"],
        ["WalletRecord", "入金"],
        ["BonusRecord", "點數"],
      ]);
      needHandleDisplayList.forEach((value, key) => {
        if (!this.isDisplay[key]) hideList.push(value);
      });
      this.menuList = this.menuList.filter(
        (item) => !hideList.includes(item.label)
      );
    },
    async handleExternalLink() {
      const data = await this.api.merchantCusExternalLink(true);
      if (data.hasError) return;
      const merchantCusExternalLink = data.data.merchantCusExternalLink;
      this.externalLink = merchantCusExternalLink;
    },
    async handleGetBindLink() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const res = await this.api.getLineBindLinkForCustomer(merchant.id);
      if (res.hasError) return;
      const link = res.data.getLineBindLinkForCustomer
      const uri = window.location.origin
      localStorage.setItem('lineBindFrom', 'member')
      localStorage.setItem('lineBindAction', 'bind')
      const redirectUri = encodeURIComponent(`${uri}/lineRedirect?bindAccount=true`)
      this.windowAssign(link + `&redirect_uri=${redirectUri}`)
    },
    async bindindLine() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      if (this.$route.query.code && !this.memberInfo.lineId) {
        try {
          const res = await this.api.customerBindWithLine({
            code: this.$route.query.code,
            endPoint: window.location.origin + '/member',
            storeId: merchant.id
          })
          if (res.hasError) {
            this.$swal.fire({
              icon: "error",
              html: "<p class='text-base font-semibold text-gray-900'>此 LINE 帳號已綁定其他手機號碼，請先解除綁定後再試</p>",
              background: "#fff",
              confirmButtonText: "我知道了",
              customClass: {
                popup: '!rounded-2xl !shadow-lg',
                confirmButton: '!bg-gmb-orange-500 !rounded-full !px-8'
              }
            });
            return
          }
          if (res.data.customerBindWithLine) {
            await this.getMemberInfoAndRecored()
            this.$swal.fire({
              icon: "success",
              html: "<p class='text-base font-semibold text-gray-900'>LINE 帳號綁定成功</p>",
              background: "#fff",
              iconColor: "#FF6B2C",
              timer: 3000,
              showConfirmButton: false,
              customClass: { popup: '!rounded-2xl !shadow-lg' }
            });
            this.$router.push({ path: "/", query: {} });
          }
        } catch (err) {
          console.log(err)
          this.$swal.fire({
            icon: "error",
            html: "<p class='text-base font-semibold text-gray-900'>LINE 綁定失敗，請稍後再試</p>",
            background: "#fff",
            confirmButtonText: "我知道了",
            customClass: {
              popup: '!rounded-2xl !shadow-lg',
              confirmButton: '!bg-gmb-orange-500 !rounded-full !px-8'
            }
          });
        }
      }
    },
    handleMenuClick(item) {
      if (item.label === "登出") return this.logOut();
      if (item.path) return this.$router.push(`${item.path}`);
      if (item.url) return (window.location.href = item.url);
    },
    windowAssign(url) {
      window.location.href = url;
    },
    getTel(tel) {
      // 
    },
    logOut() {
      this.$swal
        .fire({
          html: `<p class="text-lg text-gray-900 font-bold">確定要登出嗎?</p>`,
          showCancelButton: true,
          confirmButtonText: "登出",
          confirmButtonColor: "#FF6B2C",
          cancelButtonText: "取消",
          customClass: {
            popup: '!rounded-2xl !shadow-lg',
            confirmButton: '!rounded-full !px-8',
            cancelButton: '!rounded-full !px-8'
          }
        })
        .then((result) => {
          if (result.isConfirmed) {
            removeToken();
            window.localStorage.clear();

            this.$swal
              .fire({
                icon: "success",
                title: '<h3 class="text-xl font-semibold text-gray-900">會員已登出</h3>',
                background: "#fff",
                iconColor: "#FF6B2C",
                timer: 1500,
                showConfirmButton: false,
                customClass: { popup: '!rounded-2xl !shadow-lg' }
              })
              .then(() => {
                this.$router.push("/");
                setTimeout(() => {
                  location.reload();
                }, 100);
              });
          }
        });
    },
    async getMemberInfoAndRecored() {
      try {
        const merchant = JSON.parse(localStorage.getItem("merchant"));
        const soreid = JSON.stringify(merchant.id);
        const [memberInfo, isDisplay] = await Promise.all([
          this.api.getCustomerPersonalData("name cellphone lineId"),
          this.api.getCustomerSidePageDisplayForCellphone(soreid),
        ]);

        if (memberInfo.hasError || isDisplay.hasError) {
          removeToken();
          this.$router.push("/");
          return;
        }
        this.$store.commit(
          "customerSidePageDisplay/updateisDisplay",
          isDisplay.data.getCustomerSidePageDisplayForCellphone
        );

        this.isDisplay = this.$store.state.customerSidePageDisplay.isDisplay;
        this.memberInfo = memberInfo.data.getCustomerPersonalData;
      } catch (err) {
        console.log(err);
      }
    },
    async getCustomerMembershipRecord() {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const { data, hasError } = await this.api.customerMembershipRecord(
        merchant.id
      );
      if (hasError) return;
      this.memberShipRecord = data.customerMembershipRecord.unExpired[0];
    },
    async getCloseCustomerBookingForCustomer() {
      const { data, hasError } =
        await this.api.getCloseCustomerBookingForCustomer();
      if (hasError) return;
      this.$store.commit(
        "merchant/setIsCloseCustomerBookingForCustomer",
        data.getCloseCustomerBookingForCustomer
      );
    },
    async getCustomerLatestReservation() {
      const { data, hasError } = await this.api.getCustomerLatestReservation();
      if (hasError) return;
      this.latestReservation = data.getCustomerLatestReservation;
      if (data.getCustomerLatestReservation?.merchant?.tel) {
        this.telLink = `tel:+886-${data.getCustomerLatestReservation.merchant.tel.slice(1)}`
      }
    },
  },
  async mounted() {
    this.startProgress()
    // 所有 API 並行請求，不互相等待
    try {
      await Promise.all([
        this.getMemberInfoAndRecored(),
        this.getCustomerMembershipRecord(),
        this.getCloseCustomerBookingForCustomer(),
        this.getCustomerLatestReservation(),
        this.handleExternalLink(),
      ]);
    } catch (err) {
      console.log(err)
    } finally {
      this.finishProgress()
    }
    this.getUrl();
    this.bindindLine();
    this.handleDisplay();
    try {
      this.isBookingCheckinEnabled = Boolean(JSON.parse(localStorage.getItem('merchant'))?.isBookingCheckinEnabled)
    } catch (e) {
      this.isBookingCheckinEnabled = false
    }
    if (localStorage.getItem('isLineBinded') !== undefined && localStorage.getItem('isLineBinded') === 'false') {
      localStorage.removeItem('isLineBinded')
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.handleGetBindLink()
        }
      });
    }
    this.$store.dispatch('appointmentData/handleClearData')

    // 偵測使用者從瀏覽器分頁切回 PWA，檢查 LINE 綁定結果
    this._onVisibilityChange = async () => {
      if (document.visibilityState !== 'visible') return
      const resultStr = localStorage.getItem('lineBindResult')
      if (!resultStr) return
      try {
        const result = JSON.parse(resultStr)
        localStorage.removeItem('lineBindResult')
        if (result.success) {
          await this.getMemberInfoAndRecored()
          this.$swal.fire({
            icon: "success",
            html: "<p class='text-base font-semibold text-gray-900'>LINE 帳號綁定成功</p>",
            background: "#fff",
            iconColor: "#FF6B2C",
            timer: 3000,
            showConfirmButton: false,
            customClass: { popup: '!rounded-2xl !shadow-lg' }
          });
        } else {
          this.$swal.fire({
            icon: "error",
            html: `<p class='text-base font-semibold text-gray-900'>${result.message || 'LINE 綁定失敗'}</p>`,
            background: "#fff",
            confirmButtonText: "我知道了",
            customClass: {
              popup: '!rounded-2xl !shadow-lg',
              confirmButton: '!bg-gmb-orange-500 !rounded-full !px-8'
            }
          });
        }
      } catch (e) {
        localStorage.removeItem('lineBindResult')
      }
      // 清除卡住的 loading
      this.$store.dispatch('loading/isLoading', false)
    }
    document.addEventListener('visibilitychange', this._onVisibilityChange)
  },
  deactivated() {
    clearInterval(this.loadingTimer)
  },
  beforeDestroy() {
    clearInterval(this.loadingTimer)
    if (this._onVisibilityChange) {
      document.removeEventListener('visibilitychange', this._onVisibilityChange)
    }
  },
};
</script>

<style scoped>
.stat-card {
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
}

.stat-card:active {
  background: #fafafa;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 4px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
}

.menu-item:active {
  background: #fafafa;
}

.menu-item:last-child {
  border-bottom: none;
}

</style>

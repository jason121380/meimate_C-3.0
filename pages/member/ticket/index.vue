<template>
  <section id="firstPos" class="">
    <HeaderTitle :title="'卡券'" :display="display" />
    <div class="w-full max-w-[768px] mx-auto px-5 overflow-y-auto">
      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6 pt-6">
        <button @click="$router.go(-1)" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 active:bg-gray-50 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">我的卡券</h1>
      </div>
      <div v-if="merchants.length > 0 && !isLoading"
        class="">
        <div class="relative mb-7">
          <label class="text-xs font-semibold text-gmb-orange-500 mb-2 block">店家</label>
          <select @change="getCoupons()" v-if="merchants.length > 0" v-model="selectStore"
            class="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-[15px] text-gray-900 appearance-none focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200">
            <option v-for="item in merchants" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
          <span class="absolute right-5 bottom-3 text-gmb-orange-500 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" stroke="currentColor" /></svg>
          </span>
        </div>
      </div>

      <!-- 有資料 -->
      <div v-if="tickets.length > 0 && !isLoading" id="position">
        <div class="flex flex-col md:grid md:grid-cols-2 md:justify-evenly gap-4">
          <Ticket v-for="(item, idx) in tickets" :key="item.couponId + idx" @openRecord="handleOpenRecord($event)"
            :id="item.couponId" :idx="idx" :title="item.couponName" :canUse="item.totalCount" :used="item.usedCount"
            :price="item.singleCouponPrice" :totalPrice="(item.singleCouponPrice * item.totalCount)"
            :time="item.boughtDate" />
        </div>
      </div>

      <!-- 無資料顯示 -->
      <div v-if="tickets.length === 0 && !isLoading" class="mt-12 flex flex-col items-center justify-center pt-8 pb-20">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
        </div>
        <h3 class="text-gray-900 font-medium text-[15px] mb-1">目前無庫存卡券</h3>
        <p class="text-[13px] text-gray-400">當有購買卡券時會顯示在此處</p>
      </div>
    </div>
    <!-- 卡券使用紀錄彈窗 -->
    <Modal :showModal="showRecord" @cancelModal="cancelModal">
      <template #header>
        <h3 class="text-xl truncate">{{ cacheRecord.couponName }}</h3>
      </template>
      <table v-if="cacheRecord.usedCount && cacheRecord.usageRecord.length > 0"
        class="w-full text-left font-semibold mt-5 text-sm">
        <thead v-pre class=" text-bs-gray-500">
          <tr class="[&>*]:p-2">
            <th class="text-start">項次</th>
            <th>使用日期</th>
            <th class="text-end">使用張數</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in cacheRecord.usageRecord" :key="item.usedDate" class="[&>*]:p-2 odd:bg-slate-50">
            <td class="text-start">{{ idx + 1 }}</td>
            <td>
              <p v-formatDate="'time'">{{ item.usedDate }}</p>
            </td>
            <td class="text-end">{{ item.usageCount }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="cacheRecord.usedCount && cacheRecord.usageRecord.length > 0" class="mt-10  font-semibold">
        <div class="grid grid-cols-12 w-full gap-2 text-sm">
          <div v-pre class="col-span-9 text-right text-mm-accent">可用次數 :</div>
          <div class="col-span-3 text-end text-mm-accent">{{ cacheRecord.remainingCount }}/{{ cacheRecord.totalCount }}
          </div>
          <div v-pre class="col-span-9 text-right text-mm-accent">總金額 :</div>
          <div class="col-span-3 text-end text-mm-accent">${{ cacheRecord.singleCouponPrice * cacheRecord.totalCount }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-center items-center gap-2">
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
          <div class=" text-mm-primary text-center my-5 text-sm">此卡券尚無使用紀錄</div>
        </div>
      </div>
    </Modal>

  </section>
</template>

<script>
export default {
  name: 'member-ticket',
  head() {
    return {
      meta: [
        {
          hid: 'theme-color', name: 'theme-color',
          content: '#ffffff'
        }
      ]
    };
  },
  data() {
    return {
      tickets: [],
      merchants: JSON.parse(window.localStorage.getItem('allMerchants')) || [],
      selectStore: '',
      showRecord: false,
      cacheRecord: {},
      display: true,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    }
  },
  methods: {
    handleOpenRecord(idx) {
      this.cacheRecord = this.tickets.find((item, index) => idx === index);
      this.showRecord = true;
    },
    cancelModal(e) {
      e.stopPropagation();
      const classList = Array.from(e.target.classList);
      const isCancel = classList.includes('cancel');
      if (isCancel || e.target.nodeName === 'path' || e.target.nodeName === 'svg')
        this.showRecord = false;
    },
    getCoupons() {
      this.tickets = [];
      this.$store.dispatch('loading/isLoading', true);
      const id = this.selectStore ? this.selectStore : '';
      this.api.customerCouponBalanceReport(id)
        .then((res) => {
          this.tickets = res.data.customerCouponBalanceReport.length > 0 ? res.data.customerCouponBalanceReport[0].data : [];
          this.$store.dispatch('loading/isLoading', false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch('loading/isLoading', false);
        });
    }
  },
  mounted() {
    const merchant = JSON.parse(window.localStorage.getItem('merchant'));
    if (this.merchants[0]) {
      this.selectStore = this.merchants[0].id ? this.merchants[0].id : merchant?.id;
      this.getCoupons();
    }
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-ticket"
    ) {
      const isArrowDisplayForLine = JSON.parse(localStorage.getItem("merchant"))?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
  },
}
</script>

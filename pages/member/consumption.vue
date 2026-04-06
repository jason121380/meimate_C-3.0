<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <HeaderTitle :title="'消費'" :display="display" />
    <div class="w-full max-w-[768px] mx-auto px-5">
      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6 pt-6">
        <button @click="$router.go(-1)" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 active:bg-gray-50 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">消費紀錄</h1>
      </div>

      <!-- 消費紀錄list -->
      <div v-if="orders.length > 0"
        id="orderList"
        class="flex flex-col gap-3">
        <ConsumptionCard v-for="item in orders" :key="item.id" :item="item" />
      </div>

      <!-- 滾動加載Loading -->
      <ItemLoading />

      <!-- 無資料顯示 -->
      <div v-if="orders.length === 0 && !isLoading" class="mt-12 flex flex-col items-center justify-center pt-8 pb-20">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-gray-900 font-medium text-[15px] mb-1">目前無消費紀錄</h3>
        <p class="text-[13px] text-gray-400">當有消費發生時會顯示在此處</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'member-consumption',
  head() {
    return {
      meta: [
        {
          hid: 'theme-color', name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  data() {
    return {
      orders: [],
      totalPage: 0,
      isGetting: false,
      isEnd: false,
      submitData: {
        merchantId: JSON.parse(localStorage.getItem('merchant'))?.id || null,
        pageOffset: 0,
        pageLimit: 20
      },
      display: true,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得紀錄
    getRecords() {

      this.$store.dispatch('loading/isLoading', true)

      this.$api.getCustomerConsumptionRecords(this.submitData)
        .then((res) => {
          this.totalPage = Math.ceil(res.data.getCustomerConsumptionRecordsV2.totalCount / this.submitData.pageLimit)

          if (this.totalPage <= 1) this.isEnd = true
          if (this.totalPage > 1) {
            const target = document.querySelector('.app-scroll-container')
            target && target.addEventListener('scroll', this.scrollGetRecords)
          }

          this.orders = res.data.getCustomerConsumptionRecordsV2.customerConsumptionRecords

          this.$store.dispatch('loading/isLoading', false)
        })
        .catch((err) => {
          console.log(err)
          this.$store.dispatch('loading/isLoading', false)
        })
    },
    // 滾動取得紀錄
    async scrollGetRecords() {
      const orderList = document.querySelector('#orderList')
      const triggerDistance = 200
      const distance = orderList.getBoundingClientRect().bottom - window.innerHeight

      if (!this.isGetting && !this.isEnd && distance < triggerDistance) {
        this.$store.dispatch('itemLoading/isLoading', true)

        this.isGetting = true
        this.isEnd = false
        this.submitData.pageOffset++

        if (this.submitData.pageOffset === (this.totalPage - 1)) {
          this.isEnd = true
          const target = document.querySelector('.app-scroll-container')
          target && target.removeEventListener('scroll', this.scrollGetRecords)
        }

        await this.$api.getCustomerConsumptionRecords(this.submitData)
          .then((res) => {
            this.totalPage = Math.ceil(res.data.getCustomerConsumptionRecordsV2.totalCount / this.submitData.pageLimit)

            if (this.totalPage <= 1) this.isEnd = true

            this.orders = this.orders.concat(res.data.getCustomerConsumptionRecordsV2.customerConsumptionRecords)
            this.isGetting = false

            this.$store.dispatch('itemLoading/isLoading', false)
          })
          .catch((err) => {
            this.isGetting = false
            console.log(err)
            this.$store.dispatch('itemLoading/isLoading', false)
          })

      }
    }
  },
  mounted() {
    this.getRecords();
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-consumption"
    ) {
      const isArrowDisplayForLine = JSON.parse(
        localStorage.getItem("merchant")
      )?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
  },
  deactivated() {
    const target = document.querySelector('.app-scroll-container')
    if (target) target.removeEventListener('scroll', this.scrollGetRecords)
  },
  beforeDestroy() {
    const target = document.querySelector('.app-scroll-container')
    if (target) target.removeEventListener('scroll', this.scrollGetRecords)
  }
}
</script>

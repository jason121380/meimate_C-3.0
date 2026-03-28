<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto pb-16 min-h-full">
    <div class="px-5 pt-6 w-full">
      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6">
        <button @click="$router.go(-1)" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">入金紀錄</h1>
      </div>

      <!-- 店家選擇器 -->
      <div v-if="merchants.length > 1 && !isLoading" class="mb-6" data-aos="fade-up" data-aos-duration="300" data-aos-once="true">
        <div class="relative w-full">
          <label class="text-xs font-semibold text-gmb-orange-500 mb-2 block">店家</label>
          <select @change="getWalletRecords()" v-model="selectMerchantId" class="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-[15px] font-medium rounded-full px-5 py-3 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors cursor-pointer">
            <option v-for="item in merchants" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
          <span class="absolute right-5 bottom-3 text-gmb-orange-500 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" stroke="currentColor" /></svg>
          </span>
        </div>
      </div>

      <!-- 剩餘入金區塊 -->
      <div data-aos="fade-up" data-aos-duration="300" data-aos-once="true" data-aos-delay="100">
        <div class="rounded-3xl p-6 text-center mb-6">
          <p class="text-sm font-medium text-gmb-orange-500 mb-1">剩餘入金</p>
          <h3 class="text-4xl font-bold text-gray-900">${{ showCash }}</h3>
        </div>
      </div>

      <!-- 入金列表 -->
      <div v-if="addValueRecords.length > 0 && !isLoading" class="flex flex-col gap-3">
        <div v-for="(item, idx) in addValueRecords" :key="item.id" data-aos="fade-up" :data-aos-delay="150 + (idx * 50)" data-aos-once="true" class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between hover:shadow transition-shadow">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="text-[13px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{{ item.type }}</span>
              <span class="text-[13px] text-gray-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ item.designerName || '不指定' }}
              </span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span v-formatDate="'time'" class="text-[12px] text-gray-400 font-medium">{{ item.date }}</span>
              <span class="text-[12px] text-gray-300">|</span>
              <span class="text-[12px] text-gray-500">{{ item.payType }}</span>
            </div>
          </div>
          
          <div class="flex items-center font-bold text-lg" :class="item.type === '存入' ? 'text-green-500' : 'text-gray-900'">
            <span v-if="item.type === '存入'" class="mr-0.5">+</span>
            <span v-else class="mr-0.5">-</span>
            <span>${{ Math.abs(item.price) }}</span>
          </div>
        </div>
      </div>

      <!-- 無資料 -->
      <div v-if="addValueRecords.length === 0 && !isLoading" data-aos="zoom-in" data-aos-once="true" data-aos-delay="200" class="mt-4 bg-white border border-gray-100 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-gmb-orange-400">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z"/></svg>
        </div>
        <h3 class="text-gray-900 font-semibold mb-1">目前無資料</h3>
        <p class="text-sm text-gray-400">沒有任何入金紀錄</p>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'addValue-index',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  data() {
    return {
      cash: 0,
      showCash: 0,
      merchants: JSON.parse(window.localStorage.getItem('allMerchants')) || [],
      selectMerchantId: '',
      addValueRecords: [],
      display: true,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得入金列表
    getWalletRecords() {
      this.$store.dispatch('loading/isLoading', true)

      this.cash = 0

      const id = this.selectMerchantId ? this.selectMerchantId : ''

      this.api.customerWalletRecords(id)
        .then((res) => {
          this.cash = res.data.customerWalletRecords.remainWallet
          this.addValueRecords = res.data.customerWalletRecords.walletRecord

          this.$store.dispatch('loading/isLoading', false)

          this.cashAnimation()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cashAnimation() {
      if (this.cash >= 60) {
        const range = parseInt(this.cash / 60)
        const counterCash = setInterval(() => {
          this.showCash += range
          if (this.showCash >= this.cash) {
            this.showCash = (this.cash - 10)
            clearInterval(counterCash)
            const newCounterCash = setInterval(() => {
              this.showCash += 1
              if (this.showCash === (this.cash - 2)) {
                setTimeout(() => {
                  this.showCash += 1
                  setTimeout(() => {
                    this.showCash += 1
                  }, 500)
                }, 300)
                clearInterval(newCounterCash)
              }
            }, 100)
          }
        }, 10)
      } else if (this.cash >= 10 && this.cash < 60) {
        const range = parseInt(this.cash / 1)
        const counterCash = setInterval(() => {
          this.showCash += range
          if (this.showCash >= this.cash) {
            this.showCash = (this.cash - 10)
            clearInterval(counterCash)
            const newCounterCash = setInterval(() => {
              this.showCash += 1
              if (this.showCash === (this.cash - 2)) {
                setTimeout(() => {
                  this.showCash += 1
                  setTimeout(() => {
                    this.showCash += 1
                  }, 600)
                }, 300)
                clearInterval(newCounterCash)
              }
            }, 100)
          }
        }, 10)
      } else {
        if (this.cash <= 1) {
          this.showCash = this.cash
          return
        }
        const counterCash = setInterval(() => {
          this.showCash += 1
          if (this.showCash === (this.cash - 1)) {
            clearInterval(counterCash)
            setTimeout(() => {
              this.showCash += 1
            }, 500);
          }
        }, 100)
      }
    }
  },
  mounted() {
    const merchant = JSON.parse(window.localStorage.getItem('merchant'))
    this.selectMerchantId = this.merchants[0]?.id ? this.merchants[0]?.id : merchant?.id
    this.getWalletRecords()
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-addValue"
    ) {
      const isArrowDisplayForLine = JSON.parse(
        localStorage.getItem("merchant")
      )?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
  }
}
</script>

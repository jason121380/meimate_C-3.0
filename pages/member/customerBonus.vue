<template>
  <section id="firstPos">
    <HeaderTitle :title="'點數'" :display="display" />

    <div class="w-full max-w-[768px] mx-auto px-5">
      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-6 pt-6">
        <button @click="$router.go(-1)" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 class="text-xl font-bold text-gmb-orange-500">我的點數</h1>
      </div>

      <!-- 店家選擇 -->
      <div v-if="merchants.length > 0 && !isLoading">
        <div class="relative mb-6">
          <label class="text-xs font-semibold text-gmb-orange-500 mb-2 block">店家</label>
          <select @change="getBonusRecords()" v-if="merchants.length > 0" v-model="selectMerchantId"
            class="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-[15px] text-gray-900 appearance-none focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors">
            <option v-for="item in merchants" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
          <span class="absolute right-5 bottom-3 text-gmb-orange-500 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" stroke="currentColor" /></svg>
          </span>
        </div>

        <!-- 剩餘紅利 -->
        <div class="rounded-3xl p-6 text-center mb-6">
          <p class="text-sm font-medium text-gmb-orange-500 mb-1">剩餘紅利點數</p>
          <h3 class="text-4xl font-bold text-gray-900">${{ showCash }}</h3>
        </div>
      </div>

      <!-- 紅利列表 -->
      <div v-once v-if="addValueRecords.length > 0 && !isLoading" class="flex flex-col gap-3">
        <div v-for="(item, idx) in addValueRecords" :key="item.id"
          class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div class="flex justify-between items-start mb-3">
            <div class="text-xs text-gray-400">
              <span v-formatDate="'time'">{{ item.date }}</span>
              <span class="ml-1">#{{ item.orderNo }}</span>
            </div>
            <span class="text-xs text-gray-500 truncate max-w-[120px]">{{ item.designerName }}</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-gray-900 font-semibold text-base">
              <span>{{ item.generationWay }}</span>
              <span>{{ item.type }}</span>
            </div>
            <div class="flex items-center gap-1 font-bold text-lg"
              :class="{ 'text-green-500': item.type === '獲得', 'text-gmb-orange-500': item.type !== '獲得' }">
              <span v-if="item.type === '獲得'">+</span>
              <span v-else>-</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                class="w-4 h-4">
                <path
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
              </svg>
              {{ Math.abs(item.price) }}
            </div>
          </div>
          <p v-if="item.remark" class="text-xs text-gray-400 mt-2 truncate">{{ item.remark }}</p>
        </div>
      </div>

      <!-- 無資料顯示 -->
      <div v-if="addValueRecords.length === 0 && !isLoading" class="mt-12 flex flex-col items-center justify-center pt-8 pb-20">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
          </svg>
        </div>
        <h3 class="text-gray-900 font-medium text-[15px] mb-1">目前無點數紀錄</h3>
        <p class="text-[13px] text-gray-400">當有點數異動發生時會顯示在此處</p>
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
          hid: 'theme-color', name: 'theme-color',
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
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得紅利點數
    getBonusRecords() {
      this.$store.dispatch('loading/isLoading', true)

      this.cash = 0

      let id = this.selectMerchantId ? this.selectMerchantId : ''

      this.api.customerBonusRecords(id)
        .then((res) => {
          this.cash = res.data.customerBonusRecords.remainBonus
          this.addValueRecords = res.data.customerBonusRecords.bonusRecord

          this.$store.dispatch('loading/isLoading', false)

          this.cashAnimation()
        })
        .catch((err) => {
          console.log(err)
          this.$store.dispatch('loading/isLoading', false)
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
    this.getBonusRecords()
    if (
      this.$route.query.arrowDisplay !== undefined &&
      this.$route.name === "member-customerBonus"
    ) {
      const isArrowDisplayForLine = JSON.parse(localStorage.getItem("merchant"))?.isArrowDisplayForLine;
      this.display = isArrowDisplayForLine;
    }
  }
}
</script>

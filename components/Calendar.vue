<template>
  <section>
    <div class="py-2 px-1">
      <!-- Month navigation -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <span class="cursor-pointer p-1 rounded-full active:bg-gray-100" @click="month === 0 ? changeMonth(false) : month--, changeMonthAnimation()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <h3 class="text-lg font-bold text-gray-900">{{ month + 1 }}月, {{ year }}</h3>
          <span class="cursor-pointer p-1 rounded-full active:bg-gray-100" @click="month === 11 ? changeMonth(true) : month++, changeMonthAnimation()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <button @click="goToToday" class="text-sm font-medium text-emerald-500">今天</button>
      </div>

      <!-- Week day headers -->
      <div v-pre class="grid grid-cols-7 text-center mb-2">
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">一</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">二</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">三</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">四</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">五</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">六</div>
        <div class="col-span-1 py-1 text-xs font-medium text-gray-400">日</div>
      </div>

      <!-- Calendar grid -->
      <div v-if="isShow && !isGettingDate" class="grid grid-cols-7 text-center">
        <div v-for="push in adjustedFirstDay" :key="push + 'pushDay'" class="col-span-1 py-2.5"></div>
        <div @click="handleSelectDate(day)" v-for="day in monthInDays" :key="day + 'day'"
          class="col-span-1 py-2.5 cursor-pointer relative z-10"
          :class="{
            'text-gray-200 pointer-events-none': filterOldDate(day) || filterDayOffDate(day),
            'calendar-today': isToday(day) && !filterSelectedDate(day),
            'calendar-selected': filterSelectedDate(day)
          }">
          <span class="relative z-10 text-sm">{{ day }}</span>
        </div>
      </div>

      <!-- No available slots message -->
      <div v-if="isShow && !isGettingDate && noAvailableSlots" class="flex justify-center py-4">
        <div class="bg-gray-50 rounded-full px-5 py-2">
          <span class="text-sm text-gray-400">本月無可預約時段</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isGettingDate" class="w-full min-h-[150px] flex items-center justify-center">
        <div class="border-3 border-t-gmb-orange-500 border-gray-200 rounded-full w-10 h-10 animate-spin"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    disabledDate: {
      type: Array,
      default: () => []
    },
    filterOldDay: {
      type: Boolean,
      default: () => false
    },
    isGettingDate: {
      type: Boolean,
      default: () => true
    },
    defaultDate: {
      type: [Number, String],
      default: () => null
    },
    cacheTimeStamp: {
      type: [String, Number],
      default: () => null
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      selectDate: '',
      isShow: true
    }
  },
  computed: {
    monthInDays() {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    monthFirstDay() {
      return new Date(this.year, this.month, 1).getDay()
    },
    // Adjust so Monday=0, Sunday=6
    adjustedFirstDay() {
      const day = this.monthFirstDay
      return day === 0 ? 6 : day - 1
    },
    designerId() {
      return this.$store.state.appointmentData.designerId
    },
    noAvailableSlots() {
      // Check if all days are disabled
      let allDisabled = true
      for (let day = 1; day <= this.monthInDays; day++) {
        if (!this.filterOldDate(day) && !this.filterDayOffDate(day)) {
          allDisabled = false
          break
        }
      }
      return allDisabled
    }
  },
  methods: {
    filterOldDate(date) {
      const toDay = new Date()
      if (new Date(this.year, this.month, date) < new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate())) return true
      return false
    },
    filterDayOffDate(date) {
      const newDate = new Date(this.year, this.month, date).getTime()
      return this.disabledDate.find((item) => item === newDate)
    },
    changeMonth(bool) {
      if (!bool) {
        this.year--
        this.month = 11
      } else {
        this.year++
        this.month = 0
      }
    },
    changeMonthAnimation() {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 300)
      this.$emit('changeMonth', new Date(this.year, this.month))
    },
    isToday(date) {
      const toDay = new Date()
      if (new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()).getTime() === new Date(this.year, this.month, date).getTime()) return true
      return false
    },
    filterSelectedDate(date) {
      if (new Date(this.year, this.month, date).getTime() === this.selectDate) return true
      return false
    },
    handleSelectDate(date) {
      this.selectDate = new Date(this.year, this.month, date).getTime()
      this.$emit('selectDate', this.selectDate)
    },
    goToToday() {
      const today = new Date()
      this.year = today.getFullYear()
      this.month = today.getMonth()
      this.changeMonthAnimation()
    }
  },
  mounted() {
    if (!this.disabledDate.find((item) => item === new Date(this.year, this.month, this.date).getTime())) {
      if (this.defaultDate) {
        this.year = new Date(this.defaultDate).getFullYear()
        this.month = new Date(this.defaultDate).getMonth(),
        this.date = new Date(this.defaultDate).getDate(),
        this.selectDate = new Date(this.year, this.month, this.date).getTime()
        this.$emit('selectDate', this.selectDate)
      } else if (this.cacheTimeStamp) {
        this.year = new Date(this.cacheTimeStamp).getFullYear()
        this.month = new Date(this.cacheTimeStamp).getMonth(),
        this.date = new Date(this.cacheTimeStamp).getDate(),
        this.selectDate = new Date(this.year, this.month, this.date).getTime()
        this.$emit('selectDate', this.selectDate)
      } else {
        this.selectDate = new Date(this.year, this.month, this.date).getTime()
        this.$emit('selectDate', this.selectDate)
      }
    }
  }
}
</script>

<style scoped>
.calendar-today {
  color: #FF6B2C;
  font-weight: 600;
}

.calendar-selected {
  color: white;
  font-weight: 600;
}

.calendar-selected::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #FF6B2C;
  z-index: -1;
}
</style>

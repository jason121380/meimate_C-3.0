<template>
  <div class="w-full overflow-visible">
    <div class="relative flex w-full">
      <div @click="isShowDetail = !isShowDetail" class="card card-body p-4 w-full md:max-w-[350px] h-full">
        <div class="flex items-center justify-between py-3 px-5 rounded-lg">
          <div
            class="flex justify-center items-center gap-0.5 font-semibold text-sm bg-mm-accent text-white rounded-full px-2.5 py-0.5">
            <div class="h-fit mb-0.5">x</div>
            <div>{{ event.tickets.length }}</div>
          </div>
          <div id="name" class="font-extrabold text-lg mb-1 truncate w-[6.75rem]">{{ event.eventName }}</div>
          <div v-show="event.tickets.length > 0" id="drop" class="font-bold text-lg mb-1">
            <span v-if="isShowDetail" class="text-mm-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5657 11.3657L16.75 15.55C17.1642 15.9643 17.8358 15.9643 18.25 15.55C18.6642 15.1358 18.6642 14.4643 18.25 14.05L12.7071 8.50716C12.3166 8.11663 11.6834 8.11663 11.2929 8.50715L5.75 14.05C5.33579 14.4643 5.33579 15.1358 5.75 15.55C6.16421 15.9643 6.83579 15.9643 7.25 15.55L11.4343 11.3657C11.7467 11.0533 12.2533 11.0533 12.5657 11.3657Z"
                  fill="currentColor" />
              </svg>
            </span>
            <span v-else class="text-mm-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                  fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="card md:max-w-[350px] flex mb-3" v-show="isShowDetail && event.tickets.length > 0">
        <div class="card-body">
          <table class="w-full my-4">
            <thead>
              <tr class="text-bs-gray-500 text-xs ">
                <th class="p-2 text-start">消費日期</th>
                <th class="p-2 text-start">消費店家</th>
                <th class="p-2 text-start">流水號</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in event.tickets" :key="item.serialNumber" class="text-xs font-semibold odd:bg-slate-50">
                <td class="p-2 text-bs-gray-800">{{ formateDate(item.consumptionDate) }}</td>
                <td class="p-2 text-start">{{ item.consumptionStoreName }}</td>
                <td class="p-2 text-start">{{ item.serialNumber }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>
  
<script>
export default {
  name: 'LotteryCard',
  props: {
    event: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isShowDetail: false,
    }
  },
  methods: {
    formateDate(consumptionDate) {
      const date = new Date(consumptionDate)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: none;
}

.slide-fade-leave-active {
  transition: none;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 1;
}
</style>
  
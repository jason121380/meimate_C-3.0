<template>
  <div class="w-full overflow-visible">
    <div class="card flex w-full">
      <div @click="isShowDetail = !isShowDetail" class="card-body !p-6">
        <div class="flex justify-between items-center gap-x-2">
          <span v-formatDate="'time'" class="text-gray text-sm">{{ item.orderDate }}</span>
          <span class="rounded-mm py-1 px-2 text-sm"
            :class="item.isDesignate ? 'bg-mm-accent text-white' : 'bg-mm-primary text-white'">{{
              item.isDesignate ? '指定' : '不指定' }}</span>
        </div>
        <div class="grid grid-cols-3 mt-2">
          <span class="col-span-2 text-xl text-black truncate">{{ item.designerName  }}</span>
          <span class="col-span-1 text-xl text-right text-mm-accent font-semibold">${{ item.total }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <p class="p-1 bg-gray-light rounded-full">#{{ item.orderNo }}</p>
          <div id="drop" class="font-bold text-lg mb-1 bg-gray-light rounded-full">
            <span v-if="isShowDetail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5657 11.3657L16.75 15.55C17.1642 15.9643 17.8358 15.9643 18.25 15.55C18.6642 15.1358 18.6642 14.4643 18.25 14.05L12.7071 8.50716C12.3166 8.11663 11.6834 8.11663 11.2929 8.50715L5.75 14.05C5.33579 14.4643 5.33579 15.1358 5.75 15.55C6.16421 15.9643 6.83579 15.9643 7.25 15.55L11.4343 11.3657C11.7467 11.0533 12.2533 11.0533 12.5657 11.3657Z"
                  fill="currentColor" />
              </svg>
            </span>
            <span v-else>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                  fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
        <transition name="slide-fade">
          <div v-show="isShowDetail">
            <div class="grid gap-y-2 pt-4">
              <div v-for="detail in detail_keys" :key="detail.key" class="grid grid-cols-2">
                <div class="col-span-1 text-gray text-md font-bold">{{ detail.text }}</div>
                <div class="col-span-1 text-gray-dark font-semibold text-left">${{ item[detail.key] }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>
  
<script>
export default {
  name: 'ConsumptionCard',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isShowDetail: false,
      detail_keys: [
        {
          text: '服務消費',
          key: 'service',
        },
        {
          text: '店販消費',
          key: 'product',
        },
        {
          text: '預收卡販賣',
          key: 'ticketSell',
        },
        {
          text: '預收卡使用',
          key: 'ticketUse',
        },
        {
          text: '會員卡販賣',
          key: 'membership',
        }
      ]
    }
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
  
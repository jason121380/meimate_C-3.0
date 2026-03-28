<template>
  <section class="card-only-shadow rounded-2xl h-[8.125rem]">
    <div class="grid grid-cols-3 items-center w-full md:min-w-[325px] h-full overflow-hidden">
      <div
        class="flex justify-center items-center gap-0.5 md:gap-1 text-white rounded-l-2xl bg-gmb-orange-500 sm:whitespace-nowrap w-full h-full">
        <div class="text-xs mt-1">NT$</div>
        <div class="sm:text-lg font-bold">{{ price }}</div>
        <div class="text-xs">/</div>
        <div class="text-xs font-bold">次</div>
      </div>
      <div class="col-span-2 flex flex-col gap-1 py-2 px-3 w-full h-full">
        <div>
          <h4 class="font-extrabold text-lg line-clamp-1 text-bs-gray-900">{{ title }}</h4>
          <span class="text-bs-gray-500 text-xs">可用次數: <span class="font-semibold">{{ canUse - used }}/{{ canUse }}</span>
            <span class="text-bs-gray-500 text-xs">(總金額: <span class="font-semibold">{{ totalPrice
            }})</span></span></span>
          <div class="w-full border-b border-b-[#DDD]"></div>
          <p class="text-gmb-orange-500 text-xs">購買日期: <span v-formatDate="'date'" class="font-semibold">{{ time }}</span>
          </p>
        </div>
        <div class="self-end flex justify-end items-center gap-1 w-fit p-1 mt-auto rounded-full">
          <i @click="openRecord(idx)" class="bi bi-info-circle text-xs text-gmb-orange-500"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Ticket-index',
  props: {
    id: {
      type: String,
      default: () => 0
    },
    idx: {
      type: Number,
      default: () => 0
    },
    title: {
      type: String,
      default: () => ''
    },
    price: {
      type: Number,
      default: () => 0
    },
    totalPrice: {
      type: Number,
      default: () => 0
    },
    canUse: {
      type: Number,
      default: () => 0
    },
    used: {
      type: Number,
      default: () => 0
    },
    time: {
      type: Number,
      default: () => 0
    }
  },
  methods: {
    openRecord(idx) {
      this.$emit('openRecord', idx)
    }
  }
}
</script>

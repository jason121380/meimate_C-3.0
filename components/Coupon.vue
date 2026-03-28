<template>
  <section>
    <div class="w-full bg-white rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] mb-2.5">
      <div class="grid grid-cols-12">
        <div class="col-span-4 text-white font-bold relative"
          :class="{ 'bg-mm-primary': type, 'bg-mm-accent': !type }">
          <div class="absolute h-[calc(100%+20px)] w-2.5 top-0 -left-2.5 bg-[#f1f1f1] z-40"></div>
          <div class="absolute h-2 5 w-2.5 -bottom-2.5 left-0 bg-[#f1f1f1] z-40"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 bg-[#f1f1f1]"></div>
          <div
            class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[26px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]">
          </div>
          <div
            class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[52px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]">
          </div>
          <div
            class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[78px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]">
          </div>
          <div
            class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[104px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_0px_rgba(0,0,0,0.25)]">
          </div>
          <div class="w-full h-full flex justify-center items-center py-2 px-4">
            <p class="text-2xl text-white font-bold">{{ discount }}</p>
          </div>
        </div>
        <div class="col-span-8 p-2">
          <h4 class="font-bold">{{ title }}</h4>
          <span class="text-[#666] text-sm">{{ description }}</span>
          <div class="w-full border-b border-b-[#DDD]"></div>
          <span class="text-[#666] text-xs">使用期限：{{ time }}</span>
          <div v-if="type" v-once @click="openReimbursement(id)" class="flex justify-end items-center gap-1">
            <i class="bi bi-info-circle text-xs text-[#57CDFF]"/>
            <span v-pre class="text-xs text-[#57CDFF]">核銷</span>
          </div>
          <div v-else class="block w-full py-2"></div>
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
      type: Number,
      default: () => 0
    },
    title: {
      type: String,
      default: () => ''
    },
    time: {
      type: String,
      default: () => ''
    },
    discount: {
      type: String,
      default: () => ''
    },
    description: {
      type: String,
      default: () => ''
    },
    type: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    openReimbursement(id) {
      this.$emit('openReimbursement', id)
    }
  }
}
</script>

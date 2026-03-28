<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <HeaderTitle :title= "'我的優惠券'" />

    <div class="flex justify-center gap-5 text-sm">
      <button @click="selectedTab = item.label" v-for="item in tabMenu" :key="item.id" class="rounded-xl py-2 px-12 bg-white border border-mm-accent shadow-[0_5px_5px_rgba(0,0,0,0.2)] duration-300" :class="{'bg-mm-accent text-white shadow-none': selectedTab === item.label}">{{ item.label }}</button>
    </div>

    <div class="mt-5">
      <Coupon @openReimbursement="handleOpenReimbursement($event)" v-for="(item, idx) in filterCoupons" :key="item.id" :id="item.id" :title="item.title" :discount="item.discount" :description="item.description" :time="item.time" :type="item.type" data-aos="zoom-in" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" :data-aos-delay="100 + (idx * 100)" />
    </div>

    <Reimbursement :showModal="isShow" @cancelModal="cancelModal($event)" />

  </section>
</template>

<script>
export default {
  name: 'coupon-index',
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
      coupons: [
        {id: 1, title: '生日禮券', discount: '85折', description: '全品項85折', time: '2023/12/31', type: true},
        {id: 2, title: '入會禮', discount: '9折', description: '全品項9折', time: '2023/12/31', type: true},
        {id: 3, title: '周年慶8折優惠', discount: '8折', description: '全品項8折', time: '2023/12/31', type: true},
        {id: 4, title: '生日禮券', discount: '75折', description: '全品項75折', time: '2023/12/31', type: true},
        {id: 5, title: '生日禮券', discount: '75折', description: '全品項75折', time: '2023/12/31', type: false},
      ],
      tabMenu: [
        {id: 1, label: '可使用'},
        {id: 2, label: '已使用'}
      ],
      selectedTab: '可使用',
      isShow: false
    }
  },
  computed: {
    filterCoupons() {
      if (this.selectedTab === '可使用') {
        return this.coupons.filter((item) => item.type)
      } else {
        return this.coupons.filter((item) => !item.type)
      }
    }
  },
  methods: {
    handleOpenReimbursement(id) {
      this.isShow = true
    },
    cancelModal(e) {
      e.stopPropagation()
      const classList = Array.from(e.target.classList)
      const isCancel = classList.includes('cancel')
      if (isCancel || e.target.nodeName === 'path') this.isShow = false
    }
  }
}
</script>

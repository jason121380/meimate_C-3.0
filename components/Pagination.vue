<template>
  <section>
    <ul v-if="totalPage > 1" class="flex justify-center items-center gap-1 mt-8 select-none">
      <li @click="currentPage === 1 ? currentPage = 1 : currentPage -= 1, currentPage % 5 === 0 ? currentPageTab -= 1 : currentPageTab = currentPageTab, changePage()" class="group px-3 py-2 rounded-full cursor-pointer-[#232D4E]-0-white flex justify-center items-center" :class="{'pointer-events-none': currentPage === 1}">
        <i class="bi bi-chevron-left text-lg:text-white" :class="{'text-[#a3a3a3]': currentPage === 1, 'text-mm-accent': currentPage !== 1}"/>
      </li>
      <template v-if="totalPage <= 5">
        <li v-for="page in totalPage" :key="page" @click="currentPage = page, changePage()" class="h-9 w-9 flex justify-center items-center rounded-full cursor-pointer" :class="{'bg-gradient-to-t from-[#5D7A9D] to-[#094194] text-white ring-0 font-bold': currentPage === page}">{{ page }}</li>
      </template>
      <template v-else>
        <li @click="currentPageTab -= 1, currentPage = pageTab[currentPageTab][4], changePage()" class="cursor-pointer px-3 py-2 rounded-full" :class="{'hidden': currentPageTab === 0 }"><i class="bi bi-three-dots"/></li>
        <li v-for="page in pageTab[currentPageTab]" :key="page" @click="currentPage = page, changePage()" class="w-9 h-9 flex justify-center items-center py-2 rounded-full cursor-pointer" :class="{'bg-gradient-to-t from-[#5D7A9D] to-[#094194] text-white ring-mm-accent': currentPage === page}">{{ page }}</li>
        <li @click="currentPageTab += 1, currentPage = pageTab[currentPageTab][0], changePage()" class="cursor-pointer px-3 py-2 rounded-full" :class="{'hidden': currentPageTab === (pageTab.length - 1) }"><i class="bi bi-three-dots"/></li>
      </template>
      <li @click="currentPage === totalPage ? currentPage = totalPage : currentPage += 1, currentPage % 5 === 1 ? currentPageTab += 1 : currentPageTab = currentPageTab, changePage()" class="group px-3 py-2 rounded-full cursor-pointer-[#232D4E]-0-white" :class="{'pointer-events-none': currentPage === totalPage}">
        <i class="bi bi-chevron-right text-lg:text-white" :class="{'text-[#a3a3a3]': currentPage === totalPage, 'text-mm-accent': currentPage !== totalPage}"/>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 1,
      pageTab: [],
      currentPageTab: 0
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.currentPage)
    }
  },
  mounted() {
    let arr = []
    for (let i = 0; i < this.totalPage; i++) {
      if (i % 5 === 0) {
        arr.push([])
      }
      const page = parseInt(i / 5)
      arr[page].push(i + 1)
    }
    this.pageTab = arr
  }
}
</script>

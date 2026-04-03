<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto bg-gray-50">
    <div class="px-5 pt-6 w-full">
      <div class="flex items-center mb-6">
        <h1 class="text-xl font-bold text-gmb-orange-500">個人中心</h1>
      </div>
      <!-- 暫時隱藏：會員卡片
      <div v-if="!itemIsLoading"
        class="w-full mb-6 mx-auto relative rounded-2xl overflow-hidden aspect-[1.8/1] shadow-lg border border-gray-900/10">
        <img v-if="!memberCard.membershipImage" src="/images/member/card-bg.webp"
          class="w-full h-full object-cover object-center bg-gray-800">
        <img v-else :src="memberCard.membershipImage" class="w-full h-full object-cover object-center bg-gray-800">

        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent flex flex-col justify-end p-5">
          <span v-if="memberCard.merchantname" class="text-lg tracking-widest font-medium text-white shadow-sm"
            :style="memberCard.membershipTextCoclor ? `color: ${memberCard.membershipTextCoclor}` : ''">{{ memberCard.merchantname }}</span>
          <span v-else-if="merchant.name"
            class="text-lg tracking-widest font-medium text-white shadow-sm">{{ merchant.name }}</span>
          
          <div v-if="memberCard.membershipTextCoclor" class="absolute right-5 bottom-5 flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" @click="openMemberRules()">
            <i class="bi bi-question-circle text-[15px]" :style="`color: ${memberCard.membershipTextCoclor}`"/>
            <span class="text-[13px] tracking-widest font-medium" :style="`color: ${memberCard.membershipTextCoclor}`">會籍說明</span>
          </div>
        </div>
      </div>
      -->

      <!-- 會員資料 -->
      <div v-if="hasData" class="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm mb-6">
        <ul class="text-[15px] font-medium text-gray-700 divide-y divide-gray-50">
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">姓名</span>
            <span class="w-3/4 text-gray-900">{{ memberInfo.name }}</span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">電話</span>
            <span class="w-3/4 text-gray-900">{{ memberInfo.cellphone }}</span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">暱稱</span>
            <span class="w-3/4 text-gray-900">{{ memberInfo.nickName }}</span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">性別</span>
            <span class="w-3/4 text-gray-900">
              <template v-if="memberInfo.gender === 'MALE'">男</template>
              <template v-else-if="memberInfo.gender === 'FEMALE'">女</template>
              <template v-else>-</template>
            </span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">Email</span>
            <span class="w-3/4 text-gray-900 break-words">{{ memberInfo.email || '-' }}</span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">Line ID</span>
            <span class="w-3/4 text-gray-900">{{ memberInfo.lineId || '-' }}</span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">生日</span>
            <span class="w-3/4 text-gray-900"><template v-if="memberInfo.birthday"><span v-formatDate="'date'">{{ memberInfo.birthday }}</span></template><template v-else>-</template></span>
          </li>
          <li class="px-4 py-3.5 flex items-center">
            <span class="w-1/4 text-gray-400 font-normal">地址</span>
            <span class="w-3/4 text-gray-900">{{ memberInfo.address || '-' }}</span>
          </li>
        </ul>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex flex-col gap-3 mt-8">
        <button v-if="hasData" @click="$router.push('/member/info/edit')"
          class="w-full py-3 rounded-full font-semibold text-[15px] bg-gmb-orange-500 text-white hover:bg-gmb-orange-600 transition-all shadow-sm hover:shadow-md">修改個人資料</button>
        <button v-if="hasData && editPasswordBtn" @click="openPasswordModal"
          class="w-full py-3 rounded-full font-semibold text-[15px] bg-white border border-gmb-orange-500 text-gmb-orange-500 hover:bg-gmb-orange-100/30 transition-colors">修改密碼</button>
        <button v-if="hasData" @click="showLogoutModal = true"
          class="w-full py-3 rounded-full font-medium text-[15px] text-gray-400 hover:text-red-500 transition-colors">登出</button>
      </div>

      <Modal :showModal="showMemberRules" :isMemberRules="true" @cancelModal="cancelModal($event)">
        <div v-if="memberCard.isHtml" v-html="memberCard.membershipComment"></div>
        <p v-else>{{ memberCard.membershipComment }}</p>
      </Modal>
      <PasswordEditModal :showModal="showEditPassword" @close="close()" />
      <LogoutModal :showModal="showLogoutModal" @close="showLogoutModal = false" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'member-info',
  head() {
    return {
      title: "個人中心",
    };
  },
  data() {
    return {
      memberCard: {},
      memberInfo: {},
      showMemberRules: false,
      showEditPassword: false,
      showLogoutModal: false,
      editPasswordBtn: false,
      merchant: JSON.parse(window.localStorage.getItem('merchant')) || { id: '' }
    }
  },
  computed: {
    hasData() {
      return this.memberInfo && this.memberInfo.name
    }
  },
  methods: {
    // 開啟會籍說明
    openMemberRules() {
      this.showMemberRules = true
    },
    // 關閉會籍說明
    cancelModal(e) {
      e.stopPropagation()

      const classList = Array.from(e.target.classList)
      const isCancel = classList.includes('cancel')

      if (isCancel || e.target.nodeName === 'path') this.showMemberRules = false
    },
    // 取得用戶資料（靜默刷新，不顯示 loading）
    getCustomerPersonalData() {
      const needKey = 'name, cellphone, nickName, gender, email, lineId, birthday, address'

      this.api.getCustomerPersonalData(needKey)
        .then((res) => {
          this.memberInfo = res.data.getCustomerPersonalData
          this.$store.dispatch('indexCache/handleSetUserInfo', res.data.getCustomerPersonalData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 取得會員卡片（靜默刷新）
    customerMembershipRecord() {
      this.api.customerMembershipRecord(this.merchant?.id)
        .then((res) => {
          if (res.data.customerMembershipRecord.unExpired[0]) {
            const card = res.data.customerMembershipRecord.unExpired[0]
            card.isHtml = card.membershipComment.indexOf('<p') !== -1 || card.membershipComment.indexOf('<img') !== -1
            this.memberCard = card
            this.$store.commit('indexCache/setMemberCard', card)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 打開密碼彈窗
    openPasswordModal() {
      this.showEditPassword = true
    },
    // 關閉密碼彈窗
    close() {
      this.showEditPassword = false
    },
    async checkPasswordSet() {
      try {
        const res = await this.api.checkIsCustomerPasswordSetWidthToken()
        this.editPasswordBtn = res.data.checkIsCustomerPasswordSetWidthToken
        this.$store.commit('indexCache/setEditPasswordBtn', this.editPasswordBtn)
      } catch (error) {
        console.log('error: ', error);
      }
    }
  },
  mounted() {
    this.getCustomerPersonalData()
    this.customerMembershipRecord()
    this.checkPasswordSet()
  }
}
</script>

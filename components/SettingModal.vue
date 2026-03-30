<template>
  <div v-if="showModal" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
    <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeModal"></div>
    <div class="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden pb-[72px] sm:pb-0">
      
      <!-- Header -->
      <div class="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <h3 class="text-lg font-bold text-gray-900">偏好設定</h3>
        <button @click="closeModal" class="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div v-if="isLoading" class="flex justify-center py-8">
          <div class="w-8 h-8 rounded-full border-4 border-gray-100 border-t-gmb-orange-500 animate-spin"></div>
        </div>

        <div v-else class="space-y-6">
          <!-- 目前所在店家 -->
          <div>
            <p class="text-xs font-semibold text-gray-400 tracking-wider mb-3">目前所在店家</p>
            <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div class="w-12 h-12 rounded-full bg-gmb-orange-100 flex items-center justify-center shrink-0">
                <svg class="w-6 h-6 text-gmb-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-[15px] font-bold text-gray-900 truncate">{{ defaultMerchant.name || '尚未設定' }}</h4>
                <p class="text-xs text-gray-500 truncate mt-1">{{ defaultMerchant.address || '' }}</p>
              </div>
            </div>
          </div>

          <!-- 我的偏好設計師 -->
          <div>
            <p class="text-xs font-semibold text-gray-400 tracking-wider mb-3">我的偏好設計師</p>
            <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <img v-if="defaultDesigner.avatar" :src="defaultDesigner.avatar" class="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-200">
              <div v-else class="w-12 h-12 rounded-full bg-gmb-orange-100 flex items-center justify-center shrink-0">
                <svg class="w-6 h-6 text-gmb-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-[15px] font-bold text-gray-900 truncate">{{ defaultDesigner.nameForCustomerSide || '無指定設計師' }}</h4>
                <p v-if="defaultDesigner.selfIntroduction" class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{{ defaultDesigner.selfIntroduction }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Base -->
        <div class="mt-8 pt-4 border-t border-gray-50">
          <button @click="$router.push('/member/setting/edit'); closeModal()" class="w-full py-3.5 bg-gmb-orange-500 text-white rounded-full font-medium text-[15px] shadow-md shadow-gmb-orange-200 hover:bg-gmb-orange-600 transition-colors flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            編輯設定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingModal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: true,
      defaultMerchant: {},
      defaultDesigner: {}
    }
  },
  watch: {
    showModal(val) {
      if (val) {
        this.fetchSetting()
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async fetchSetting() {
      this.isLoading = true
      try {
        const res = await this.api.customerGetCurrentMerchantSetting()
        if (!res.data.hasError) {
          this.defaultMerchant = res.data.customerGetCurrentMerchantSetting.currentMerchant || {}
          this.defaultDesigner = res.data.customerGetCurrentMerchantSetting.preferDesigner || {}
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
</style>

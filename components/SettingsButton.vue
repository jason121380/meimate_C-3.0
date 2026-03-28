<template>
  <section class="relative z-20">
    <div class="flex justify-center items-center w-10 h-10 cursor-pointer" @click="showButtons = !showButtons">
      <span class="duration-500 text-gray-500" :class="showButtons ? 'rotate-0' : 'rotate-180'">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      </span>
    </div>
    <transition name="slide-fade">
      <div v-show="showButtons" class="absolute right-0 top-full mt-2 bg-white rounded-xl border border-gray-100 flex flex-col gap-y-1 p-3 shadow-lg min-w-[160px]">
        <div @click="$router.push('/member/info/edit')" class="flex items-center gap-x-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="text-sm text-gray-700">修改個人資料</span>
        </div>
        <div @click="openPasswordModal" class="flex items-center gap-x-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
          <span class="text-sm text-gray-700">修改密碼</span>
        </div>
        <div @click="$router.push('/member/setting')" class="flex items-center gap-x-2.5 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span class="text-sm text-gray-700">偏好設定</span>
        </div>
        <div class="border-t border-gray-100 mt-1 pt-1">
          <div @click="openLogoutModal" class="flex items-center gap-x-2.5 px-3 py-2.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-sm text-red-500">登出</span>
          </div>
        </div>
      </div>
    </transition>
    <PasswordEditModal :showModal="showEditPassword" @close="showEditPassword = false" />
    <LogoutModal :showModal="showLogoutModal" @close="showLogoutModal = false" />
  </section>
</template>

<script>
export default {
  name: 'SettingsButton',
  data() {
    return {
      showButtons: false,
      showEditPassword: false,
      showLogoutModal: false
    }
  },
  methods: {
    openPasswordModal() {
      this.showEditPassword = true;
      this.showButtons = false;
    },
    close() {
      this.showEditPassword = false;
    },
    openLogoutModal() {
      this.showLogoutModal = true;
      this.showButtons = false;
    }
  }
}
</script>
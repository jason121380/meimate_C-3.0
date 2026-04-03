<template>
  <section class="min-h-screen bg-[#FAFAFA]">
    <client-only v-if="!isLoading">
      <div class="w-full max-w-[768px] mx-auto px-5 pt-10 pb-8">
        <!-- 標題 -->
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-bold text-gray-900">設定密碼</h1>
          <p v-if="isNewCus" class="text-sm text-gray-400 mt-2">設定密碼方便下次快速登入</p>
        </div>

        <!-- 表單卡片 -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-mm">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(setPassword)">
              <label v-pre for="password1Input" class="text-gray-500 text-xs font-medium mb-2 block">密碼</label>
              <div class="form-group relative mb-6">
                <ValidationProvider name="密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                  <input name="密碼" v-model="password" onpaste="return false" id="password1Input" type="password"
                    class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                    placeholder="請輸入密碼"
                    :class="{ '!border-red-400': errors.length > 0 }">
                  <span v-if="errors.length > 0" class="absolute left-4 -bottom-5 text-red-400 text-xs">{{
                    errors[0] }}</span>
                </ValidationProvider>
              </div>
              <label v-pre for="password2Input" class="text-gray-500 text-xs font-medium mb-2 block">再次輸入密碼</label>
              <div class="form-group relative mb-6">
                <ValidationProvider name="再次輸入密碼" rules="required|onlyEnNum" v-slot="{ errors }" class="w-full">
                  <input id="password2Input" name="再次輸入密碼" v-model="passwordCheck" type="password"
                    class="w-full bg-gray-50/80 border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gmb-orange-400 focus:ring-1 focus:ring-gmb-orange-200 transition-colors"
                    placeholder="請再次輸入密碼"
                    :class="{ '!border-red-400': errors.length > 0 || !isSame }">
                  <span v-if="errors.length > 0 || !isSame"
                    class="absolute left-4 -bottom-5 text-red-400 text-xs font-medium">{{ errors[0] }}{{ isSame ?
                      '' : '密碼不一致' }}</span>
                </ValidationProvider>
              </div>
              <button :disabled="isComfirm" type="submit"
                class="w-full py-3 text-white text-[15px] font-semibold mt-5 bg-gmb-orange-500 rounded-full flex justify-center items-center gap-3 duration-300 hover:bg-gmb-orange-600 transition-all shadow-sm hover:shadow-md"
                :class="{ '!bg-gray-300 !shadow-none': isComfirm }">
                <i v-if="isComfirm" class="bi bi-arrow-repeat flex animate-spin-slow"/>
                確認
              </button>
            </form>
          </ValidationObserver>
        </div>

        <!-- 版本標示 -->
        <div class="mt-10 flex justify-center items-center pointer-events-none">
          <span class="text-[11px] text-gray-300 tracking-wider font-medium font-sans">v3.0 powered by BOS</span>
        </div>
      </div>
      <BindLineModal :showModal="showBindLineModal" @close="onBindLineClose" />
    </client-only>
  </section>
</template>

<script>
import pageLinks from "./../../static/pageLinks.js";
export default {
  name: 'IndexPage',
  head() {
    return {
      meta: [
        {
          hid: 'theme-color', name: 'theme-color',
          content: '#f1f1f1'
        }
      ]
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  data() {
    return {
      password: '',
      passwordCheck: '',
      isComfirm: false,
      isSame: true,
      toAppointment: false,
      isNewCus: false,
      showBindLineModal: false
    }
  },
  methods: {
    checkPassword() {
      if (this.password && this.passwordCheck) {
        this.isSame = this.password === this.passwordCheck
      } else {
        this.isSame = true
      }
    },
    setPassword() {
      if (this.isSame) {
        this.isComfirm = true
        const formData = {
          password: `${this.password}`,
          passwordCheck: `${this.passwordCheck}`
        }
        this.$api.customerSetPassword(formData).then(res => {
          if (res.data.customerSetPassword) {
            this.handleDoRoute()
          } else {
            this.isComfirm = false
          }
        }).catch(error => {
          this.isComfirm = false
          console.log('error: ', error);
        })
      }
    },
    async handleGetBindLink() {
      this.$store.dispatch("loading/isLoading", true);
      try {
        const merchant = JSON.parse(localStorage.getItem("merchant"));
        const res = await this.api.getLineBindLinkForCustomer(merchant.id);
        const link = res.data.getLineBindLinkForCustomer
        const uri = window.location.origin
        localStorage.setItem('lineBindAction', 'bind')
        const redirectUri = encodeURIComponent(`${uri}/lineRedirect?bindAccount=true`)
        window.location.href = link + `&redirect_uri=${redirectUri}`
      } catch (err) {
        console.log(err);
        this.$store.dispatch("loading/isLoading", false);
      }
    },
    onBindLineClose(type) {
      if (type === 'comfirm') {
        this.handleGetBindLink()
      } else {
        this.handleDoRoute(true)
      }
    },
    handleDoRoute(skip) {
      const setPassword = this.$route.query?.setPassword === 'true'
      const bindLine = this.$route.query?.bindLine === 'true'
      if (bindLine && !skip) {
        this.showBindLineModal = true
        return
      }
      if (this.isNewCus) {
        if (
          this.$store.state.appointmentData.notRequiredInputDisplay &&
          this.$store.state.appointmentData.requiredInput.length < 5
        ) {
          this.$router.push('/member/info/edit?isNewCus=true')
        } else {
          this.$router.push("/member/appointmentRecord?arrowDisplay=true");
        }
        return
      } else if (setPassword) {
        this.$router.push("/member/appointmentRecord?arrowDisplay=true");
        return
      }
      if (
        JSON.parse(localStorage.getItem("isNewCustomerAndNomerchant")) ||
        JSON.parse(localStorage.getItem("isNewCustomer"))
      ) {
        let url = `/member/info/edit/?toAppointment=${this.toAppointment}`
        if (pageLinks.includes(this.$route.query.to)) {
          url += `&to=${this.$route.query.to}`
        }
        this.$router.push(url)
      } else if (this.toAppointment) {
        this.$router.push('/member/appointment')
      } else {
        let url = '/member'
        if (pageLinks.includes(this.$route.query.to)) {
          url = `/member/${this.$route.query.to}?arrowDisplay=true`
        }
        this.$router.push(url)
      }
    }
  },
  mounted() {
    this.isNewCus = this.$route.query?.isNewCus === 'true'
    document.body.addEventListener('dblclick', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
    window.addEventListener('load', function () {
      if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker
          .register('sw.js')
          .then(() => { console.log('Service Worker 設定完成'); })
          .catch(() => { console.log('Service Worker 設定失敗'); });
      }
  })
    this.toAppointment = this.$route.query.toAppointment === 'true'
  },
  watch: {
    password() {
      this.checkPassword()
    },
    passwordCheck() {
      this.checkPassword()
    }
  }
}
</script>

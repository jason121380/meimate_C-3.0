<template>
  <div class="p-10 bg-[#FAFAFA]">
    <div class="mx-auto translate-x-2  w-[155px] text-lg">
      處理中，請稍候{{ dot }}
    </div>
    <StatusModal :showModal="showModal" :content="modalContent" @close="closeModal" :timeout="timer" :status="status" />
    <LineModal :cusInfo="cusInfo" :showModal="lineModal" @close="lineClose" />
  </div>
</template>
<script>
export default {
  name: "appointment-test",
  data() {
    return {
      dot: '',
      liffId: '',
      modalContent: '',
      timer: 0,
      status: 'success',
      orderId: '',
      showModal: false,
      getLineData: false,
      lineModal: false,
      lineName: '',
      avatarUrl: '',
      cusInfo: {
        name: '',
        cellphone: '',
        avatarUrl: '',
      },
      orderData: {
        designerId: '',
        dateTime: '',
        cellphone: '',
        merchantId: '',
        name: '',
        reference: '',
        remarkForCustomer: '',
        designerServiceIds: [],
        companionCount: 0
      },
    }
  },
  methods: {
    // 使用liff id登入
    async handleCusLoginWithLineID() {
      try {
        this.$store.dispatch('appointmentData/handleSetMerchantForHeader',  this.orderData.merchantId)
        const res = await this.$api.cusLoginWithLineID(this.liffId)
        const { data } = res
        this.$store.dispatch('appointmentData/handleClearMerchant')
        if (res.hasOwnProperty("errors")) {
          return true
        } else {
          this.$cookieMethods.setToken(data.cusLoginWithLineID.token)
          localStorage.setItem('allMerchants', JSON.stringify(data.cusLoginWithLineID.merchants))
          localStorage.setItem("isNewCustomer", JSON.stringify(data.cusLoginWithLineID.isNewCustomer));
          let isNewCustomerAndNomerchant = JSON.parse(localStorage.getItem("isNewCustomer")) ? true : false
          localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);
          await this.api.updateCustomerCuttentMerchant(this.orderData.merchantId)
          await this.handleGetCustomerPersonalData()
          await this.handleGetCurrentMerchantSetting()
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },

    // 取得暫存的預約資料
    async getCachedBookingData () {
      const token = window.localStorage.getItem('orderToken')
      if (!token) return
      try {
        const res = await this.$api.getCachedBookingData({ token })
        const { hasError, data } = res
        const { bookingData, staticInfo, newCusData } = data.getCachedBookingData
        this.$store.dispatch('appointmentData/handleSetStaticData', { key: 'cellphone', value: newCusData.cellphone })
        if (hasError) {
          this.$router.push('/member/line/loginData?fromLINE=true')
        } else {
          const staticData = JSON.parse(staticInfo)
          const { serviceItem, merchantId, setPreferDesigner, requiredInput, notRequiredInputDisplay } = staticData
          const filtService = serviceItem.filter(d => bookingData.designerServiceIds.includes(`${d.id}`))
          this.orderData = {
            designerId: bookingData.designerId,
            dateTime: bookingData.dateTime,
            cellphone: '',
            merchantId: merchantId,
            name: '',
            reference: '',
            remarkForCustomer: `${filtService.map(item => item.name).join('、')} ${bookingData.remarkForCustomer}`,
            designerServiceIds: bookingData.designerServiceIds,
            companionCount: 0
          }
          this.$store.dispatch(
          'appointmentData/handleSetRequiredInput', {
              required: requiredInput,
              display: notRequiredInputDisplay,
            }
          )
          this.$store.dispatch('appointmentData/handleSetPreferDesigner', setPreferDesigner)
          this.$store.dispatch('appointmentData/handleSetMerchantForHeader', merchantId)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 解析line回傳的token
    async handleDecodeCusLineToken() {
      try {
        let url = `${window.location.origin}/lineRedirect`;
        if (this.getLineData) {
          url += '?getLineData=true'
        }
        const res = await this.$api.decodeCusLineToken({
          redirectUri: url,
          tkn: this.$route.query.code
        })
        const { hasError, data } = res
        this.$store.dispatch('appointmentData/handleClearMerchant')
        if (hasError) {
          this.$router.push('/member/line/loginData?fromLINE=true')
        } else {
          this.liffId = data.decodeCusLineToken.id
          this.lineName = data.decodeCusLineToken.name
          this.avatarUrl = data.decodeCusLineToken.avatarUrl
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 取得當前顧個客資
    async handleGetCustomerPersonalData() {
      const res = await this.api.getCustomerPersonalData("name cellphone")
      this.$store.dispatch("indexCache/handleSetUserInfo", res.data.getCustomerPersonalData);
      this.orderData.name = res.data.getCustomerPersonalData.name
      this.orderData.cellphone = res.data.getCustomerPersonalData.cellphone
    },

    // 取得當前店家設定
    async handleGetCurrentMerchantSetting() {
      try {
        const res = await this.$api.customerGetCurrentMerchantSetting()
        const { data } = res
        if (res.hasOwnProperty("errors")) {
          this.$router.push('/member/line/loginData?fromLINE=true')
        } else {
          const responseData = data.customerGetCurrentMerchantSetting
          localStorage.setItem('allMerchants', JSON.stringify(responseData.consumedMerchants))
          localStorage.setItem('merchant', JSON.stringify(responseData.currentMerchant))
          if (this.$store.state.appointmentData.setPreferDesigner && !responseData.preferDesigner) {
            await this.handleSetPreferDesigner()
          } else {
            localStorage.setItem('preferDesigner', JSON.stringify(responseData.preferDesigner))
          }
          responseData.isLineBinded !== undefined && localStorage.setItem('isLineBinded', JSON.stringify(responseData.isLineBinded))
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },

    // 設定偏好設計師
    async handleSetPreferDesigner() {
      await this.api.updateCustomerPreferDesigner(
        this.orderData.designerId, this.orderData.merchantId
      )
    },
    
    //(指定)預約處理
    async handleBooking() {
      try {
        const res = await this.api.bookingV2(this.orderData)
        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.bookingV2)
          );
          window.localStorage.removeItem('orderToken')
          this.orderId = res.data.bookingV2.id
          this.showModal = true;
          this.modalContent = '預約成功'
          this.timer = 1500
          this.status = 'success'
        } else {
          this.$router.push('/member/appointment?getCacheData=true')
        }
      } catch (error) {
        console.log(error);
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },

    //(不指定)預約處理
    async handleNonDesignationBooking() {
      try {
        const inputData = {
          bookingDate: this.orderData.dateTime,
          cellphone: this.orderData.cellphone,
          customerName: this.orderData.name,
          storeId: this.orderData.merchantId,
          remarkForCustomer: this.orderData.remarkForCustomer,
          bookingItemIds: this.orderData.designerServiceIds
        }
        const res = await this.api.nonDesignationBooking(inputData)

        if (!res.hasOwnProperty("errors")) {
          window.localStorage.setItem(
            "bookingData",
            JSON.stringify(res.data.nonDesignationBooking)
          );
          this.orderId = res.data.nonDesignationBooking.id
          this.showModal = true
          this.modalContent = '預約成功'
          this.status = 'success'
        } else {
          this.$router.push('/member/appointment?getCacheData=true')
        }
      } catch (error) {
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },

    // 以LINE USER ID取得已綁定的BOS顧客帳號
    async handleGetBindedCusData() {
      try {
        const res = await this.$api.getBindedCusData( this.liffId )
        const { data } = res
        if (res.hasOwnProperty("errors")) {
          this.$router.push('/member/line/loginData?fromLINE=true')
        } else {
          if (data.getBindedCusData.isExist) {
            this.cusInfo = data.getBindedCusData.cusInfo
            this.lineModal = true
          } else {
            this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'name', value: this.lineName })
            this.$store.dispatch('appointmentData/handleSetLineData', { lineUserId: this.liffId, lineAvatar: this.avatarUrl })
            this.$router.push('/member/line/loginData?fromLINE=true&getLineData=true')
          }
        }
      } catch (error) {
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },

    // 綁定LINE帳號
    async bindindLine() {
      try {
        if (this.$route.query.code) {
          const fromPage = this.$route.query.from || ''
          let url = `${window.location.origin}/lineRedirect?bindAccount=true`;
          if (fromPage) url += `&from=${fromPage}`
          await this.api.customerBindWithLine({
            code: this.$route.query.code,
            endPoint: url,
            storeId: JSON.parse(localStorage.getItem('merchant'))?.id,
          })
          window.localStorage.removeItem('isLineBinded')
          await this.$swal.fire({
            icon: "success",
            html: "<p class='text-base font-semibold text-gray-900'>Line 帳號綁定成功</p>",
            background: "#fff",
            iconColor: "#FF6B2C",
            timer: 3000,
            showConfirmButton: false,
            customClass: { popup: '!rounded-2xl !shadow-lg' }
          });
          if (fromPage === 'member') {
            this.$router.push('/member');
          } else {
            this.$router.push('/member/appointmentRecord?arrowDisplay=true');
          }
        }
      } catch (error) {
        this.showModal = true
        this.modalContent = error.message
        this.timer = 1500
        this.status = 'error'
      }
    },
    
    // 預約成功彈窗關閉時
    closeModal() {
      if (this.modalContent === '預約成功') {
        let url = `/member/line/check/${this.orderId}`
        this.$router.push(url);
      } else {
        if (this.$route.query.bindAccount === 'true') {
          if (this.$route.query.from === 'member') {
            this.$router.push('/member');
          } else {
            this.$router.push('/member/appointmentRecord?arrowDisplay=true');
          }
        } else {
          this.$router.push('/member/appointment?getCacheData=true')
        }
      }
    },

    async lineClose(type) {
      this.lineModal = false
      if (type === 'cancel') {
        // 跳轉回原頁面,但要帶入line的姓名
        this.$store.dispatch('appointmentData/handleNewCusDataOnChange', { key: 'name', value: this.lineName })
        this.$store.dispatch('appointmentData/handleSetLineData', { lineUserId: this.liffId, lineAvatar: this.avatarUrl })
        this.$router.push('/member/line/loginData?fromLINE=true&getLineData=true')
      } else {
        // 走line登入預約流程
        await this.handleCusLoginWithLineID()
        (this.orderData.designerId === 1 || this.orderData.designerId === '1') ? await this.handleNonDesignationBooking() : await this.handleBooking()
      }
    }
  },
  async mounted() {
    setInterval(() => {
      if (this.dot.length < 3) {
        this.dot += '.'
      } else {
        this.dot = ''
      }
    }, 800);
    if (this.$route.query.bindAccount === 'true') {
      await this.bindindLine()
    } else {
      this.getLineData = this.$route.query.getLineData === 'true'
      await this.getCachedBookingData()
      await this.handleDecodeCusLineToken()
      if (this.getLineData) {
        await this.handleGetBindedCusData()
      } else {
        const isError = await this.handleCusLoginWithLineID()
        if (isError) {
          this.$router.push('/member/line/loginData?fromLINE=true')
        } else {
          (this.orderData.designerId === 1 || this.orderData.designerId === '1') ? await this.handleNonDesignationBooking() : await this.handleBooking()
        }
      }
    }
  }
}
</script>
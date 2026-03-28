import axios from 'axios'
import Swal from 'sweetalert2'
import Vue from 'vue'
import {
  getToken,
  removeToken
} from '~/plugins/cookies.js'
import { removeRequestPending, clearRequestPending, RequestPending } from '../utils/cancelToken.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : 'https://apibeautyos.mlgroup.vip/',
  timeout: 50000
})

const apiArr = ['decodeCusLineToken', 'cusLoginWithLineID']

const Cancel = axios.CancelToken

service.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['customeraccesstoken'] = token
  }
  const Usermerchantid = JSON.parse(localStorage.getItem('merchant'))?.id;
  if(Usermerchantid)  config.headers['Usermerchantid'] = Usermerchantid

  const setHeader = apiArr.some(str => config.data.query.includes(str))

  if (setHeader) {
    const merchantIdFromStore = Vue.prototype.store.state.appointmentData.merchantId
    if (merchantIdFromStore) {
      config.headers['Usermerchantid'] = merchantIdFromStore
    }
  }
  const query = JSON.stringify(config.data.query).replace(/\s+/g, '')

  removeRequestPending(config, query)

  config.cancelToken = new Cancel((cancel) => {
    RequestPending.push({
      uuid: `${config.url}&${config.method}${query}`,
      cancel
    })
  })

  return config
}, (err) => Promise.reject(err))

service.interceptors.response.use((response) => {
  
  const query = JSON.stringify(response.config.data).replace(/\s+/g, '')
  
  clearRequestPending(response, query)

  if (
    window.location.pathname.includes('/member/line') &&
    query.includes('customerGetCurrentMerchantSetting')
  ) {
    return response.data
  }

  if (response.data.errors) {
    if (response.data.errors[0].message.indexOf('過期') !== -1) {
      removeToken()
      window.localStorage.clear()
      response.data.hasError = true
      Swal.fire({
        icon: 'info',
        title: `<h3 class="text-lg font-semibold text-gray-900">請重新登入</h3>`,
        background: '#fff',
        iconColor: '#FF6B2C',
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: '!rounded-2xl !shadow-lg' }
      })
        .then(() => {
          Vue.prototype.redirect('/')
        })
    } else {
      if (
        !response.data.errors[0].path.includes("customerCancelReservation") &&
        !response.data.errors[0].path.includes("getCachedBookingData")
      ) {
        const msg = response.data.errors[0].message
        const isLoginError = msg.includes('密碼') || msg.includes('登入')
        const displayMsg = isLoginError ? '手機號碼或密碼錯誤，請按忘記密碼收取簡訊驗證' : msg
        Swal.fire({
          icon: 'warning',
          html: `<h3 class="text-base font-semibold text-gray-900">${displayMsg}</h3>`,
          background: '#fff',
          iconColor: '#FF6B2C',
          timer: 5000,
          showConfirmButton: false,
          customClass: { popup: '!rounded-2xl !shadow-lg' }
        })
      }
      response.data.hasError = true
    }
  }

  if (!response.data.errors) response.data.hasError = false

  return response.data
}, (err) => {

  if (err.response) {
    switch (err.response.status) {
      case 401:
        removeToken()
        window.localStorage.clear()
        Swal.fire({
          icon: 'info',
          background: '#fff',
          iconColor: '#FF6B2C',
          html: `<h3 class="text-lg font-semibold text-gray-900">請重新登入</h3>`,
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: '!rounded-2xl !shadow-lg' }
        })
          .then(() => {
            Vue.prototype.store.dispatch('loading/isLoading', false)
            Vue.prototype.store.dispatch('itemLoading/isLoading', false)
            Vue.prototype.redirect('/')
          })
        break
      case 500:
        Swal.fire({
          icon: 'warning',
          background: '#fff',
          iconColor: '#FF6B2C',
          html: `<h3 class="text-lg font-semibold text-gray-900">發生錯誤，請稍後再試</h3>`,
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: '!rounded-2xl !shadow-lg' }
        })
        Vue.prototype.store.dispatch('loading/isLoading', false)
        Vue.prototype.store.dispatch('itemLoading/isLoading', false)
        break
      default:
        Swal.fire({
          icon: 'warning',
          background: '#fff',
          iconColor: '#FF6B2C',
          html: `<h3 class="text-lg font-semibold text-gray-900">發生錯誤，請稍後再試</h3>`,
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: '!rounded-2xl !shadow-lg' }
        })
        Vue.prototype.store.dispatch('loading/isLoading', false)
        Vue.prototype.store.dispatch('itemLoading/isLoading', false)
        break
    }

    setTimeout(() => {
      if (Vue.prototype.store.state.loading.isLoading || Vue.prototype.store.state.itemLoading.isLoading) {
        Vue.prototype.store.dispatch('loading/isLoading', false)
        Vue.prototype.store.dispatch('itemLoading/isLoading', false)
      }
    }, 3000)
  }
  return Promise.reject(err)
})

export default service

import { cancelAllPending } from '../utils/cancelToken.js'
import { getToken, removeToken } from '@/plugins/cookies.js'
import Swal from 'sweetalert2'

export default ({ app }) => {
  const whiteList = ['index']

  app.router.beforeEach((to, from, next) => {

    const merchant = JSON.parse(window.localStorage.getItem('merchant'))
    let isNewCustomer = JSON.parse(window.localStorage.getItem("isNewCustomer")) || false
    let isNewCustomerAndNomerchant =JSON.parse(window.localStorage.getItem("isNewCustomerAndNomerchant")) || false
    
    const token = getToken() || ''

    cancelAllPending()

    if (to.name === 'login') {
      if (isNewCustomer && isNewCustomerAndNomerchant) {
        if (to.name !== 'member-info-edit' && token)  next({ name: 'member-info-edit' })
        else next()
      }
      else if (!merchant && isNewCustomerAndNomerchant ) {
        if (to.name !== 'member-setting-edit' && token) next({ name: 'member-setting-edit' })
        else next()
      }
      else next()
    } else {
      if (to.name !== 'index') {
        if (!token) {
          const urlParams = new URLSearchParams(window.location.search);
          let url = '/'
          if (to.query.to) {
            url += `?to=${to.query.to}`
            if (to.query.merchantId) {
              url += `&merchantId=${to.query.merchantId}`
            }
          }
          if (window.location.pathname.includes('line') || window.location.pathname.includes('lineRedirect')) {
            next()
          } else {
            Swal.fire({
              icon: 'info',
              iconColor: '#FF6B2C',
              html: `<h3 class="text-xl font-semibold text-gray-900">請重新登入</h3>`,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: '!rounded-2xl !shadow-lg'
              }
            })
              .then(() => {
                next({ path: url })
              })
          }
        }
        else {
          if (isNewCustomer && isNewCustomerAndNomerchant) {
            if (to.name === 'password') {
              next()
            } else {
              if (to.name !== 'member-info-edit' && token) {
                next({ name: 'member-info-edit' })
              } else {
                next()
              }
            }
          } else if (!merchant && isNewCustomerAndNomerchant ) {
            if (to.name === 'password') {
              next()
            } else {
              if (to.name !== 'member-setting-edit' && token) {
                next({ name: 'member-setting-edit' })
              } else {
                next()
              }
            }
          } else if (!merchant) {
            removeToken()
            window.localStorage.clear()
            Swal.fire({
              icon: 'info',
              iconColor: '#FF6B2C',
              html: `<h3 class="text-xl font-semibold text-gray-900">請重新登入</h3>`,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: '!rounded-2xl !shadow-lg'
              }
            })
              .then(() => {
                next({ path: '/' })
              })
          } else {
            next()
          }
        }
      } else {
        if (token) {
          next({ path: '/member' })
        } else {
          next()
        }
      }
    }

  })
}
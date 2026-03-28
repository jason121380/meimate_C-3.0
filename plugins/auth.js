import Vue from 'vue'
import Cookies from 'js-cookie'

const token = 'customeraccesstoken'

export default({}, inject) => {

  const cookieMethods = {
    getToken: () => {
      return Cookies.get(token)
    },
    setToken: (tokenKey) => {
      return Cookies.set(token, tokenKey, { expires: 30 })
    },
    removeToken: () => {
      return Cookies.remove(token)
    }
  }

  Vue.prototype.cookieMethods = cookieMethods
  inject('cookieMethods', cookieMethods)

}
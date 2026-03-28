import Vue from 'vue'
import { formatDate } from './formatDate.js'
import { overflow } from './overflow.js'
Vue.directive('formatDate', {
  bind: formatDate,
  componentUpdated: formatDate
})
Vue.directive('overflow', overflow)
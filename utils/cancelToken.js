import Vue from 'vue'
// 紀錄請求中 API
export let RequestPending = []

// 判斷有無相同並且等待中的api，有的話cancel
export function removeRequestPending(config, query) {
  RequestPending.forEach((api, idx, arr) => {
    if (api.uuid === `${config.url}&${config.method}${query}`) {
      api.cancel()
      arr.splice(idx, 1)
    }
  })
}

// 清除所有請求中的api
export function cancelAllPending() {
  RequestPending.forEach((api) => {
    api.cancel()
  })
  RequestPending.length = 0

  Vue.prototype.store.dispatch('loading/isLoading', false)
  Vue.prototype.store.dispatch('itemLoading/isLoading', false)
}

export function cacelPendingForBookingRecords() {
  RequestPending.forEach((api) => {
    api.cancel()
  })
  RequestPending.length = 0
}

// response後清除特定api
export function clearRequestPending(config, query) {
  const target = `${config.url}&${config.method}${query}`
  for (let i = RequestPending.length - 1; i >= 0; i--) {
    if (RequestPending[i].uuid === target) {
      RequestPending.splice(i, 1)
    }
  }
}

export const state = () => ({
  userInfo: {},
  records: []
})

export const actions = {
  handleSetUserInfo({ commit }, data) {
    commit('setUserInfo', data)
  },
  handleSetRecords({ commit }, data) {
    commit('setRecords', data)
  }
}

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setRecords(state, data) {
    state.records = data
  }
}
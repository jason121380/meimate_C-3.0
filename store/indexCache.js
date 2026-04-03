export const state = () => ({
  userInfo: {},
  records: [],
  memberCard: {},
  appointmentRecords: [],
  editPasswordBtn: false,
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
  },
  setMemberCard(state, data) {
    state.memberCard = data
  },
  setAppointmentRecords(state, data) {
    state.appointmentRecords = data
  },
  setEditPasswordBtn(state, data) {
    state.editPasswordBtn = data
  }
}

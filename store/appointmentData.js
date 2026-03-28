// import { set } from "core-js/core/dict"

export const state = () => ({
  time: '',
  timestamp: '',
  merchantId: '',
  merchantName: '',
  designerId: '',
  designerName: '',
  designerNickName: '',
  reference: '',
  remarkForCustomer: '',
  designerServiceIds: [],
  companionCount: 0,
  cacheServiceIds: [],
  cacheTimeStamp: '',
  isNewCus: null,
  requiredInput: [],
  notRequiredInputDisplay: false,
  setPreferDesigner: false,
  staticData: null,
  newCusData: {
    name: '',
    gender: 'UNKNOWN',
    cellphone: '',
    address: null,
    birthday: null,
    email: null,
    lineId: null,
    nickName: '',
  },
  lineUserId: '',
  lineAvatar: ''
})

export const actions = {
  handleSetDesignerAndMerchant({ commit }, data) {
    commit('setDesignerAndMerchant', data)
  },
  handleSetTime({ commit }, data) {
    commit('setTime', data)
  },
  handleClearData({ commit }) {
    commit('clearData')
  },
  handleSetAppointmentData({ commit }, data) {
    commit('setAppointmentData', data)
  },
  handleSetService({ commit }, data) {
    commit('setService', data)
  },
  handleSelectService({ commit }, data) {
    commit('selectService', data)
  },
  handleCancelService({ commit }, data) {
    commit('cancelService', data)
  },
  handleSetCacheServiceIds({ commit }, data) {
    commit('setCacheServiceIds', data)
  },
  handleClearCacheServiceIds({ commit }) {
    commit('clearCacheServiceIds')
  },
  handleSetCacheTimeStamp({ commit }, data) {
    commit('setCacheTimeStamp', data)
  },
  handleClearCacheTimeStamp({ commit }) {
    commit('clearCacheTimeStamp')
  },
  handleSetRemarkForCustomer({ commit }, data) {
    commit('setRemarkForCustomer', data)
  },
  handleSetNewCusData({ commit }, data) {
    commit('setNewCusData', data)
  },
  handleNewCusDataOnChange({ commit }, data) {
    commit('newCusDataOnChange', data)
  },
  handleSetRequiredInput({ commit }, data) {
    commit('setRequirdInput', data)
  },
  handleSetPreferDesigner({ commit }, data) {
    commit('setPreferDesigner', data)
  },
  handleSetStaticData({ commit }, data) {
    commit('setStaticData', data)
  },
  handleSetLineData({ commit }, data) {
    commit('setLineData', data)
  },
  handleSetMerchantForHeader({ commit }, data) {
    commit('setMerchantForHeader', data)
  },
  handleClearMerchant({ commit }, data) {
    commit('clearMerchant')
  },
}

export const mutations = {
  setDesignerAndMerchant(state, data) {
    state.merchantId = data.merchantId,
    state.merchantName = data.merchantName,
    state.designerId = data.designerId,
    state.designerName = data.designerName
    state.designerNickName = data.designerNickName
  },
  setTime(state, data) {
    state.time = data.time
    state.timestamp = data.timestamp
  },
  clearData(state) {
    state.time = ''
    state.timestamp = ''
    state.merchantId = ''
    state.merchantName = ''
    state.designerId = ''
    state.designerName = ''
    state.designerNickName = ''
    state.reference = ''
    state.remarkForCustomer = ''
    state.designerServiceIds = []
    state.companionCount = ''
    state.cacheServiceIds = []
    state.cacheTimeStamp = ''
    state.isNewCus = null
    state.setPreferDesigner = false
    state.newCusData = {
      name: '',
      gender: 'UNKNOWN',
      cellphone: '',
      address: null,
      birthday: null,
      email: null,
      lineId: null,
      nickName: ''
    }
  },
  setAppointmentData(state, data) {
    state.reference = data.reference
    state.remarkForCustomer = data.remarkForCustomer
    state.companionCount = data.companionCount
  },
  setService(state, data) {
    state.designerServiceIds = data
  },
  selectService(state, data) {
    const isSelected = state.designerServiceIds
      .map((mapItem) => mapItem.id)
      .includes(data.id);
    if (isSelected) {
      state.designerServiceIds = state.designerServiceIds.filter(
        (filterItem) => filterItem.id !== data.id
      );
    } else {
      state.designerServiceIds.push(data);
    }
  },
  cancelService(state, data) {
    state.designerServiceIds = state.designerServiceIds.filter(
      (filterItem) => filterItem.id !== data.id
    );
  },
  setCacheServiceIds(state, data) {
    state.cacheServiceIds = data
  },
  clearCacheServiceIds(state) {
    state.cacheServiceIds = []
  },
  setCacheTimeStamp(state, data) {
    state.cacheTimeStamp = data
  },
  clearCacheTimeStamp(state) {
    state.cacheTimeStamp = ''
  },
  setRemarkForCustomer(state, data) {
    state.remarkForCustomer = data
  },
  setNewCusData(state, { isNewCus, newCusData }) {
    if (isNewCus) state.isNewCus = isNewCus;
    if (newCusData) state.newCusData = newCusData;
  },
  newCusDataOnChange(state, { key, value }) {
    const obj = {}
    obj[key] = value
    state.newCusData = {...state.newCusData, ...obj}
  },
  setRequirdInput(state, data) {
    state.requiredInput = data.required;
    state.notRequiredInputDisplay = data.display;
  },
  setPreferDesigner(state, data) {
    state.setPreferDesigner = data
  },
  setStaticData(state, data) {
    state.staticData = data
  },
  setLineData(state, { lineUserId, lineAvatar }) {
    state.lineUserId = lineUserId
    state.lineAvatar = lineAvatar
  },
  setMerchantForHeader(state, data) {
    state.merchantId = data
  },
  clearMerchant(state) {
    state.merchantId = ''
  }
}
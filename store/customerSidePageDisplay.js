export const state = () => ({

  isDisplay: {
    ServiceRecord: null,
    TicketRecord: null,
    WalletRecord: null,
    BonusRecord: null,
  }

})
export const mutations = {
  updateisDisplay(state, data) {
    state.isDisplay = { ...data }
  }
}

export const state = () => ({
  isCloseCustomerBookingForCustomer: null
})
export const mutations = {
  setIsCloseCustomerBookingForCustomer(state, data) {
    state.isCloseCustomerBookingForCustomer = data
  },
}
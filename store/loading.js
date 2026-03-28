export const state = () => ({
  isLoading: false
})

export const actions = {
  isLoading({ commit }, bool) {
    commit('isLoading', bool)
  }
}

export const mutations = {
  isLoading(state, bool) {
    state.isLoading = bool
  }
}
export const state = () => ({
  loading: false,
})
export const mutations = {
  setLoading(state) {
    state.loading = true
  },
  resetLoading(state) {
    state.loading = false
  },
}
export const getters = {
  loading: ({ loading }) => loading,
}

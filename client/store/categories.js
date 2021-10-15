import axios from "../services/request.service"
import crudStore from "./generic"

const crudInstance = crudStore({
  url: "categories",
  name: "categories",
})
export default {
  ...crudInstance,
  mutations: {
    ...crudInstance.mutations,
    swapItems(state, { newIndex, oldIndex }) {
      const stateItems = state.items.data
      const temp = stateItems[oldIndex]
      stateItems[oldIndex] = stateItems[newIndex]
      stateItems[newIndex] = temp
    },
    updateDndItems(state, newItems) {
      state.items.data = newItems
    },
  },
  actions: {
    ...crudInstance.actions,
    async changeOrder({ commit, dispatch }, payload) {
      commit("loading/setLoading", null, { root: true })
      try {
        const { data } = await axios.post("/categories/change-order", payload)
        commit("loading/resetLoading", null, { root: true })
        return data
      } catch (e) {
        commit("loading/resetLoading", null, { root: true })
        throw e
      }
    },
  },
  getters: {
    /* eslint-disable */
    ...crudInstance.getters,
    image: function () {
      return function (item) {
        if (item.cover_image) {
          return `${process.env.BASE_URL}/public/categories/${item.cover_image}`
        } else {
          return "/image-placeholder.jpg"
        }
      }
    },
  },
}

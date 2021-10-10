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
    ...crudInstance.getters,
    image: () => (item) => {
      if (item.cover_image) {
        return `http://localhost:3001/categories/${item.cover_image}`
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
      }
    },
  },
}

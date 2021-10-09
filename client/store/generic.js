import genericService from "../services/generic.service"
import axios from "../services/request.service"

const crudStore = ({ url, name }) => {
  const generic = genericService(url, name)
  return {
    state: () => ({
      item: null,
      items: null,
      itemError: null,
      loading: true,
    }),
    actions: {
      async fetchAll({ commit, dispatch, getters }, payload = {}) {
        try {
          /* eslint-disable */
          const limit = payload?.limit || -1
          const params = payload?.params || null
          const isAdmin = payload?.isAdmin || false
          const forceFetch = payload?.forceFetch || true
          const items = getters.items
          if (!items || forceFetch) {
            commit("loading/setLoading", null, { root: true })
            const data = await generic.fetchAll(limit, params, isAdmin)
            commit("fetchItemsSuccess", data)
            commit("loading/resetLoading", null, { root: true })
            return data
          }
          return items
        } catch (error) {
          const errorMessage = await dispatch("generateError", error)
          commit("error/setError", errorMessage, { root: true })
          commit("fetchItemsFail", error)
          commit("loading/resetLoading", null, { root: true })
          throw error
        }
      },
      async fetchOne({ commit, getters, dispatch }, payload) {
        try {
          const isItemExists = getters.item
          const isAdmin = payload?.isAdmin || false
          const id = payload?.id
          const forceFetch = payload?.forceFetch || true
          commit("resetItem")
          if (!isItemExists || forceFetch) {
            commit("loading/setLoading", null, { root: true })
            const data = await generic.fetchOne(id, isAdmin)
            commit("fetchItemSuccess", data)
            commit("loading/resetLoading", null, { root: true })
            commit("resetLoading")
            return data
          }
        } catch (error) {
          const errorMessage = await dispatch("generateError", error)
          commit("error/setError", errorMessage, { root: true })
          commit("fetchItemsFail", error)
          commit("loading/resetLoading", null, { root: true })
          commit("resetLoading")
          throw error
        }
      },
      async create({ commit, dispatch }, payload) {
        try {
          const isAdmin = payload?.isAdmin || false
          commit("loading/setLoading", null, { root: true })
          const data = await generic.create(payload, isAdmin)
          commit("loading/resetLoading", null, { root: true })
          return data
        } catch (error) {
          const errorMessage = await dispatch("generateError", error)
          commit("error/setError", errorMessage, { root: true })
          commit("createItemFail", error)
          commit("loading/resetLoading", null, { root: true })
          throw error
        }
      },
      async update({ commit, dispatch }, payload) {
        try {
          const isAdmin = payload?.isAdmin || false
          commit("loading/setLoading", null, { root: true })
          const data = await generic.update(payload, isAdmin)
          commit("loading/resetLoading", null, { root: true })

          // eslint-disable-next-line no-unreachable
          // console.log(data)
          // const item = data[0]
          // commit('updateItemSuccess', item)
          commit("loading/resetLoading", null, { root: true })
          return data
          // return item
        } catch (error) {
          const errorMessage = await dispatch("generateError", error)
          commit("error/setError", errorMessage, { root: true })
          commit("updateItemFail", error)
          commit("loading/resetLoading", null, { root: true })

          throw error
        }
      },
      async delete({ commit, dispatch }, payload) {
        try {
          commit("loading/setLoading", null, { root: true })
          const isAdmin = payload?.isAdmin || false
          const id = payload?.id
          const item = await generic.delete(id, isAdmin)
          commit("deleteItemSuccess", item)
          commit("loading/resetLoading", null, { root: true })
        } catch (error) {
          const errorMessage = await dispatch("generateError", error)
          commit("setError", errorMessage, { root: true })
          commit("deleteItemError", error)
          commit("loading/resetLoading", null, { root: true })
          throw error
        }
      },
      async updateSpoofing({ commit, dispatch }, payload) {
        commit("loading/setLoading", null, { root: true })
        try {
          const { data } = await axios.post(
            `/admin/${url}/${payload.id}?_method=PUT`,
            payload.data
          )
          commit("loading/resetLoading", null, { root: true })
          return data
        } catch (e) {
          commit("loading/resetLoading", null, { root: true })
          commit("error/setError", e.response.data, { root: true })
          throw e
        }
      },
      generateError(state, { error }) {
        const message = error?.response?.data
        return message || "Something went wrong"
      },
    },
    mutations: {
      fetchItemsSuccess(state, items) {
        state.items = items
      },
      fetchItemsFail(state, error) {
        state.itemError = error
      },
      fetchItemSuccess(state, item) {
        state.item = item
      },
      fetchItemFail(state, error) {
        state.itemError = error
      },
      createItemSuccess(state, item) {
        state.item = item
      },
      createItemFail(state, error) {
        state.itemError = error
      },
      updateItemSuccess(state, item) {
        state.item = item
      },
      updateItemFail(state, error) {
        state.itemError = error
      },
      deleteItemSuccess(state, item) {
        state.item = item
      },
      deleteItemError(state, error) {
        state.itemError = error
      },
      setLoading(state) {
        state.loading = true
      },
      resetLoading(state) {
        state.loading = false
      },
      resetItem(state) {
        state.item = {}
      },
      spliceItem(state, id) {
        const items = (state.items.length && state.items) || state.items.data
        const item = items.findIndex((item) => item.id === id)
        items.splice(item, 1)
      },
      pushItem(state, item) {
        const items = (state.items.length && state.items) || state.items.data
        items.push(item)
        // state.items.push(item)
      },
      editItem(state, payload) {
        const items = (state.items.length && state.items) || state.items.data
        if (!items) return
        const item = items.find(({ id }) => id === payload.id)
        item && Object.assign(item, payload)
      },
    },
    getters: {
      items: (state) => state.items,
      item: (state) => state.item,
      itemError: (state) => state.itemError,
      data: ({ items }) => (items && items?.data) || [],
      loading: ({ loading }) => loading,
      entityLoaded: ({ item }) => item && Object.keys(item).length > 0,
    },
  }
}

export default crudStore

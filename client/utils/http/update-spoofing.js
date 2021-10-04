import axios from '@/services/request.service'

export async function update({ commit, dispatch }, payload) {
  commit('loading/setLoading', null, { root: true })
  const { id, data } = payload
  const formData = buildFormData(data)
  try {
    const { data } = await axios.post(
      `/admin/streams/${id}?_method=PUT`,
      formData
    )
    commit('loading/resetLoading', null, { root: true })
    return data
  } catch (e) {
    commit('loading/resetLoading', null, { root: true })
    commit('error/setError', e.response.data, { root: true })
    throw e
  }
}

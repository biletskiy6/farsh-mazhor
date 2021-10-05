import axios from "./request.service"
const throwError = (error) => {
  // eslint-disable-next-line no-throw-literal
  throw {
    isError: true,
    message: `Error in ${name}`,
    error,
  }
}

const generateApiPath = (url, isAdmin) => (isAdmin ? `admin/${url}/` : url)
export default (url, name) => ({
  async fetchAll(limit, params, isAdmin) {
    try {
      const path = generateApiPath(url, isAdmin)
      const { data } = await axios.get(path, { params })
      return data
    } catch (error) {
      throwError(error)
    }
  },

  async fetchOne(id) {
    try {
      const { data } = await axios.get(`${url}/${id}`)
      return data
    } catch (error) {
      throwError(error)
    }
  },
  async create(payload) {
    try {
      const isAdmin = payload?.isAdmin
      const data = payload?.data
      const basePath = generateApiPath(url, isAdmin)
      const response = await axios.post(`${basePath}`, data)
      return response.data
    } catch (error) {
      throwError(error)
    }
  },

  async update(payload) {
    try {
      const isAdmin = payload?.isAdmin
      const item = payload?.data
      const basePath = generateApiPath(url, isAdmin)
      const { data } = await axios.put(`${basePath}`, item)
      return data
    } catch (error) {
      throwError(error)
    }
  },

  async delete(id) {
    try {
      const data = await axios.delete(`${url}/delete/${id}`)
      return { message: "Deleted", data }
    } catch (error) {
      // eslint-disable-next-line no-throw-literal
      throw {
        isError: true,
        message: `Error in ${this.name}`,
        error,
      }
    }
  },
})

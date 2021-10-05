import axios from "./request.service"
export default {
  buildFileData(data) {
    const fd = new FormData()
    fd.append("image", data)
    return fd
  },
  async send(url, payload, options) {
    try {
      const requestHeaders = {
        "Content-Type": "multipart/form-data",
      }
      const { data } = await axios.post(
        `${url}/upload`,
        this.buildFileData(payload),
        options || requestHeaders
      )
      return data
    } catch (error) {
      // eslint-disable-next-line no-throw-literal
      throw {
        isError: true,
        message: `Error in ${name}`,
        error,
      }
    }
  },
}

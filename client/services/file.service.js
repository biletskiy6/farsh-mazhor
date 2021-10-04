import axios from './request.service'
const url = 'attachments'
const name = 'Attachments'
export default {
  buildFileData(data) {
    const fd = new FormData()
    fd.append('data', data)
    return fd
  },
  async send(payload, options) {
    try {
      const requestHeaders = {
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.post(
        `${url}/update`,
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

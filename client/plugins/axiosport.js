import { setClient } from '@/services/request.service'

export default ({ app }) => {
  setClient(app.$axios)
}

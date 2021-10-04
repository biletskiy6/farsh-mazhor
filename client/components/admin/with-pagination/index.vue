<script>
export default {
  name: 'WithPagination',
  props: {
    fetchData: {
      type: Function,
      default: () => Function,
    },
  },
  data() {
    return {
      page: 1,
      total: 0,
      limit: 15,
    }
  },
  async mounted() {
    try {
      const response = await this.fetchData({
        params: { limit: this.limit, page: this.page },
      })
      this.total = response.total
    } catch (e) {}
  },
  methods: {
    resetPage() {
      this.page = 1
    },
    async updateItemsPerPage(limit) {
      await this.fetchData({
        isAdmin: true,
        params: { limit, page: this.page },
      })
      return true
    },
    async updatePage(page) {
      await this.fetchData({
        isAdmin: true,
        params: { limit: this.limit, page },
      })
      this.page = page
      return true
    },
  },
  render() {
    return this.$scopedSlots.default({
      page: this.page,
      total: this.total,
      updateItemsPerPage: this.updateItemsPerPage,
      updatePage: this.updatePage,
    })
  },
}
</script>

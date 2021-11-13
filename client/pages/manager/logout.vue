<script>
export default {
  async beforeMount() {
    await this.$auth.logout()
  },
  render() {
    return this.$slots.default
  },
  layout: "admin",
}
</script>

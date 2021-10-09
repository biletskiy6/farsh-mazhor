<script>
export default {
  data() {
    return {
      socials: [{ name: "instagram" }, { name: "viber" }],
    }
  },
  render() {
    return this.$scopedSlots.default({
      socials: this.socials,
    })
  },
}
</script>

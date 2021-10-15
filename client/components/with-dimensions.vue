<script>
export default {
  name: "WithDimensions",
  data() {
    return {
      width: null,
      height: null,
    }
  },
  mounted() {
    /* eslint-disable */
    if (process.client) {
      const ctx = this
      const elementResizeDetectorMaker = require("element-resize-detector")
      const erd = elementResizeDetectorMaker({ strategy: "scroll" })
      erd.listenTo(this.$el, (element) => {
        this.width = element.offsetWidth
      })
    }
  },
  render() {
    return this.$scopedSlots.default({
      width: this.width,
    })
  },
}
</script>

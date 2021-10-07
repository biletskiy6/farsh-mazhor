<template>
  <div class="app-modal">
    <div
      @click="handleClose"
      class="modal"
      :class="{ active: showAfterAnimation }"
    >
      <div @click.stop="" class="modal-content">
        <slot name="body" :params="params" />
      </div>
    </div>
    <div class="ripple-container">
      <div
        ref="ripple"
        class="ripple"
        :class="{ 'is-animating': visible }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    name: {
      required: true,
      type: String,
    },
    height: {
      required: false,
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      params: {},
      animationTime: 1.4,
      showAfterAnimation: false,
      visible: false,
    }
  },
  beforeMount() {
    this.$modal.$event.$on("show", (modal, params) => {
      this.params = params
      return this.name === modal ? (this.visible = true) : null
    })
    this.$modal.$event.$on("hide", (modal) => {
      return this.name === modal ? (this.visible = false) : null
    })
  },
  mounted() {
    this.ripple = this.$refs.ripple
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    const s = w > h ? w * 2.5 : h * 2.5

    this.ripple.style.width = s + "px"
    this.ripple.style.height = s + "px"

    document.addEventListener("keydown", (e) => {
      if (this.visible && e.which === 27) {
        this.visible = false
      }
    })
  },
  methods: {
    handleClose() {
      this.$modal.hide(this.name)
    },
  },
  watch: {
    visible(value) {
      if (value) {
        const delay = this.animationTime * 1000
        this.ripple.style.animation = `ripple ${this.animationTime}s linear`
        document.body.style.setProperty("overflow", "hidden")
        setTimeout(() => (this.showAfterAnimation = true), delay * 0.3)
      } else {
        this.ripple.style.animation = ""
        this.showAfterAnimation = false
        document.body.style.removeProperty("overflow")
      }
    },
  },
}
</script>

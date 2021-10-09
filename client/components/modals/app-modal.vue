<template>
  <transition name="modal">
    <div class="app-modal">
      <div
        v-if="visible"
        class="modal"
        :class="{ active: showAfterAnimation }"
        @click="handleClose"
      >
        <button class="app-modal__close">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>

        <div class="modal-content" @click.stop="">
          <slot name="body" :params="params" />
        </div>
      </div>
    </div>
  </transition>
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
      document.documentElement.style.setProperty("overflow", "hidden")
      document.body.style.setProperty("overflow", "hidden")
      document.body.style.setProperty("touch-action", "none")
      return this.name === modal ? (this.visible = true) : null
    })
    this.$modal.$event.$on("hide", (modal) => {
      console.log('hide')
      document.documentElement.style.removeProperty("overflow")
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("touch-action")
      return this.name === modal ? (this.visible = false) : null
    })
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (this.visible && e.which === 27) {
        this.handleClose()
      }
    })
  },
  methods: {
    handleClose() {
      this.$modal.hide(this.name)
    },
  },
}
</script>

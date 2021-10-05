import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  computed: {
    ...mapGetters({
      error: "error/error",
    }),
  },
  methods: {
    ...mapActions({
      showShack: "snackbar/showSnack",
    }),
    ...mapMutations({
      clearError: "error/clearError",
    }),
  },
  watch: {
    error(value) {
      if (value) {
        const errors = []
        const data = value.errors || value.message
        if (_.isPlainObject(data)) {
          for (const key in data) {
            data[key] && errors.push(data[key]?.join(""))
          }
        } else {
          errors.push(data)
        }
        const title = _.flatten(errors)[0] || "Something went wrong"
        this.showShack({
          text: title,
          color: "error",
          timeout: 500000,
        })
        // this.$notify({
        //   title,
        //   type: "error",
        //   duration: 100000,
        // })
        this.clearError()
      }
    },
  },
}

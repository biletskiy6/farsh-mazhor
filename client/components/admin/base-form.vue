<script>
import { mapActions } from "vuex"
// import fileService from "@/services/file.service"
// import { serializeForm } from "@/utils/forms"
// import { isFileInstance } from "@/utils/file"
// import {
//   ENTITY_SUCCESSFULLY_CREATED,
//   ENTITY_SUCCESSFULLY_UPDATED,
// } from "@/utils/messages"
export default {
  name: "BaseForm",
  props: {
    formFields: {
      default: () => {},
    },
    entityName: {
      required: false,
      default: "",
    },
    defaultValues: {
      required: false,
      default: () => {},
    },
    // eslint-disable-next-line vue/require-prop-types
    mapFormFields: {
      default: null,
    },
  },
  computed: {
    isDefaultValuesEmpty() {
      if (!this.defaultValues) return true
      return this.defaultValues && Object.keys(this.defaultValues).length === 0
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions({
      showSnackbar: "snackbar/showSnack",
    }),
    pickAllFields() {
      Object.assign(
        this.formFields,
        _.pick(this.defaultValues, Object.keys(this.formFields))
      )
    },
    loadDefaultValues() {
      return this.mapFormFields
        ? this.mapFormFields(this.formFields, this.defaultValues)
        : this.pickAllFields()
    },
    init() {
      this.$emit("handleSubmit", this.handleSubmit)
      this.emitFormFields()
      if (!this.isDefaultValuesEmpty) {
        this.loadDefaultValues()
        this.emitFormFields()
      }
    },
    emitFormFields() {
      this.$emit("input", this.formFields)
    },
    handleEdit() {
      this.$emit('edit')
      // try {
      //   const data = serializeForm(this.formFields)
      //   if (isFileInstance(this.formFields.attachment)) {
      //     const file = await fileService.send(this.formFields.attachment)
      //     data.attachment_ids = [file.id]
      //   }
      //   // console.log(fileService, this.formFields.attachment)
      //   await this.$store.dispatch(`${this.entityName}/update`, { data })
      //   this.showSnackbar({
      //     text: ENTITY_SUCCESSFULLY_UPDATED,
      //     color: "success",
      //   })
      // } catch (e) {}
    },
    handleCreate() {
      this.$emit('create')
      // try {
      //   const data = serializeForm(this.formFields)
      //   if (isFileInstance(this.formFields.attachment)) {
      //     const file = await fileService.send(this.formFields.attachment)
      //     data.attachment_ids = [file.id]
      //   }
      //   await this.$store.dispatch(`${this.entityName}/create`, { data })
      //   this.showSnackbar({
      //     text: ENTITY_SUCCESSFULLY_CREATED,
      //     color: "success",
      //   })
      // } catch (e) {}
    },
    async handleSubmit() {
      // eslint-disable-next-line no-unreachable
      return this.isDefaultValuesEmpty
        ? await this.handleCreate()
        : await this.handleEdit()
    },
  },
  render() {
    return this.$scopedSlots.default()
  },
}
</script>

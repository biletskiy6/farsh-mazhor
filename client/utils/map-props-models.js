export function mapPropsModels(props = [], formName) {
  console.log('THIS:', formName)
  if (!formName) return
  return props.reduce((obj, fieldName) => {
    obj[fieldName] = {
      get() {
        return this.getFieldValue(fieldName, formName)
      },
      set: _.debounce(function (value) {
        this.$emit('input', value)
        this.setFieldValue({ fieldName, value, formName })
      }, 10),
    }
    return obj
  }, {})
}

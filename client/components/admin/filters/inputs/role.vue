<template>
  <v-select
    class="ml-2"
    :items="['member', 'admin']"
    label="Role"
    :value="value && value[`${type}`]"
    @change="handleChange"
  ></v-select>
</template>

<script>
export default {
  name: 'AdminSearch',
  props: {
    value: {
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    modelName: {
      type: String,
      default: '',
    },
    paginationParams: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type: 'role',
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('input', { value, type: this.type })
      console.log(value)
    },
  },
}
</script>

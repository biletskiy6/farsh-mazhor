<template>
  <v-text-field
    class="v-search-field"
    :label="label"
    prepend-icon="mdi-search-web"
    :value="value && value[`${type}`]"
    @input="(value) => $emit('input', { value, type: this.type })"
  ></v-text-field>
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
      type: 'query',
    }
  },
}
</script>

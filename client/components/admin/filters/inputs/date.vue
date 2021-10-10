<template>
  <v-menu
    ref="menu"
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        label="Created At?"
        prepend-icon="mdi-calendar"
        readonly
        :value="getPickerValue()"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
      range
      scrollable
      :value="getPickerValue()"
      @input="(value) => buildPickerValue(value)"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dateMenu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="handleSave"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'PickADate',
  props: {
    value: {
      default: null,
    },
  },
  data() {
    return {
      type: 'date',
      date: null,
      dateMenu: false,
    }
  },
  methods: {
    handleSave() {
      this.dateMenu = false
    },
    buildPickerValue(value) {
      const [createdFrom, createdTo] = value
      this.$emit('input', {
        value: { createdFrom, createdTo },
        type: this.type,
      })
      return value
    },
    getPickerValue() {
      const date = this.value && this.value[this.type]
      if (!date) return []
      return _.compact(_.values(date))
    },
  },
}
</script>

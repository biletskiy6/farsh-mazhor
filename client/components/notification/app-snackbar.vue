<template>
  <div name="snackbars">
    <v-snackbar v-model="show" :color="color" :timeout="timeout" :top="'top'">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="show = false"> Закрыть </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'AppSnackbar',
  data() {
    return {
      show: false,
      color: '',
      text: '',
      timeout: -1,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/SHOW_MESSAGE') {
        this.text = state.snackbar.text
        this.color = state.snackbar.color
        this.timeout = state.snackbar.timeout
        this.show = true
      }
    })
  },
}
</script>

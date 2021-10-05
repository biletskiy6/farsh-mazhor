<template>
  <div id="app-timer" class="app-timer"></div>
</template>

<script>
export default {
  name: "AppTimer",
  mounted() {
    this.startTime()
  },
  beforeDestroy() {
    this.timer = null
  },
  methods: {
    startTime() {
      const ctx = this
      const $appTime = document.getElementById("app-timer")
      const today = new Date()
      const hours = today.getHours()
      let minutes = today.getMinutes()
      let seconds = today.getSeconds()
      // const ampm = hours >= 12 ? "PM" : "AM"
      // hours = hours % 12
      // hours = hours || 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds
      const strTime = hours + ":" + minutes + ":" + seconds + " "
      $appTime.innerHTML = strTime

      this.timer = setTimeout(function () {
        ctx.startTime()
      }, 500)
      // this.startTime()
    },
    checkTime(time) {
      // return time
      return time < 10 ? "0" + time : time
    },
  },
}
</script>

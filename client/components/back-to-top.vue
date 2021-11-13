<template>
  <div @click="toTop" class="back-to-top progress-wrap" :class="{ 'active-progress': visible }">
    <div class="back-to-top__icon">
      <font-awesome-icon icon="angle-up" />
    </div>
    <svg
      class="progress-circle svg-content"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    const progressPath = document.querySelector(".progress-circle path")
    const pathLength = progressPath.getTotalLength()
    progressPath.style.transition = progressPath.style.WebkitTransition = "none"
    progressPath.style.strokeDasharray = pathLength + " " + pathLength
    progressPath.style.strokeDashoffset = pathLength
    progressPath.getBoundingClientRect()
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear"

    window.addEventListener(
      "scroll",
      this.updateProgress.bind(event, progressPath, pathLength)
    )
  },
  methods: {
    updateProgress(progressPath, pathLength) {
      const scroll = window.pageYOffset
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = pathLength - (scroll * pathLength) / height
      progressPath.style.strokeDashoffset = progress
    },
    toTop() {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: 0,
        },
      })
    },
  },
}
</script>

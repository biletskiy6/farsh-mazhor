<template>
  <a href="tel:+380730262720" class="phone-call">
    <img
      src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png"
      width="50"
      alt="Call Now"
      title="Call Now"
    />
  </a>
</template>

<script>
import gsap from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CSSRulePlugin)
}
export default {
  name: "call-now",
  mounted() {
    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      toggleClass: {
        className: "phone-call--active",
        targets: ".phone-call",
      },
      // onToggle: (self) =>
      //   self.isActive
      //     ? document.body.classList.add("header-pin")
      //     : document.body.classList.remove("header-pin"),
    })
  },
}
</script>

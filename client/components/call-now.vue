<template>
  <a href="tel:0983557306" class="phone-call" :class="{ 'phone-call--active': visible }">
    <img src="/whatsapp.png" width="50" alt="Call Now" title="Call Now" />
  </a>
</template>

<script>
export default {
  name: "call-now",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

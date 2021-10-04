<template>
  <h4 class="h4 text-center pt-1 pb-2">{{ title }}</h4>
</template>

<script>
export default {
  name: 'LayoutTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

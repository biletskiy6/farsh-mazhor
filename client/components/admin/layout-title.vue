<template>
  <h2 class="h2 text-center pt-1 pb-2">{{ title }}</h2>
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

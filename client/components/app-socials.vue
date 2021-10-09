<script>
export default {
  data() {
    return {
      socials: [
        {name: "instagram", href: "https://www.instagram.com/farsh_mazhor_niko/"},
        {
          name: "viber",
          href: "https://invite.viber.com/?g2=AQAUTkv4qGXS60pKkO58WgukVgm9vJYGL%2B2fPa2SuHAEgyc8orlQPpenZX5FPvTn&lang=en"
        }]
      ,
    }
  },
  render() {
    return this.$scopedSlots.default({
      socials: this.socials,
    })
  },
}
</script>

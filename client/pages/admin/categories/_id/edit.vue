<template>
  <div>
    <layout-title title="Edit An Event"></layout-title>
    <categories-form
      v-if="eventLoaded"
      ref="events-form"
      :default-values="event"
      :map-form-fields="mapFormFields"
    ></categories-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import LayoutTitle from "@/components/admin/layout-title"
import CategoriesForm from '@/components/admin/categories-form'
export default {
  name: "EditEvent",
  components: { CategoriesForm, LayoutTitle },
  layout: "admin",
  computed: {
    ...mapGetters({
      event: "events/item",
      loading: "loading/loading",
      eventLoaded: "events/entityLoaded",
    }),
    eventId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    try {
      const id = this.eventId
      await this.fetchEvent({ id })
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      fetchEvent: "events/fetchOne",
    }),
    mapFormFields(formFields, defaultValues) {
      for (const key in formFields) {
        formFields[key] = defaultValues[key]
        formFields.members = defaultValues.members.map((item) => item.id)
      }
    },
  },
}
</script>

<template>
  <div>
    <layout-title title="Редактирование категории"></layout-title>
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
      event: "categories/item",
      loading: "loading/loading",
      eventLoaded: "categories/entityLoaded",
    }),
    eventId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    try {
      const id = this.eventId
      await this.fetchCategory({ id })
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      fetchCategory: "categories/fetchOne",
    }),
    mapFormFields(formFields, defaultValues) {
      for (const key in formFields) {
        if(key === 'cover_image') continue
        formFields[key] = defaultValues[key]
      }
    },
  },
}
</script>

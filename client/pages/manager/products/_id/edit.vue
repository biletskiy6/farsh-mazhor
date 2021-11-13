<template>
  <div>
    <layout-title title="Редактирование продукта"></layout-title>
    <products-form
      v-if="eventLoaded"
      ref="products-form"
      :default-values="product"
      :map-form-fields="mapFormFields"
    ></products-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import LayoutTitle from "@/components/admin/layout-title"
import ProductsForm from '@/components/admin/products-form'
export default {
  name: "EditEvent",
  components: { ProductsForm, LayoutTitle },
  layout: "admin",
  computed: {
    ...mapGetters({
      product: "products/item",
      loading: "loading/loading",
      eventLoaded: "products/entityLoaded",
    }),
    eventId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    try {
      const id = this.eventId
      await this.fetchProduct({ id })
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      fetchProduct: "products/fetchOne",
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

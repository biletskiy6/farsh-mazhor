<template>
  <div>
    <layout-title title="Создание Товара"></layout-title>
    <products-form ref="products-form"></products-form>
  </div>
</template>

<script>
import ProductsForm from "@/components/admin/products-form"
import LayoutTitle from "@/components/admin/layout-title"
export default {
  name: "Create",
  components: { LayoutTitle, ProductsForm },
  layout: "admin",
}
</script>

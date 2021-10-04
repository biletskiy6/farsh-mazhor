<template>
  <div>
    <layout-title title="Create New Event"></layout-title>
    <categories-form ref="categories-form"></categories-form>
  </div>
</template>

<script>
import CategoriesForm from "@/components/admin/categories-form"
import LayoutTitle from "@/components/admin/layout-title"
export default {
  name: "Create",
  components: { LayoutTitle, CategoriesForm },
  layout: "admin",
}
</script>

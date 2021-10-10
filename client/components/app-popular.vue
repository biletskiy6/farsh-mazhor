<template>
  <div class="app-popular-container app-container">
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    <div v-else class="app-popular">
      <h2 class="content-title">Нове та популярне</h2>
      <div class="grid-list">
        <div
          v-for="item in popularProducts"
          :key="item.id"
          class="grid-list__item product-box"
        >
          <img class="product-box-image" :src="productImage(item)" alt="" />
          <div class="product-box-details">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "AppPopular",
  async mounted() {
    try {
      await this.fetchProducts({ params: { type: "popular" } })
    } catch (e) {}
  },
  computed: {
    ...mapGetters({
      popularProducts: "products/data",
      productImage: "products/image",
      loading: "loading/loading",
    }),
  },
  methods: {
    ...mapActions({
      fetchProducts: "products/fetchAll",
    }),
  },
}
</script>

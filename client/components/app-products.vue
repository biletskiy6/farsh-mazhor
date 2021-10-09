<template>
  <section class="app-products">
    <section
      v-for="category in filteredCategories"
      :id="category.slug"
      :key="category.id"
      class="app-category app-section"
    >
      <div
        v-if="category.products && category.products.length"
        class="app-category__content"
      >
        <h2 class="content-title">{{ category.name }}</h2>
        <div class="app-category-products">
          <div
            v-for="product in category.products"
            :key="product.id"
            class="app-category-product product"
            @click="$modal.show('product-content', product)"
          >
            <div class="product-image-container">
              <div class="product-image">
                <img :src="productImage(product)" alt="Product" />
              </div>
              <div class="product-box-details">{{ product.name }}</div>
            </div>
            <div class="product-description">
              <p>
                {{ product.excerpt }}
              </p>
            </div>
            <div class="product-price">
              {{ product.price }} ₴ / <small>1 kg</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import { mapGetters } from "vuex"

export default {
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      productImage: "products/image",
    }),
    filteredCategories() {
      return this.categories.map((category) => {
        return {
          ...category,
          products: category.products.filter((product) =>
            [product.name, product.excerpt].some((predicate) =>
              predicate.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
          ),
        }
      })
    },
  },
}
</script>

<template>
  <div class="app-container">
    <h2 v-if="!loading && resultsEmpty" class="not-found content-title">
      Товарів не знайдено, спробуйте, будь-ласка, ще раз
    </h2>
    <div v-else-if="filteredCategories" v-lazy-container="{ selector: 'img' }" class="app-products distort">
      <section
        v-for="category in filteredCategories"
        :id="category.slug"
        :key="category.id"
        class="app-category"
      >
        <div
          v-if="category.products && category.products.length"
          class="app-category__content"
        >
          <h2 class="content-title">{{ renderName(category.name) }}</h2>
          <div class="app-category-products">
            <div
              v-for="product in category.products"
              :key="product.id"
              class="app-category-product product"
              @click="$modal.show('product-content', product)"
            >
              <div class="product-image-container">
                <div class="product-image">
                  <img :data-src="productImage(product)" alt="Product" />
                </div>
              </div>
              <h3 class="product-title">
                {{ renderName(product.name) }}
              </h3>
              <div class="product-description">
                <p>
                  {{ product.excerpt }}
                </p>
              </div>
              <div class="product-price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import gsap from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CSSRulePlugin)
}
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
      loading: "loading/loading",
    }),
    resultsEmpty() {
      return (
        _.flattenDeep(
          this.filteredCategories.map((category) => category.products)
        ).length === 0
      )
    },
    filteredCategories() {
      return this.categories.map((category) => {
        return {
          ...category,
          products: category.products.filter((product) =>
            [product.name, product.excerpt, category.name].some((predicate) => {
              if (!predicate) return false
              return predicate
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            })
          ),
        }
      })
    },
  },
  methods: {
    renderName(name) {
      return name && name.split(",")[0]
    },
  },
  watch: {
    searchQuery: _.debounce(function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: document.querySelector(".app-products"),
          offsetY: 100,
        },
      })
    }, 300),
  },
}
</script>

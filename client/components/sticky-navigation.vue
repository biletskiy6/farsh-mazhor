<template>
  <client-only>
    <with-dimensions>
      <scrollactive
        ref="sticky-navigation"
        class="sticky-navigation"
        active-class="active"
        :offset="width <= 576 ? 130 : 180"
        :class="{ 'active': visible }"
        @itemchanged="onScrollItemChanged"
        slot-scope="{ width }"
      >
        <ul>
          <li>
            <div id="custom-search">
              <input
                type="text"
                name="search"
                class="search-query"
                placeholder="Знайти що?"
                :value="value"
                :class="{ focusable }"
                @focusin="focusable = true"
                @input="$emit('input', $event.target.value)"
              />
              <button class="custom-search__close" @click="handleResetSearch">
                <font-awesome-icon :icon="['fas', 'times']" />
              </button>
            </div>
          </li>
          <li v-for="category in categoriesWithProducts" :key="category.id">
            <a class="scrollactive-item" :href="`#${category.slug}`">
              <h6>{{ renderName(category.name) }}</h6>
            </a>
          </li>
        </ul>
      </scrollactive>
    </with-dimensions>
  </client-only>
</template>

<script>
import { mapGetters } from "vuex"
import WithDimensions from "./with-dimensions.vue"

export default {
  components: { WithDimensions },
  props: {
    value: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  componentns: {
    WithDimensions,
  },
  data() {
    return {
      focusable: false,
      lastScrollTop: 0,
    }
  },
  computed: {
    ...mapGetters({
      categoryImage: "categories/image",
    }),
    categoriesWithProducts() {
      const categories = []
      this.categories.forEach((category) => {
        if (category.products && category.products.length) {
          categories.push(category)
        }
      })
      return categories
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleResetSearch() {
      this.focusable = false
      this.$emit("resetSearch")
    },
    renderName(name) {
      return name && name.split(",")[0]
    },
    handleCategoryClick(categoryName) {
      // gsap.to(window, {
      //   duration: 1,
      //   scrollTo: {
      //     y: `#${categoryName}`,
      //     offsetY: 100,
      //   },
      // })
    },
    isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    onScrollItemChanged(event, currentItem, lastActiveItem) {
      if (this.focusable) return
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (currentItem && !this.isInViewport(currentItem)) {
        const scrollByX =
          st > this.lastScrollTop
            ? currentItem.offsetLeft
            : (lastActiveItem.offsetWidth + 40) * -1
        document.querySelector(".sticky-navigation").scrollBy(scrollByX, 0)
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    },
  },
}
</script>

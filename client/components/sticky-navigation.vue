<template>
  <nav class="sticky-navigation" :class="{ active: visible }">
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
      <li v-for="category in categories" :key="category.id">
        <a
          v-if="category.products && category.products.length"
          :href="`#${category.slug}`"
          @click.prevent="handleCategoryClick(category.slug)"
        >
          <img :src="categoryImage(category)" alt="" />
          <h6>{{ category.name }}</h6>
        </a>
      </li>
    </ul>
  </nav>
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
    value: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      focusable: false,
    }
  },
  computed: {
    ...mapGetters({
      categoryImage: "categories/image",
    }),
  },
  mounted() {
    try {
      this.links = document.querySelectorAll(".sticky-navigation a")
      this.sections = document.querySelectorAll("section[id]")
      window.addEventListener("scroll", this.handleScroll)
    } catch (e) {
      console.error(e)
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener(
      "scroll",
      this.changeLinkState.bind(event, this.links, this.sections)
    )
  },
  methods: {
    handleResetSearch() {
      this.focusable = false
      this.$emit("resetSearch")
    },
    handleScroll(e) {
      const $appHeader = document.querySelector(".main-header")
      const appHeaderHeight = $appHeader.clientHeight
      window.scrollY > appHeaderHeight
        ? (this.visible = true)
        : (this.visible = false)
      this.changeLinkState()
    },
    handleCategoryClick(categoryName) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: `#${categoryName}`,
          offsetY: 100,
        },
      })
    },
    changeLinkState() {
      const scrollY = window.pageYOffset
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((current) => {
        /* eslint-disable */
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop
        const sectionId = current.getAttribute("id")
        const linkToHighlight = document.querySelector(`a[href*=${sectionId}`)
        const isSectionInViewport =
          scrollY > sectionTop - 150 &&
          scrollY <= sectionTop + sectionHeight - 150
        if (!linkToHighlight) return
        isSectionInViewport
          ? linkToHighlight.classList.add("active")
          : linkToHighlight.classList.remove("active")
      })
    },
  },
}
</script>

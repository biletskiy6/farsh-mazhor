<template>
  <section class="app-categories">
    <div class="app-container">
      <div class="app-left">
        <div class="app-header">
          <button class="action-button active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-shopping-bag"
            >
              <defs />
              <path
                d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
              />
            </svg>
          </button>
        </div>
        <div class="app-left-content">
          <div class="app-left-content-header">
            <h1 class="content-title">Нове та популярне<span></span></h1>
            <a v-if="false" href="#" class="content-link">See More</a>
          </div>
          <div class="categories"></div>
          <div class="app-content-field">
            <a
              v-if="getItem(0)"
              :href="'#' + getItem(0).slug"
              class="product-box medium js-scroll-to"
            >
              <img
                class="product-box-image"
                :src="entityImage(getItem(0).cover_image)"
                alt="Product"
              />
              <div class="product-box-details">
                {{ getItem(0).name }} <span>55</span>
              </div>
            </a>
            <div class="product-boxes">
              <div class="product-box-wrapper three">
                <div id="tables" class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://i.insider.com/60ff19210d35a90018253dc5?width=700"
                    alt="Product"
                  />
                  <div class="product-box-details">Tables <span>55</span></div>
                </div>
                <div id="lamps" class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://static01.nyt.com/images/2019/10/06/well/meat1/meat1-superJumbo.jpg"
                    alt="Product"
                  />
                  <div class="product-box-details">Lamps <span>45</span></div>
                </div>
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://www.heartfoundation.org.nz/images/nutrition/page-heros/is-meat-good-for-you.png"
                    alt="Product"
                  />
                  <div class="product-box-details">Shelves <span>25</span></div>
                </div>
              </div>
              <div class="product-box-wrapper two">
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://static01.nyt.com/images/2019/10/06/well/meat1/meat1-superJumbo.jpg"
                    alt="Product"
                  />
                  <div class="product-box-details">Sofa <span>55</span></div>
                </div>
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://i.insider.com/60ff19210d35a90018253dc5?width=700"
                    alt="Product"
                  />
                  <div class="product-box-details">
                    Kitchen <span>105</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="app-content-field second">
            <div class="product-box-wrapper three">
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://static01.nyt.com/images/2019/10/06/well/meat1/meat1-superJumbo.jpg"
                  alt="Product"
                />
                <div class="product-box-details">Mirrors <span>35</span></div>
              </div>
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://static01.nyt.com/images/2019/10/06/well/meat1/meat1-superJumbo.jpg"
                  alt="Product"
                />
                <div class="product-box-details">Plants <span>25</span></div>
              </div>
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://i.insider.com/60ff19210d35a90018253dc5?width=700"
                  alt="Product"
                />
                <div class="product-box-details">Bathroom <span>25</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      entityImage: "categories/image",
    }),
    firstRowItems() {
      return this.items.slice(0, 6)
    },
    secondRowItems() {
      return this.items.slice(6)
    },
  },
  mounted() {
    this.scrollToSection()
  },
  methods: {
    getItem(index) {
      return this.firstRowItems[index] ?? null
    },
    scrollToSection() {
      console.log(gsap.utils.toArray(".js-scroll-to"))
      gsap.utils.toArray(".js-scroll-to").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault()
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: this.getAttribute("href"),
              offsetY: 100,
            },
          })
        })
      })
    },
  },
}
</script>

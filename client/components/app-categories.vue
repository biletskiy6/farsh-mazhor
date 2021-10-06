<template>
  <section class="app-categories">
    <div class="app-container">
      <div class="app-left">
        <div class="app-header">
          <div class="app-filter-wrapper">
            <button class="filter-dropdown-button">
              <span>All Categories</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <input
              class="filter-search-input"
              type="text"
              placeholder="Search..."
            />
          </div>
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
          {{ getItem(10) }}
          <div class="app-left-content-header">
            <h1 class="content-title">Асортимент <span></span></h1>
            <a v-if="false" href="#" class="content-link">See More</a>
          </div>
          <div class="categories"></div>
          <div class="app-content-field">
            <a v-if="getItem(0)" :href=" '#' + getItem(0).slug" class="product-box medium js-scroll-to">
              <img
                class="product-box-image"
                :src="getProductImage(getItem(0).cover_image)"
                alt="Product"
              />
              <div class="product-box-details">{{ getItem(0).name }} <span>55</span></div>
            </a>
            <div class="product-boxes">
              <div class="product-box-wrapper three">
                <div id="tables" class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://images.unsplash.com/photo-1510877073473-6d4545e9c2af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                    alt="Product"
                  />
                  <div class="product-box-details">Tables <span>55</span></div>
                </div>
                <div id="lamps" class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1234&q=80"
                    alt="Product"
                  />
                  <div class="product-box-details">Lamps <span>45</span></div>
                </div>
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://images.unsplash.com/photo-1526827826797-7b05204a22ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                    alt="Product"
                  />
                  <div class="product-box-details">Shelves <span>25</span></div>
                </div>
              </div>
              <div class="product-box-wrapper two">
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://images.unsplash.com/photo-1519961655809-34fa156820ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1234&q=80"
                    alt="Product"
                  />
                  <div class="product-box-details">Sofa <span>55</span></div>
                </div>
                <div class="product-box medium">
                  <img
                    class="product-box-image"
                    src="https://images.unsplash.com/photo-1556910585-09baa3a3998e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80"
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
                  src="https://images.unsplash.com/photo-1502920924215-5646fe685bef?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                  alt="Product"
                />
                <div class="product-box-details">Mirrors <span>35</span></div>
              </div>
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1233&q=80"
                  alt="Product"
                />
                <div class="product-box-details">Plants <span>25</span></div>
              </div>
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1234&q=80"
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
import gsap from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { getProductImage } from '../utils/get-product-image'
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CSSRulePlugin)
}
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    firstRowItems() {
      return this.items.slice(0, 6)
    },
    secondRowItems() {
      return this.items.slice(6)
    }
  },
  mounted() {
    this.scrollToSection()
  },
  methods: {
    getProductImage,
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

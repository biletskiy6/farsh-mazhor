<template>
  <div class="home-page">
    <sticky-navigation
      v-model="searchQuery"
      :categories="categories"
      @resetSearch="handleResetSearch"
      :visible="showStickyNavigation"
    ></sticky-navigation>
    <back-to-top :visible="showNavigationComponents"></back-to-top>
    <call-now :visible="showNavigationComponents"></call-now>
    <app-modal name="product-content">
      <template slot="body" slot-scope="{ params }">
        <div class="modal-description">
          <h2>{{ renderName(params.name) }}</h2>
          <div class="modal-text" v-html="params.description"></div>
        </div>
        <div class="modal-image">
          <img :src="productImage(params)" alt="" />
        </div>
      </template>
    </app-modal>
    <header class="main-header">
      <div class="strips">
        <div class="s-one"></div>
        <div class="s-two"></div>
        <div class="s-three"></div>
        <div class="s-four"></div>
      </div>
      <div class="top-bar">
        <app-logo></app-logo>
        <a class="phone link link--accent" href="tel:0983557306"
          >098-355-73-06</a
        >
      </div>

      <!-- <app-timer></app-timer> -->
      <!-- <div class="menu-btn">
              <span class="one"></span>
              <span class="two"></span>
            </div> -->

      <div class="data">
        <div class="contact">
          <a
            @click.prevent="handleContactsClick"
            href="#contacts"
            class="link link--accent"
            >Контакти</a
          >
        </div>

        <div class="tag">
          <span
            >Свіже м'ясо <br />
            домашнього виробництва</span
          >
        </div>

        <div class="year">{{ new Date().getFullYear() }}</div>
      </div>

      <!-- <div class="header-image header-image-1">
        <img
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/the-farmers-dilemma-do-meat-reduction-policies-really-hurt-meat-industry-workers/12695417-1-eng-GB/The-farmers-dilemma-Do-meat-reduction-policies-really-hurt-meat-industry-workers_wrbm_large.jpg"
          alt=""
        />
      </div>
      <div class="header-image header-image-2">
        <img
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/the-farmers-dilemma-do-meat-reduction-policies-really-hurt-meat-industry-workers/12695417-1-eng-GB/The-farmers-dilemma-Do-meat-reduction-policies-really-hurt-meat-industry-workers_wrbm_large.jpg"
          alt=""
        />
      </div>
      <div class="header-image header-image-3">
        <img
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/the-farmers-dilemma-do-meat-reduction-policies-really-hurt-meat-industry-workers/12695417-1-eng-GB/The-farmers-dilemma-Do-meat-reduction-policies-really-hurt-meat-industry-workers_wrbm_large.jpg"
          alt=""
        />
      </div> -->
      <div class="main-header-image">
        <img src="/home-preview.jpg" alt="" />
        <div class="title">
          <span>farsh<br />mazhor</span>
        </div>
        <!-- <div class="tag-line">
          <span>Оглянути наші товари</span>
        </div> -->
      </div>

      <div class="line"></div>

      <div class="eco">
        <img src="/eco.png" alt="" />
        <span>ECO</span>
      </div>

      <div class="media">
        <app-socials>
          <ul slot-scope="{ socials }">
            <li v-for="social in socials" :key="social.name">
              <a :href="social.href" target="_blank">
                <font-awesome-icon :icon="['fab', social.name]" />
              </a>
            </li>
          </ul>
        </app-socials>
      </div>

      <scroll-down></scroll-down>
    </header>
    <app-popular></app-popular>
    <app-products
      :search-query="searchQuery"
      :categories="categories"
    ></app-products>
    <app-contacts></app-contacts>
    <app-footer></app-footer>
  </div>
</template>
<script>
import gsap from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { mapActions, mapGetters } from "vuex"
// import AppTimer from "~/components/app-timer"
import AppProducts from "~/components/app-products"
import BackToTop from "~/components/back-to-top"
import ScrollDown from "~/components/scroll-down"
import CallNow from "~/components/call-now"
import AppModal from "~/components/modals/app-modal"
import StickyNavigation from "~/components/sticky-navigation"
import AppFooter from "~/components/app-footer"
import AppLogo from "~/components/app-logo"
import AppContacts from "~/components/app-contacts.vue"
import AppSocials from "~/components/app-socials.vue"
import AppPopular from "@/components/app-popular"

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CSSRulePlugin)
}
export default {
  components: {
    AppPopular,
    ScrollDown,
    BackToTop,
    AppModal,
    CallNow,
    AppProducts,
    AppSocials,
    // AppTimer,
    StickyNavigation,
    AppContacts,
    AppFooter,
    AppLogo,
  },
  data() {
    return {
      searchQuery: "",
      showNavigationComponents: false,
      showStickyNavigation: false
    }
  },
  computed: {
    ...mapGetters({
      productImage: "products/image",
      categories: "categories/data",
    }),
  },
  async mounted() {
    try {
      window.addEventListener('scroll', this.handleScroll)
      await this.fetchCategories()
    } catch (e) {}
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchAll",
    }),
    handleResetSearch() {
      this.searchQuery = ""
    },
    distortContent() {
      const distortContent = document.querySelector(".distort")
      let currentPos = window.pageYOffset
      const callDistort = function () {
        const newPos = window.pageYOffset
        const diff = newPos - currentPos
        const speed = diff * 0.05
        distortContent.style.transform = `skewY(${speed}deg)`
        currentPos = newPos
        requestAnimationFrame(callDistort)
      }
      callDistort()
    },
    handleScroll() {
      const documentHeight = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;


      if(currentScroll >= documentHeight) {
        this.showNavigationComponents = false
      } else if(window.scrollY > 300) {
        this.showNavigationComponents = true
        this.showStickyNavigation = true
      } else {
        this.showNavigationComponents = false
        this.showStickyNavigation = false
      }
    },
    handleContactsClick() {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#contacts",
          offsetY: 100,
        },
      })
    },
    renderName(name) {
      return name && name.split(",")[0]
    },
  },
}
</script>

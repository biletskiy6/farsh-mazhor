<template>
  <div class="home-page">
    <sticky-navigation
      v-model="searchQuery"
      :categories="categories"
    ></sticky-navigation>
    <call-now></call-now>
    <app-modal name="product-content">
      <template slot="body" slot-scope="{ params }">
        <div class="modal-description">
          <h2>{{ params.name }}</h2>
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
        <a class="phone" href="tel:0983557306">098-355-73-06</a>
      </div>

      <!-- <app-timer></app-timer> -->
      <!-- <div class="menu-btn">
              <span class="one"></span>
              <span class="two"></span>
            </div> -->

      <div class="data">
        <div class="contact">
          <span>Контакти</span>
        </div>

        <div class="tag">
          <span
            >Свіже м'ясо <br />
            домашнього виробництва</span
          >
        </div>

        <div class="year">{{ new Date().getFullYear() }}</div>

        <div class="arrow-left">
          <i class="fa fa-arrow-left"></i>
        </div>

        <div class="arrow-right">
          <i class="fa fa-arrow-right"></i>
        </div>

        <div class="add">
          <i class="fa fa-plus"></i>
        </div>
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
        <img
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/the-farmers-dilemma-do-meat-reduction-policies-really-hurt-meat-industry-workers/12695417-1-eng-GB/The-farmers-dilemma-Do-meat-reduction-policies-really-hurt-meat-industry-workers_wrbm_large.jpg"
          alt=""
        />
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

      <button class="scroll-down">
        <svg
          id="Layer_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 79.37 122.88"
          style="enable-background: new 0 0 79.37 122.88"
          xml:space="preserve"
        >
          <g>
            <path
              d="M50.2,121.63c6.71-1.85,12.72-5.44,17.51-10.23c7.19-7.19,11.65-17.11,11.65-28.03V39.68c0-10.92-4.46-20.84-11.65-28.03 C60.52,4.46,50.6,0,39.68,0C28.77,0,18.84,4.46,11.65,11.65C4.46,18.84,0,28.77,0,39.68v43.68c0,10.92,4.46,20.84,11.65,28.03 c5.59,5.59,12.82,9.53,20.89,11.01C37.42,123.3,45.7,122.87,50.2,121.63L50.2,121.63L50.2,121.63z M39.23,92.06 c4.15,0,7.55-3.4,7.55-7.55v-7.78c0-4.15-3.4-7.55-7.55-7.55c-4.15,0-7.55,3.4-7.55,7.55v7.78C31.68,88.66,35.07,92.06,39.23,92.06 L39.23,92.06z M61.08,104.77c-5.49,5.49-13.07,8.91-21.4,8.91c-8.33,0-15.9-3.41-21.4-8.91c-5.49-5.49-8.91-13.07-8.91-21.4V39.68 c0-8.33,3.41-15.9,8.91-21.4c5.49-5.49,13.07-8.91,21.4-8.91c8.33,0,15.9,3.41,21.4,8.91c5.49,5.49,8.91,13.07,8.91,21.4v43.68 C69.99,91.7,66.58,99.27,61.08,104.77L61.08,104.77L61.08,104.77z"
            />
          </g>
        </svg>
      </button>
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
import { mapActions, mapGetters } from "vuex"
// import AppTimer from "~/components/app-timer"
import AppProducts from "~/components/app-products"
import CallNow from "~/components/call-now"
import AppModal from "~/components/modals/app-modal"
import StickyNavigation from "~/components/sticky-navigation"
import AppFooter from "~/components/app-footer"
import AppLogo from "~/components/app-logo"
import AppContacts from "~/components/app-contacts.vue"
import AppSocials from "~/components/app-socials.vue"
import AppPopular from "@/components/app-popular"

export default {
  components: {
    AppPopular,
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
      await this.fetchCategories()
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchAll",
    }),
  },
}
</script>

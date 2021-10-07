<template>
  <div class="home-page">
    <sticky-navigation></sticky-navigation>
    <call-now></call-now>
    <app-modal name="product-content">
      <template slot="body">
        <div class="modal-description">
          <h2>Вареники з капустою</h2>
          <div class="modal-text">
            <p v-for="item in 10" :key="item">
              Одна з трьох традиційних начинок для вареників! Приємну кислинку
              капусти пом’якшує смак тоненького тіста — неперевершена смакота!
              Не усім сподобається ця вегетаріанська та пісна страва. Тільки ті,
              хто виплекав у собі любов до оливок та броколі, оцінить всю розкіш
              цього смаку. Спробуйте підсмажити зварені вареники з капустою на
              вершковому маслі до утворення хрусткої скоринки. Також дуже смачно
              буде заправити їх домашньою сметаною. Насолоджуйтесь!
            </p>
          </div>
        </div>
        <div class="modal-image">
          <img
            src="https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg"
            alt=""
          />
        </div>
      </template>
    </app-modal>
    <header class="main-header">
      <div class="strips">
        <div class="s-one"></div>
        <div class="s-two"></div>
        <div class="s-three"></div>
      </div>

      <div class="top-bar">
        <ul>
          <li>
            <div class="logo">
              <span>farsh mazhor</span>
            </div>
          </li>

          <li>
            <div class="search">
              <i class="fa fa-search"></i>
            </div>
          </li>

          <li>
            <app-timer></app-timer>
            <!-- <div class="menu-btn">
              <span class="one"></span>
              <span class="two"></span>
            </div> -->
          </li>
        </ul>
      </div>

      <div class="data">
        <div class="contact">
          <span>Контакти</span>
        </div>

        <div class="tag">
          <span
            >Свіже мясо <br />
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
      <div class="main-header-image">
        <img src="/hero.jpg" alt="" />
        <div class="title">
          <span>farsh<br />mazhor</span>
        </div>
        <div class="tag-line">
          <span>Оглянути наші товари</span>
        </div>
      </div>

      <div class="line"></div>

      <div class="e-shop">
        <img src="/eco.png" alt="" />
        <span>ECO</span>
      </div>

      <div class="media">
        <ul>
          <li><font-awesome-icon :icon="['fab', 'facebook']" /></li>
          <li><font-awesome-icon :icon="['fab', 'instagram']" /></li>
          <li><font-awesome-icon :icon="['fab', 'twitter']" /></li>
          <li><font-awesome-icon :icon="['fab', 'viber']" /></li>
        </ul>
      </div>
    </header>
    <app-categories :items="categories"></app-categories>
    <app-products></app-products>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import AppTimer from "~/components/app-timer"
import AppCategories from "~/components/app-categories"
import AppProducts from "~/components/app-products"
import CallNow from "~/components/call-now"
import AppModal from "~/components/modals/app-modal"
import StickyNavigation from "~/components/sticky-navigation"

export default {
  components: {
    AppModal,
    CallNow,
    AppCategories,
    AppProducts,
    AppTimer,
    StickyNavigation,
  },
  computed: {
    ...mapGetters({
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

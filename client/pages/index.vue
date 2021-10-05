<template>
  <div class="home-page">
    <call-now></call-now>
    <app-modal name="product-content">
      <template slot="body" slot-scope="{ params }">
        {{ params }}
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
    <app-categories></app-categories>
    <app-products></app-products>
  </div>
</template>
<script>
import AppTimer from "~/components/app-timer"
import AppCategories from "~/components/app-categories"
import AppProducts from "~/components/app-products"
import CallNow from "~/components/call-now"
import AppModal from "~/components/modals/app-modal"
export default {
  components: { AppModal, CallNow, AppCategories, AppProducts, AppTimer },
}
</script>

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
              <span>regel black</span>
            </div>
          </li>

          <li>
            <div class="search">
              <i class="fa fa-search"></i>
            </div>
          </li>

          <li>
            <div class="menu-btn">
              <span class="one"></span>
              <span class="two"></span>
            </div>
          </li>
        </ul>
      </div>

      <div class="data">
        <div class="contact">
          <span>Contact</span>
        </div>

        <div class="tag">
          <span
            >You're not lucky, <br />
            You worth it</span
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
          <span>regel<br />black</span>
        </div>
        <div class="tag-line">
          <span>Discover products</span>
        </div>
      </div>

      <div class="line"></div>

      <div class="e-shop">
        <span>E-shop</span>
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
            <div class="app-left-content-header">
              <h1 class="content-title">Discover <span>the best</span></h1>
              <a v-if="false" href="#" class="content-link">See More</a>
            </div>
            <div class="app-content-field">
              <div class="product-box medium">
                <img
                  class="product-box-image"
                  src="https://images.unsplash.com/photo-1531471689044-dd3ca86632e1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                  alt="Product"
                />
                <div class="product-box-details">
                  Decoration <span>55</span>
                </div>
              </div>
              <div class="product-boxes">
                <div class="product-box-wrapper three">
                  <div class="product-box medium">
                    <img
                      class="product-box-image"
                      src="https://images.unsplash.com/photo-1510877073473-6d4545e9c2af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                      alt="Product"
                    />
                    <div class="product-box-details">
                      Tables <span>55</span>
                    </div>
                  </div>
                  <div class="product-box medium">
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
                    <div class="product-box-details">
                      Shelves <span>25</span>
                    </div>
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
                  <div class="product-box-details">
                    Bathroom <span>25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-for="item in 4" :key="item" class="app-category app-section">
      <div class="v-container">
        <div class="app-category__content">
          <h2 class="content-title">Category Name</h2>
          <div class="app-category-products">
            <div @click="$modal.show('product-content', { name: '123', price: 'test' })" v-for="item in 10" :key="item" class="app-category-product product">
              <div class="product-image-container">
                <div class="product-image">
                  <img
                    src="https://images.unsplash.com/photo-1531471689044-dd3ca86632e1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                    alt="Product"
                  />
                </div>
                <div class="product-box-details">Test</div>
              </div>
              <div class="product-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, laborum.</p>
              </div>
              <div class="product-price">
                12.80 ₴ / <small>100g</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import CallNow from "../components/call-now"
import AppModal from "../components/modals/app-modal"
export default {
  components: { AppModal, CallNow },
}
</script>

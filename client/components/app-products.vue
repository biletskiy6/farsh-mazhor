<template>
  <section class="app-products">
    <section id="vareniki" class="app-category app-section">
      <div class="v-container">
        <div class="app-category__content">
          <h2 class="content-title">Вареники {{ searchQuery }}</h2>
          <div class="app-category-products">
            <div
              v-for="item in products"
              :key="item"
              class="app-category-product product"
              @click="
                $modal.show('product-content', { name: '123', price: 'test' })
              "
            >
              <div class="product-image-container">
                <div class="product-image">
                  <img
                    src="https://static.1000.menu/img/content/24714/vareniki-s-myasom-i-kapustoi_1514555681_1_max.jpg"
                    alt="Product"
                  />
                </div>
                <div class="product-box-details">Вареники с капустой</div>
              </div>
              <div class="product-description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
                  laborum.
                </p>
              </div>
              <div class="product-price">12.80 ₴ / <small>100g</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="svinina" class="app-category app-section">
      <div class="v-container">
        <div class="app-category__content">
          <h2 class="content-title">Свинина</h2>
          <div class="app-category-products">
            <div
              v-for="item in 4"
              :key="item"
              class="app-category-product product"
              @click="
                $modal.show('product-content', { name: '123', price: 'test' })
              "
            >
              <div class="product-image-container">
                <div class="product-image">
                  <img
                    src="https://static.1000.menu/img/content/24714/vareniki-s-myasom-i-kapustoi_1514555681_1_max.jpg"
                    alt="Product"
                  />
                </div>
                <div class="product-box-details">Вареники с капустой</div>
              </div>
              <div class="product-description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
                  laborum.
                </p>
              </div>
              <div class="product-price">12.80 ₴ / <small>100g</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Вареники с капустой', description: 'описание', category: { name: 'Вареники', slug: 'varekiki' } },
        { id: 2, name: 'Вареники с картошкой', description: 'описание картошка', category: { name: 'Вареники', slug: 'vareniki' } },
        { id: 3, name: 'Голубцы', description: 'описание голобцов', category: { name: 'Голубцы', slug: 'holubzi' } },
      ]
    }
  },
}
</script>

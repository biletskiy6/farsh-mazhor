<template>
  <section class="app-products">
    <div v-for="item in 4" :key="item" class="app-category app-section">
      <div class="v-container">
        <div class="app-category__content">
          <h2 class="content-title">Вареники</h2>
          <div class="app-category-products">
            <div
              @click="
                $modal.show('product-content', { name: '123', price: 'test' })
              "
              v-for="item in 10"
              :key="item"
              class="app-category-product product"
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
    </div>
  </section>
</template>

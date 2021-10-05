<template>
  <section class="app-products">
    <div v-for="item in 4" :key="item" class="app-category app-section">
      <div class="v-container">
        <div class="app-category__content">
          <h2 class="content-title">Category Name</h2>
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
                    src="https://images.unsplash.com/photo-1531471689044-dd3ca86632e1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                    alt="Product"
                  />
                </div>
                <div class="product-box-details">Test</div>
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

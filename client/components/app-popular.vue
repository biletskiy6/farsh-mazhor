<template>
  <div class="app-popular">
    <div class="app-container">
      <div class="grid-list">
        <div v-for="item in 10" :key="item" class="grid-list__item product-box">
          <img  class="product-box-image" src="https://www.gastronom.ru/binfiles/images/20200221/b6e8a0c1.jpg" alt="" />
          <div class="product-box-details">
            Еуіе
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AppPopular",
}
</script>

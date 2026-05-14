<template>
  <RouterLink :to="`/product/${product.id}`" class="product">
    <div class="product-image" :style="imageStyle">
      <AppLoader v-if="loading" class="tile-loader" />
    </div>
    <div class="product-name">{{ product.name }}</div>
    <div class="product-price">{{ product.price }} PLN</div>
    <AppRating :rate="product.rate" :rates-number="product.ratesNumber" />
  </RouterLink>
</template>

<script>
import AppRating from './AppRating.vue';
import AppLoader from './AppLoader.vue';

export default {
  props: ['product'],
  data() {
    return {
      loading: true,
      imageLoaded: false,
    };
  },
  computed: {
    imageUrl() {
      return `/src/assets/${this.product.image}`;
    },
    imageStyle() {
      return this.imageLoaded
        ? {
            backgroundImage: `url(${this.imageUrl})`,
          }
        : {};
    },
  },
  mounted() {
    const img = new Image();
    img.onload = () => {
      this.loading = false;
      this.imageLoaded = true;
    };
    img.onerror = () => {
      this.loading = false;
      this.imageLoaded = true;
    };
    img.src = this.imageUrl;
  },
  components: {
    AppRating,
    AppLoader,
  },
};
</script>

<style scoped>
.product {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  min-height: 290px;
}

.product-image {
  position: relative;
  height: 160px;
  border-radius: 0.4rem;
  background-color: #f3f4f6;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.tile-loader {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 2;
}

.product-name {
  font-weight: 600;
}

.product-price {
  color: #111827;
}
</style>

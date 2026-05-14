<template>
  <RouterLink :to="`/product/${product.id}`" class="product">
    <img :src="'/src/assets/' + product.image" :alt="product.name" />
    <div>{{ product.name }}</div>
    <div>{{ product.price }} PLN</div>
    <AppRating :count="product.rate" />
  </RouterLink>
</template>

<script>
import AppRating from './AppRating.vue';

export default {
  props: ['product'],
  components: {
    AppRating,
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
}

img {
  width: 100%;
  max-width: 220px;
}
</style>

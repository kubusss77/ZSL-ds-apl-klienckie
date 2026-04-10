<template>
  <RouterLink :to="`/product/${product.id}`" class="product">
    <img :src="'/src/assets/' + product.image" />
    <div>{{ product.name }}</div>
    <div>{{ product.price }}</div>
    <div class="stars-background">
      <div class="stars-container">
        <div class="star"></div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: ['product'],
};
</script>

<style scoped>
.star {
  background: url('/src/assets/star.svg');
}
</style>

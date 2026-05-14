<template>
  <section class="search-view">
    <h1>Products</h1>

    <p v-if="productsError" class="error">{{ productsError }}</p>

    <div v-if="productsLoading" class="list-loader">
      <AppLoader />
    </div>

    <div v-else class="products-grid">
      <ProductTile v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';
import AppLoader from '@/components/AppLoader.vue';

export default {
  components: {
    ProductTile,
    AppLoader,
  },
  created() {
    this.$store.dispatch('FETCH_PRODUCTS');
  },
  computed: {
    products() {
      return this.$store.getters.GET_PRODUCTS_LIST;
    },
    productsLoading() {
      return this.$store.getters.GET_PRODUCTS_LOADING;
    },
    productsError() {
      return this.$store.getters.GET_PRODUCTS_ERROR;
    },
  },
};
</script>

<style scoped>
.search-view {
  max-width: 1120px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.list-loader {
  min-height: 200px;
  display: grid;
  place-items: center;
}

.error {
  color: #b91c1c;
  margin-bottom: 1rem;
}
</style>

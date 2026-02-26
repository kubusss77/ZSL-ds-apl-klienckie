<template>
  <h1>01 Vuex: Getters</h1>
  <div v-for="product in products">
    {{ product.title }}
    {{ product.price }}
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.GET_PRODUCTS;
    },
  },
};
</script>

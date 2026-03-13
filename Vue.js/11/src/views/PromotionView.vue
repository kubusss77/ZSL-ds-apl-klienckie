<template>
  <ProductTile v-for="product in promotionObject.items" :key="product" :product="product" />
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';

export default {
  created() {
    this.$store.dispatch('FETCH_PROMOTION', this.$route.params.id);
  },

  computed: {
    promotionObject() {
      const object = this.$store.getters.GET_PROMOTION_OBJECT;
      console.log('object', object.items);
      return object;
    },
  },

  components: {
    ProductTile,
  },
};
</script>

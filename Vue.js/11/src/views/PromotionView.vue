<template>
  <div class="banner" :style="imageStyle">
    <h1>{{ promotionObject.header }}</h1>
    <p>{{ promotionObject.description }}</p>
  </div>
  <div id="promotion-content">
    <div class="products-cont">
      <p>{{ promotionObject.longDescription }}</p>
      <div class="products-grid">
        <ProductTile v-for="product in promotionObject.items || []" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
  <p v-if="promotionError" class="error">{{ promotionError }}</p>
  <div id="loader">
    <AppLoader v-show="promotionLoading" />
  </div>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';
import AppLoader from '@/components/AppLoader.vue';

export default {
  created() {
    this.$store.dispatch('FETCH_PROMOTION', this.$route.params.id);
  },

  computed: {
    promotionObject() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    },

    promotionLoading() {
      return this.$store.getters.GET_PROMOTION_LOADING;
    },

    promotionError() {
      return this.$store.getters.GET_PROMOTION_ERROR;
    },

    imageStyle() {
      if (!this.promotionObject.image) {
        return {};
      }

      return {
        backgroundImage: `url(/src/assets/${this.promotionObject.image})`,
      };
    },
  },

  components: {
    ProductTile,
    AppLoader,
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.products-cont {
  max-width: 960px;
  margin-inline: auto;
  padding: 2rem;

  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.error {
  color: #b91c1c;
  max-width: 960px;
  margin: 0 auto 1rem;
  padding-inline: 2rem;
}
</style>

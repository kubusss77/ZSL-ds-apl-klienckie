<template>
  <div class="promotions-grid">
    <RouterLink
      v-for="promotion in promotionsList"
      :key="promotion.id"
      :to="`/promotion/${promotion.id}`"
      class="promotion-link"
    >
      <PromotionTile :promotion="promotion" class="promotion" />
    </RouterLink>
  </div>
  <p v-if="promotionsError" class="error">{{ promotionsError }}</p>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';

export default {
  mounted() {
    this.$store.dispatch('FETCH_PROMOTIONS');
  },

  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    },
    promotionsError() {
      return this.$store.getters.GET_PROMOTIONS_ERROR;
    },
  },
  components: {
    PromotionTile,
  },
};
</script>

<style>
.promotions-grid {
  padding: 1rem;
}
.promotion-link {
  text-decoration: none;
  color: black;
  padding: 1rem;
}

.error {
  color: #b91c1c;
  margin: 1rem;
}
</style>

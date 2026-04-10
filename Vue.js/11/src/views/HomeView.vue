<template>
  <a v-for="promotion in promotionsList" :href="'/promotion/' + promotion.id"
    ><PromotionTile :promotion="promotion" class="promotion"></PromotionTile
  ></a>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';

export default {
  created() {
    this.$store.dispatch('FETCH_PROMOTIONS');
  },

  computed: {
    promotionsList() {
      const ret = this.$store.getters.GET_PROMOTIONS_LIST;
      return ret;
    },
  },
  components: {
    PromotionTile,
  },
};
</script>

<style>
.promotion {
  margin: 1rem;
}
a {
  color: black;
}
</style>

<template>
  <div :style="contStyle">
    <h2>{{ promotion.header }}</h2>
    <p>{{ promotion.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'PromotionTile',
  props: { promotion: Object },
  computed: {
    contStyle() {
      const { image } = this.promotion;
      const imageUrl = `/src/assets/${image}`;

      return {
        background: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 1rem;
}

p {
  text-align: center;
}

div {
  padding: 2rem;
}
</style>

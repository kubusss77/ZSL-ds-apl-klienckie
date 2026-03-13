<template>
  <div :style="contStyle">
    <h2>{{ this.promotion.header }}</h2>
    <p>{{ this.promotion.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'PromotionTile',
  props: { promotion: Object },
  computed: {
    contStyle() {
      const { image } = this.promotion;
      let imageUrl;

      try {
        imageUrl = `/src/assets/${image}`;
      } catch (e) {
        console.log(e);
      }

      return {
        background: `url(${imageUrl})`,
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

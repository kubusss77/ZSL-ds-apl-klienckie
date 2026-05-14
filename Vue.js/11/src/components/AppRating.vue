<template>
  <div class="rating">
    <img v-for="index in starsCount" :key="index" class="star" src="/src/assets/star.svg" alt="star" />
  </div>
</template>

<script>
export default {
  props: ['count'],
  computed: {
    starsCount() {
      const value = Number(this.count);
      if (Number.isNaN(value) || value <= 0) {
        return 0;
      }

      return Math.min(5, Math.round(value));
    },
  },
};
</script>

<style>
.rating {
  display: flex;
  gap: 0.15rem;
}

.star {
  width: 1rem;
}
</style>

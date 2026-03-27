<template>
  <div :style="contStyle"></div>
</template>

<script>
export default {
  computed: {
    style() {
      let imageUrl;

      try {
        imageUrl = ``;
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

#dd {
  background-image: url('/src/assets/tube-spinner.sv');
}
</style>

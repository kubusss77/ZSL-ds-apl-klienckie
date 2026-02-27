<template>
  <p>kolor auta</p>
  <p>stan</p>
  <div>
    <p>id: {{ carid }}</p>
    <p>name:</p>
    <p>year:</p>
  </div>
</template>
<script>
export default {
  props: ['carid'],
  computed: {
    carById() {
      return this.$store.state.car[this.props.carid];
    },
  },
};
</script>

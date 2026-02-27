<template>
  <Car v-for="index in carsCount" :carid="index"></Car>
</template>
<script>
import Car from './components/car.vue';
export default {
  computed: {
    carsCount() {
      return this.$store.state.cars.length - 1;
    },
  },
  components: {
    Car,
  },
};
</script>

<template>
  <div class="car">
    <p :style="{ backgroundColor: car.hex_color }">kolor auta</p>
    <h2>id: {{ car.id }}</h2>
    <p>name: {{ car.car_name }}</p>
    <p>year: {{ car.car_year }}</p>
    <button @click="showInfo()">Info</button>
    <button @click="this.fixRepair(this.car.id, this.car.damaged)">{{ fixRepairText }}</button>
  </div>
</template>
<script>
export default {
  props: ['id', 'damaged', 'fixRepair'],
  computed: {
    car() {
      return this.$store.getters.GET_CARS.find((c) => c.id == this.id);
    },
    fixRepairText() {
      return this.car.damaged ? 'napraw auto' : 'zepsuj auto';
    },
  },
  methods: {
    showInfo() {
      alert(JSON.stringify(this.car, null, 5));
    },
  },
};
</script>

<style scoped>
.car {
  margin: 1rem;
  border: solid 2px black;
  border-radius: 0.5rem;
}
</style>

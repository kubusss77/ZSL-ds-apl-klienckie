<template>
  <div>
    Wybierz markę:
    <select @change="this.updateFilter('car_name', this.selected)" v-model="selected">
      <option v-for="year in availableNames">
        {{ year }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['updateFilter'],
  computed: {
    availableNames() {
      const cars = this.$store.getters.GET_CARS;
      const names = [];
      cars.forEach((car) => {
        if (!names.includes(car.car_name)) names.push(car.car_name);
      });
      return names;
    },
  },
  data() {
    return {
      selected: '',
    };
  },
};
</script>

<style scoped>
div {
  padding: 0.5rem;
  background: lightsalmon;
  border-radius: 0.5rem;
}
</style>

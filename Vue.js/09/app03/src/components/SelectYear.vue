<template>
  <div>
    Wybierz rok:
    <select @change="this.updateFilter('car_year', parseInt(this.selected))" v-model="selected">
      <option v-for="year in availableYears">
        {{ year }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['updateFilter'],
  computed: {
    availableYears() {
      const cars = this.$store.getters.GET_CARS;
      const years = [];
      cars.forEach((car) => {
        if (!years.includes(car.car_year)) years.push(car.car_year);
      });
      return years;
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

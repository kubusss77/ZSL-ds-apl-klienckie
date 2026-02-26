<template>
  <div>
    Wybierz kolor:
    <select @change="this.updateFilter('hex_color', this.selected)" v-model="selected">
      <option v-for="color in availableColors">
        {{ color }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['updateFilter'],
  computed: {
    availableColors() {
      const cars = this.$store.getters.GET_CARS;
      const colors = [];
      cars.forEach((car) => {
        if (!colors.includes(car.hex_color)) colors.push(car.hex_color);
      });
      return colors;
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

<template>
  <h1>03: Vuex - Getters and Mutations</h1>
  <div class="selects">
    <SelectYear :updateFilter="updateFilter"></SelectYear>
    <SelectColor :updateFilter="updateFilter"></SelectColor>
    <SelectName :updateFilter="updateFilter"></SelectName>
  </div>
  <button @click="fetchOriginals()">Pobierz oryginalne dane</button>
  <button @click="saveOnServer()">Zapisz na serwerze</button>
  <div class="cars">
    <div class="cars-damaged">
      <Car v-for="id in filteredDamaged" :id="id" :fix-repair="fixRepair"></Car>
    </div>
    <div class="cars-undamaged">
      <Car v-for="id in filteredUndamaged" :id="id" :fix-repair="fixRepair"></Car>
    </div>
  </div>
</template>

<script>
import SelectYear from './components/SelectYear.vue';
import SelectColor from './components/SelectColor.vue';
import SelectName from './components/SelectName.vue';
import Car from './components/Car.vue';
import axios from 'axios';

export default {
  mounted() {
    this.$store.dispatch('FETCH_CARS');
    setTimeout(() => {
      this.refreshFilters();
    }, 10);
  },
  components: {
    SelectYear,
    SelectColor,
    SelectName,
    Car,
  },
  methods: {
    updateFilter(key, value) {
      console.log('updated filter', key, value);
      this.filterData.key = key;
      this.filterData.value = value;

      const filtered = this.$store.getters.GET_CARS.filter((car) => car[key] === value);
      console.log(filtered);
      this.filteredDamaged = filtered.filter((car) => car.damaged === true).map((car) => car.id);
      this.filteredUndamaged = filtered.filter((car) => car.damaged === false).map((car) => car.id);
    },
    ids() {
      return this.$store.getters.GET_CARS.map((car) => car.id);
    },
    fixRepair(id, damagedBefore) {
      this.$store.commit('SWITCH_CAR_DAMAGED', id, damagedBefore);
      console.log('changing damage');
      if (this.filterData.key) {
        this.updateFilter(this.filterData.key, this.filterData.value);
      } else {
        this.refreshFilters();
      }
    },
    refreshFilters() {
      this.filteredDamaged = this.$store.getters.GET_CARS.filter((car) => car.damaged === true).map((car) => car.id);
      this.filteredUndamaged = this.$store.getters.GET_CARS.filter((car) => car.damaged === false).map((car) => car.id);
    },
    fetchOriginals() {
      this.$store.dispatch('FETCH_CARS');
      setTimeout(() => {
        this.refreshFilters();
      }, 10);
    },
    async saveOnServer() {
      try {
        const response = await axios.post('http://localhost:3000/api', { data: this.$store.getters.GET_CARS });
        if (response.status == 200) {
          alert('Success!');
        } else {
          alert('Error! ' + response.status);
        }
      } catch (ex) {
        alert('Error! ' + ex.message);
      }
    },
  },
  data() {
    return {
      filterData: {},
      filteredDamaged: [],
      filteredUndamaged: [],
    };
  },
};
</script>

<style>
.cars {
  display: flex;
  gap: 1rem;
  margin: 1rem;
}
.cars-damaged {
  display: flex;
  background-color: lightcoral;
}
.cars-undamaged {
  display: flex;
  background-color: lightgreen;
}
.selects {
  display: flex;
  gap: 1rem;
  margin: 1rem;
}
</style>

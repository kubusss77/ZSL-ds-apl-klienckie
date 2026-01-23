<template>
  <select @change="change()">
    <option v-for="number in array">{{ number }}</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      array: [1, 2, 3],
    };
  },

  methods: {
    change() {
      alert(this.array);
    },
  },
};
</script>

<style scoped>
select {
  border: 2px dashed blue;
}
</style>

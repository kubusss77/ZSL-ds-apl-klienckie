<template>
  <button class="b" @click="click()">button in component</button>
</template>

<script>
export default {
  methods: {
    click() {
      alert(this.title);
    },
  },
};
</script>

<style scoped>
.b {
  font-size: 30px;
  background: blue;
  border-radius: 10px;
  color: white;
  padding: 10px;
  border: none;
}
</style>

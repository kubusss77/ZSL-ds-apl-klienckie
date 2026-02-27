<template>
  <div class="grandchild">
    <h2>{{ cInComp }}</h2>
    <button @click="addInComp">dodaj</button>
    <div class="circle" v-for="value in divCount">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cInComp() {
      return this.$store.state.c;
    },
    divCount() {
      return Math.floor(this.$store.state.c / 4);
    },
  },
  methods: {
    addInComp() {
      this.$store.commit('plus');
    },
  },
};
</script>

<style scoped>
.grandchild {
  border: 5px solid red;
}
</style>

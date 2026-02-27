<template>
  <div class="child">
    <h2>{{ cInComp }}</h2>
    <button @click="addInComp">dodaj</button>
    <button @click="change">zmień</button>
    <div class="circle" v-for="value in divCount">
      {{ value }}
    </div>
    <GrandChild></GrandChild>
  </div>
</template>

<script>
import GrandChild from './GrandChild.vue';
export default {
  computed: {
    cInComp() {
      return this.$store.state.c;
    },
    divCount() {
      return Math.floor(this.$store.state.c / 2);
    },
  },
  methods: {
    addInComp() {
      this.$store.commit('plus');
    },
    change() {
      this.$store.commit('changeInStore', 5);
    },
  },
  components: {
    GrandChild,
  },
};
</script>

<style scoped>
.child {
  border: 5px solid cyan;
}
</style>

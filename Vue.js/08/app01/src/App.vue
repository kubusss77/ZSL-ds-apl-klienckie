<template>
  <div>
    <button @click="add">dodaj</button>
    {{ count }}
    <div class="circle" v-for="value in count">
      {{ value }}
    </div>
    <Child></Child>
    <Child></Child>
  </div>
</template>

<script>
import Child from './components/Child.vue';
export default {
  methods: {
    add() {
      this.$store.commit('plus');
      console.log(this.$store.state.c);
    },
  },
  computed: {
    count() {
      return this.$store.state.c;
    },
  },
  components: {
    Child,
  },
};
</script>

<style lang="scss" scoped></style>

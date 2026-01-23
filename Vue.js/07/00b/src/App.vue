<template>
  <div id="main">
    {{ message }}
  </div>
  <my-button></my-button>
  <MyButton></MyButton>
</template>

<script>
import MyButton from './components/MyButton.vue';

export default {
  data() {
    return {
      message: 'Hello World',
    };
  },

  components: { MyButton },
};
</script>

<style>
#main {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>

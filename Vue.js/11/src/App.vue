<template>
  <Header></Header>
  <main>
    <RouterView />
  </main>
  <Footer></Footer>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  flex: 1;
}
</style>

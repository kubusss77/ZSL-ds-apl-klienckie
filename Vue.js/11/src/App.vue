<template>
  <Header></Header>
  <main>
    <div id="main-content">
      <RouterView />
    </div>
    <div id="loader">
      <AppLoader v-show="promotionsLoading" />
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AppLoader from './components/AppLoader.vue';

export default {
  computed: {
    promotionsLoading() {
      const loading = this.$store.getters.GET_PROMOTIONS_LOADING;
      console.log('loading sss', loading);
      return loading;
    },
  },
  components: {
    Header,
    Footer,
    AppLoader,
  },
};
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

#loader {
  position: absolute;
  top: 45%;
  left: 45%;
  width: 10%;
}
</style>

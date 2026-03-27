<template>
  <Header></Header>
  <main>
    <RouterView />
    <AppLoader v-show="promotionLoading" />
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
    promotionLoading() {
      const loading = this.$store.getters.GET_PROMOTION_LOADING;
      console.log('loading', loading);
      return true;
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
</style>

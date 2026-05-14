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
import './styles/main.css';

export default {
  computed: {
    promotionsLoading() {
      return this.$store.getters.GET_PROMOTIONS_LOADING;
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

import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    c: 0,
  },

  mutations: {
    plus(state) {
      this.state.c++;
    },
    changeInStore(state, id) {
      console.log(id); // -> 5
    },
  },
});

createApp(App).use(store).mount('#app');

import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  cars: [],
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;

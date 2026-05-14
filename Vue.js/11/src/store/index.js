import { createStore } from 'vuex';

import promotions from './promotions';
import promotion from './promotion';
import products from './products';
import user from './user';

const modules = {
  promotions,
  promotion,
  products,
  user,
  // kolejne moduły
};

export default createStore({
  modules,
});

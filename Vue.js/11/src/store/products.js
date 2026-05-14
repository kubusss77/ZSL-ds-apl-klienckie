import { getProducts } from '@/api';

const products = {
  state() {
    return {
      productsList: [],
      productsLoading: false,
      productsError: null,
    };
  },
  mutations: {
    SET_PRODUCTS_LIST(state, newProducts) {
      state.productsList = newProducts;
    },
    SET_PRODUCTS_LOADING(state, value) {
      state.productsLoading = value;
    },
    SET_PRODUCTS_ERROR(state, error) {
      state.productsError = error;
    },
  },
  getters: {
    GET_PRODUCTS_LIST(state) {
      return state.productsList;
    },
    GET_PRODUCTS_LOADING(state) {
      return state.productsLoading;
    },
    GET_PRODUCTS_ERROR(state) {
      return state.productsError;
    },
  },
  actions: {
    async FETCH_PRODUCTS({ commit }) {
      commit('SET_PRODUCTS_LOADING', true);
      commit('SET_PRODUCTS_ERROR', null);

      try {
        const productsData = await getProducts();
        commit('SET_PRODUCTS_LIST', productsData);
      } catch (error) {
        commit('SET_PRODUCTS_ERROR', `Error fetching products: ${error.message}`);
      } finally {
        commit('SET_PRODUCTS_LOADING', false);
      }
    },
  },
};

export default products;

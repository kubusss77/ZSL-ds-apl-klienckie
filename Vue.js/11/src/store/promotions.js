import { getPromotions } from '@/api';

const promotions = {
  state() {
    return {
      promotionsList: [],
      promotionsLoading: false,
      promotionsError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_PROMOTIONS_LIST(state, newPromotions) {
      state.promotionsList = newPromotions;
    },
    SET_PROMOTIONS_LOADING(state, value) {
      state.promotionsLoading = value;
    },
    SET_PROMOTIONS_ERROR(state, error) {
      state.promotionsError = error;
    },
  },

  //getters
  getters: {
    GET_PROMOTIONS_LIST(state) {
      return state.promotionsList;
    },
    GET_PROMOTIONS_LOADING(state) {
      return state.promotionsLoading;
    },
    GET_PROMOTIONS_ERROR(state) {
      return state.promotionsError;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    async FETCH_PROMOTIONS({ commit }) {
      commit('SET_PROMOTIONS_LOADING', true);
      commit('SET_PROMOTIONS_ERROR', null);

      try {
        const data = await getPromotions();
        commit('SET_PROMOTIONS_LIST', data);
      } catch (error) {
        commit('SET_PROMOTIONS_ERROR', `Error fetching promotions: ${error.message}`);
      } finally {
        commit('SET_PROMOTIONS_LOADING', false);
      }
    },
  },
};

export default promotions;

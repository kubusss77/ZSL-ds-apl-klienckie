import { getPromotion, getProduct } from '@/api';

const promotion = {
  state() {
    return {
      promotionObject: {},
      promotionLoading: false,
      promotionError: null,
    };
  },

  mutations: {
    SET_PROMOTION_OBJECT(state, newPromotionObject) {
      state.promotionObject = newPromotionObject;
    },
    SET_PROMOTION_LOADING(state, value) {
      state.promotionLoading = value;
    },
    SET_PROMOTION_ERROR(state, error) {
      state.promotionError = error;
    },
  },

  getters: {
    GET_PROMOTION_OBJECT(state) {
      return state.promotionObject;
    },
  },

  actions: {
    FETCH_PROMOTION({ state, commit, getters }, promotionId) {
      commit('SET_PROMOTION_LOADING', true);

      getPromotion(promotionId)
        .then((data) => {
          console.log('promocja id: ', data);
          commit('SET_PROMOTION_OBJECT', data.promotion);
        })
        .catch((error) => {
          commit('SET_PROMOTION_ERROR', `Error fetching promotion with id ${promotionId}: ${error.message}`);
        })
        .finally(() => {
          commit('SET_PROMOTION_LOADING', false);
        });
    },
  },
};

export default promotion;

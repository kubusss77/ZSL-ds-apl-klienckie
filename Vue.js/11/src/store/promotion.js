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
    GET_PROMOTION_LOADING(state) {
      return state.promotionLoading;
    },
  },

  actions: {
    FETCH_PROMOTION({ state, commit, getters }, promotionId) {
      commit('SET_PROMOTION_LOADING', true);

      getPromotion(promotionId)
        .then(async (data) => {
          try {
            const fullProducts = [];

            // Iteracja - czekamy na każdy produkt po kolei

            for (const productId of data.items) {
              const product = await getProduct(productId);
              fullProducts.push(product);
            }

            // Łączymy dane promocji (header, color itp.) z pełnymi obiektami produktów

            const returnObject = {
              ...data,
              items: fullProducts,
            };

            commit('SET_PROMOTION_OBJECT', returnObject);
          } catch (error) {
            commit('SET_PROMOTION_ERROR', 'Nie udało się pobrać produktów.');
          } finally {
            commit('SET_PROMOTION_LOADING', false);
          }
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

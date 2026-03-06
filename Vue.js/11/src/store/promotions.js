import { getPromotions } from '@/api';

const promotions = {
  //state
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
  },

  //getters
  getters: {
    GET_PROMOTIONS_LIST(state) {
      return state.promotionsList;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    FETCH_PROMOTIONS({ state, commit }) {
      // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

      commit('SET_PROMOTIONS_LOADING', true);

      // potem wywołujemy funkcję z api, która
      // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
      // w razie błędu ustawia error w store (catch)
      // niezależnie od błędu lub jego braku (finally), kończy loading

      getPromotions()
        .then((data) => {
          commit('SET_PROMOTIONS_LIST', data.promotions);
        })
        .catch((error) => {
          commit('SET_PROMOTIONS_ERROR', 'server error!!!');
        })
        .finally(() => {
          commit('SET_PROMOTIONS_LOADING', false);
        });
    },
  },
};

export default promotions;

import axios from 'axios';

const actions = {
  async FETCH_CARS({ commit }) {
    const response = await axios.get('http://localhost:3000/api');
    console.log('response.data', response.data);
    commit('SET_CARS', response.data);
  },
  // kolejne akcje, jeśli potrzebne
};

export default actions;

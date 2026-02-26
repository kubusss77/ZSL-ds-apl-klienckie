const mutations = {
  SET_CARS(state, cars) {
    state.cars = cars;
  },
  SWITCH_CAR_DAMAGED(state, id) {
    const i = state.cars.findIndex((c) => c.id == id);
    state.cars[i].damaged = !state.cars[i].damaged;
  },
  // kolejne mutations czyli rzeczywiste zmiany na store
};

export default mutations;

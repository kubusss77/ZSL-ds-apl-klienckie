console.log('---data3');

let number = 1;

const allFunctions = {
  add(value) {
    number += value;
  },

  remove(value) {
    number -= value;
  },
};

export { number, allFunctions };

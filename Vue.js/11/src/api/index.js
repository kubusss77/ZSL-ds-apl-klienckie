import axios from 'axios';

const API_URL = 'http://localhost:3000';

const get = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => {
        axios
          .get(API_URL + url)
          .then((response) => {
            console.log('data', response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      },
      500 + Math.random() * 1000
    );
  });

const getPromotions = () => get('/promotions');
const getPromotion = (id) => get(`/promotion/${id}`);
const getProduct = (id) => get(`/product/${id}`);

const post = (url, userObject) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post(API_URL + url, userObject, { withCredentials: true })
        .then((response) => {
          console.log('data', response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 1000);
  });

const registerUser = (userObject) => post('/createUser', userObject);

export { getPromotions, getPromotion, getProduct, registerUser };

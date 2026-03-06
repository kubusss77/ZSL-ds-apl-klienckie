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

export { getPromotions, getPromotion, getProduct };

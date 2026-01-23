import { value, obj } from '/modules/data1';

console.log('export value i obj z pliku data1.js', { value, obj });

import data2 from './modules/data2';

console.log('export default obj2 z pliku data2.js', data2);

import { number, allFunctions } from './modules/data3';

allFunctions.add(10);
allFunctions.remove(40);

console.log('number = ', number);

import Data4 from './modules/data4';

const d1 = new Data4(1, 2);
const d2 = new Data4(3, 4);

console.log('obiekt d1 klasy Data4 z argumentami 1,2', d1);
console.log('obiekt d2 klasy Data4 z argumentami 3,4', d2);

import plik from './modules/gfx/plik.jpg';

document.getElementById('img1').src = plik;

import './modules/css/style.css';

import { createApp } from 'vue';

import App from './App01.vue'; // aplikacja
import store from './store/index01'; // --- załączamy store z osobnego pliku ---

createApp(App).use(store).mount('#app');

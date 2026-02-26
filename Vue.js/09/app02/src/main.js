import { createApp } from 'vue';

import App from './App.vue'; // aplikacja
import store from './store'; // --- załączamy store z osobnego pliku ---

createApp(App).use(store).mount('#app');

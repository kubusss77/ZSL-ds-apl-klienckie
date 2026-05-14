1. struktura projektu

poniższe katalogi tworzymy w /src nowej aplikacji Vue

/api // kontakt z serwerem
/assets // grafiki
/components // komponenty Vue
/router // routing aplikacji, reakcja na zmianę adresu
/store // dane aplikacji
/styles // style
/views // widoki ("podstrony")📄🌓✍️

2. router

można go zainstalować podczas tworzenia nowego projektu vue

npm create vue@latest storeApp
📄🌓✍️

(zaznaczamy router Yes)

lub później za pomocą

npm install vue-router@4📄🌓✍️

pełna dokumentacja

https://router.vuejs.org/

po zainstalowaniu routera mamy domyślny plik o konstrukcji jak poniżej

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
{
path: '/',
name: 'home',
component: HomeView
},
{
path: '/about',
name: 'about',
// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () => import('../views/AboutView.vue')
}
]
})

export default router📄🌓✍️

teraz kilka przeróbek ułatwiających pracę później:

a) w całym projekcie trzymamy się jednolitego nazewnictwa z przyrostkiem View dla widoków
b) adres zaczynamy od @ , która wskazuje na katalog /src
c) widok NotFoundView ładujemy trochę inaczej

import { createRouter, createWebHistory } from 'vue-router'

//static load
//@ oznacza katalog /src

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

//lazy load - renderuje się tylko gdy jest potrzebny a nie z góry

const NotFoundView = () => import("@/views/NotFoundView.vue")

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
{
path: '/',
name: 'home',
component: HomeView
},
{
path: '/about',
name: 'about',
component: AboutView
},
{
path: '/:pathMatch(.*)*',
name: 'NotFoundView',
component: NotFoundView,
},
]
})

export default router📄🌓✍️

instrukcja path: '/:pathMatch(._)_',
służy do tego aby ładować widok NotFoundView w razie gdy żądanego adresu nie ma na routerze

zmiana w main.js

import router from './router'📄🌓✍️

app.use(router).mount('#app')📄🌓✍️

i teraz w App.vue używamy RouterView
(kontener na widoki uruchamiane za pomocą RouterLinków, dzięki niemu widoki wyświetlają się w określonym miejscu)

<template>
  <div>
    <RouterView />
  </div>
</template>📄🌓✍️

3. components i views

w katalogu /components na razie mamy pliki
Footer.vue i Header.vue reprezentujące nagłówek aplikacji i stopkę (patrz skriny)

w Header zamieszczamy nawigację, z użyciem komponentu dostarczanego przez router

<RouterLink to="/" exact>Home</RouterLink>
<RouterLink to="/about">About</RouterLink>
<RouterLink to="/nnn">Not found</RouterLink>📄🌓✍️

RouterLink po stronie przeglądarki tworzy znacznik <a href> ale nie przeładowuje strony
exact oznacza, że dokładnie przy adresie / routing zadziała a nie przy jego pochodnych zaczynających się od /

Teraz tworzymy widoki w katalogu /views i na tym etapie już powinno działać przełączanie pomiędzy widokami

4. serwer

serwer express na adresie /promotions zwraca dane o promocjach
json z promocjami jest na końcu, załączamy go na serwerze i testujemy http://localhost:3000/promotions
pamiętamy o cors()

Uwaga: katalog z aplikacją serwera tworzymy osobno w stosunku do katalogu aplikacji klienta vue

5. api

zaczynamy od skonstruowania pliku /api/index.js, który będzie głównym endpointem kontaktującym się z serwerem

pobiera dane z serwera, na razie są to dane dotyczące promocji w naszym sklepie

korzystamy z axios (patrz poprzednia lekcja)

api wykorzystuje promisę, aby odpowiedź z serwera uzyskać po pewnym czasie, z opóźnieniem setTimeout()
po to aby zasymulować pobieranie danych w realnych warunkach
a w czasie pobierania zaprezentować loader (w kolejnej lekcji)

plik /api/index.js

import axios from "axios"

const get = (url) => new Promise((resolve, reject) => {
setTimeout(() => {
axios.get(url)
.then(response => {
console.log("data", response.data);
resolve(response.data)
})
.catch(error => {
reject(error)
})

    }, 500 + Math.random() * 1000);

})📄🌓✍️

poniżej konstruujemy funkcję korzystającą z powyższej promisy
trzymamy się logicznego nazewnictwa funkcji, skojarzonego z czynnością, którą ta funkcja wykonuje

const getPromotions = () => get("http://localhost:3000/promotions")📄🌓✍️

i eksportujemy ją do wykorzystania w innych plikach

export {

    getPromotions,
    //tu będą pozostałe metody

}📄🌓✍️

można ten przykład użyć z async / await

const get = async (url) => {
try {

    const delay = 500 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const response = await axios.get(url);

    console.log("data", response.data);

    return response.data; // Zwracamy dane (to samo co resolve)

} catch (error) {

    throw error;

}
};
📄🌓✍️

6. styles

styles/main.css

dodajemy style dla wyglądu aplikacji
plik importujemy w App.vue

7. Vuex store

store dla aplikacji będzie rozbudowywany przez wszystkie jej części, dlatego należy go dobrze zaplanować już na początku

instalujemy Vuex jak poprzednio

w katalogu /store planujemy modularną budowę store, z podziałem na moduły
każdy moduł będzie miał swój state, getters, actions, mutations
bardzo poprawi to przejrzystość store - każda funkcjonalność sklepu będzie miała osobny moduł
dzisiaj zaczynamy od store dla promocji, dodając plik promotions.js

a) plik store/index.js

szkielet store na dziś

import { createStore } from 'vuex'

import promotions from './promotions'

const modules = {
promotions,
// kolejne moduły

}

export default createStore({  
 modules,
})📄🌓✍️

b) promotions.js

kluczowy na dziś plik promotions.js będzie konstrukcją znaną z poprzedniej lekcji
wykorzystamy state, getters, actions, mutations

import { getPromotions } from "@/api"

const promotions = {

    //state
    state() {
        return {  }
    },

    //mutations czyli setters
    mutations: {  },

    //getters
    getters: {  },

    // tu zapytania do serwera z pomocą naszego api
    actions: {  }

}

export default promotions📄🌓✍️

8. rozbudowa store

a) state

tu trzymamy zmienne odpowiedzialne za listę promocji, stan ładowania danych, ew błąd

promotionsList: [],
promotionsLoading: false,
promotionsError: null📄🌓✍️

b) getters

tu dodajemy gettery odpowiedzialne za pobieranie ww danych do innych miejsc w aplikacji

przykład pobierania listy promocji

GET_PROMOTIONS_LIST(state) {
return state.promotionsList
}📄🌓✍️

podobnie pozostałe gettery (loading, error), trzymamy się nazewnictwa dużymi literami

c) mutations

tutaj funkcje zmieniające te dane

SET_PROMOTIONS_LIST(state, newPromotions) {
state.promotionsList = newPromotions
}📄🌓✍️

podobnie pozostałe, trzymamy się nazewnictwa dużymi literami

d) actions

tu wykonamy jedno na dziś asynchroniczne zapytanie do naszego api

kod jest dłuższy, po drodze objaśnienia

najpierw kontakt z api i jedyną w nim funkcją

import { getPromotions } from "@/api"
📄🌓✍️

teraz action (commit jest argumentem, dlatego nie trzeba pisać this.$state.commit)

FETCH_PROMOTIONS({ state, commit }) {

            // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

            commit("SET_PROMOTIONS_LOADING", true)

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            getPromotions()
                .then(data => {
                    commit("SET_PROMOTIONS_LIST", data.promotions)
                })
                .catch(error => {
                    commit("SET_PROMOTIONS_ERROR", "server error!!!")
                })
                .finally(() => {
                    commit("SET_PROMOTIONS_LOADING", false)
                })
        }
    }📄🌓✍️

9. wykorzystanie store w widoku HomeView

Na koniec pozostaje dokończyć tworzenie widoku HomeView z promocjami

a) komponent components/PromotionTile.vue

w którym zakładamy że w props-ach zostanie przekazany obiekt promocji
w przykładzie ogólnie widać w jaki sposób zostaną wykorzystanie dostarczone do niego props

<template>
  <div :style="contStyle">
    <h3>{{ this.promotion.header }}</h3>
    <h2>{{ this.promotion.description }}</h2>
  </div>
</template>

<script>
export default {
  name: "PromotionTile",
  props: { promotion: Object },
  computed: {
    contStyle() {
      const { image } = this.promotion;
      let imageUrl;

      try {
        imageUrl = `/src/assets/${image}`;
      } catch (e) {
        console.log(e);
      }
     
      return {
        background: `url(${imageUrl})`,
      };
    },
  },
};
</script>

<style scoped>
</style>📄🌓✍️

b) widok views/HomeView.vue

teraz widok i jego cała istotna zawartość

w widoku tworzą się linki v-for (w naszym przypadku dwa, bo tyle jest w danych)
kierujące w przyszłości do poszczególnych promocji
wewnątrz linka jest renderowany komponent PromotionTile, który w prop dostaje obiekt danych promocji

<RouterLink
        v-for="promotion in promotionsList"
        :to="`/promotion/${promotion.id}`"
        :key="promotion.id"
      >
<PromotionTile v-bind:promotion="promotion" />
</RouterLink>📄🌓✍️

c) skąd wezmą się obiekty promocji? ze store

w zdarzeniu mounted() startujemy pobierane danych ze store do komponentu

mounted() {
this.$store.dispatch("FETCH_PROMOTIONS");
}📄🌓✍️

d) kiedy dane zostaną pobrane, możemy z nich skorzystać,

tworząc odpowiednie computed
przykład to promotionsList, podobnie wykonamy promotionsLoading, promotionsError

computed: {
promotionsList() {
return this.$store.getters.GET_PROMOTIONS_LIST;
}
}
📄🌓✍️

promotionsList() wykorzystany jest w v-for wyżej

na tym etapie powinniśmy widzieć dwie promocje w widoku HomeView

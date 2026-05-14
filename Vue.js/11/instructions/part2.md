1. dane

Na końcu lekcji są duże dane

2. server - gety

pracę zaczynamy od serwera, potrzebne są minimalnie dwie funkcje, odpowiednie skriny pokazują szukane dane

Uwaga: katalog z aplikacją serwera osobno w stosunku do katalogu aplikacji klienta vue

app.get("/promotion/:id", (req, res) => {
// get zwraca promocje wyszukane przez id  
})📄🌓✍️

testujemy w przeglądarce:

http://localhost:3000/promotion/1

oraz

app.get("/product/:id", (req, res) => {
// get zwraca produkty wyszukane przez id
})📄🌓✍️

testujemy w przeglądarce:

http://localhost:3000/product/5ea08604c5254c8643359963

3. api klienta

tutaj implementacja tych adresów

szukana promocja

const getPromotion = (id) => get(`http://localhost:3000/promotion/${id}`)📄🌓✍️

szukany produkt z promocji

const getProduct = (id) => get(`http://localhost:3000/product/${id}`)📄🌓✍️

wywołania api będą poźniej w odpowiednich momentach w store

obie funkcje exportujemy z pliku

4. store - promotion.js

dla opisanej sytuacji potrzebny jest kolejny moduł store, promotion.js

będzie przechowywał dane (jeden obiekt) jednej promocji

większość modułu poniżej, wraz z komentarzami

import { getPromotion, getProduct } from "@/api"📄🌓✍️

a) state promotion, bardzo podobny do state promotions

promotionObject: {},
promotionLoading: false,
promotionError: null📄🌓✍️

b) mutations do promotion bardzo podobne do promotions, tylko dla jednej promocji
pozostałe mutacje zgodnie z logiką

SET_PROMOTION_OBJECT(state, newPromotionObject) {
state.promotionObject = newPromotionObject
}📄🌓✍️

c) getters do promotion bardzo podobny do promotions, tylko dla jednej promocji
pozostałe getters zgodnie z logiką

GET_PROMOTION_OBJECT(state) {
return state.promotionObject
}📄🌓✍️

d) actions

będzie jedna akcja FETCH_PROMOTION, której zadanie będzie utworzyć w store dane jednej promocji i jej produktów
zwróćmy uwagę na argument promotionId
dzięki niemu pobierzemy z serwera dane wybranej promocji

FETCH_PROMOTION({ state, commit, getters }, promotionId) {

    // cel tej akcji to pobranie danych promocji oraz danych jej produktów i złożenie w całość

// można tego dokonać na serwerze, dodając kolejny get, albo na kliencie, łącząc dane uzyskane z dotychczasowych getów

}📄🌓✍️

ogólny schemat postępowania, czyli jak połączyć dane z obu żądań (promotions + product) w jeden obiekt w store

try {
const fullProducts = [];

        // Iteracja - czekamy na każdy produkt po kolei

        for (const productId of data.items) {
            const product = await getProduct(productId);
            fullProducts.push(product);
        }

        // Łączymy dane promocji (header, color itp.) z pełnymi obiektami produktów

        const returnObject = {
            promotion,
            items: fullProducts
        };

        commit("SET_PROMOTION_OBJECT", returnObject);

} catch (error) {
commit("SET_PROMOTION_ERROR", "Nie udało się pobrać produktów.");
} finally {
commit("SET_PROMOTION_LOADING", false);
}📄🌓✍️

5. router

do routera dodajemy obsługę PromotionView

{
path: '/promotion/:id',
name: 'PromotionView',
component: PromotionView,
}📄🌓✍️

6. widok PromotionView - AppLoader

cała powyższa sytuacja zostaje wywołana w widoku PromotionView, w zdarzeniu created()
this.$route.params.id to numer promocji pobrany z adresu url

created() {
this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
}📄🌓✍️

aby uzyskać efekt ładowania, budujemy komponent AppLoader
w template komponentu wystarczy dowolny gif, lub animowany svg

jeśli gif to nic nie instalujemy, jeśli svg to instalujemy:

npm install vite-svg-loader📄🌓✍️

a potem w pliku vite.config.js dodajemy go do plugins, nie usuwając dotychczasowej zawartości

import svgLoader from 'vite-svg-loader';

export default defineConfig({
plugins: [
vue(),
svgLoader()
],

})📄🌓✍️

loader będzie się pokazywał w dowolnym miejscu aplikacji, pod warunkiem, że w store wartość promotionLoading
jest = true

<AppLoader v-show="promotionLoading" />📄🌓✍️

koncepcja pobierania danych do widoku PromotionView, jest oparta na computed, które
wyciągają dane z getterów, poniżej promotionObject, pozostałe (promotionError, promotionLoading) podobnie

computed: {
promotionObject() {
return this.$store.getters.GET_PROMOTION_OBJECT;
},

}📄🌓✍️

potem te computed wykorzystujemy w PromotionView tworząc v-for em komponent ProductTile
który dostaje dane w propsie :product

<ProductTile
            v-for="product in promotionObject.items"
            :key="product.id"
            :product="product"
          />📄🌓✍️

ogólna zawartość komponentu ProductTile, to link do produktu, obrazek, tytuł i cena

<template>
  <RouterLink :to="`/product/${product.id}`">
    <img />
    <div>{{ product.name }}</div>
    <div>{{ product.price }}</div>    
  </RouterLink>
</template>📄🌓✍️

pozostaje komponent AppRating, pokazujący gwiazdki oceny produktu

<AppRating>📄🌓✍️

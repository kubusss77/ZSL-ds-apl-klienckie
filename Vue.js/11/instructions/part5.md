1. dane

ponownie wykorzystujemy tablicę products[]

2. serwer

najpierw projektujemy serwer - get dla products

dane produktów mają być dostępne pod adresem:

http://localhost:3000/products

3. api

nowy get dla produktów, technika wykonania jak poprzednio

const getProducts = () => get(`http://localhost:3000/products`)📄🌓✍️

4. store

cel wykonania tego store to pobranie danych o produktach z serwera
i przechowywanie ich w aplikacji -> praktycznie jest to kopia promotions.js

a) import

import { getProducts } from "@/api"📄🌓✍️

b) state

state() {
return {
productsList: [],
productsLoading: false,
productsError: null
}
}📄🌓✍️

c) getters jak zwykle
d) mutations jak zwykle

e) action

akcja

FETCH_PRODUCTS({ state, commit })📄🌓✍️

jest tak samo skonstruowana jak FETCH_PROMOTIONS z cz 1 aplikacji

5. router

przybywa jeden nowy widok, a więc jeden routing

{
path: '/search',
name: 'SearchView',
component: SearchView,

}📄🌓✍️

6. SearchView

View będzie się nazywać SearchView

Na razie służy do prezentacji produktów, ale w kolejnej lekcji do ich wyszukiwania

Obrazki należy znaleźć swoje i zamieścić w katalogu assets
powinny mieć nazwy

laptop1.jpg - laptop3.jpg
phone1.jpg - phone3.jpg
desktop1.jpg - desktop3.jpg
tablet1.jpg - tablet3.jpg

w tym widoku konieczne jest wywołanie akcji pobrania produktów

created() {
this.$store.dispatch("FETCH_PRODUCTS")
}📄🌓✍️

produkty trafiają do store, skąd czerpie je SearchView:
za pomocą computed wywołujemy gettera z listą produktów

products() {
return this.$store.getters.GET_PRODUCTS_LIST;
}📄🌓✍️

a potem v-for rysuje komponenty ProductTile, podobnie jak w lekcji 2,

ogólnie:

<ProductTile v-for="product in products" />📄🌓✍️

7. loader

komponent Loader powinien się wyświetlać podczas ładowania listy produktów (ekran SearchView)

ale, co ważniejsze, podczas ładowania pojedynczego produktu, czyli ProductTile, dopiero wtedy wygląda to w miarę profesjonalnie

całość jest dość skomplikowana ale daje dobry efekt

objaśnienie:

- poniższy div ma styl, który ustawia obrazkowe tło, tak jak we wcześniejszych częściach projektu

- sam AppLoader pokazuje się nad nim (position: absolute, z-index)

- znika natomiast po załadowaniu się obrazka

<div :style="imageStyle">
      <AppLoader v-if="loading" />
</div>📄🌓✍️

- aby to osiągnąć, musimy wychwycić moment, kiedy obrazek się załaduje

- działamy na dwu flagach w data{} komponentu ProductTile, można też na jednej, tej od loadera (loading)

loading - określa stan pokazywania loadera
imageLoaded - określa stan załadowania obrazka w tle diva

- zdarzenie mounted wykonuje się w komponencie ProductTile, gdzie:

- symulujemy opóźnienie ładowania obrazka, a potem ustawiamy odpowiednie ww flagi

mounted() {
setTimeout(() => {
this.loading = false;
this.imageLoaded = true;
}, 1000);
}📄🌓✍️

uwaga: w realnej aplikacji jednak utworzyłbym dynamicznie Image co umożliwia śledzenie faktu jego ładowania (onload), i timeout byłby zbędny:

mounted() {
const img = new Image();

    img.onload = () => {

        this.loading = false; // do ustawiania widoczności loadera
        this.imageLoaded = true; // Ustaw flagę po załadowaniu i wykorzystaj do ustawienia background-image diva

    };

    img.src = this.imageUrl; //dodaj stylem background-image, jeśli imageLoaded = true

}

📄🌓✍️

8. rating

komponent Rating powinien przyjmować prop-y które zostaną przetworzone na ocenę (gwiazdki) oraz liczbę ocen (liczba w nawiasie na skrinach)

ogólnie

<Rating :rate="product.rate" :ratesNumber="product.ratesNumber" />

logika aplikacji:

- utrzymanie sesji na serwerze po odświeżeniu strony - ciastko
- utrzymanie sesji na kliencie pomiędzy widokami / komponentami - store

1. dane json aplikacji

jak w poprzedniej części

2. serwer

część dotycząca logowania, wylogowania

logika proponowanych postów

app.post("/loginUser", (req, res) => {

// sprawdzenie czy dane usera są w pliku json
// jeśli tak to ustawiamy cookie, patrz projekt filemanager
// ustandaryzowane odpowiedzi, np
res.json({ status: "notlogged" })

})
app.post("/logoutUser", (req, res) => {

// usunięcie cookie
// ustandaryzowana odpowiedz, np
res.json({ status: "logout" })

})📄🌓✍️

potrzebny będzie też get zwracający obecnie zalogowanego usera, który będzie na czas zalogowania trzymany w store aplikacji vue

app.get("/getCurrentUser", (req, res) => {
// pobranie emaila z ciastka
const email = req.cookies.email;
//sprawdzenie czy jest w pliku
// ustandaryzowane odpowiedzi, np
if (found)
res.json({ status: "authorized", email: email })
})📄🌓✍️

w związku ze specyfiką pracy aplikacji klient-serwer ustawiamy na serwerze nagłówki cors w poniższy sposób (przypomnienie z lekcji poprzedniej)

npm install cors📄🌓✍️

//zezwolenie na dostęp tylko z tego adresu localhost:5173

const corsOptions = {
origin: 'http://localhost:5173',
credentials: true, //ustawia header access-control-allow-credentials:true
optionSuccessStatus: 200
}

app.use(cors(corsOptions));📄🌓✍️

3. api klienta

a) dodajemy dwa wywołania funkcji post z api

userObject to dane usera przesyłane z formularza

const loginUser = (userObject) => post(`http://localhost:3000/loginUser`, userObject);
const logoutUser = () => post(`http://localhost:3000/logoutUser`);📄🌓✍️

b) oraz wywołanie get-a służące do pobrania bieżącego zalogowanego usera

const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);📄🌓✍️

funkcje exportujemy z api

4. store

dzisiejszy store to plik User.js

nowy store będzie trzymał dane zalogowanego usera

dodajemy w store plik user.js, którego logika jest podobna do poprzednich promotions i promotion
importy funkcji z api, jak widać nie ma tu register dlatego, że rejestracja dzieje się tylko
na serwerze (lekcja poprzednia), nie ma nic wspólnego ze store user

import { loginUser, logoutUser, getCurrentUser } from '@/api';📄🌓✍️

state dla usera

state: {
userObject: null,
userLoading: false,
}📄🌓✍️

mutations dla tych danych SET_CURRENT_USER, SET_CURRENT_LOADING jak zwykle

SET_CURRENT_USER(state, userObject) {
state.userObject = userObject;
}📄🌓✍️

getters dla tych danych GET_CURRENT_USER, GET_CURRENT_LOADING jak zwykle

GET_CURRENT_USER(state) {
return state.userObject;
}📄🌓✍️

actions zostaną omówione później, w punkcie 7

5. router

w routerze przybywa /login

{
path: '/login',
name: 'LoginView',
component: LoginView,
}📄🌓✍️

6. logowanie

proces logowania i wylogowania będzie skonstruowany z użyciem store:

- zalogowanie obsługuje formularz w widoku LoginView
- po zalogowanniu dane usera trzymamy w store User
- wylogowanie czyści te dane

ogólna konstrukcja template w LoginView jest podobna do RegisterView

<form @submit="onSubmit">
   <input v-model="email" />
   <input v-model="password" />
   <button type="submit" :disabled="disabled">Send</button>
</form>📄🌓✍️

w data() tego widoku kluczowa informacja to czy user jest zalogowany
pozostałe dane jak w rejestracji

data() {
return {
logged: false,
};
}📄🌓✍️

metoda onSubmit formularza

onSubmit(e) {
e.preventDefault();

      /* po przejściu walidacji (zachowany format emaila - regex)
      uruchamiamy funkcję ze store User
      jeśli otrzymamy z serwera email zalogowanego usera
      to znaczy, że można wykonywać działania na kliencie
      np przekierować się na inny adres
      logika pozostałych komunikatów musi być oparta o serwer
      */

      this.$store.dispatch("LOGIN_USER", {email: this.email, password: this.password })
          .then(() => {

            const { email } = this.$store.getters.GET_CURRENT_USER;

            if (email) this.logged = true;
            else this.logged = false;

            //this.$router.push("/");
          })
          .catch(() => {
            this.error = "niepoprawne dane logowania";
            this.logged = false;
          });
      }

}📄🌓✍️

7. redirect na kliencie (router)

wymuszenie zmiany adresu w aplikacji klienckiej

this.$router.push("/");📄🌓✍️

8. store actions: LOGIN_USER, LOGOUT_USER

wracamy do store do akcji LOGIN_USER

do serwera przesyłamy dane logowania usera i czekamy co zwróci funkcja
z api loginUser czyli co zwróci serwer

jeśli zwróci emaila to wstawiamy usera do store
jeśli nie to obsługa tej sytuacji

LOGIN_USER({ commit, getters }, { email, password }) {

      commit("SET_CURRENT_USER_LOADING", true);

      return loginUser({ email, password })
        .then((userObject) => {

          if (userObject.email) {
            commit("SET_CURRENT_USER", userObject);
          }

        })
        .finally(() => {
          commit("SET_CURRENT_USER_LOADING", false);
        });

}📄🌓✍️

wylogowanie czyli kolejna action
tu rezultat musi być jeden więc nie ma warunków, wstawiamy null do usera w store

LOGOUT_USER({ commit }) {
commit("SET_CURRENT_USER", null);
return logoutUser();
}📄🌓✍️

9. store action: FETCH_CURRENT_USER

logika: chodzi o to aby wymusić konieczność zalogowania przy odświeżeniu strony jeśli nie jesteśmy zalogowani na kliencie
czyli nie ma usera w store

akcję uruchamiamy w App.vue, zachodzi jeszcze przed created()

beforeCreate() {
this.$store.dispatch("FETCH_CURRENT_USER");
}📄🌓✍️

sama akcja wygląda tak

FETCH_CURRENT_USER({ commit, getters }) {

      //jeśli w store jest user to go zwróć

      if (getters.GET_CURRENT_USER) {
        console.log("jest user w store");
        return Promise.resolve();
      }

      //jeśli w store nie ma usera to go weź z serwera
      //czyli z api /getCurrentUser

      else {

        commit("SET_CURRENT_USER_LOADING", true);
        //
        return getCurrentUser()
          .then((userObject) => {

            console.log("biorę usera z serwera", userObject);
            // jeśli serwer mówi że zalogowany to wstawiam go do store

            if (userObject.email) {
              commit("SET_CURRENT_USER", userObject);
            }
          })
          .finally(() => {
            commit("SET_CURRENT_USER_LOADING", false);
          });
      }

}📄🌓✍️

10. Header

dla oszczędności czasu podczas testów aplikacja nie jest zabezpieczona dla niezalogowanych userów
zrobimy to na sam koniec projektu, w koszyku
na razie można pokazać w headerze odpowiednie przyciski w zależności od sytuacji i dla pewności nazwę zalogowanego usera

w komponencie Header dodajemy computed pobierające nazwę usera ew stan jego ładowania

computed: {
user() {
return this.$store.getters.GET_CURRENT_USER;
    },
    userLoading() {
      return this.$store.getters.GET_CURRENT_USER_LOADING;
},
}📄🌓✍️

przykład wykorzystania w przypadku buttona Login: jest widoczny gdy w store brak usera

<RouterLink v-show="!user" to="/login">
   <button>Login</button>
</RouterLink>📄🌓✍️

podobnie pokazujemy logout, register i dane zalogowanego

na koniec metoda logout w headerze powoduje wylogowanie na serwerze oraz
przekierowanie na /login

logout() {
this.$store.dispatch("LOGOUT_USER")
          .then(() => {
              this.$router.push("/login"); // redirect
});
}📄🌓✍️

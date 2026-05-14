1. dane json aplikacji

jak w poprzedniej części

2. server

część dotycząca rejestracji po stronie serwera

dane o userach trzymamy w pliku json, używając funkcji do odczytu i zapisu plików

uzywamy pakietu

const fs = require('fs').promises;📄🌓✍️

a) zapis (zestringowane dane)

await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');📄🌓✍️

b) odczyt

const data = await fs.readFile(usersFilePath, 'utf8');📄🌓✍️
console.log(JSON.parse(data))📄🌓✍️

c) logika proponowanych postów, również przyszłych

app.post("/createUser", (req, res) => {

// dodanie obiektu usera do pliku json jeśli go nie ma
// ustandaryzowane odpowiedzi do klienta, jak poniżej:
res.json({ status: "registered" })
})📄🌓✍️

d) w związku ze specyfiką pracy aplikacji klient-serwer ustawiamy na serwerze nagłówki cors w poniższy sposób

npm install cors📄🌓✍️

zezwolenie na dostęp tylko z tego adresu (5173), będzie potrzebne przy post

const corsOptions = {
origin: 'http://localhost:5173',
credentials: true, //ustawia header access-control-allow-credentials:true
optionSuccessStatus: 200
}📄🌓✍️

uwaga: poniższa linijka zastępuje poprzednie użycie app.use(cors())

app.use(cors(corsOptions))📄🌓✍️

3. api

w api klienta planujemy ogólną funkcję obsługującą przyszłe posty
ogólnie wygląda jak poprzednio get, służy jednak do wysłania informacji do serwera

zwracam uwagę na obiekt { withCredentials: true } powiązany z cors-ami na serwerze
warto śledzić console.log pokazujący dane zwracane z serwera

const post = (url, userObject) => new Promise((resolve, reject) => {

    setTimeout(() => {
        axios.post(url, userObject, { withCredentials: true }) // nagłówek obsługiwany na serwerze
            .then(response => {
                console.log("data", response.data);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 1000);

})📄🌓✍️

na bazie tej funkcji w api dodajemy jej wywołanie

const registerUser = (userObject) => post(`http://localhost:3000/createUser`, userObject);📄🌓✍️

funkcję exportujemy z api

4. store

w tej części store nie będzie rozwijany

5. router

w routerze przybywa

{
path: '/register',
name: 'RegisterView',
component: RegisterView,
}📄🌓✍️

6. RegisterView

a) html

główna część aplikacji to formularz wysyłający post-a
jego widoczność należy uzależnić od danych w data(), np exists
jeśli serwer zwróci informację, że user już istnieje, pokazujemy np takie okienko

<div v-show="exists">
   <h1>Info</h1>
   <p>User już istnieje</p>
</div>📄🌓✍️

jeśli został zarejestrowany, pokazujemy podobnie komunikat

inne komunikaty do wyboru (np error), na tej samej zasadzie, o wszystkim decyduje odpowiedź z serwera
w poniższym kodzie zwracam uwagę na v-model przekazujący na bieżąco dane do data()

<form @submit="onSubmit" v-show="!exists">

   <div v-show="error">{{ error }} </div>
   <input v-model="email" />
   <input type="password" v-model="password" />

<button type="submit" :disabled="disabled">register</button>

</form>📄🌓✍️

button submit jest aktywny lub nie w zależności od computed disabled

b) js

importujemy funkcję z api

import { registerUser } from "@/api";📄🌓✍️

przykładowe dane w RegisterView, w razie konieczności dodajemy kolejne

data() {
return {
error: "",
email: "",
password:"",
exists: false,
loading: false
};
}📄🌓✍️

w computed ustalamy zasady aktywności buttona submit (minimalna ilość znaków loginu i hasła, pattern emaila)

computed: {
disabled() {
return this.email.length > 3;
},
}📄🌓✍️

przechodzimy do metody onSubmit() wysyłającej formularz
warto wymusić odpowiednią długość hasła, loginu
po walidacji loginu i hasła uruchamiamy metodę registerUser z api
dla chętnych: można ulepszyć metodę stosując async/await

onSubmit(e) {
e.preventDefault();

      if (this.password.length < 3) {
        this.error = "hasło musi mieć ... znaków";
      } else {
        this.error = "";

        // do funkcji przekazujemy obiekt z danymi usera

        registerUser({ email: this.email, password: this.password })
          .then((data) => {

              /* tu kluczowa sprawa, do zsynchronizowania z odpowiedzią serwera:
              na jej podstawie decydujemy czy formularz ma pozostać czy zniknąć
              bo user istnieje już lub nie
              this.exists = true;
              this.registered = true;
              */


          })
          .catch((err) => {
            // w wypadku błędu zakładamy, że user się nie zarejestrował
            this.registered = false;
            this.exists = false;
            this.error = "user nie zarejestrowany";
          })
          .finally(() => {
            // w obu wypadkach zatrzymujemy loader
            this.loading = false;
          });

}📄🌓✍️

wykorzystujemy loader z wcześniejszych zajęć, a więc należy go zaimportować i jego widoczność uzależnić
od zmiennej loading

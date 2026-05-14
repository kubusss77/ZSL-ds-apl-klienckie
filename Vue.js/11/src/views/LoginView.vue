<template>
  <section class="login-view">
    <h1>Login</h1>

    <form @submit.prevent="onSubmit" v-show="!logged" class="login-form">
      <p v-show="error" class="error">{{ error }}</p>

      <input v-model.trim="email" type="email" placeholder="Email" autocomplete="email" />
      <input v-model="password" type="password" placeholder="Password" autocomplete="current-password" />

      <button type="submit" :disabled="disabled || loading">Send</button>
    </form>

    <div v-show="logged" class="success">
      <h2>Zalogowano</h2>
      <p>Witaj {{ email }}</p>
    </div>

    <AppLoader v-show="loading" />
  </section>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue';

export default {
  components: {
    AppLoader,
  },
  data() {
    return {
      error: '',
      email: '',
      password: '',
      logged: false,
      loading: false,
    };
  },
  computed: {
    disabled() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailPattern.test(this.email) || this.password.length < 3;
    },
  },
  methods: {
    onSubmit() {
      this.error = '';
      this.logged = false;
      this.loading = true;

      this.$store
        .dispatch('LOGIN_USER', { email: this.email, password: this.password })
        .then(() => {
          const user = this.$store.getters.GET_CURRENT_USER;
          if (user && user.email) {
            this.logged = true;
            this.$router.push('/');
          } else {
            this.error = 'Niepoprawne dane logowania';
          }
        })
        .catch(() => {
          this.error = 'Niepoprawne dane logowania';
          this.logged = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.login-view {
  max-width: 420px;
  margin: 2rem auto;
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.login-form {
  display: flex;
  flex-flow: column;
  gap: 0.75rem;
}

input,
button {
  padding: 0.6rem;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: #b91c1c;
}

.success {
  padding: 1rem;
  border-radius: 0.25rem;
  background: #ecfdf5;
}
</style>

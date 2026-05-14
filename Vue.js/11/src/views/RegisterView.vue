<template>
  <section class="register-view">
    <h1>Register</h1>

    <form @submit.prevent="onSubmit" v-show="!exists && !registered" class="register-form">
      <p v-show="error" class="error">{{ error }}</p>

      <input v-model.trim="email" type="email" placeholder="Email" autocomplete="email" />
      <input v-model="password" type="password" placeholder="Password" autocomplete="new-password" />

      <button type="submit" :disabled="disabled || loading">register</button>
    </form>

    <div v-show="exists" class="info">
      <h2>Info</h2>
      <p>User juz istnieje</p>
    </div>

    <div v-show="registered" class="success">
      <h2>Sukces</h2>
      <p>User zarejestrowany</p>
    </div>

    <AppLoader v-show="loading" />
  </section>
</template>

<script>
import { registerUser } from '@/api';
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
      exists: false,
      registered: false,
      loading: false,
    };
  },
  computed: {
    disabled() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailPattern.test(this.email) || this.email.length < 4 || this.password.length < 3;
    },
  },
  methods: {
    onSubmit() {
      this.error = '';
      this.exists = false;
      this.registered = false;

      if (this.password.length < 3) {
        this.error = 'Haslo musi miec minimum 3 znaki';
        return;
      }

      this.loading = true;

      registerUser({ email: this.email, password: this.password })
        .then((data) => {
          if (data.status === 'exists') {
            this.exists = true;
            return;
          }

          if (data.status === 'registered') {
            this.registered = true;
            return;
          }

          this.error = 'Nie udalo sie zarejestrowac usera';
        })
        .catch(() => {
          this.error = 'User nie zarejestrowany';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.register-view {
  max-width: 420px;
  margin: 2rem auto;
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.register-form {
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

.info,
.success {
  padding: 1rem;
  border-radius: 0.25rem;
  background: #f3f4f6;
}
</style>

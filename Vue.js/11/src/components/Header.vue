<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/" exact>Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/nnn">Not found</RouterLink></li>
        <li class="spacer"></li>
        <li v-if="userLoading">Loading...</li>
        <li v-if="user" class="user-email">{{ user.email }}</li>
        <li v-if="!user"><RouterLink to="/login">Login</RouterLink></li>
        <li v-if="!user" class="register-link"><RouterLink to="/register">Register</RouterLink></li>
        <li v-if="user"><button type="button" class="logout-btn" @click="logout">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  computed: {
    user() {
      return this.$store.getters.GET_CURRENT_USER;
    },
    userLoading() {
      return this.$store.getters.GET_CURRENT_USER_LOADING;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT_USER').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style>
header {
  width: 100%;
  background: #333;
}

header ul {
  list-style: none;
  display: flex;
  align-items: center;
}

header ul li {
  padding: 0.25rem;
  margin: 0.5rem;
}

.spacer {
  margin-left: auto;
}

header ul li:hover {
  background: #444;
  border-radius: 0.25rem;
}

header ul li.register-link {
  background: #0ea5e9;
  border-radius: 0.4rem;
}

header ul li.register-link:hover {
  background: #0284c7;
}

header ul li.user-email:hover {
  background: transparent;
}

header ul li a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
}

.logout-btn {
  border: 0;
  background: #ef4444;
  color: #fff;
  padding: 0.4rem 0.75rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 1rem;
}
</style>

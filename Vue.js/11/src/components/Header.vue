<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/" exact>Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/nnn">Not found</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style>
header {
  width: 100%;
  background: #333;
}

header ul {
  list-style: none;
  display: flex;
}

header ul li {
  padding: 0.25rem;
  margin: 0.5rem;
}

header ul li:hover {
  background: #444;
  border-radius: 0.25rem;
}

header ul li a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}
</style>

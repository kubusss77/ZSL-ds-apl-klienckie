<template>
  <section class="not-found">
    <h1>404</h1>
    <p>Nie znaleziono strony.</p>
    <RouterLink to="/">Wroc na strone glowna</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 50vh;
  display: grid;
  place-content: center;
  gap: 0.75rem;
  text-align: center;
}

a {
  color: #1d4ed8;
}
</style>

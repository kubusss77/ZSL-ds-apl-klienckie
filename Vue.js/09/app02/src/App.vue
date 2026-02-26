<template>
  <h1>02 Vuex: Actions, mutations</h1>
  <div v-for="post in posts">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('GET_POSTS_ACTION');
  },

  created() {
    console.log('comp created', new Date().getMilliseconds());
  },
  updated() {
    console.log('comp updated', new Date().getMilliseconds());
  },
  destroyed() {
    console.log('comp destroyed', new Date().getMilliseconds());
  },

  computed: {
    posts() {
      const posts = this.$store.getters.GET_POSTS;
      console.log('posts', posts);
      return posts;
    },
  },
};
</script>

<style scoped>
div {
  background: lightgoldenrodyellow;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>

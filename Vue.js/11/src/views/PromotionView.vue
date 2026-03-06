<script>
export default {
  created() {
    this.$store.dispatch('FETCH_PROMOTION', this.$route.params.id);
  },
};
</script>

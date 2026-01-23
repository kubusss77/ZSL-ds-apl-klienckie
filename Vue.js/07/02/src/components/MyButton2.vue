<template>
  <div>
    <button class="b">{{ prop1 }}</button>
    <p :style="{ background: prop2 }">bg passed from app: {{ prop2 }}</p>
  </div>
</template>

<script>
export default {
  props: ['prop1', 'prop2'],
};
</script>

<style scoped>
.b {
  font-size: 30px;
  background: blue;
  border-radius: 10px;
  color: white;
  padding: 10px;
  border: none;
}

div {
  border: 2px dashed blue;
  padding: 10px;
  margin: 20px;
}
</style>

<template>
  <select>
    <option v-for="number in prop1" :style="{ background: '#' + number }">{{ number }}</option>
  </select>
</template>

<script>
export default {
  props: ['prop1'],
};
</script>

<template>
  <MyButton></MyButton>
  <MyButton2 prop1="button2Title" prop2="yellow"></MyButton2>
  <MySelect></MySelect><br /><br />
  <MySelect2 :prop1="selectArray"></MySelect2>
</template>

<script>
import Json from './data/cars';

MyButton2.color = 'blue';

export default {
  data() {
    return {
      json: JsonData,
    };
  },
};
</script>

<style>
#main {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>

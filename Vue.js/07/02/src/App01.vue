<template>
  <MyButton></MyButton>
  <MyButton2 prop1="button2Title" prop2="yellow"></MyButton2>
  <MySelect></MySelect><br /><br />
  <MySelect2 :prop1="selectArray"></MySelect2>
</template>

<script>
import MyButton from './components/MyButton.vue';
import MyButton2 from './components/MyButton2.vue';
import MySelect from './components/MySelect.vue';
import MySelect2 from './components/MySelect2.vue';

MyButton2.color = 'blue';

export default {
  data() {
    return {
      selectArray: ['aaa', 'bbb', 'ccc'],
    };
  },

  components: { MyButton, MyButton2, MySelect, MySelect2 },
};
</script>

<style>
#main {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>

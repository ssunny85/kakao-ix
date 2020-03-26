<template>
  <div class="todo-create">
    <div class="todo-create__inner">
      <input
        type="text"
        v-model="item"
        placeholder="할 일을 입력해주세요." />
      <button
        type="button"
        class="button"
        @click="handleAddItem">
        추가
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: '',
    };
  },
  methods: {
    handleAddItem() {
      console.log('할일 추가!');
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

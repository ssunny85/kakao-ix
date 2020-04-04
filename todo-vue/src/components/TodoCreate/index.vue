<template>
  <div class="todo-create">
    <div class="todo-create__inner">
      <input
        type="text"
        v-model="content"
        placeholder="할 일을 입력해주세요."
        @keyup.enter="handleAddItem" />
      <button
        type="button"
        class="button"
        :disabled="!content"
        @click="handleAddItem">
        추가
      </button>
    </div>
  </div>
</template>

<script>
import TodoApi from '@/api/todo';

export default {
  data() {
    return {
      content: '',
    };
  },
  methods: {
    handleAddItem() {
      const request = {
        content: this.content,
      };
      TodoApi.create(request)
        .then(() => {
          this.$emit('refresh-todo');
          this.content = '';
        })
        .catch((err) => this.$toasted.show(err.response.data.errorMsg));
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

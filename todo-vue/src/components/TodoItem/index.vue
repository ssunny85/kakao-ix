<template>
  <div
    class="list-item"
    :class="{'list-item--completed': todo.completed}">
    <div class="list-item__label checkbox">
      <input
        type="checkbox"
        v-model="completed"
        minlength="1"
        maxlength="200"
        :id="`todo-item-${todo.id}`"
        :disabled="isUpdate"
        @change="handleCompleted(todo.id)"/>
      <label class="list-item__info" :for="`todo-item-${todo.id}`">
        <input
          type="text"
          v-if="isUpdate"
          v-model="content" />
        <strong v-else class="list-item__title">{{ todo.content }}</strong>
        <span class="list-item__created">등록일: {{ todo.createdAt | formatDate }}</span>
        <span class="list-item__updated">최종 수정일: {{ todo.updatedAt | formatDate }}</span>
        <span class="list-item__ref">참조 Todo: {{ referenceIds }}</span>
      </label>
    </div>
    <div class="list-item__button">
      <button
        type="button"
        class="button small"
        v-if="!todo.completed && !isUpdate"
        @click="handleUpdate()">
        수정
      </button>
      <button
        type="button"
        class="button small"
        v-if="isUpdate"
        @click="handleSubmit(todo.id)">
        확인
      </button>
      <button
        type="button"
        class="button small"
        @click="handleDelete(todo.id)">
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import TodoApi from '@/api/todo';
import moment from 'moment';

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      completed: this.todo.completed,
      content: this.todo.content,
      isUpdate: false,
    };
  },
  filters: {
    formatDate: (date) => moment(date).format('YYYY-MM-DD'),
  },
  computed: {
    referenceIds() {
      return this.todo.referenceIds.map((id) => `@${id}`).join(', ');
    },
  },
  methods: {
    handleDelete(id) {
      TodoApi.delete(id)
        .then(() => {
          this.$emit('refresh-todo');
        })
        .catch((err) => console.log(err));
    },
    handleUpdate() {
      this.isUpdate = true;
    },
    handleSubmit(id) {
      const requestData = {
        completed: this.completed,
        content: this.content,
      };
      TodoApi.update(id, requestData)
        .then(() => {
          this.$emit('refresh-todo');
          this.isUpdate = false;
        })
        .catch((err) => console.log(err));
    },
    handleCompleted(id) {
      this.handleSubmit(id);
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

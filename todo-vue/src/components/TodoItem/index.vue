<template>
  <div
    class="todo-item"
    :class="{'todo-item--completed': todo.completed}">
    <div class="todo-item__label checkbox">
      <input
        type="checkbox"
        class="todo-item__completed"
        v-model="completed"
        minlength="1"
        maxlength="200"
        :id="`todo-item-${todo.id}`"
        :disabled="isUpdate"
        @change="handleCompleted(todo.id)" />
      <label class="todo-item__info" :for="`todo-item-${todo.id}`">
        <input
          type="text"
          class="todo-content-update"
          v-if="isUpdate"
          v-model="content" />
        <strong v-else class="todo-item__title">{{ todo.content }}</strong>
        <span class="todo-item__id">ID: <em>{{ todo.id }}</em></span>
        <span class="todo-item__created">등록일: <em>{{ todo.createdAt | formatDate }}</em></span>
        <span class="todo-item__updated">최종 수정일: <em>{{ todo.updatedAt | formatDate }}</em></span>
        <input
          type="text"
          v-if="isUpdate"
          v-model="referenceId"
          placeholder="참조 Todo id 입력 (예: 1, 2)" />
        <span v-else class="todo-item__ref">참조 Todo: <em>{{ referenceIds }}</em></span>
      </label>
    </div>
    <div class="todo-item__button">
      <button
        type="button"
        class="button small"
        v-if="!todo.completed && !isUpdate"
        @click="handleUpdate">
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
        v-if="isUpdate"
        @click="handleCancel">
        취소
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
      referenceId: this.todo.referenceIds,
      isUpdate: false,
    };
  },
  filters: {
    formatDate: (date) => moment(date).format('YYYY-MM-DD'),
  },
  computed: {
    referenceIds() {
      const ids = this.convertReferenceIds(this.todo.referenceIds);
      return ids.map((id) => `@${id}`).join(', ');
    },
  },
  watch: {
    todo: {
      deep: true,
      handler(value) {
        this.completed = value.completed;
        this.content = value.content;
        this.referenceId = value.referenceIds;
      },
    },
  },
  methods: {
    convertReferenceIds(ids) {
      let referenceIds = ids
        .split(',')
        .map((id) => parseInt(id.trim(), 10));
      referenceIds = referenceIds
        .filter((item, index) => referenceIds.indexOf(item) === index)
        .sort();
      return referenceIds;
    },
    checkValidate() {
      const regex = /^[0-9, ]*$/g;
      if (!regex.test(this.referenceId)) {
        this.$toasted.show('참조 TODO 형식이 잘못되었습니다.');
        return false;
      }
      return true;
    },
    handleDelete(id) {
      TodoApi.delete(id)
        .then(() => {
          this.$emit('refresh-todo');
        })
        .catch((err) => this.$toasted.show(err.response.data.errorMsg));
    },
    handleUpdate() {
      this.isUpdate = true;
    },
    async handleSubmit(id) {
      if (!this.checkValidate()) return false;
      const referenceIds = this.convertReferenceIds(this.referenceId);
      const requestData = {
        completed: this.completed,
        content: this.content,
        referenceIds,
      };
      try {
        await TodoApi.update(id, requestData);
        this.$emit('update-todo');
        this.isUpdate = false;
      } catch (err) {
        this.$toasted.show(err.response.data.errorMsg);
        return false;
      }
      return true;
    },
    handleCancel() {
      this.completed = this.todo.completed;
      this.content = this.todo.content;
      this.referenceId = this.todo.referenceIds;
      this.isUpdate = this.todo.completed;
    },
    async handleCompleted(id) {
      const success = await this.handleSubmit(id);
      if (!success) this.completed = !this.completed;
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

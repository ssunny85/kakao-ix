<template>
  <div class="list-item">
    <div class="list-item__label checkbox">
      <input
        type="checkbox"
        :id="`todo-item-${todo.id}`" />
      <label class="list-item__info" :for="`todo-item-${todo.id}`">
        <strong class="list-item__title">{{todo.content}}</strong>
        <span class="list-item__created">등록일: {{todo.createdAt}}</span>
        <span class="list-item__updated">최종 수정일: {{todo.updatedAt}}</span>
        <span class="list-item__ref">참조 Todo: {{todo.referenceId}}</span>
      </label>
    </div>
    <div class="">
      <button
        type="button"
        class="list-item__edit"
        @click="handleUpdate(todo.id)">
        수정
      </button>
      <button
        type="button"
        class="list-item__delete"
        @click="handleDelete(todo.id)">
        <delete-icon />
      </button>
    </div>
  </div>
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import TodoApi from '@/api/todo';

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  components: {
    DeleteIcon,
  },
  methods: {
    handleDelete(id) {
      TodoApi.delete(id)
        .then(() => {
          this.$emit('refresh-todo');
        })
        .catch((err) => console.log(err));
    },
    // handleUpdate(id) {
    //   // TodoApi.update(id)
    //   //   .then(() => {
    //   //     this.$emit('refresh-todo');
    //   //   })
    //   //   .catch((err) => console.log(err));
    // },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

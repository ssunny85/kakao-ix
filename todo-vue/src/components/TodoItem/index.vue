<template>
  <div class="list-item">
    <div class="list-item__label checkbox">
      <input
        type="checkbox"
        :id="`todo-item-${todo.id}`" />
      <label class="list-item__info" :for="`todo-item-${todo.id}`">
        <strong class="list-item__title">{{todo.label}}</strong>
        <span class="list-item__created">등록일: {{todo.createdOn}}</span>
        <span class="list-item__updated">최종 수정일: {{todo.updatedOn}}</span>
        <span class="list-item__ref">참조 Todo: {{todo.referenceId}}</span>
      </label>
    </div>
    <button
      type="button"
      class="list-item__delete"
      @click="handleDelete">
      <delete-icon />
    </button>
  </div>
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue';

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
    handleDelete() {
      console.log('삭제');
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

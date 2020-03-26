<template>
  <div class="todo">
    <h1 class="todo__title">TODO APP</h1>
    <div class="todo__inner">
      <todo-create></todo-create>
      <div class="todo__board">
        <todo-search></todo-search>
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            <todo-item :todo="todo"></todo-item>
          </li>
        </ul>
        <todo-pagination></todo-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCreate from '@/components/TodoCreate/index.vue';
import TodoSearch from '@/components/TodoSearch/index.vue';
import TodoItem from '@/components/TodoItem/index.vue';
import TodoPagination from '@/components/TodoPagination/index.vue';

export default {
  components: {
    TodoCreate,
    TodoSearch,
    TodoItem,
    TodoPagination,
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          label: 'TODO item 1',
          createdOn: '2020-02-28',
          updatedOn: '2020-03-25',
          referenceId: [],
        },
        {
          id: 2,
          label: 'TODO item 2',
          createdOn: '2020-02-28',
          updatedOn: '2020-03-25',
          referenceId: [],
        },
        {
          id: 3,
          label: 'TODO item 3',
          createdOn: '2020-02-28',
          updatedOn: '2020-03-25',
          referenceId: [],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

<template>
  <div class="todo">
    <h1 class="todo__title">TODO APP</h1>
    <div class="todo__inner">
      <todo-create @refresh-todo="refreshTodo"></todo-create>
      <div class="todo__board">
        <todo-search></todo-search>
        <ul>
          <li v-if="todos.length === 0" class="no-data">
            데이터가 없습니다.
          </li>
          <li v-else>
            <template v-for="todo in todos">
              <todo-item
                :todo="todo"
                :key="todo.id"
                @refresh-todo="refreshTodo">
              </todo-item>
            </template>
          </li>
        </ul>
        <todo-pagination
          :paging="paging"
          @refresh-todo="refreshTodo">
        </todo-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCreate from '@/components/TodoCreate/index.vue';
import TodoSearch from '@/components/TodoSearch/index.vue';
import TodoItem from '@/components/TodoItem/index.vue';
import TodoPagination from '@/components/TodoPagination/index.vue';
import TodoApi from '@/api/todo';

export default {
  components: {
    TodoCreate,
    TodoSearch,
    TodoItem,
    TodoPagination,
  },
  data() {
    return {
      paging: {},
      todos: [],
    };
  },
  created() {
    this.initTodo();
  },
  methods: {
    getTodos(pageNo) {
      TodoApi.list(pageNo)
        .then(({ data }) => {
          this.todos = data.todos;
          this.paging = data.paging;
        })
        .catch((err) => console.log(err));
    },
    initTodo() {
      this.getTodos(1);
    },
    refreshTodo(pageNo) {
      console.log(pageNo);
      this.getTodos(pageNo);
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

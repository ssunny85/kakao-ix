<template>
  <div class="todo">
    <div class="todo__inner">
      <todo-create @refresh-todo="refreshTodo"></todo-create>
      <div class="todo__board">
        <todo-search
          ref="search"
          :condition="condition"
          @search-todo="searchTodo">
        </todo-search>
        <ul class="todo__list">
          <li v-if="todos.length === 0" class="no-data">
            데이터가 없습니다.
          </li>
          <template v-else>
            <li class="todo__list__item" v-for="todo in todos" :key="todo.id">
              <todo-item
                :todo="todo"
                @refresh-todo="refreshTodo"
                @update-todo="updateTodo">
              </todo-item>
            </li>
          </template>
        </ul>
        <todo-pagination
          :paging="paging"
          @page-todo="pageTodo">
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
      condition: {},
      paging: {},
      todos: [],
    };
  },
  created() {
    this.initTodo();
  },
  methods: {
    getTodos(requestData) {
      TodoApi.list(requestData)
        .then(({ data }) => {
          this.todos = data.todos.map((todo) => ({
            ...todo,
            referenceIds: todo.referenceIds.join(', '),
          }));
          this.paging = data.paging;
        })
        .catch((err) => this.$toasted.show(err.response.data.errorMsg));
    },
    initTodo() {
      const requestData = {
        condition: {},
        paging: {
          no: 1,
        },
      };
      this.getTodos(requestData);
    },
    searchTodo(data) {
      this.condition = { ...data };
      const requestData = {
        condition: {
          ...data,
        },
        paging: {
          no: 1,
        },
      };
      this.getTodos(requestData);
    },
    pageTodo(pageNo) {
      const requestData = {
        condition: { ...this.condition },
        paging: {
          no: pageNo,
        },
      };
      this.getTodos(requestData);
    },
    updateTodo() {
      const requestData = {
        condition: { ...this.condition },
        paging: {
          no: this.paging.no,
        },
      };
      this.getTodos(requestData);
    },
    refreshTodo() {
      this.initTodo();
      this.condition = {};
      this.$refs.search.init();
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

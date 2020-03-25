<template>
  <div class="todo">
    <h1 class="todo__title">TODO APP</h1>
    <div class="todo__inner">
      <div class="todo__create">
        <input type="text" />
        <button type="button" class="button">Add</button>
      </div>
      <ul class="todo__list">
        <li
          class="list-item"
          v-for="todo in todos"
          :key="todo.id">
          <div class="list-item__label">
            <input type="checkbox" id="todo-item1" />
            <label class="list-item__info" for="todo-item1">
              <strong>{{todo.label}}</strong>
              <span>등록일: {{todo.createdOn}}</span>
              <span>최종 수정일: {{todo.updatedOn}}</span>
              <span>참조 Todo: {{todo.referenceId}}</span>
            </label>
          </div>
          <button type="button" class="list-item__delete">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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

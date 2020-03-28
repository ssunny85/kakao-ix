<template>
  <div class="todo-search">
    <div class="todo-search__item">
      <label for="search-type" class="blind">검색구분</label>
      <select
        id="search-type"
        v-model="searchType">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <label for="search-text" class="blind">검색단어</label>
      <input
        type="text"
        id="search-text"
        v-model="searchText"
        placeholder="검색어를 입력하세요."
        @keyup.enter="handleSearch" />
      <button
        type="button"
        class="button"
        @click="handleSearch">
        검색
      </button>
      <div class="todo-search--status">
        <span class="checkbox">
          <input
            type="checkbox"
            id="completed-status"
            v-model="completed"
            @change="handleCompleted"/>
          <label for="completed-status">완료</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const options = [
  {
    value: 'content',
    label: '검색어',
  },
  {
    value: 'createdAt',
    label: '등록일',
  },
];
export default {
  data() {
    return {
      options: [...options],
      searchType: 'content',
      searchText: '',
      completed: false,
    };
  },
  methods: {
    init() {
      this.searchType = 'content';
      this.searchText = '';
      this.completed = false;
    },
    handleSearch() {
      const condition = {
        type: this.searchType,
        text: this.searchText,
        completed: this.completed,
      };
      this.$emit('search-todo', condition);
    },
    handleCompleted() {
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

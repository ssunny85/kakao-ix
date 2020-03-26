<template>
  <div class="todo-search">
    <div class="todo-search__item">
      <select>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <input
        type="text"
        placeholder="검색어를 입력하세요." />
      <button
        type="button"
        class="button"
        @click="handleSearch">
        검색
      </button>
      <div class="todo-search--status">
        <span class="checkbox">
          <input type="checkbox" id="check-status" />
          <label for="check-status">완료</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const options = [
  {
    value: 'keyword',
    label: '검색어',
  },
  {
    value: 'createdOn',
    label: '등록일',
  },
];
export default {
  data() {
    return {
      options: [...options],
    };
  },
  methods: {
    handleSearch() {
      console.log('검색!');
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

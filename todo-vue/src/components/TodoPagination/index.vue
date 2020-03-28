<template>
  <div class="todo-pagination">
    <button
      type="button"
      v-if="pageNo > 1"
      class="todo-pagination__prev"
      @click="handlePage(pageNo - 1)">
      <arrow-left />
    </button>
    <button
      type="button"
      v-for="page in pages"
      :key="page"
      class="todo-pagination__link"
      :class="{'todo-pagination--current': pageNo === page}"
      @click="handlePage(page)">
      {{ page }}
    </button>
    <button
      type="button"
      v-if="pageNo < pages.length"
      class="todo-pagination__next"
      @click="handlePage(pageNo + 1)">
      <arrow-right />
    </button>
  </div>
</template>

<script>
import ArrowLeft from 'vue-material-design-icons/ArrowLeftCircle.vue';
import ArrowRight from 'vue-material-design-icons/ArrowRightCircle.vue';

export default {
  props: {
    paging: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArrowLeft,
    ArrowRight,
  },
  computed: {
    pageNo() {
      return this.paging.no;
    },
    pages() {
      const pages = [];
      let pageCnt = parseInt((this.paging.total / this.paging.limit), 10);
      pageCnt += (this.paging.total % this.paging.limit) > 0 ? 1 : 0;
      for (let i = 0; i < pageCnt; i += 1) {
        pages.push(i + 1);
      }
      return pages;
    },
  },
  methods: {
    handlePage(pageNo) {
      this.$emit('refresh-todo', pageNo);
    },
  },
};
</script>

<style lang="scss" scoped src="./style.scss"></style>

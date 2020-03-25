<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Todo App',
    htmlAttrs: {
      lang: 'ko',
    },
  },
};
</script>

<style lang="scss" src="./assets/scss/todo.scss"></style>

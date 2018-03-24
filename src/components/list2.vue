<template>
  <div>
      <h1>{{title}}</h1>
      方式1：<a href="#/">回到首页</a>
      <br>
      方式2：<router-link to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Welcome to list2"
    };
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

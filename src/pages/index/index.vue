<template>
    <div id="app">
        这里是首页，<a href="list.html">进入列表页</a>

        <br><br>

        这里是首页，<a href="#/list2.html">进入列表页2</a>　<router-link to="/list2.html">进入列表页2</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>

</style>


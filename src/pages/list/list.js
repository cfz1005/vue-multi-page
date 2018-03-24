import Vue from 'Vue';
import list from './list.vue';

new Vue({
    el: '#app',             // 这里参考list.html和list.vue的根节点id，保存三者一致
    render: h => h(list)
    // template: '',
    // components: { list }
});
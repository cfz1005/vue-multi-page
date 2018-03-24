// import Vue from 'Vue';
// import index from './index.vue';

// new Vue({
//     el: '#app',             // 这里参考index.html和index.vue的根节点id，保存三者一致
//     render: h => h(index)
//     // render(h){return h(index)}
//     // render: function (createElement) {
//     //     // return createElement(index);
//     //     // return createElement("div","Hello World!");
//     // }
// });


import Vue from 'vue'
import index from './index.vue'
import router from './router'   // './router/index.js'

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router, // router:router,
    // template: "<index/>",
    // components: { index }
    render: h => h(index)
});
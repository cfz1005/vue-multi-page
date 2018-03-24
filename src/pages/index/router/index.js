import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import list2 from '@/components/list2'

Vue.use(Router);

export default new Router({
    // mode:"history",//hash
    routes: [
        {
            path: '/',
            name: 'Hello',
            // component: Hello
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/list2.html',
            name: 'list2',
            component: list2
        }
    ]
});
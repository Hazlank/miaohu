// 运行依赖库
import Vue from "vue/dist/vue.common.js";
import canvas from "../public/src/components/login/canvas";
import VueRouter from "vue-router";
// Vue 组件
import loginChange from "../public/src/components/login/loginChange";
import loginComponent from "../public/src/components/login/loginComponent";

//框架ui样式
import "nprogress/nprogress.css";



 new Vue({
    el: "canvas-component",
    render: h => h(canvas),
});

Vue.use(VueRouter);


const routes = [
    {
        path: '/signup', component:loginChange
    },
    {
        path: '/signin', component: loginChange
    }
];


const router = new VueRouter({
    // mode: 'history',
    routes,// （缩写）相当于 routes: routes,

});

new Vue({
    el: "login-component",
    render: h => h(loginComponent),
    router,
});









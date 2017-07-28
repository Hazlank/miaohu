// 运行依赖库
import Vue from "vue";
import vueRouter from "vue-router";
import Vuex from "vuex";
import axios from "axios";
import store from "@/components/wrapper/store";
import routes from "@/routers.js"
import qs from 'querystring';


//框架ui样式
import "nprogress/nprogress.css";
import "@/common/css/fontIcon/iconfont.css";
import "@/common/css/common.sass"

//公共参数
import { apiDomain } from "@/common/js/public.js";
global.apiDomain = apiDomain;


Vue.use(vueRouter);
Vue.use(Vuex);



Vue.prototype.$ajax = axios;
Vue.prototype.$ajaxPost = function (url, parameter, callback) {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (localStorage.token)
        headers.token = localStorage.token;
    axios({
        method: "post",
        url: `${apiDomain}${url}`,
        headers,
        data: qs.stringify(parameter)
    }).then(d => console.log(d))
}


Vue.prototype.$ajaxGet = function (url, params, callback) {
    if (localStorage.token) {
        var headers = {
            token: localStorage.token
        };
    }
    this.$ajax({
        method: "get",
        url: `${apiDomain}${url}`,
        params: params,
        headers
    }).then(callback)
}



const router = new vueRouter({
    mode: 'history',
    routes,

});



router.beforeEach((to, from, next) => {
    if (to.meta.token) {
        if (localStorage.token) {
            next()
        } else {
            next({
                path: '/',
            })
        }
    } else if (to.meta.login) {
        if (localStorage.token) {
            next({
                path: '/',
            })
        } else {
            next()
        }
    }
    next()
});

new Vue({
    store,
    router,
}).$mount('#miaohu');

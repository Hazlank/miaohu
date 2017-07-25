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
global.apiDomain=apiDomain;
// Vue 组件
/**
 * 知乎登录页面组件
 */

/**
 *  知乎登录后提问首页
 */
// import header from "@/components/homePage/header";
// import article from "@/components/homePage/article";



// Vue.component('captcha-component', {
//     created(){
//         this.$on('captcha',function(){
//             this.captchaed()
//         })
//     },
//     template: `<div  :class="{'input_captchaT':captcha}"
//                      class="div_input input_top  input_captcha">
//                 <input type="captcha"
//                        placeholder="验证码">
//                 <span class="captcha">
//                                 <img src="common/images/captcha.gif" alt="">
//                            </span>
//                 <label></label>
//             </div>`,
//     data() {
//         return {
//             captcha: false
//         }
//     },
//     methods: {
//         captchaed(){
//             this.captcha=true;

//         }
//     }
// })

Vue.use(vueRouter);
Vue.use(Vuex);
console.log(Vuex)


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
   console.log(1)
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


new Vue({
    // el: ".",

    // components: {
    //     loginComponent: loginComponent,
    //     canvasComponent: canvas,
    //     wrapper: wrapper,
    // },
    store,
    router,
}).$mount('#miaohu');

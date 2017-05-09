// 运行依赖库
import Vue from "vue";
import vueRouter from "vue-router";
import axios from "axios";
import store from "@components/wrapper/store";


//框架ui样式
import "nprogress/nprogress.css";
import "@common/css/fontIcon/iconfont.css";
import "@common/css/common.sass"


// Vue 组件
import canvas from "@components/login/canvas";
import loginChange from "@components/login/loginChange";
import loginComponent from "@components/login/loginComponent";
import wrapper from "@components/wrapper";
import captcha from "@components/captcha";


Vue.component('captcha-component', {
    created(){
        this.$on('captcha',function(){
            this.captchaed()
        })
    },
    template: `<div  :class="{'input_captchaT':captcha}"
                     class="div_input input_top  input_captcha">
                <input type="captcha"
                       placeholder="验证码">
                <span class="captcha">
                                <img src="src/common/images/captcha.gif" alt="">
                           </span>
                <label></label>
            </div>`,
    data() {
        return {
            captcha: false
        }
    },
    methods: {
        captchaed(){
            this.captcha=true;
        }
    }
})

Vue.use(vueRouter);


Vue.prototype.$ajax = axios;



const routes = [
    {
        path: '/signup', component: loginChange,
    },
    {
        path: '/signin', component: loginChange
    }
];


const router = new vueRouter({
    // mode: 'history',
    routes,

});


new Vue({
    el: ".index-component",
    components: {
        loginComponent: loginComponent,
        canvasComponent: canvas,
        wrapper: wrapper,
    },
    store,
    router,
});









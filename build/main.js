// 运行依赖库
import Vue from "vue/dist/vue.common.js";
import axios from 'axios';
import VueRouter from "vue-router";
//Vue 组件
import header from "../public/src/components/homePage/header";
import article from "../public/src/components/homePage/article";



 new Vue({
    el: "#homepage",
    components: {
        homepageHeader:header,
        homepageArticle:article
    }
});



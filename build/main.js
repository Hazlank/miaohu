// 运行依赖库
import Vue from "vue";
import axios from 'axios';
import VueRouter from "vue-router";
//Vue 组件
import header from "@components/homePage/header";
import article from "@components/homePage/article";



 new Vue({
    el: "#homepage",
    components: {
        homepageHeader:header,
        homepageArticle:article
    }
});



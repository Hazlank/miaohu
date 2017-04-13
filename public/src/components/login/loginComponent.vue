<template>
    <div class="login_height">
        <div id="login_contain">
            <div class="login_middle">
                <div class="login_head">
                    <h1 class="login_log"></h1>
                    <h2 class="head_title">与世界分享你的知识、经验和见解</h2>
                    <div class="head_choice">
                        <div class="navs-slider"
                             :class="changeClass">
                            <router-link @click.native="changeType('register')"
                                         to="/signup">注册</router-link>
                            <router-link @click.native="changeType('login')"
                                         to="/signin">登录</router-link>
                            <span class="navs-slider-bar"></span>
                        </div>
                    </div>
                </div>
                <div class='login_chang'>
                    <router-view></router-view>
                </div>
                <div class="QRcode">
                    <button class="show"
                            :class='changeClass'>
                        <span>
                        下载知乎 App
                    </span>
                    </button>
                </div>
            </div>
    
        </div>
        <footer class="footer">
            <span>© 2017 知乎</span>
            <span class="dot">·</span>
            <a target="_blank"
               href="/roundtable">知乎圆桌</a>
            <span class="dot">·</span>
            <a target="_blank"
               href="/explore"
               data-za-c="explore"
               data-za-a="visit_explore"
               data-za-l="home_bottom_explore">发现</a>
            <span class="dot">·</span>
            <a target="_blank"
               href="/app">移动应用</a>
            <span class="dot">·</span>
    
            <a href="/org/signin"
               class="footer-mobile-show">使用机构帐号登录</a>
    
            <span class="dot footer-mobile-show">·</span>
    
            <a href="/contact"
               class="footer-mobile-show">联系我们</a>
            <span class="dot">·</span>
            <a target="_blank"
               href="/careers">来知乎工作</a>
            <br>
            <a href="http://www.miibeian.gov.cn/"
               target="_blank">京 ICP 证 110745 号</a>
            <span class="dot">·</span>
            <span>京公网安备 11010802010035 号</span>
            <span class="dot">·</span>
            <a href="http://zhstatic.zhihu.com/assets/zhihu/publish-license.jpg"
               target="_blank">出版物经营许可证</a>
 
        </footer>
    </div>
</template>

<script>
import loginChange from "./loginChange";
import Vue from "vue/dist/vue.common";
import { bus } from "./bus";//vue事件驱动需要用到相同类
import axios from 'axios';


import VueRouter from "vue-router"

export default {
    data() {
        /**
         * login|register识别参数
         * 
         * 
         */
        return {
            changeClass: (this.$route.path.replace(/\//, "")) == "signin" ? "navs-login" : "navs-register",
        }
    },
    methods: {
        /**
         * 组件根据type转换元素
         * type有两种参数判断register和login
         * @param {String} type
         */
        changeType(type) {
            bus.$emit("type-change", type);
            this.changeClass = "navs-" + type;
        },
    }
}






</script>

<style>
@import "../../common/css/fontIcon/iconfont.css";
</style>

<style lang='sass' rel='stylesheet/sass'>
@import "../../common/css/common.sass"
//公共sass，css reset
@import "login.sass"

</style>
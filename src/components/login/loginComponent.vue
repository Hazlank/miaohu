<template>
    <div class='index-component'>
        <div class="miaohu_height">
            <div id="miaohu_contain">
                <div class="miaohu_middle">
                    <div class="miaohu_head">
                        <h1 class="miaohu_log"></h1>
                        <h2 class="head_title">与世界分享你的知识、经验和见解</h2>
                        <div class="head_choice">
                            <div class="navs-slider" :class="changeClass">
                                <router-link to="/register">注册</router-link>
                                <router-link to="/login">登录</router-link>
                                <span class="navs-slider-bar"></span>
                            </div>
                        </div>
                    </div>
                    <div class='miaohu_chang'>
                        <login-change ref="loginChange"></login-change>
                    </div>
                    <div class="QRcode">
                        <button class="show" :class='changeClass'>
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
                <a target="_blank" href="/roundtable">知乎圆桌</a>
                <span class="dot">·</span>
                <a target="_blank" href="/explore" data-za-c="explore" data-za-a="visit_explore" data-za-l="home_bottom_explore">发现</a>
                <span class="dot">·</span>
                <a target="_blank" href="/app">移动应用</a>
                <span class="dot">·</span>
                <a href="/org/signin" class="footer-mobile-show">使用机构帐号登录</a>
                <span class="dot footer-mobile-show">·</span>
                <a href="/contact" class="footer-mobile-show">联系我们</a>
                <span class="dot">·</span>
                <a target="_blank" href="/careers">来知乎工作</a>
                <br>
                <a href="http://www.miibeian.gov.cn/" target="_blank">京 ICP 证 110745 号</a>
                <span class="dot">·</span>
                <span>京公网安备 11010802010035 号</span>
                <span class="dot">·</span>
                <a href="http://zhstatic.zhihu.com/assets/zhihu/publish-license.jpg" target="_blank">出版物经营许可证</a>
            </footer>
        </div>
        <canvas-component></canvas-component>
        <wrapper ref="wrapper"></wrapper>
        <div class="login-wrapper"></div>
    </div>
</template>

<script>
    import loginChange from "./loginChange";
    import wrapper from "@/components/wrapper"
    import canvas from "./canvas";
    import {bus} from "./bus"; //vue事件驱动需要用到相同类

    export default {
        data() {
            /**
             * login|register识别参数
             * 
             * 
             */
            return {
                changeClass: (this.$route.path.replace(/\//, "")) == "login" ? "navs-login" : "navs-register",
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
        },
        watch: {
            '$route' (to) {
                this.changeType(to.path.match(/\w+/g)[0]);
            }
        },
        components:{
            loginChange,
            wrapper,
            canvasComponent:canvas,
            
        }
    }
</script>


<style lang="sass" scoped>


.index-component
    height: 100%
    text-align: center
    /* overflow-x: hidden; */
    color: #555
    .login-wrapper
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #f7fafc
        padding-bottom: 60px
        z-index: -2;

.miaohu_height
    height: 100%

#miaohu_contain
    white-space: nowrap
    height: 100%
    margin-bottom: -42px
    &:before
        content: ''
        display: inline-block
        height: 100%
        vertical-align: middle
        margin-right: -.25em

  

#miaohu_contain .miaohu_log
    margin: 0 auto
    width: 160px
    height: 74px
    background: url(/static/Websitelogo.png) no-repeat
    background-size: 
    
.miaohu_middle
    display: inline-block
    vertical-align: middle
    min-height: 590px

#c_piture
    position: absolute
    top: 0
    z-index: -1
    width: 100%
    height: 100%

#miaohu_contain .miaohu_chang
    width: 298px
    margin: 0 auto
   


.miaohu_head .head_title
    margin: 30px 0 20px
    font-weight: 400
    font-size: 18px
    line-height: 1

.navs-slider a
    width: 4em
    line-height: 35px
    font-size: 18px
    text-align: center
    display: inline-block
    opacity: .5
    transition: opacity .15s
    &:hover
        opacity: .7

.navs-slider
    width: 200px
    margin: 0 auto
    position: relative
    margin-bottom: 15px

.navs-slider-bar
    position: absolute
    bottom: 0
    margin: 0 .8em
    width: 2.7em
    height: 2px
    background: #0f88eb
    -webkit-transition: left .15s ease-in
    transition: left .15s ease-in
    left: 28px
    transition: translate3d(0,0,0,0)
    -webkit-transition: translate3d(0,0,0,0);

.head_choice .navs-login .navs-slider-bar
    left: 104px

.head_choice .navs-register .navs-slider-bar
    left: 28px


.QRcode
    width: 300px
    margin: 0 auto

.QRcode .show
    width: 100%
    height: 41px
    line-height: 39px
    color: #5fa6e5
    border: 1px solid #96c2e9
    border-radius: 3px
    cursor: pointer
    outline: none
    background: initial

.QRcode .navs-login
    margin-top: 24px

.QRcode .navs-register
    margin-top: 48px
    
.identity-phone,.problem
    font-size: 14px
    margin-top: 18px 
    text-align: initial

.problem .social-account
    cursor: pointer
    margin-right: 20px
    color: #787878
    

.identity-phone .signin-phone
    color: #5ca5e8
    background: transparent
    border: 0
    cursor: pointer
    outline: none
    float: left
    padding: 0 
    font-size: 14px

.identity-phone a
    float: right
    color: #555

.footer
    font-size: 12px
    line-height: 21px
    text-align: center


.footer a,.footer span
    color: #aebdc9!important

.footer .dot 
    margin: 0 3px

.head_choice .router-link-active
    color: #0f88eb
    opacity: 1!important



</style>

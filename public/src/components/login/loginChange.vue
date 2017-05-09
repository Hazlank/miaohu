<template>
    <div v-if="choiceType ==='register'">
        <div class="group_input">
            <div class="div_input"
                 :class="{'label-error':registerMsg.msg.username}"
                 @click="errorHide('username')"
                 ref="username">
                <input type="text"
                       placeholder="姓名"
                       id="register-user"
                       v-model="registerData.username"
                       @focus="errorHide('username')"
                       @keyup="getCaptcha">
                <label>{{registerMsg.msg.username}}</label>
            </div>
            <div class="div_input input_top"
                 :class="{'label-error':registerMsg.msg.phone}"
                 @click="errorHide('phone')"
                 ref="phone">
                <input type="text"
                       @focus="errorHide('phone')"
                       placeholder="手机号或邮箱"
                       v-model="registerData.phone"
                       @keyup="getCaptcha">
                <label>{{registerMsg.msg.phone}}</label>
            </div>
            <div class="div_input input_top"
                 :class="{'label-error':registerMsg.msg.password}"
                 @click="errorHide('password')"
                 ref="password">
                <input type="password"
                       placeholder="密码（不少于 6 位）"
                       v-model="registerData.password"
                       @focus="errorHide('password')"
                       @keyup="getCaptcha">
                <label>{{registerMsg.msg.password}}</label>
            </div>
           <captcha-component ref="captcha"></captcha-component>
        </div>
    
        <div class="group_click"
             @click="register">
            <span>注册知乎</span>
        </div>
        <p class="agreement-tip">点击「注册」按钮，即代表你同意<a href="/#"
               target="_blank">《知乎协议》</a></p>
    </div>
    
    <div v-else>
        <div class="group_input"
             v-if="loginType==='Pc'">
            <div class="div_input">
                <input type="text"  @keyup="getCaptcha"
                       placeholder="手机号或邮箱"
                       v-model="loginData.phone">
            </div>
            <div class="div_input input_top">
                <input type="password"  @keyup="getCaptcha"
                       placeholder="密码"
                       v-model="loginData.password">
            </div>
            <captcha-component ref="captcha"></captcha-component>
        </div>
        <div class="group_input"
             v-else>
            <div class="div_input">
                <input type="text"
                       placeholder="手机号"
                       name="phone">
            </div>
            <div class="div_input input_top">
                <input type="text"
                       class="sm"
                       placeholder="短信验证码">
                <button type="button"
                        class="send-code-button">获取验证码</button>
            </div>
        </div>
        <div class="group_click"
             @click="login">
            <span>登录</span>
        </div>
        <div class="identity-phone"
             v-if="loginType=='Pc'">
            <button type="button"
                    class="signin-phone"
                    @click="Changelogin('Phone')">手机验证码登录</button>
            <a class="unable-login"
               href="#">无法登录？</a>
        </div>
        <div class="identity-phone"
             v-else>
            <button type="button"
                    class="signin-phone"
                    @click="Changelogin('Pc')">密码登录（手机号或邮箱）</button>
        </div>
        <div class="clear_b"></div>
        <div class="problem">
            <span class="social-account"
                  @click="Community">社交帐号登录</span>
            <div class="social-div"
                 :class="{'social-trans':social}">
                <span class="social-wexin"><a class="iconfont" href='https://github.com/login/oauth/authorize?scope=user:email&client_id=9d37c9f54b2009868da8'>&#xe674;</a></span>
                <span class="social-sina"><a class="iconfont">&#xe60a;</a></span>
                <span class="social-qq"><a class="iconfont">&#xe658;</a></span>
            </div>
        </div>
    </div>
</template>

<script>

import nprogress from "nprogress";
import { mapActions } from "vuex"
import { bus } from "./bus";
import { apiDomain } from "@common/js/public.js";

export default {

    created() {

        this.choiceType = (this.$route.path.replace(/\//, "")) == "signin" ? "login" : "register";
        bus.$on("type-change", b => {
            this.choiceType = b;
        })

    },
    data() {
        return {
            choiceType: 'register',
            social: false,
            loginType: 'Pc',
            //注册传输信息
            registerData: {
                username: "",
                password: "",
                phone: "",
                imageCaptcha: "",
                captcha: false,
            },

            //注册结果信息
            registerMsg: {
                code: "",
                msg: {
                    username: "",
                    imageCaptcha: "",
                    password: "",
                    phone: "",

                },
                error: "",
            },
            loginData: {
                phone: "",
                password: "",
            },

        }

    },
    methods: {

        //社区账号显示
        Community() { this.social = this.social ? false : true },
        //账号登录or手机验证码登录  
        Changelogin(t) { this.loginType = t },
        register() {
            let that = this
            let registerData = that.registerData;
            //短信验证码输入框
            this.wrapperDisplay();
            this.$ajax({
                method: 'get',
                url: `${apiDomain}/register`,
                params: registerData
            }).then(function (res) {
                var msg = that.registerMsg.msg;
                ({ username: (msg.username), phone: (msg.phone), password: (msg.password) } = res.data.errors)
            }).catch(error => console.log(error))
        },
        errorHide(type) {
            let that = this;
            this.$refs[type].classList.remove('label-error')
            setTimeout(function () {
                that.registerMsg.msg[type] = '';
            }, 250);
        },
        login() {
            let loginData = this.loginData;
            this.$ajax({
                method: "get",
                url: `${apiDomain}/user/login`,
                params: loginData,
            }).then(res => { res.data.code == 200 ? location.href = '/signin.html' : flase })
        },
        getCaptcha() {
            var data = this.registerData;
            if (data.username && data.phone && data.password)
                this.$refs.captcha.$emit("captcha");
        },
        ...mapActions(["wrapperDisplay"]),
    },
    watch: {
        '$route'(to) {

        }
    },
}




</script>


<template>
    <div class="miaohu-template">
        <div v-show="choiceType ==='register'" class="miaohu-registerContent">
            <div class="group_input">
                <div class="div_input" :class="{'label-error':registerMsg.msg.username}" @click="errorHide('username')" ref="register-username">
                    <input type="text" placeholder="姓名" id="register-user" v-model="registerData.username" @focus="errorHide('username')" @keyup="getCaptcha('register')">
                    <label>{{registerMsg.msg.username}}</label>
                </div>
                <div class="div_input input_top" :class="{'label-error':registerMsg.msg.phone}" @click="errorHide('phone')" ref="register-phone">
                    <input type="text" @focus="errorHide('phone')" placeholder="手机号或邮箱" v-model="registerData.phone" @keyup="getCaptcha('register')">
                    <label>{{registerMsg.msg.phone}}</label>
                </div>
                <div class="div_input input_top" :class="{'label-error':registerMsg.msg.password}" @click="errorHide('password')" ref="register-password">
                    <input type="password" placeholder="密码（不少于 6 位）" v-model="registerData.password" @focus="errorHide('password')" @keyup="getCaptcha('register')">
                    <label>{{registerMsg.msg.password}}</label>
                </div>
                <captcha-component :captchaError="registerMsg.msg.imageCaptcha" @click.native="errorHide('imageCaptcha')" ref="register-imageCaptcha"></captcha-component>
                <!--<div v-for="(data ,index) in registerMsg.msg" class="div_input" :class="{'label-error':registerMsg.msg.username}"   @click="errorHide(index)"  v-bind:key="data">
                                    <input type="text" placeholder="姓名" v-model="registerData.username" @focus="errorHide('username')" @keyup="getCaptcha('register')" />
                              </div>-->
            </div>
            <div class="group_click" @click="register">
                <span>注册知乎</span>
            </div>
            <p class="agreement-tip">点击「注册」按钮，即代表你同意
                <a href="/#" target="_blank">《知乎协议》</a>
            </p>
        </div>
        <div v-show="choiceType ==='login'" class="miaohu-loginContent">
            <div class="group_input" v-if="loginType==='Pc'">
                <div class="div_input">
                    <input type="text" @keyup="getCaptcha('login')" placeholder="手机号或邮箱" v-model="loginData.phone">
                </div>
                <div class="div_input input_top">
                    <input type="password" @keyup="getCaptcha('login')" placeholder="密码" v-model="loginData.password">
                </div>
                <captcha-component :captchaError="loginMsg.error" @click.native="errorHide('imageCaptcha')" ref="login-imageCaptcha"></captcha-component>
            </div>
            <div class="group_input" v-else>
                <div class="div_input">
                    <input type="text" placeholder="手机号" name="phone">
                </div>
                <div class="div_input input_top">
                    <input type="text" class="sm" placeholder="短信验证码">
                    <button type="button" class="send-code-button">获取验证码</button>
                </div>
            </div>
            <div class="group_click" @click="login">
                <span>登录</span>
            </div>
            <div class="identity-phone" v-if="loginType=='Pc'">
                <button type="button" class="signin-phone" @click="Changelogin('Phone')">手机验证码登录</button>
                <a class="unable-login" href="#">无法登录？</a>
            </div>
            <div class="identity-phone" v-else>
                <button type="button" class="signin-phone" @click="Changelogin('Pc')">密码登录（手机号或邮箱）</button>
            </div>
            <div class="clear_b"></div>
            <div class="problem">
                <span class="social-account" @click="Community">社交帐号登录</span>
                <div class="social-div" :class="{'social-trans':social}">
                    <span class="social-wexin">
                        <a class="iconfont" href='https://github.com/login/oauth/authorize?scope=user:email&client_id=9d37c9f54b2009868da8'>&#xe674;</a>
                    </span>
                    <span class="social-sina">
                        <a class="iconfont">&#xe60a;</a>
                    </span>
                    <span class="social-qq">
                        <a class="iconfont">&#xe658;</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'querystring';
import captcha from "../captcha"
import nprogress from "nprogress";

import { mapActions } from "vuex";
import { bus } from "./bus";
import { apiDomain } from "@/common/js/public.js";



export default {
    created() {
        this.choiceType = (this.$route.path.replace(/\//, "")) == "login" ? "login" : "register";
        var vm = this;
        bus.$on("type-change", b => {
            this.choiceType = b;
        })
        bus.$on("captchaData", b => {
            vm[(vm.$route.path.replace(/\//, "")) == "register" ? "registerData" : "loginData"].imageCaptcha = b;
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
                sid: "",
                imageCaptcha: "",
                phoneCaptcha:"",
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
                imageCaptcha: "",
            },
            loginMsg: {
                error: ""
            }
        }
    },
    methods: {
        //社区账号显示
        Community() {
            this.social = this.social ? false : true
        },
        //账号登录or手机验证码登录  
        Changelogin(t) {
            this.loginType = t
        },

        register() {
            let that = this
            let registerData = that.registerData;
            registerData.sid = this.$refs['register-imageCaptcha'].$data.sessionId
            //短信验证码输入框
            this.$ajax({
                method: 'post',
                url: `${apiDomain}register/valid`,
                data: qs.stringify(registerData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

            }).then(function (res) {
                var msg = that.registerMsg.msg;
                if (res.data.code == 200) {
                    that.wrapperDisplay('wrapperRegister');
                    setTimeout(function () { that.$parent.$refs["wrapper"].$refs["phoneCaptcha"].phoneNub(that.registerData.phone) }, 0)
                    that.$ajax({
                        method: 'get',
                        url: `${apiDomain}captcha/phoneCaptcha`,
                        params: {
                            phone: registerData.phone,
                            sid: registerData.sid
                        }
                    }).then(data=>{console.log(data);registerData.phoneCaptcha})
                    return;
                }
                ({
                    username: (msg.username),
                    phone: (msg.phone),
                    password: (msg.password),
                    imageCaptcha: (msg.imageCaptcha)
                } = res.data.errors)
                //   if(res.data.errors.imageCaptcha)
                //     that.$refs.captcha.$emit("imageCaptcha",msg.imageCaptcha)
            }).catch(error => console.log(error))



        },
        errorHide(type) {

            let that = this;
            let ele = this.$refs[`${that.$route.path.substr(1)}-${type}`]
            ele instanceof HTMLElement ? ele.classList.remove('label-error') : ele.$refs[type].classList.remove('label-error')
            setTimeout(function () {
                that.registerMsg.msg[type] = '';
            }, 250);
        },
        login() {
            let loginData = this.loginData;
            this.$ajax({
                method: "post",
                url: `${apiDomain}/user/login`,
                params: loginData,
            }).then(res => {
                res.data.code == 200 ? location.href = '/article' : flase
            })
        },
        getCaptcha(type) {
            var register = this.registerData;
            var login = this.loginData
            if (type == 'register')
            { if (register.username && register.phone && register.password) { this.$refs[`${type}-imageCaptcha`].$emit('getCaptcha', type) } }
            else
            { if (login.password && login.phone) { this.$refs[`${type}-imageCaptcha`].$emit('getCaptcha', type) } }
        },
        ...mapActions(["wrapperDisplay"]),
    },
    components: {
        captchaComponent: captcha
    },
}
</script>


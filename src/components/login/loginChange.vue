<template>
    <div class="miaohu-template">
        <div v-show="choiceType ==='register'" class="miaohu-registerContent">
            <div class="group_input">
                <div class="div_input" :class="{'label-error':registerMsg.msg.username}" @click="errorHide('username')" ref="register-username">
                    <input type="text" placeholder="姓名" id="register-user" v-model="registerData.username" @focus="errorHide('username')" @keyup="getCaptcha('register')" @keyup.13="register()">
                    <label>{{registerMsg.msg.username}}</label>
                </div>
                <div class="div_input input_top" :class="{'label-error':registerMsg.msg.phone}" @click="errorHide('phone')" ref="register-phone">
                    <input type="text" @focus="errorHide('phone')" placeholder="手机号或邮箱" v-model="registerData.phone" @keyup="getCaptcha('register')" @keyup.13="register()">
                    <label>{{registerMsg.msg.phone}}</label>
                </div>
                <div class="div_input input_top" :class="{'label-error':registerMsg.msg.password}" @click="errorHide('password')" ref="register-password">
                    <input type="password" placeholder="密码（不少于 6 位）" v-model="registerData.password" @focus="errorHide('password')" @keyup="getCaptcha('register')" @keyup.13="register()">
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
                    <input type="text" placeholder="手机号" v-model="loginData.phone" @keyup.13="login()" @focus="errorHide('message')">
                </div>
                <div class="div_input input_top" :class="{'label-error':loginMsg.msg.message}" @click="errorHide('message')" ref="login-message">
                    <input type="password"  placeholder="密码" v-model="loginData.password"  @keyup.13="login()" @focus="errorHide('message')">
                    <label>{{loginMsg.msg.message}}</label>
                </div>
                <!--<captcha-component :captchaError="loginMsg.error" @click.native="errorHide('imageCaptcha')" ref="login-imageCaptcha"></captcha-component>-->
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
                // imageCaptcha: "",
            },
            loginMsg: {
                msg:{
                    message:''
                }
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
                that[`${that.$route.name}Msg`].msg[type] = '';
            }, 250);
        },
        login() {
            let loginData = this.loginData;
            let that=this;
            this.$ajax({
                method: "post",
                url: `${apiDomain}/user/login`,
                params: loginData,
            }).then(res => {
                if(res.data.code == 200)){
                     localStorage.token = res.data.result;
                     location.href = '/article';
                }
                else{
                    that.loginMsg.msg.message = '用户不存在或密码错误';
                }
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

<style lang='sass' scoped>

//公共sass，css reset
.problem a
    color: #B3B3B4
    margin-right: 25px

.problem .social-sina a,.problem .social-qq a
    font-size: 19px


.problem .social-div a
    cursor: pointer
    &:hover
        color: #959595

#miaohu_contain .problem .social-trans
    opacity: 1
    -ms-filter: "alpha(Opacity=100)"
    visibility: visible
    -webkit-transform: translate(7px,0)
    -ms-transform: translate(7px,0)
    transform: translate(7px,0)

.problem .social-div
    position: absolute
    display: inline
    opacity: 0
    -ms-filter: "alpha(Opacity=0)"
    -webkit-transform: translate(-13px,0)
    -ms-transform: translate(-13px,0)
    transform: translate(-13px,0)
    transition: .25s ease-out
    visibility: hidden

.group_input .div_input input
    border: 0
    border-radius: 0
    box-shadow: none
    background: #fff
    padding: 1em .8em
    width: 100%
    box-sizing: border-box
    line-height: 19px
    color: #555
    outline: none
    font-size: 14px
    &::-webkit-input-placeholder
        color: #ccc;
        -webkit-text-fill-color: #ccc;


.group_input label
    position: absolute;
    top: 0;
    right: 8px;
    padding: 0 8px;
    line-height: 48px;
    color: #c33;
    cursor: text;
    background: #fff;
    background: -webkit-linear-gradient(left,rgba(255,255,255,0),#fff 8px);
    background: linear-gradient(to right,rgba(255,255,255,0),#fff 8px);
    visibility: hidden;
    opacity: 0;
    -ms-filter: "alpha(Opacity=0)";
    -webkit-transform: translate(20px,0);
    -ms-transform: translate(20px,0);
    transform: translate(20px,0);
    -webkit-transition: .25s ease-out;
    transition: .25s ease-out;
    font-size: 14px;

.problem .social-div a
    cursor: pointer
    &:hover
        color: #959595

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



.clear_b
    clear: both

.problem a
    color: #B3B3B4
    margin-right: 25px

.problem .social-sina a,.problem .social-qq a
    font-size: 19px


.problem .social-div a
    cursor: pointer
    &:hover
        color: #959595

.label-leave-active
    visibility: hidden;
    opacity: 0;
    -ms-filter: "alpha(Opacity=0)";
    -webkit-transform: translate(20px,0);
    -ms-transform: translate(20px,0);
    transform: translate(20px,0);
    -webkit-transition: .25s ease-out;
    transition: .25s ease-out;



.send-code-button
    display: inline-block;
    width: 96px;
    padding: 14px 8px;
    line-height: 19px;
    color: #5ca5eb;
    background: #fff;
    border: 0;
    cursor: pointer;
    outline: 0;
    &:before
        content: '';
        position: absolute;
        top: 50%;
        left: 200px;
        width: 1px;
        height: 40px;
        background: #e9e9e9;
        -webkit-transform: translateY(-20px);
        -ms-transform: translateY(-20px);
        transform: translateY(-20px);

.group_input
    padding: 1px 0
    border: 1px solid #d5d5d5
    border-radius: 3px
    position: relative


#miaohu_contain .label-error label
    visibility: visible;
    opacity: 1;
    -ms-filter: "alpha(Opacity=100)";
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    transform: translate(0,0);


.group_input .input_top
    border-top: 1px solid #e8e8e8
    position: relative
    font-size: 0

.input_top .sm[type='text']
    width: 200px


.group_click span
    margin-top: 18px
    display: inline-block
    background: #0f88eb
    box-shadow: none
    border: 0
    border-radius: 3px
    line-height: 41px
    color: #fff
    width: 100%
    font-size: 15px
    cursor: pointer
    text-shadow: 0 1px 1px rgba(0,0,0,.2)
    &:hover
        background: #55abed



.miaohu_chang .agreement-tip
    margin-top: 21px
    font-size: 13px
    text-align: center
    color: #999

.miaohu_chang .agreement-tip a
    color: #698ebf


</style>

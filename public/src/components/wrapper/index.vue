<template>
    <div class="miaohu-wrapper" v-show='wrapper'>
        <div class="wrapper-index">
        </div>
        <div class="wrapper-phone">
                <section class="phone-register">
                        <header class="phone-register-header">
                            <div class="phone-title">
                                <h1>验证手机</h1>
                                <h2>请输入你收到的 6 位数短信验证码</h2>
                            </div>
                        </header>
                        <span class="wrapper-close" @click="wrapperDisplay">
                            X
                        </span>
                        <div class="wrapper-content">
                            <div class="wrapper-input">
                                <input type="text"  placeholder="手机号" >
                            </div>
                            <div class="wrapper-input">
                                <input type="text"  placeholder="6位数验证码" >
                                <button type="button" class="send-code">重发验证码</button>
                            </div>
                        </div>
                        <footer class="wrapper-submit">
                            <button>进入知乎</button>
                        </footer>
                </section>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default{
        computed:{
            ...mapGetters(["wrapper"]),
        },
        methods:{
            ...mapActions(["wrapperDisplay"]),

        }
}
</script>


<style lang='sass'>
.miaohu-wrapper
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    overflow: auto;
    .wrapper-index
            opacity: .9
            position: fixed;
            left: 0;
            top: 0;
            background-color: #fff;
            -ms-filter: "alpha(Opacity=0)";
            z-index: 98;
            -webkit-transition: opacity .2s ease-out;
            transition: opacity .2s ease-out;
            width: 100%;
            height: 100%; 
    .wrapper-input
            position: relative;
            border-bottom: 1px solid #eee;
            &:first-child
                border-top: 1px solid #eee;
            &:last-child input
                width: 206px
    .wrapper-input input
            padding: 15px 8px;
            height: 48px;
            width: 100%;
            font-size: 14px;
            line-height: 18px;
            color: #787878;
            border: 0;
            outline: 0;
            box-sizing: border-box;
            &::-webkit-input-placeholder
                color: #ccc;
                -webkit-text-fill-color: #ccc;
    .send-code
            position: relative;
            z-index: 2;
            float: right;
            width: 94px;
            height: 48px;
            color: #ababab;
            background-color: #f7f7f7;
            border: 0;
            outline: 0;
    .wrapper-submit
            padding: 22px 0;
            text-align: center;
            button
                display: inline-block;
                background-color: #0077d9;
                padding: 8px 16px;
                font-size: 14px;
                line-height: 1;
                color: #fff;
                border: 0;
                border-radius: 3px;
                outline: 0;
                cursor: pointer;
    .wrapper-close
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
</style>
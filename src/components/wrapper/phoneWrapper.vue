<template>
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
                    <input type="text" placeholder="手机号">
                </div>
                <div class="wrapper-input">
                    <input type="text" placeholder="6位数验证码">
                    <button type="button" class="send-code">重发验证码</button>
                </div>
            </div>
            <footer class="wrapper-submit">
                <button>进入知乎</button>
            </footer>
        </section>
    </div>
</template>

<script>
    import {
        mapActions
    } from "vuex"
    export default {
        methods: {
            ...mapActions(["wrapperDisplay"]),
        },
    }
</script>


<style lang="sass">

   

</style>


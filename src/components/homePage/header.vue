<template>
    <header class="header">
    <section class="navigation">
        <div class="nav-center clearfloat">
            <div class="nav-log f-left">
            </div>
            <div class="nav-search f-left">
                <input type="text"
                       maxlength="100"
                       placeholder="搜索你感兴趣的内容..."
                       class="nav-searchinput">
                       <button type="button" class="nav-searchbutton">
                           <span class="nav-searchlogo"></span>
                       </button>
            </div>
            <div class="nav-nav f-left clearfloat">
                <ul>
                    <li class="active"><a href="">首页</a></li>
                    <li><a href="">话题</a></li>
                    <li><a href="">发现</a></li>
                    <li><a href="">消息</a></li>
                </ul>
            </div>
            <div class="nav-profile f-right">
                <a href="javascript:" class="nav-userinfo" >
                <span class="nav-user-name">pooder</span>
                <img src="/static/Userheader.png" alt="" class="nav-user-headerimages">
                </a>
                <ul class="nav-profile-list">
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>我的主页</a></li>
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>私信</a></li>
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>设置</a></li>
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>退出</a></li>
                </ul>
            </div>
            <button class="nav-question" @click="wrapperDisplay('wrapperQuestion')">
                提问
            </button>
        </div>
    </section>
    </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            title: "component"
        }
    },
    methods: {
        ...mapActions(["wrapperDisplay"]),
    }
}
</script>

<style>
@import "../../common/css/fontIcon/iconfont.css";
</style>

<style lang="sass">
@import "../../common/css/common.sass"
//公共sass，css reset
@import "header.sass"
</style>
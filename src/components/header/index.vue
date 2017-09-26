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
                    <li class="active"><router-link to="/article">首页</router-link></li>
                    <li><a href="">话题</a></li>
                    <li><a href="">发现</a></li>
                    <li><a href="">消息</a></li>
                </ul>
            </div>
            <div class="nav-profile f-right">
                <a href="javascript:" class="nav-userinfo" >    
                <span class="nav-user-name">{{userInfo.username}}</span>
                <img :src="userInfo.avatar" alt="" class="nav-user-headerimages">
                </a>
                <ul class="nav-profile-list">
                 <li><router-link :to="`/user/${userInfo.username}/activities`"><i class="iconfont icon-ordinarylogin1"></i>我的主页</router-link></li>
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>私信</a></li>
                 <li><a href=""><i class="iconfont icon-ordinarylogin1"></i>设置</a></li>
                 <li><a @click="cancel" href=""><i class="iconfont icon-ordinarylogin1"></i>退出</a></li>
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
    created(){
        var userInfo = this.userInfo;
        var data=this.data;
        this.$ajax({
            url: `${apiDomain}user/info/`,
            method: 'get',
            headers: { token: localStorage.token },
        }).then(d => {
            if (d.data.code == 200) {
                ({
                    username: userInfo.username,
                    avatar: userInfo.avatar,
                    location: userInfo.location,
                    sex: userInfo.sex,
                    bio: userInfo.bio,
                } = d.data.result)
                this.$ajax({
                    url: `${apiDomain}user/question/`,
                    method: 'get',
                    headers: { token: localStorage.token },
                }).then(d => {
                    if (d.data.code == 200) {
                        data=d.data.result
                    } 
                })
            }
        })
    },
    props:['userHeader'],
    data() {
        return {
            userInfo: { "username": '', "avatar": "", "location": "", "sex": "", "bio": "" },
            title: "component"
        }
    },
    methods: {
        cancel(){
            delete localStorage.token,this.$router.go('/login');
        },
        getInfo(info){
             return this.userInfo;               
        },
        ...mapActions(["wrapperDisplay"]),
    }
}   
</script>

<style>
@import "../../common/css/fontIcon/iconfont.css";
</style>

<style lang="sass">
//公共sass，css reset
@import "header.sass"
</style>
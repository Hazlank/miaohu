<template>
    <div id="homepage">
        <home-header ref='homeHeader'></home-header>
        <div class="contain-center clearfloat">
            <div class="f-left">
                <div class="contain-inner">
                    <div class="HomeEntry clearfloat">
                        <div class="HomeEntry-avatar f-left">
                            <img :src="userInfo.avatar">
                        </div>
                        <div class="HomeEntry-box">
                            <div class="HomeEntry-arrow">
                            </div>
                            <ul class="HomeEntry-list">
                                <li class="HomeEntry-item">
                                    <a href="#" class="HomeEntry-ask">
                                        <i class="iconfont icon-ask"></i>提问
                                    </a>
                                </li>
                                <li class="HomeEntry-item">
                                    <a href="#" class="HomeEntry-answer ">
                                        <i class="iconfont icon-article"></i>回答
                                    </a>
                                </li>
                                <li class="HomeEntry-item">
                                    <a href="#" class="HomeEntry-post">
                                        <i class="iconfont icon-xieliuyan"></i>写文章
                                    </a>
                                </li>
                            </ul>
                            <div class="HomeEntry-draft">
                                <a href="#"> 草稿
                                    <span>(1)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="zg-section clearfloat" id="zh-home-list-title">
                        <i class="iconfont icon-wenzhang"></i>
                        <a class="zg-weight">最新动态</a>
                        <span class="zg-setting f-right">
                            <a href="#" class="zg-link-gray-normal">
                                <i class="iconfont icon-shezhi"></i>设置</a>
                        </span>
                    </div>
                    <div class="zhihu-article">
                        <section class="zhihu-article-section clearfloat" v-if="data" v-for="$ in data">
                            <div class="avatar">
                                <a class="topic">
                                    <img :src="$['topic'].avatar">
                                </a>
                            </div>
                            <article class="zhihu-article-contain">
                                <header class="zhihu-article-header">
                                    <div class="zhihu-article-topic">
                                        来自话题:
                                        <a :href="`/src/topic/$['topic'].id`">{{$['topic'].name}}
                                        </a>
                                    </div>
                                    <h2 class="zhihu-article-title">
                                        <a>{{$['article'].title}}</a>
                                    </h2>
                                    <div class="zhihu-artivle-qusetion">
                                        <div class="zhihu-article-vote-count">
                                            <a href="#">
                                                {{$['article'].vote}}
                                            </a>
                                        </div>
                                        <div class="zhihu-artivle-userinfo">
                                            <a :href="$['author'].href">
                                                {{$['author'].name}}
                                            </a>
                                            <span>
                                                {{$['author'].bio}}
                                            </span>
                                        </div>
                                        <div class="zhihu-qusetion-contain">
                                            <img :src="$['author'].img" alt="" v-if="$['author'].img">
                                            <div class="zhihu-qusetion-summary" v-html="$['article'].content">
                                                {{$['article'].content}}
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <footer class="zhihu-article-footer">
                                    <div class="zhihu-article-operate">
                                        <a class="active">
                                            <i class="iconfont icon-jia"></i>关注问题</a>
                                        <a class="marginL">
                                            <i class="iconfont icon-liuyan">
                                            </i>{{$['article'].comment}}条评论
                                        </a>
                                        <span class="hide">
                                            <a class="marginL">
                                                <i class="iconfont icon-xin"></i>感谢</a>
                                            <a class="marginL">
                                                <i class="iconfont icon-fenxiang"></i>转发</a>
                                            <a class="marginL">
                                                <i class="iconfont icon-qizhixian"></i>收藏</a>
                                            <span class="zhihu-dot">•</span>
                                            <a>没有帮助</a>
                                            <span class="zhihu-dot">•</span>
                                            <a>举报</a>
                                        </span>
                                        <span class="zhihu-dot">•</span>
                                        <a>{{$['article'].type}}</a>
                                    </div>
                                    <a class="zhihu-delete">x
                                        <div class="zhihu-uninterest">
                                            <div class="uninterest-arrow"></div>
                                            <div class="uninterest-inner">不感兴趣</div>
                                        </div>
                                    </a>
                                </footer>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
            <div class="contain-sidebar f-left">
                <section class="sidebar-operate">
                    <ul>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">我的收藏</span>
                            </a>
                        </li>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">我关注的问题</span>
                            </a>
                        </li>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">邀请我回答的问题</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-operate">
                    <ul>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">公共编辑状态</span>
                            </a>
                        </li>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">社区服务中心</span>
                            </a>
                        </li>
                        <li>
                            <a class="sidebar-link" href="#">
                                <i class="iconfont icon-qizhixian"></i>
                                <span class="sidebar-label">版权服务中心</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-section">
                    <h3>知乎专栏</h3>
                    <ul>
                        <li>
                            <a class="sidebar-link" href="#">
                                <img class="sidebar-avatar" src="/static/sidebar.jpg">
                                <span class="sidebar-label">专栏・发现</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-section">
                    <h3>
                        <a href="#">查看全部 »</a>知乎Live</h3>
                    <ul>
                        <li v-for="data in sidebar.live">
                            <a class="sidebar-link" :href="data.href">
                                <img class="sidebar-avatar" :src="data.img">
                                <span class="sidebar-label">{{data.msg}}</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-section">
                    <h3>
                        <a href="#">查看全部 »</a>知乎圆桌</h3>
                    <ul>
                        <li v-for="data in sidebar.table">
                            <a class="sidebar-link" :href="data.href">
                                <img class="sidebar-avatar" :src="data.img">
                                <span class="sidebar-label">{{data.msg}}</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-section">
                    <h3>
                        <a href="#">查看全部 »</a>知乎书店</h3>
                    <ul>
                        <li v-for="data in sidebar.book">
                            <a class="sidebar-link" :href="data.href">
                                <img class="sidebar-avatar" :src="data.img">
                                <span class="sidebar-label">{{data.msg}}</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sidebar-section">
                    <ul>
                        <a class="sidebar-link" href="#">
                            <img class="sidebar-avatar" src="/static/topic.jpg">
                            <span class="sidebar-label">下载 App</span>
                        </a>
                    </ul>
                </section>
            </div>
        </div>
        <wrapper></wrapper>
    </div>
</template>
<script>
import header from "../header"
import wrapper from "../wrapper"
import axios from "axios"
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            userInfo:'',
            data: [{
                topic: {
                     /**
                    @param { string } id     主题id
                    @param { string } avatar 主题头像
                    @param { string } name   主题名字
                        */
                    id: '/',
                    avatar: "/static/topic.jpg",
                    bio:'',
                    name: "JavaScript",
                },
                article: {
                    /**
                    @param { string } title     文章标题
                    @param { string } content   文章内容
                    @param { string } vote      文章点赞
                    @param { number } comment   评论数量
                    @param { string } type      文章类型
                        */
                    title: "总是被勒索骗局滥用,Google决心要“废除”JavaScript这项小特性",
                    content: "据ZDNet报道，为解决浏览器中JavaScript对话框被滥用的状况，Google Chromium团队近日发布根治提案，同时建议开发者今后尽量不要使用该特性。JavaScript对话框滥用，是指网站使用JavaScript循环和对话框特性，把用户锁定在当前网页，无法离开或关闭。通常钓…",
                    vote: "6",
                    comment: "11",
                },
                author: {
                    /**
                    @param { string } name   用户名字
                    @param { string } bio    用户签名
                    @param { string } avatar 用户头像
                    @param { string } href   用户主页
                        */
                    name: "嘶吼吼",
                    bio: "网络安全观察者",
                    avatar: "",                             
                    href: "#",                              
                },  
            }],
            sidebar: {
                live: [{
                    img: '/static/sidebar.jpg',
                    msg: '如何让你的观点更易被他人接受？',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: '如何去美国学习',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: '怎么辞职',
                    href: '#'
                }
                ],
                table: [{
                    img: '/static/sidebar.jpg',
                    msg: 'dwdwdd',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: 'dwdw',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: '怎么辞dddddddd职',
                    href: '#'
                }
                ],
                book: [{
                    img: '/static/sidebar.jpg',
                    msg: '如何让你的观dddd点更易被他人接受？',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: '如何去美国学vvv习',
                    href: '#'
                },
                {
                    img: '/static/sidebar.jpg',
                    msg: 'bb',
                    href: '#'
                }
                ],
            }
        }
    },
    mounted(){  
       this.userInfo=this.$refs['homeHeader'].getInfo();
    },
    components: {
        homeHeader: header,
        wrapper
    }
}
</script>

<style lang='sass' scoped >
    @import "../article/article.sass"
</style>
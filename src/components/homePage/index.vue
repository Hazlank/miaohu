<template>
  <div class="homepage-wrapper">
    <div id="homepage">
      <home-header ref='homeHeader'></home-header>
      <div class="profileHeader">
        <div class="profile-header">
        </div>
        <div class="profile-content">
          <div class="user-cover">
            <div class="user-guird">
              <div class="user-upload">
                <button>上传封面图片</button>
              </div>
            </div>
            <div class="user-background">
            </div>
          </div>
          <div class="hidden">
            <div class="user-info">
              <div class="user-avatar">
                <div class="avatar">
                  <img :src="userInfo.avatar" alt="用户头像" height="160" width="160">
                </div>
                <div></div>
              </div>
              <div class="user-content">
                <header class="content-header">
                  <h1 class="title">
                    <span class="name">pooder</span>
                    <span class="headline">不爱介绍</span>
                  </h1>
                </header>
                <section class="content-section">
                  <div>互联网</div>
                </section>
                <footer class="content-footer">
                  <div class="content-down" @click='dropDown'>
                    <a :class="{ 'triangle-down': !triangle,'triangle-up': triangle}"></a>
                    <span>查看详细资料</span>
  
                  </div>
                  <div class="profile-editor">
                    <button>编辑个人资料</button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profileMain ">
        <div class="main-column table">
          <div class="main-cloumHeader">
            <ul>
               <!--pins,following-->
              <li class="li-item">
                <router-link to="/activities">动态</router-link>
              </li>
              <li class="li-item">
                <router-link to="/answers">回答</router-link>
              </li>
              <li class="li-item">
                <router-link to="/asks">提问</router-link>
              </li>
              <li class="li-item">
                <router-link to="/columns">专栏</router-link>
              </li>
              <li class="li-item">
                <router-link to="/collections">收藏</router-link>
              </li>
              <li class="li-item">
                <router-link to="/activities">更多</router-link>
              </li>
            </ul>
          </div>
          <div is='cloumList' v-for="keys in Object.keys(cloumList)" :keys='keys' :cloumList='cloumList'></div>
        </div>
        <div class="side-column">
          <div class="table">
            <div class="table-header">
              <strong>个人成就</strong>
            </div>
            <div class="table-editorNum">
              <a href="">参与 13 次公共编辑</a>
            </div>
          </div>
          <div class="table">
            <div class="table-flex">
              <a href="" class="table-follow">
                <div class="followNubname">关注了</div>
                <div class="followNub">33</div>
              </a>
              <div class="table-line"></div>
              <a href="" class="table-follow">
                <div class="followNubname">关注者</div>
                <div class="followNub">33</div>
              </a>
            </div>
          </div>
          <div class="Profile-lightList">
            <a href="" class="Profile-lightItem">
              <span class="Profile-lightItemName">关注的话题</span>
              <span class="Profile-lightItemNum">33</span>
            </a>
            <a href="" class="Profile-lightItem">
              <span class="Profile-lightItemName">关注的专栏</span>
              <span class="Profile-lightItemNum">33</span>
            </a>
            <a href="" class="Profile-lightItem">
              <span class="Profile-lightItemName">关注的问题</span>
              <span class="Profile-lightItemNum">33</span>
            </a>
            <a href="" class="Profile-lightItem">
              <span class="Profile-lightItemName">关注的收藏夹</span>
              <span class="Profile-lightItemNum">33</span>
            </a>
          </div>
          <div class="Profile-footerOperations">
            个人主页被浏览 256 次
          </div>
          <footer class="Footer">
            <a class="Footer-item" target="_blank" href="//liukanshan.zhihu.com/">刘看山</a>
            <span class="Footer-dot"></span>
            <a class="Footer-item" target="_blank" href="/question/19581624">知乎指南</a>
            <span class="Footer-dot"></span>
            <a class="Footer-item" target="_blank" href="/terms">知乎协议</a>
            <span class="Footer-dot"></span>
            <a class="Footer-item" target="_blank" href="/app">应用</a>
            <span class="Footer-dot"></span>
            <a class="Footer-item" target="_blank" href="/careers">工作</a>
            <br>
            <a class="Footer-item" target="_blank" href="/jubao">侵权举报</a>
            <span class="Footer-dot"></span>
            <a class="Footer-item" target="_blank" href="http://www.12377.cn">网上有害信息举报专区</a>
            <br>
            <span class="Footer-item">违法和不良信息举报：010-82716601</span>
            <br>
            <a class="Footer-item" target="_blank" href="/contact">联系我们</a>
            <span> © 2017 知乎</span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import header from "../header"
export default {
  created(){
    console.log(this)
  },
  data() {
    return {
      userInfo: '',
      triangle: false,
      cloumList: {
        activities: {
          title: '动态',
          state: true,
        },
        answers: {
          title: '回答',
          state: false,
        },
        asks: {
          title: '提问',
          state: false,
        },
        columns: {
          title: '专栏',
          state: false,
        },
        collections: {
          title: '收藏夹',
          state: false,
        },
        pins: {
          title: '分享',
          state: false,
        },
        following: {
          title: '关注',
          state: false,
        },
      }

      // {
      //   title:'动态',
      //   state: true,
      // },{
      //   title:'回答',
      //   state: false,
      // },{
      //   title:'提问',
      //   state: false,
      // },{
      //   title:'专栏',
      //   state: false,
      // },{
      //   title:'收藏',
      //   state: false,
      // },{
      //   title:'更多',
      //   state: false,
      // },
    }
  },
  methods: {
    dropDown() {
      !this.triangle ? this.triangle = true : this.triangle = false;
    },
  },
  mounted() {
    this.userInfo = this.$refs['homeHeader'].getInfo();
  },

  components: {
    homeHeader: header,
    cloumList: {
      template: `<div class="main-cloumList"  v-show='cloumList[keys].state'>
            <div class="main-cloumTitle">
              <strong>我的{{cloumList[keys].title}}</strong>
            </div>
            <div class="main-cloumContent">
              <div class="list-item">
                <div class="list-itemMeta">
                  <span>关注了问题</span>
                  <span>1 个月前</span>
                </div>
                <div class="list-itemContent">
                  <div class="list-title">
                    <a target="_blank">javascript 中：'true'==true ; 为什么返回false?</a>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-itemMeta">
                  <span>关注了问题</span>
                  <span>1 个月前</span>
                </div>
                <div class="list-itemContent">
                  <div class="list-title">
                    <a target="_blank">哈♂乖乖站好？</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`,
      props: ['keys', 'cloumList']
    }
  }
}
</script>
<style lang="sass" >
@import './index.sass'
</style>



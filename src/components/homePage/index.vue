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
              </div>
              <div class="user-content" v-show='!infoEditor'>
                <header class="content-header">
                  <h1 class="title">
                    <span class="name">{{userInfo.username}}</span>
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
                    <router-link :to="`/user/${userInfo.username}/editor`" @click.native="eitor">编辑个人资料</router-link>
                  </div>
                </footer>
              </div>
              <div class="user-editor" v-show='infoEditor'>
                <div class="user-editorContent">
                  <div style="position: relative;margin-bottom: 16px;">
                    <div class="user-editorTitle">
                      <span class="username">{{userInfo.username}}</span>
                    </div>
                    <router-link :to="`/user/${userInfo.username}/activities`" class="user-editorReturn" @click.native="eitor">
                      返回我的主页
                      <span class="user-editorTriangle"></span>
                    </router-link>
                  </div>
                  <div class="user-editorlist">
                    <div class="list">
                      <h3>性别</h3>
                    </div>
                    <div class="list">
                      <h3>一句话介绍
                      </h3>
                    </div>
                    <div class="list">
                      <h3>居住地
                      </h3>
                    </div>
                    <div class="list">
                      <h3>所在行业
                      </h3>
                    </div>
                    <div class="list">
                      <h3>职业经历
                      </h3>
                    </div>
                    <div class="list">
                      <h3>教育经历</h3>
                    </div>
                    <div class="list">
                      <h3>个人简介
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profileMain " v-show="!infoEditor">
        <div class="main-column table">
          <div class="main-cloumHeader">
            <ul>
              <!--pins,following-->
              <li class="li-item" @click="router" v-for="keys in Object.keys(cloumList)">
                <router-link :to="`/user/${userInfo.username}/${keys}`">{{cloumList[keys].title}}</router-link>
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
  created() {
    this.router()
  },
  data() {
    return {
      infoEditor: false,
      userInfo: '',
      triangle: false,
      cloumList: {
        activities: {
          title: '动态',
          state: false,
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
          title: '收藏',
          state: false,
        },
        more: {
          title: '更多',
          state: false,
          children: {
            pins: {
              title: '分享',
              state: false,
            },
            following: {
              title: '关注',
              state: false,
            },
          }
        }
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
    router() {
      var operate = this.$route.params.operate;
      var cloumList = this.cloumList;
      if (cloumList[operate]) {
        for (let key in cloumList) {
          cloumList[key].state = false;
        }
        cloumList[operate].state = true;
      } else {
        cloumList['activities'].state = 'true'
      }
    },
    eitor() {
      !this.infoEditor ? this.infoEditor = true : this.infoEditor = false;
    }
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



<template>
  <div class="wrapper-question">
    <header class="question-header">
      <span class="question-header-title">提问</span>
      <span class="question-header-close" @click="wrapperDisplay">x</span>
    </header>
    <section class="question-content">
      <div class="question-summary">
        <textarea rows="1" title="在这里输入问题" placeholder="写下你的问题" role="combobox" style="height: 22px;" v-model="editor.article.title"></textarea>
      </div>
      <div class="question-description">
        <div class="qusetion-description-title">
          问题说明（可选）：
        </div>
        <vue-editor :editorToolbar="customToolbar" v-model="editor.article.content"></vue-editor>
      </div>
      <div class="question-topic">
        <span class="question-topic-span f-right">话题越精准，越容易让相关领域专业人士看到你的问题 </span> 选择话题：
        <div class="question-topic-content">
          <input type="text" v-model="editor.topic.name">
        </div>
      </div>
      <footer class="question-footer">
        <label class="question-anonymous f-left">
          <input type="checkbox"> 匿名
        </label>
        <a class="cencel">取消</a>
        <a class="question-publish" @click='questionContext'>发布</a>
      </footer>
    </section>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        ['blockquote', 'code-block', { 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image', 'video'],
        ['clean'],
      ],
      editor: {
        topic: {
          id: '/',
          avatar: "/static/topic.jpg",
          name: "",
        },
        article: {
          title: "",
          content: '',
          vote: "6",
          img: "",
          comment: "11",
          type: "作者保留权利"
        },
        author: {
          name: "嘶吼吼",
          bio: "网络安全观察者",
          avatar: "",
          href: "#",
        },
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    questionContext() {
      this.$parent.$parent.data.push(JSON.parse(JSON.stringify(this.editor)))
      // this.$ajax({
      //   method: "post",
      //   url: `${apiDomain}/question/post`,
      //   header:{
          
      //   },
      //   data: {
      //     title: this.editor.article.title,
      //     content: this.editor.article.content,
      //     tags: this.editor.topic.name,
      //   },
      // }).then(res => {
      //   console.log(res);
      //   return;
       
      // })

      this.$ajaxPost('question/post',{
          title: this.editor.article.title,
          content: this.editor.article.content.replace(/[<>"&]/g,match=>{
            switch(match){
                 case "<":
                    return "&lt;";
                 case ">":
                    return "&gt;";
                 case "&":
                    return "&amp;";
                 case "\"":
                    return "&quot;";
            }
          }),
          tags: this.editor.topic.name,
        },(d)=>console.log(d))
      // this.wrapperDisplay()
    },
    ...mapActions(["wrapperDisplay"]),
  }
}
</script>

<style lang="sass" scoped>
    .wrapper-question
        position: relative;
        margin: 0 auto;
        width: 550px;
        margin-top: 14vh;
        z-index: 99;
        border-radius: 8px;
        border: 1px solid #888;
        box-shadow: 0 0 80px 0 rgba(0,0,0,.4);
        background: #fff;
        text-align: left;
    .question-header
        position: relative;
        margin: -1px -1px 0;
        padding: 10px 15px;
        line-height: 14px;
        background: #1D7FE2;
        background: -webkit-linear-gradient(top,#1D7FE2,#0865C2);
        background: linear-gradient(to bottom,#1D7FE2,#0865C2);
        border: 1px solid #0D6EB8;
        border-radius: 6px 6px 0 0;
        box-shadow: 0 1px 0 rgba(255,255,255,.1) inset, 0 1px 1px rgba(0,0,0,.2);
        .question-header-title
            color: #fff;
            text-shadow: 0 1px 1px rgba(0,0,0,.4);
            font-size: 15px;
            font-weight: 700;
        .question-header-close
            position: absolute;
            right: 7px;
            cursor: pointer;
            color: #1D7FE2;
            font-size: 16px;
            outline: 1px white;
            border: 1px solid;
            padding: 1px 4px;
            border-radius: 11px;
            background: white;
            margin-top: -2px;
            font-weight: 700;
    .question-content
        padding: 0 15px;
        margin: 17px 0;
        .question-summary
            padding: 8px 10px;
            font-size: 13px;
            line-height: 15px;
            box-shadow: 0 1px 1px rgba(0,0,0,.1) inset;
            border-radius: 3px;
            background: #fff;
            border: 1px solid #ccc;
            color: #222;
            textarea
                vertical-align: bottom;
                min-height: 1em;
                color: #222;
                overflow: hidden;
                line-height: 22px;
                font-size: 13px;
                padding: 0!important;
                margin: 0!important;
                border: 0 none;
                resize: none;
                width: 100%;
                outline: none;
        .question-description
            margin-top: 15px
    .question-topic
        margin-top: 15px
        .question-topic-span
            color: #999;
            font-size: 12px;
            font-weight: 400;
        .question-topic-content
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,.1) inset;
            border: 1px solid #ccc!important;
            padding: 8px 8px 3px;
            position: relative;
            input
                outline: none;
                border: none;
                width: 120px;
    .question-footer
        padding-top: 20px;
        text-align: right;
        .question-anonymous
            color: #666;
        .question-publish
            font-size: 14px;
            line-height: 1.7;
            text-decoration: none!important;
            vertical-align: middle;
            display: inline-block;
            text-align: center;
            padding: 4px 10px;
            cursor: pointer;
            border-radius: 3px;
            white-space: nowrap;
            box-sizing: border-box;
            background: #1472cf;
            color: white;
        .cencel
            margin: 0 15px 0 0;
            cursor: pointer;
            &:hover
                text-decoration: underline



</style>

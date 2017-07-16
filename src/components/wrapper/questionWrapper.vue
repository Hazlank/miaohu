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
      //   url: `${apiDomain}/user/login`,
      //   data: {
      //     title: this.editor.article.title,
      //     content: this.editor.article.content,
      //     tags: this.editor.topic.name
      //   },
      // }).then(res => {
      //   console.log(res);
      //   return;
      //   res.data.code == 200 ? location.href = '/article' : flase
      // })
      this.wrapperDisplay()
    },
    ...mapActions(["wrapperDisplay"]),
  }
}
</script>
<style>

</style>

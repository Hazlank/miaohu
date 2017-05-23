<template>
  <div class="wrapper-question">
        <header class="question-header">
          <span class="question-header-title">提问</span>
          <span class="question-header-close" @click="wrapperDisplay">x</span>
        </header>
        <section class="question-content">
            <div class="question-summary">
                    <textarea rows="1"  title="在这里输入问题"  placeholder="写下你的问题" role="combobox"  style="height: 22px;"></textarea>
            </div>
           <div class="question-description">
              <div class="qusetion-description-title">
                问题说明（可选）：
              </div>
              <vue-editor></vue-editor>
           </div>
           <div class="question-topic">
             <span class="question-topic-span f-right">话题越精准，越容易让相关领域专业人士看到你的问题  </span>
              选择话题：
              <div class="question-topic-content">
                 <input type="text">
              </div>
           </div>
           <footer class="question-footer">
              <label class="question-anonymous f-left">
                  <input type="checkbox">
                  匿名
              </label>
              <a class="cencel">取消</a>
              <a class="question-publish">发布</a>
           </footer>
        </section>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapActions } from 'vuex'
export default {
  components: {
    VueEditor
  }, 
  methods: {
    ...mapActions(["wrapperDisplay"])
  } 
}
</script>
<style>

</style>

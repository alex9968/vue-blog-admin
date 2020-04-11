<template>
  <div class="hello">
    <h1>新建文章</h1>
    <el-input placeholder="..." v-model="addArticle.title">
      <template slot="prepend">文章标题</template>
    </el-input>
    <el-input placeholder="以逗号结尾" v-model="addArticle.tags">
      <template slot="prepend">归档标签</template>
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      placeholder="请输入文章摘要..."
      v-model="addArticle.notice"
      maxlength="100"
      :autosize="{ minRows: 4, maxRows: 5 }"
      show-word-limit
      >
    </el-input>

      <div style="margin: 20px 0;">
        <mavon-editor class="editor" :ishljs = "true" v-model="addArticle.text"/>
      </div>

      <div class="publish-btn" align="center">
        <el-button type="primary" @click="publish" plain>发布</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addArticle: {
        title: '',
        tags: '',
        notice: '',
        text: ''
      }
    }
  },
  methods: {
    async publish () {
      const { data: res } = await this.axios.post('articles', this.addArticle)
      if (!res.ok) {
        return this.$message.error('添加文章失败！')
      }
      this.$message.success('发布成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.editor {
  min-height: 600px !important;
}

.publish-btn {
  margin: 15px auto;
  .el-button {
    width: 150px !important;
  }
}

</style>

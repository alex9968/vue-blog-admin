<template>
  <div>
    <el-card >
      <div :key="o" class="text item">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              @clear="getArticleList"
              clearable>
              <el-button slot="append" icon="el-icon-search"  @click="getArticleList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-button style="marginTop: 15px" round @click="getArticleList">刷新</el-button>
          </el-col>
        </el-row>
         <!-- 表格 -->
        <el-table :data="articlelist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="标题" prop="title" width="250px">
            <template slot-scope="scope">
              <el-row>
                {{scope.row.title}}
              </el-row>
              <el-row style="margin: 10px 0 0 80%">
                <el-button size="mini" round  icon="el-icon-edit" @click="articlePropsChanged(scope.row.id, 'title', scope.row.title)"></el-button>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column label="标签" prop="tags" width="200px">
            <template slot-scope="scope">
              <el-row>
                <el-tag v-for="tag in scope.row.tags.split(',')"  style="marginLeft: 5px" :key="tag" type="success">{{tag}}</el-tag>
              </el-row>
              <el-row style="marginLeft: 80%">
                <el-button size="mini" round icon="el-icon-edit" @click="articlePropsChanged(scope.row.id, 'tags', scope.row.tags)"></el-button>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column label="摘要" prop="notice" width="350px">
            <template slot-scope="scope">
              <el-row>
                {{scope.row.notice}}
              </el-row>
              <el-row style="marginLeft: 80%">
                <el-button size="mini" round icon="el-icon-edit" @click="articlePropsChanged(scope.row.id, 'notice', scope.row.notice)"></el-button>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column label="浏览量" prop="view" width="80px"></el-table-column>

          <el-table-column label="创建时间" prop="createdAt" width="120px">{{getDay(createdAt)}}</el-table-column>

          <el-table-column label="修改时间" prop="updatedAt" width="120px">{{getDay(updatedAt)}}</el-table-column>

          <el-table-column label="状态" prop="state" width="80px">
            <template slot-scope="scope">
              <!-- {{scope.row}}获取该行数据 -->
              <el-switch v-model="scope.row.state" @change="articleStateChanged(scope.row.id, scope.row.state)"></el-switch>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <!-- {{scope.row}}获取该行数据 -->
              <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="articleTextChanged(scope.row.id, scope.row.text)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeArticle(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

        <!-- 修改属性对话框 -->
        <el-dialog
          title="修改属性"
          :visible.sync="propsDialogVisible"
          @click="propsDialogVisible = false"
          width="50%">
          <el-input
            type="textarea"
            placeholder="请输入文章摘要..."
            maxlength="100"
            v-model="editForm.value"
            :autosize="{ minRows: 4, maxRows: 5 }"
            show-word-limit
            >
          </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="propsDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateArticle">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改文章内容对话框 -->
        <el-dialog
          title="修改文章内容"
          :visible.sync="textDialogVisible"
          @click="textDialogVisible = false"
          width="50%">
          <div style="margin: 20px 0;">
            <mavon-editor class="editor" :ishljs = "true" v-model="editForm.value" />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="textDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateArticle">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      articlelist: [],
      total: 0,
      propsDialogVisible: false,
      textDialogVisible: false,
      confirmUpdate: false,
      editForm: {
        id: '',
        key: '',
        value: ''
      }
    }
  },
  created () {
    this.getArticleList()
  },

  methods: {
    getDay (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    async getArticleList () {
      const { data: res } = await this.axios.get('articles/all', { params: this.queryInfo })
      console.info(res)
      if (!res.ok) {
        return this.$message.error('获取用户列表失败！')
      }
      this.articlelist = res.data
      this.total = res.total
      console.log(this.articlelist)
      console.log(this.total)
    },

    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getArticleList()
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getArticleList()
    },

    async articlePropsChanged (id, key, value) {
      console.info(id, key, value)
      this.editForm = { id, key, value }
      this.propsDialogVisible = true
    },
    async articleStateChanged (id, state) {
      console.info('state', state)
      const { data: res } = await this.axios.put(`articles/${id}`, { key: 'state', value: state })
      this.getArticleList()
      if (!res.ok) {
        return this.$message.error('更新状态失败！')
      }
      this.$message.success('更新状态成功！')
    },
    async articleTextChanged (id, text) {
      this.editForm = { id, key: 'text', value: text }
      this.textDialogVisible = true
    },

    async updateArticle () {
      var { id, key, value } = this.editForm
      const { data: res } = await this.axios.put(`articles/${id}`, { key, value })
      if (!res.ok) {
        return this.$message.error('更新属性失败！')
      }
      this.propsDialogVisible = false
      this.textDialogVisible = false
      this.$message.success('更新属性成功！')
      this.getArticleList()
    },

    async removeArticle (id) {
      // 弹框询问确认
      console.log(id)
      const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        this.$message.info('已取消删除')
      }
      const { data: res } = await this.axios.delete('articles/' + id)
      if (!res.ok) {
        return this.$message.error('删除文章失败！')
      }
      this.$message.success('删除文章成功')
      this.getUserList()
    }

  }
}
</script>

<style>
</style>

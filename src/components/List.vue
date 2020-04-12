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
            <el-button style="marginTop: 15px" type="primary" @click="getArticleList">刷新</el-button>
          </el-col>
        </el-row>
         <!-- 表格 -->
        <el-table :data="articlelist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="标签" prop="tags"></el-table-column>
          <el-table-column label="摘要" prop="notice"></el-table-column>
          <el-table-column label="浏览量" prop="view"></el-table-column>
          <el-table-column label="状态" prop="state">
            <template slot-scope="scope">
              <!-- {{scope.row}}获取该行数据 -->
              <el-switch v-model="scope.row.state" @change="articleStateChanged(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- {{scope.row}}获取该行数据 -->
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
              <el-tooltip class="item" effect="dark" content="设置" placement="top">
                <el-button  v-model="scope.row.mg_state" size="mini" type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip>
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

        <!-- 修改用户对话框 -->
        <el-dialog
          title="修改用户"
          :visible.sync="editDialogVisible"
          @click="addDialogClosed"
          width="50%">
          <el-form :model="editForm" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      articlelist: [],
      total: 0,
      editDialogVisible: false,
      editForm: {}
    }
  },
  created () {
    this.getArticleList()
  },

  methods: {
    async getArticleList () {
      const { data: res } = await this.axios.get('articles', { params: this.queryInfo })
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

    async articleStateChanged (info) {
      console.info(info)
      const { data: res } = await this.axios.put(`users/${info.id}/state/${info.state}`)
      if (res.meta.status !== 200) {
        info.state = !info.state
        return this.$message.error('更新状态失败！')
      }
      this.$message.success('更新状态成功！')
    },
    // 监听用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },

    async showEditDialog (id) {
      console.info(id)
      const { data: res } = await this.axios.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },

    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.axios.post('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户失败！')
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('修改用户成功！')
      })
    },
    async removeArticleById (id) {
      // 弹框询问确认
      const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        this.$message.info('已取消删除')
      }
      const { data: res } = await this.axios.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除文章失败！')
      }
      this.$message.success('删除文章成功')
    }
  }
}
</script>

<style>
</style>

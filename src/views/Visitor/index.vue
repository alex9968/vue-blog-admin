<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div :key="o" class="text item">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" @clear="getUserList" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="userlist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="城市" prop="cname"></el-table-column>
          <el-table-column label="城市邮编" prop="cid"></el-table-column>
          <el-table-column label="IP地址" prop="ip"></el-table-column>
          <el-table-column label="登录设备" prop="browser">
            <template slot-scope="scope">
              {{scope.row.browser.split('"')[3]}}
            </template>
          </el-table-column>
          <el-table-column label="访问时间" prop="createdAt">
            <template slot-scope="scope">
              {{scope.row.createdAt.slice(0,10)}}
            </template>
          </el-table-column>

          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- {{scope.row}}获取该行数据 -->
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
              <!-- <el-tooltip class="item" effect="dark" content="设置" placement="top">
                <el-button v-model="scope.row.mg_state" size="mini" type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <h1>User component</h1>
  </div>
</template>

<script>
// import { dateFormat } from '../../utils/time'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  // computed: {
  //   getDate: function (date) {
  //     return dateFormat('YYYY-mm-dd HH:MM', date)
  //   }
  // },
  methods: {
    async getUserList () {
      const { data: res } = await this.axios.get('users')
      const { data, ok } = res
      if (!ok) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = data
      this.total = data.length
    },
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async removeUserById (id) {
      // 弹框询问确认
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        this.$message.info('已取消删除')
      }
      const {
        data: res
      } = await this.axios.delete('users/delete?id=' + id)
      if (!res.ok) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功')
    }
  }
}
</script>

<style>
</style>

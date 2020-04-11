<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/alen.jpg" alt="">
        <span>博客管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened router
          :default-active="activePath">
          <!-- <el&#45;submenu :index="item.id + ''" v&#45;for="item in menulist" :key="item.id"> -->
          <!--   <template slot="title"> -->
          <!--     <i class="el&#45;icon&#45;location"></i> -->
          <!--     <span>{{item.authName}}</span> -->
          <!--   </template> -->
          <!--   <el&#45;menu&#45;item :index="'/' + subItem.path" v&#45;for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)"> -->
          <!--     <template slot="title" > -->
          <!--       <i class="el&#45;icon&#45;menu"></i> -->
          <!--       <span>{{subItem.authName}}</span> -->
          <!--     </template> -->
          <!--   </el&#45;menu&#45;item> -->
          <!-- </el&#45;submenu> -->

          <el-menu-item index="users" key="user" @click="saveNavState('/users')">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="new" key="new" @click="saveNavState('/new')">
            <i class="el-icon-menu"></i>
            <span slot="title">新建文章</span>
          </el-menu-item>

          <el-menu-item index="list" key="list" @click="saveNavState('/list')">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="chat" key="chat" @click="saveNavState('/chat')">
            <i class="el-icon-setting"></i>
            <span slot="title">聊天室</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      menulist: [],
      activePath: ''
    }
  },
  methods: {
    logout () {
      console.log('logout')
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // async getMenuList () {
    //   const { data: res } = await this.axios.get('menus')
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data
    //   console.log(this.menulist)
    // },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  margin: 0px;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
    }
  }

}
.el-aside {
  background-color: #333744;
  border-right: none;
  width: 250px !important;
}
.el-main {
  background-color: #eaedf1;
}
</style>

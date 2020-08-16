<template>
  <div class="container">
    <div class="box">
      <div class="avatar">
        <img src="../assets/alen.jpg" />
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="form">
        <el-form-item prop="username" >
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" ></el-input>
        </el-form-item>
        <el-form-item class="btns" >
          <el-button size="small" type="primary" @click="login">登录</el-button>
          <el-button  size="small" type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      loginForm: {
        username: 'wuxian',
        password: 'wuxian'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.info(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.info(valid)
        console.info(this)
        if (!valid) return
        const { data: res } = await this.axios.post('admins/login', qs.stringify(this.loginForm))
        if (!res.ok) return this.$message.err('Login failed!')
        this.$message.success('Login success!')
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  background-color: #2b4b6b;
  height: 100%;
}
.box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  background-color: #33efee;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>

<template>
  <div class="loginPage">
    <div class="login-form">
      <h2 class="login-title">梦学谷会员管理系统</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
         password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    handleLoginSubmit() {
        
    },
  },
};
</script>
<style lang="scss">
.loginPage {
  width: 100%;
  height: 100%;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  overflow: hidden;
}
.login-form {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 160px auto;
  border-radius: 20px;
  padding: 28px;
}
.login-title{
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}
.el-form{
    margin-top: 20px;
}
</style>
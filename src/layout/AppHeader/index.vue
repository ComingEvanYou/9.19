<template>
    <div>
       <router-link to="/" class="link">
            <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="logo" width="25px" class="img">
            <span>积云会员管理系统</span>
       </router-link>
       <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{$store.getters.userInfo.name || ''}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePassword">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>
<script>
export default {
    methods: {
        handleCommand(command){
            switch (command){
                case "changePassword" :
                    this.handleChangePassword()
                    break
                case "logout" :
                    this.handleLogout()
                    break
            }
        },
        handleChangePassword(){
            alert('修改密码')
        },
       async handleLogout(){
         try{
            const response = await this.$store.dispatch('handleLogout')
            setTimeout(() => {
                this.$router.push('/login')
            }, 100);
            this.$message.success('退出成功')
         }catch(e){
            console.log(e.message)
         }
        }
    },
}
</script>
<style lang="scss">
    .link{
        text-decoration: none;
        margin-left: 40px;
        color: #fff;
    }
    .img{
        vertical-align: middle;
        margin-right: 10px;
    }
    .el-dropdown{
        float: right;
        margin-right: 40px;
        color: #fff;
    }
</style>
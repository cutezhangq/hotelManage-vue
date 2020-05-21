<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">SJU酒店管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <!-- 用户身份选择 -->
                <el-form-item prop="authority_radio">
                  <el-radio-group v-model="authority_radio">
                    <el-radio :label="1">超级管理员</el-radio>
                    <el-radio :label="2">经理</el-radio>
                    <el-radio :label="3">前台人员</el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : </p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import {get,post} from '@/utils/request'

export default {
    data: function() {
        return {
            authority_radio: 1,
            cur_username:"",
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    beforeMount:{},
    methods: {
        //验证用户名、密码、权限是否匹配
        loginIn(){
          let _this = this;
          get(`/dao.show_userInfo?username=${ _this.param.username}
              &password=${_this.param.password}
              &authority=${_this.authority_radio}`
          )
          .then( data =>{
            if(data.code === 200){
              if(data.data.infoList.length > 0){
                this.$message.success('登录成功');
                localStorage.setItem('ms_username', _this.param.username);
                localStorage.setItem('authority', _this.authority_radio);
                this.$router.push('/');
              }else{
                this.$message.error('用户名或密码或身份 错误');
              }
            }
          })
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.loginIn();
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    /* color: #fff; */
    color: #409EFF;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
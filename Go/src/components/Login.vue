<template>
  <div class="Login">
     <div class="Login-img">

     </div>
   <div class="Login-login">
    <div class="Login-login-ordinary">
     <el-form :label-position="labelPosition"  ref="formLogin"  :rules="rulesLogin" label-width="80px" :model="formLogin">
       <el-form-item label="手机号" prop="account">
         <el-input v-model="formLogin.account" placeholder="员工手机号"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="password">
         <el-input type="password" v-model="formLogin.password" autocomplete="off" placeholder="请输入密码"></el-input>
       </el-form-item>
       <div class="Login-login-two-inline">
         <el-form-item prop="rememberPwd">
           <el-checkbox v-model="formLogin.rememberPwd">记住密码</el-checkbox>
         </el-form-item>
         <el-form-item class="Login-login-color">
           <a href="###">忘记密码</a>
         </el-form-item>
       </div>
       <el-form-item>
         <el-button class="Login-login-button" @click="isLogin('formLogin')">登录</el-button>
       </el-form-item>
     </el-form>
    </div>
   </div>
  </div>
</template>

<script>
  import {hex_md5} from '../static/md5'
export default {
  name: 'Login',
  data () {

    return {
      user:0,//默认是普通方式登录，0为普通 1为手机登录
      //登录的参数,
      formLogin: {
        account: '',
        password: '',
        rememberPwd: false,
        checkCode: '',
      },
      //验证码路径
      srcValue:"###",
     labelPosition:'right', //右对齐  element内部属性
      //登录验证
      rulesLogin: {
        account: [
          { validator:this.GLOBAL.formValidator.accountPass,trigger: 'blur' },
        ],
      }
    }
  },
  mounted:function(){
    this.rememberPwdFunc(this.formLogin);
  },
  methods: {

    isLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid){
          //用来跨域的
          this.$http.options.xhr = {withCredentials: true}
          let ac = (this.user === 1) ? ("+86" + this.formLogin.account) : this.formLogin.account,
            data = JSON.stringify({
              phone: ac,
              pwd: hex_md5(this.formLogin.password)
            }),
            config = {
              headers: {
                "Content-type": "application/json;charset=utf-8",
              }
            };
          this.$http.post('/user?', data, config)
            .then(response => {
              this.rememberPwdInLogin(this.formLogin.rememberPwd, this.formLogin)
              sessionStorage.setItem('isLogin', 'true');
              this.$router.push('/index/today');
            }).catch(err => {
            console.log(err);
            this.errorTips(err.response, '登录失败');
          })
        }else {
          return false;
        }
      })
    },



       /*
       * 错误提示信息
       */
    errorTips: function (res, type) {
      if (res.status === 401) {
        this.openTips(type, '缺少权限', 'error');
      } else if(res.status === 500) {
        this.openTips(type, '服务器问题，请稍后再试', 'error');
      } else {
        this.openTips(type, res.data, 'error');
      }
    },


    /*
 *  记住密码,进入页面的加载功能
 */
    rememberPwdFunc: function(formLogin){
//            检测里面的rememberPwd是否为真
      if (this.GLOBAL.getCookie('rememberPwd')){
        let ac=this.GLOBAL.getCookie('account')
        formLogin.account=ac.indexOf('+86')===0?ac.substring(3):(ac);
        formLogin.password=this.GLOBAL.getCookie('password');
        formLogin.rememberPwd=Boolean(this.GLOBAL.getCookie('rememberPwd'));
        formLogin.user=this.GLOBAL.getCookie('user');
      }
    },

    /*
     *记住密码，登录时候确定是否记住，并修改localStorage
     */
    rememberPwdInLogin: function (flag, formLogin) {
      if (!flag){
        this.GLOBAL.deleteCookie('rememberPwd');
        this.GLOBAL.deleteCookie('account');
        this.GLOBAL.deleteCookie('password');
        this.GLOBAL.deleteCookie('user');
      }else {
        this.GLOBAL.setCookie('rememberPwd', formLogin.rememberPwd, 10);
        this.GLOBAL.setCookie('user', formLogin.user, 10);
        this.GLOBAL.setCookie('account', formLogin.account, 10);
        this.GLOBAL.setCookie('password', formLogin.password, 10);
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .Login-img
 {
   width: 100%;
   height: 400px;
   background: url("../assets/黑狱之战.jpg");
 }

  .Login-nav ul
  {
    float: right;
    width: 100%;
  }
  .Login-nav ul li
  {
    list-style: none;
    float: left;
    display: block;
    width: 50%;
    text-align: center;
    color: white;
    cursor:pointer
  }
  .Login-nav ul li:hover{
    color: orange;
  }
  .Login-login
  {
    height: 550px;
    background:#000000;
    opacity: 0.8;
    width:100%;
  }
  .Login-login-ordinary
  {
      margin: auto 35%;
      padding-top: 60px;
  }
 .Login-login-two-inline{
   display: flex;
   display:  -webkit-flex;
   justify-content:space-between;
 }
 .Login-login-two-inline .checkCode{
   height: 40px;
 }
  .Login-login-color a{
    color: white;
  }
  .Login-login-button{
    width: 50%;
  }
</style>

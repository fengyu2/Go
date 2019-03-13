<template>
  <div>
    <el-form ref="form"  :data="formData" label-width="80px" class="AboutMe-form">
      <el-form-item>
      <el-col :span="6"><h2>我的信息</h2></el-col>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-col :span="6">
          <span prop="name">{{formData.name}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-col :span="6">
          <span prop="phone">{{formData.phone}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="学校:">
        <el-col :span="6">
          <span prop="school">{{formData.school}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="权限:">
        <el-col :span="6">
          <span prop="permissions">{{formData.authZH}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="ID:">
        <el-col :span="6">
          <span prop="id">{{formData.id}}</span>
        </el-col>
      </el-form-item>
    </el-form>
    <el-form>
      <el-button type="primary" @click="change">更改个人信息</el-button>
      <el-button type="primary" @click="dialogVisiblepassword=true">修改登录密码</el-button>
    </el-form>

    <!--个人信息界面-->

    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="60%"
      center
      >
      <el-form   label-width="80px" :model="formData">
        <el-form-item label="姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="学校" v-if="showSchool">
          <el-input v-model="formData.school"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Commit">确 定</el-button>
  </span>
    </el-dialog>

    <!--密码修改界面-->

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisiblepassword"
      width="50%"
      center
      >
      <el-form   label-width="80px" :model="passwordData">
        <el-form-item label="原有密码">
          <el-input v-model="passwordData.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordData.newPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisiblepassword = false">取 消</el-button>
    <el-button type="primary" @click="commitpwd">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {hex_md5} from '../static/md5'
  export default {
    name: "AboutMe",
    data(){
      return{
        formData:{authZH:''},
        dialogVisible:false,
        dialogVisiblepassword:false,
        showSchool:true,
        passwordData:{},
      }
    },
    created(){
         this.load(undefined)
    },
    watch:{
      formData:function () {
        this.formData.authZH=this.$store.state.authBH[this.formData.auth];
      }
    },
    methods:{
      /*
* 错误提示信息
*/
      errorTips: function (res, type) {
        if (res.status === 401) {
          this.openTips(type, '缺少权限', 'error');
        } else if (res.status === 402) {
          this.openTips('登录状态丢失，请重新登录', '', 'error');
        } else if(res.status === 500) {
          this.openTips(type, '服务器问题，请稍后再试', 'error');
        } else {
          this.openTips(type, res.data, 'error');
        }
      },
      load:function () {

        this.$http.get('/user')
          .then(response=>{
            this.formData=response.data
          })
          .catch(error=>{
            this.errorTips(error.response, '获取个人信息错误');
          })
      },
    change:function(){
      this.dialogVisible=true;
      if(this.formData.auth==2){
        this.showSchool=false;
      }
    },
      open3() {
        this.$notify({
          title: '成功',
          message: '个人信息更新成功',
          type: 'success'
        });
      },
      open() {
        this.$notify({
          title: '成功',
          message: '密码更新成功',
          type: 'success'
        });
      },

      commitpwd:function(){
        let data=JSON.stringify(
          {
            oldPwd:hex_md5(this.passwordData.oldPwd),
            newPwd:hex_md5(this.passwordData.newPwd),
          }
        )
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        this.$http.put('/user/pwd',data,config)
          .then(response=>{
            this.open()
            this.dialogVisiblepassword=false

            this.$router.push('/');
          }).catch(error=>{
          this.errorTips(error.response, '更改个人密码失败');
        })
      },


      Commit:function () {

        let data=JSON.stringify({
          name:this.formData.name,
          phone:this.formData.phone,
          school:this.formData.school
        })
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        if(this.formData.auth==2)
        {
           this.$http.put('/user/employee',data,config)
             .then(response=>{
               this.open3()
             }).catch(error=>{
             this.errorTips(error.response, '更改个人信息失败');
           })
        }
        else {
          this.$http.put('/user/marketingManager',data,config)
            .then(response=>{
              this.open3()
            }).catch(error=>{
            this.errorTips(error.response, '更改个人信息失败');
          })
        }
      }
    }
  }
</script>

<style scoped>
 .AboutMe-form{

 }
</style>

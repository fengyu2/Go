<template>
    <div>
        <header class="Index-header">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="$route.path">
            <el-menu-item :index="item.url" :key="i" v-for="(item,i) in topNav">
              <router-link :to="item.url" tag="li">
                <span>{{item.name}}</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="exit-1" class="head__li" @click="exit">退出系统</el-menu-item>
          </el-menu>
        </header>
        <section>
          <el-container class="width">
            <el-aside class="Index-section-aside" width="10%">
              <el-menu
                class="el-menu-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :default-active="$route.path">
                <el-menu-item :index="item.url" :key="i" v-for="(item,i) in leftNav">
                  <router-link tag="li" :to="item.url">
                    <i class="el-icon-menu"></i>
                    <span >{{item.name}}</span>
                  </router-link>
                </el-menu-item>
              </el-menu>
             </el-aside>
            <el-main class="Index-section-main" width="90%"><router-view ></router-view></el-main>
          </el-container>
        </section>

    </div>
</template>

<script>
    export default {
        name: "index.vue",
        data(){
          return{
            leftNav:[
              {url:'/index/employeeManage',        name:'员工管理'},
              {url:'/index/marketingManage',       name:'市场经理'},
              {url:'/index/aboutStudentAddress',   name:'学生来源'},
              {url:'/index/aboutStudent',          name:'学生详情'},
              {url:'/index/classArrange',          name:'班级安排'},
              {url:'/index/today' ,                name:'今日详情'},
              {url:'/index/Select',                name:'测试选择'},
            ],
            topNav:[
              {url:'/index/aboutCompony',name:'安洁围棋'},
              {url:'/index',name:'首页'},
              {url:'/index/aboutMe',name:'我的信息'},
            ],
          }
        },
      methods:{
        exit:function () {
          this.$http.delete('./user').then(response => {
            this.$store.dispatch('changeIsLogin');
            sessionStorage.clear();
            this.$router.push('/');
          }).catch(error => {
            this.$store.dispatch('changeIsLogin');
            sessionStorage.clear();
            this.$router.push('/');
          })
        }
      }
    }
</script>

<style scoped>
.Index-header
{
  width: 100%;
  height: 100%;
}
.Index-section-aside
{

  background-color: #545c64;
  color: #333;
  text-align: center;
  height: 1300px;
}
  .Index-section-main
  {
    height: 100%;
    width: 90%;
    background-color: #D3DCE6;
  }

.head__li {
  float: left;
}
</style>

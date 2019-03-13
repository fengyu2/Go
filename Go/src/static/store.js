/**
 * Created by MangoGan on 2017/10/2.
 */
import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex);

const state={
  //todo state一刷新页面就重置了，无法保存
  user:{

  },
  typeBH:{0:"社区",1:"小学",2:"幼儿园",3:"网络",4:"转介绍",5:"市调",6:"直访"},
  authBH:{1:"市场经理",2:"员工"},
  stateBH:{0:"有效",1:"无效",2:"会员"},
  DegreeBH:{0:"重要",1:"一般",2:"不重要"},
  SalesBH:{0:"没有意向",1:"继续跟进",2:"试听课程",3:"成为会员"},
  supply : [],//来源
  supplyMap : new Map(),
  //todo 承运商没有权限字段,但是多一个公司名简称
  enTranslate : {
    name : '姓名',
    phone : '手机号',
    id : '编号',
    auth : ['承运商','贸易员','物流员','门卫','理货员'],
    password : '密码',
    companyName : '公司名'
  },
  bookDetail:{

  },
  isLogin:false,
  auth:6//管理员0，贸易员1，物流员2，门卫3，理货员4，承运商5，未登录6
};

export default new Vuex.Store({
  state,
  mutations:{
    //加载用户信息
    [types.ADD_USER_PROFILE](state,profileObj){
      for (let key in profileObj){
        state.user[key]=profileObj[key]
      }
      if (state.user.id===-1) state.auth = 0
      else if (!state.user.auth) state.auth = 5
      else state.auth=state.user.auth
      state.isLogin=true
    },
    [types.ADD_SUPPLY](state,supplyData){
      state.supply =  Vue.prototype.GLOBAL.deepCopy(supplyData);
      supplyData.forEach(item=>{
        state.supplyMap.set(item['id'], item['name'])
      })
    },
    [types.ADD_BOOKDETAIL_PLAN](state,plan){
      state.bookDetail.plan=Vue.prototype.GLOBAL.deepCopy(plan)
    },
    [types.CHANGE_ISLOGIN](state){
      state.user={}
      state.isLogin=false
      state.auth=6
    }
  },
  actions:{
    //增加个人信息
    addUserProfile({commit},profileObj){
      commit(types.ADD_USER_PROFILE,profileObj);
    },
    addSupply({commit},supplyData){
      commit(types.ADD_SUPPLY,supplyData)
    },
    addBookDetailPlan({commit},plan){
      commit(types.ADD_BOOKDETAIL_PLAN,plan)
    },
    changeIsLogin({commit}){
      commit(types.CHANGE_ISLOGIN)
    }
  },
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import AboutCompony from '../components/AboutCompany'
import AboutMe from '../components/AboutMe'
import EmployeeManage from '../components/EmployeeManage'
import MarketingManage from '../components/MarketingManager'
import AboutStudentAddress from '../components/AboutStudentAddress'
import AboutStudent from '../components/AboutStudent'
import ClassArrange from '../components/ClassArrange'
import Today from '../components/Today'
import Select from '../components/Select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/index',
      name:'Index',
      component:Index,
      children:[
        { path:'aboutCompony',name:'AboutCompony',component:AboutCompony},
        { path:'aboutMe',name:'AboutMe',component:AboutMe},
        { path:'employeeManage',name:'EmployeeManage',component:EmployeeManage},
        { path:'marketingManage',name:'MarketingManage',component:MarketingManage},
        { path:'aboutStudentAddress',name:'AboutStudentAddress',component:AboutStudentAddress},
        { path:'aboutStudent',name:'AboutStudent',component:AboutStudent},
        { path:'classArrange',name:'ClassArrange',component:ClassArrange},
        { path:'today',name:'Today',component:Today},
        { path:'Select',name:'Select',component:Select}
      ]
    }
  ]
})

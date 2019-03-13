// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import formRules from './static/Global-rules'
import axios from 'axios'
import {Notification} from 'element-ui'
import store from './static/store'

Vue.use(ElementUI)
Vue.config.productionTip = false;



Vue.prototype.GLOBAL = formRules;
axios.defaults.baseURL = formRules.URL;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.prototype.openTips = function (title,text,type) {
  const h = this.$createElement;
  Notification({
    title: title,
    message: h('i', { style: 'color: teal'}, text),
    type: type
  });
};






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

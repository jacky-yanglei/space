import Vue from 'vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/common.css';

import store from './store/store'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);




export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

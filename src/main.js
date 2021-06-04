import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

/************CSS**************/
import './assets/sass/style.scss';
/************CSS**************/

/************ELEMENT**************/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
/************ELEMENT**************/

/************AXIOS**************/
import Axios from "./tools/promise.js"; //请求封装
Axios(Vue);//实例化
/************AXIOS**************/

/************COMMON**************/
import commonjs from './tools/common.js'; //公共方法
Vue.prototype.$common = commonjs;
/************COMMON**************/

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

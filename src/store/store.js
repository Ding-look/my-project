import Vue from 'vue'
import Vuex from 'vuex'
import menuJson from '../config/Menu.json';

Vue.use(Vuex);

//全局应用数据
const Global = {
    state: {
        username: null,
        userType: null,
        token: null,
        menuList: menuJson, //全局菜单列表
    },
    mutations: {
        //设定用户名称
        setUsername(state, data) {
            state.username = data;
        },
        //设定用户类型
        setUserType(state, data) {
            state.userType = String(data);
        },
        //设定用户token
        setToken(state, data) {
            state.token = data;
        },
        //清除用户数据
        removeUser(state) {
            state.username = '';
            state.userType = '';
            state.token = '';
        },
        //设定菜单列表
        setMenuList(state, data) {
            state.menuList = data;
        },
    },

    actions: {}
};

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        global: Global,
    }
})
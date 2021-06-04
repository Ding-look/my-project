import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue' //登录页
import Index from '@/views/Index.vue' //首页
import Account from '@/views/Account/Account.vue'//账号管理页
import User from '@/views/User/User.vue' //账号字典
import Analysis from '@/views/Analysis/Analysis' //账号字典
import Effect from '@/views/Analysis/AnalysisEffect.vue' //账号字典
import Material from '@/views/Analysis/AnalysisMaterial.vue' //账号字典

import notFound from '@/views/404.vue' //活动配置页


Vue.use(Router);
/**
 * 权限配置说明：
 * 每个路由页面需要在meta中添加authority参数，不然无法显示
 * authority:1>管理员(默认所以权限，可不加)
 admin 1 管理员
 operator 2 运营
 */
const newRouter = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            meta: {authority: ['1', '2']},
            children: [{
                path: '/user',
                name: 'user',
                component: User,
                meta: {authority: ['1']}
            }, {
                path: '/account',
                name: 'account',
                component: Account,
                meta: {authority: ['1']}
            }, {
                path: '/analysis',
                name: 'analysis',
                component: Analysis,
                children: [{
                    path: '/analysis/effect',
                    name: 'effect',
                    component: Effect,
                    meta: {authority: ['1', '2']}
                }, {
                    path: '/analysis/material',
                    name: 'material',
                    component: Material,
                    meta: {authority: ['1', '2']}
                }]
            }]
        }, {
            path: '/login',
            name: 'login',
            component: Login,
        }, {
            path: '*',
            name: 'notFound',
            component: notFound,
        }
    ]
});

export default newRouter

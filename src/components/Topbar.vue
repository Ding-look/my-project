<!-- 顶通组件 -->
<template>
    <div class="top-bar" v-loading="loading_app">

        <a href="javascript:;" :title="btnMenuTip" @click="menuControl" class="btn-menu-control"><i
                :class="btnMenuIcon"></i></a>
        <!-- 用户信息 -->
        <el-popover placement="top-start" width="96" trigger="hover" v-if="username">
            <!-- 退出登录 -->
            <el-button type="text" icon="el-icon-switch-button" @click="logout" class="btn-out">安全退出</el-button>
            <!-- /退出登录 -->
            <div slot="reference" class="username f_r" :title="username"><span class="icon-user"><img
                    src="~@/assets/icon-user.png" alt=""></span> {{username}}
            </div>
        </el-popover>
        <!-- /用户信息 -->
        <router-link to="/login" v-else class="f_r">
            <el-button type="primary" style="margin:6px 20px 0 0">前往登录</el-button>
        </router-link>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        //输出名称
        name: 'topBar',
        //组件所需传入数据
        props: {
            collapse: {
                type: Boolean,
                default: false
            }
        },

        // 初始化数据
        data() {
            return {
                channel: '',
                game: '',
                btnMenuTip: '收起菜单',
                btnMenuIcon: 'el-icon-s-fold',
                appId: '',
                loading_app: false
            }
        },

        // 数据格式化
        computed: {
            ...mapState({
                username: state => state.global.username,
                userType: state => state.global.userType,
                token: state => state.global.token,
            })
        },

        // 方法集合
        methods: {
            //登录数据请求
            axiosLogOut() {
                return this.$http.post("user/logout", {});
            },

            //退出登录
            logout() {
                localStorage.removeItem('shortVideoId');//清除ls用户数据
                this.$store.commit('removeUser');//清除vuex用户数据
                this.$router.push('/login');
            },

            //用户数据数据请求
            axiosUser() {
                return this.$http.get("user", {
                    params: {}
                });
            },

            menuControl() {
                if (this.collapse) {
                    this.btnMenuIcon = 'el-icon-s-fold';
                    this.btnMenuTip = '收起菜单';
                } else {
                    this.btnMenuIcon = 'el-icon-s-unfold';
                    this.btnMenuTip = '展开菜单';
                }
                this.$emit('update:collapse', !this.collapse);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/sass/helpers/variables";
    @import "~@/assets/sass/helpers/mixins";

    .top-bar {
        height: 50px;
        background: #FFF;
        position: absolute;
        z-index: 3;
        width: 100%;
        left: 0;
        top: 0;
    }

    .username {
        height: 30px;
        line-height: 30px;
        margin: 10px 40px 0 0;
    }

    .icon-user {
        img {
            width: 30px;
            vertical-align: bottom;
        }
    }

    .btn-out {
        padding: 2px 10px !important;
    }

    .btn-menu-control {
        font-size: 20px;
        display: inline-block;
        color: #9ba0a5;
        padding: 1px 4px;
        border-radius: 4px;
        margin-top: 10px;
    }

    .btn-menu-control:hover {
        color: #1890ff;
    }
</style>
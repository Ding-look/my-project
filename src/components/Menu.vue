<!-- 菜单组件 -->
<template>
    <div class="menu">
        <!-- logo -->
        <router-link class="logo" to="/" alt="新数网络" title="新数网络"></router-link>
        <!-- /logo -->
        <el-menu :default-active="parentActive ? parentActive : $route.path"
                 background-color="#001529" text-color="#9ba0a5" active-text-color="#fff" :router="true"
                 :collapse="collapse">
            <template v-for="(item,index) in menuList">
                <el-submenu :index="item.path" :key="'submenu'+index"
                            v-if="item.authority.indexOf(userType)>=0&&item.children&&item.children.length!=0">
                    <template slot="title">
                        <i :class="['wm-iconfont',item.iconfont]"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <template v-for="(ite,i) in item.children">
                        <el-menu-item :index="ite.path" :key="'menuitem'+i" :route="ite.path"
                                      v-if="ite.authority.indexOf(userType)>=0">
                            <span slot="title">{{ite.title}}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item :index="item.path" :key="'submenu'+index" :route="item.path"
                              v-else-if="item.authority.indexOf(userType)>=0">
                    <i :class="['wm-iconfont',item.iconfont]"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        //输出名称
        name: 'Menu',
        //组件所需传入数据
        props: {
            parentActive: String,
            collapse: {
                type: Boolean,
                default: false
            }
        },

        // 数据格式化
        computed: {
            ...mapState({
                userType: state => state.global.userType,
                menuList: state => state.global.menuList
            })
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/sass/helpers/variables";
    @import "~@/assets/sass/helpers/mixins";

    .logo {
        display: block;
        background: url("~@/assets/logo-pure.png") no-repeat center;
        background-size: contain;
        height: 24px;
        width: 164px;
        margin: 33px auto;
    }

    .index-min-menu .logo {
        visibility: hidden;
    }

    .el-menu {
        border: initial;
    }

    .menu {
        .wm-iconfont {
            margin-right: 6px;
        }

        .el-menu-item i, .el-submenu__title i {
            color: #9ba0a5;
        }

        .el-menu-item:hover {
            background-color: #002c55 !important;
        }

        .el-menu-item.is-active {
            border-right: 3px solid #006fd7;
            background-color: #1890ff !important;

            i {
                color: #FFF;
            }
        }
    }

    .el-menu--popup-right-start {
        margin-left: 0px !important;
    }

    .el-submenu.is-active {
        .el-submenu__title {
            color: #ffffff !important;
            //background-color: #1890ff !important;
        }

        .wm-iconfont {
            color: #ffffff !important;
        }
    }
</style>
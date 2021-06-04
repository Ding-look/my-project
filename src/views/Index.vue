<template>
    <div :class="['index-wrapper', isCollapsed?'index-min-menu':'']">
        <div class="index-aside">
            <side-menu :parentActive="activeMenu" :collapse="isCollapsed"></side-menu>
        </div>
        <div class="index-content">
            <top-bar :collapse.sync="isCollapsed"></top-bar>
            <div class="main">
                <div class="breadcrumb"><span v-html="breadcrumbHtml"></span></div>
                <div class="main-wrap">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import topBar from '@/components/Topbar.vue';
    import sideMenu from '@/components/Menu.vue';

    export default {
        components: {topBar, sideMenu},

        data() {
            return {
                breadcrumbHtml: '',//面包屑html
                activeMenu: null,//强制设定的菜单
                isCollapsed: false
            }
        },

        computed: {
            ...mapState({
                menuList: state => state.global.menuList,
                userType: state => state.global.userType
            })
        },

        methods: {
            //创建面包屑数据
            creatBreadcrumb(fullPath, pathTitle, parentId, pageTitle) {
                pathTitle = pageTitle ? pageTitle : pathTitle;
                if (this.$common.isArray(fullPath)) {
                    this.activeMenu = fullPath[0].path;
                    this.breadcrumbHtml = '';
                    fullPath.forEach((currentV, index) => {
                        let pathId = currentV.hasId ? parentId : '';
                        this.breadcrumbHtml += `<a href="#${currentV.path}${pathId}">${currentV.name}</a> / `;
                    });
                    this.breadcrumbHtml += `${pathTitle}`;
                } else {
                    let nTitle = pathTitle ? '> ' + pathTitle : '';
                    this.activeMenu = pathTitle ? fullPath : null;//指定导航的active
                    for (let i = 0; i < this.menuList.length; i++) {
                        if (this.menuList[i].path === fullPath) {
                            this.breadcrumbHtml = pathTitle ? `<a href="#${fullPath}">${this.menuList[i].title}</a> ${nTitle}` : this.menuList[i].title;
                            return;
                        } else if (fullPath.indexOf(this.menuList[i].path) === 0 && this.menuList[i].children) {
                            for (let j = 0; j < this.menuList[i].children.length; j++) {
                                if (this.menuList[i].children[j].path === fullPath) {
                                    this.breadcrumbHtml = `${this.menuList[i].title} / <a href="#${fullPath}">${this.menuList[i].children[j].title}</a> ${nTitle}`;
                                    return;
                                }
                            }
                        }
                    }
                }
            },

            //重定向-权限控制以及解决进入无用路由空白页的问题
            redirect(fullPath, meta) {
                //首页重定向
                if (fullPath === '/') {
                    let firstPath = "";
                    switch (this.userType) {
                        case 1:
                            firstPath = '/user';
                            break;
                        default:
                            firstPath = '/analysis/effect';
                            break;
                    }
                    this.$router.push(firstPath);
                    return false;
                }

                const auth = meta.authority;
                //权限控制
                if (!auth || auth.indexOf(this.userType) < 0) {
                    this.$router.push({
                        path: '/notFound',
                        query: {
                            type: 'noAuthority'
                        }
                    });
                    return false;
                }

                return true;
            }

        },

        beforeCreate() {
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                const breadValue = to.meta.activeMenu ? to.meta.activeMenu : to.fullPath;
                vm.redirect(to.fullPath, to.meta);
                vm.$nextTick(() => {
                    vm.creatBreadcrumb(breadValue, to.meta.describe, to.params.parentId, to.query.pageTitle);
                })
            });
        },

        beforeRouteUpdate(to, from, next) {
            const breadValue = to.meta.activeMenu ? to.meta.activeMenu : to.fullPath;
            this.creatBreadcrumb(breadValue, to.meta.describe, to.params.parentId, to.query.pageTitle);
            this.redirect(to.fullPath, to.meta) && next();
        }
    }
</script>

<style lang="scss" scoped>

    .main {
        float: left;
        width: 100%;
        padding-top: 50px;
    }

    .main-wrap {
        min-height: 800px;
    }
</style>
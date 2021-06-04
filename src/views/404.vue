<template>
    <div class="index-wrapper" :class="['wrapper', isCollapsed?'index-min-menu':'']">
        <div class="index-aside">
            <side-menu :parentActive="activeMenu" :collapse="isCollapsed"></side-menu>
        </div>
        <div class="index-content">
            <top-bar :collapse.sync="isCollapsed"></top-bar>
            <div class="main">
                <div class="main_wrap">
                    <p style="text-align:center;padding-top: 60px;"><img src="~@/assets/404.png" alt=""></p>
                    <div v-if="isNotDefine">
                        <h1 style="text-align: center; font-size: 100px; line-height: 120px; padding-top: 20px;">
                            404</h1>
                        <h2 style="text-align: center;">你要找的页面不存在</h2>
                    </div>
                    <div v-else>
                        <h1 style="text-align: center; font-size: 40px; line-height: 120px; padding-top: 20px;">
                            您无权限浏览此页面</h1>
                        <h2 style="text-align: center;">若想访问，请联系相关技术人员</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //组件模块引入
    import topBar from '@/components/Topbar.vue';
    import sideMenu from '@/components/Menu.vue';

    export default {
        components: {topBar, sideMenu},

        data() {
            return {
                activeMenu: null,
                isNotDefine: true,
                isCollapsed: false
            }
        },

        // 生命周期-准备创建dom
        created() {
            if (this.$route.query.type === 'noAuthority') {
                this.isNotDefine = false;
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
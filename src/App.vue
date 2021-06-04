<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'App',
        beforeCreate() {
            //获取登录态
            const userInfo = JSON.parse(this.$common.getLocalStorage('shortVideoId', 1));
            if (userInfo && userInfo.token) {
                //保存数据到store
                this.$store.commit('setUsername', userInfo.username);
                this.$store.commit('setToken', userInfo.token);
                this.$store.commit('setUserType', userInfo.roleType);
            } else {
                //跳转到登录
                this.$router.push('/login');
            }
        },
    }
</script>

<style lang="scss">
</style>

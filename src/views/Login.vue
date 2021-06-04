<template>
    <div class="login-container" v-loading="loading">
        <div class="login-image">
        </div>
        <div class="login-box">
            <div class="login-wrapper" v-on:keyup.enter="onSubmit('loginForm')">
                <div class="login-logo">
                </div>
                <div class="loginTitle">
                    <b>短视频分析平台</b>
                </div>
                <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px">
                    <div class="m-b-30">
                        <el-form-item prop="accountInput">
                            <el-input v-model="loginForm.accountInput" maxlength="100" placeholder="账户" clearable
                                      prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                    </div>
                    <div class="m-b-50">
                        <el-form-item prop="passwordInput">
                            <el-input placeholder="密码" maxlength="100" v-model="loginForm.passwordInput" show-password
                                      prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                    </div>
                    <el-button type="primary" @click="onSubmit('loginForm')">登 录</el-button>
                </el-form>
            </div>
        </div>
        <p class="copyright">Copyright&copy;2011-2021 WiseMedia Corporation, All Rights Reserved</p>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                loginForm: {
                    accountInput: '',
                    passwordInput: ''
                },
                rules: {
                    accountInput: [
                        {required: true, message: '请输入公司邮箱'}
                    ],
                    passwordInput: [
                        {required: true, message: '请输入密码'}
                    ]
                },
                loading: false
            }
        },

        // 方法集合
        methods: {
            //登录数据请求
            axiosLogin() {
                return this.$http.post("user/user/login", {
                    user_name: this.loginForm.accountInput,
                    password: this.loginForm.passwordInput
                });
            },

            //用户数据数据请求
            axiosUser() {
                return this.$http.post("user/dictionary/getRole", {});
            },

            //提交登录
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.axiosLogin().then((res) => {
                            if (res.data.code === 200) {
                                this.$store.commit('setToken', res.data.data.token);
                                this.axiosUser().then((res2) => {
                                    if (res2.data.code === 200) {
                                        //保存数据到store
                                        this.$store.commit('setUsername', res2.data.data.user.user_name);
                                        this.$store.commit('setUserType', res2.data.data.user.role_id ? res2.data.data.user.role_id : 0);

                                        //储存用户信息到local
                                        let userDate = JSON.stringify({
                                            token: res.data.data.token,
                                            roleType: res2.data.data.user.role_id,
                                            username: res2.data.data.user.user_name,
                                        });
                                        this.$common.setLocalStorage('shortVideoId', userDate);
                                        //跳转
                                        this.$router.push('/');
                                    }
                                });
                            }
                        }).finally(() => {
                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.historyPath = from.path;
            });
        }
    }
</script>

<style lang="scss">
    .login-container {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        display: flex;
        background: url('~@/assets/bg-login.png') no-repeat 0 0 #FFFFFF;
        background-size: cover;

        .copyright {
            position: fixed;
            bottom: 20px;
            left: 15%;
            width: 800px;
            font-size: 14px;
            color: #FFFFFF;
        }
    }

    .login-image {
        width: 55%;
        height: 100%;
        position: relative;
    }

    .login-box {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
    }

    .login-wrapper {
        width: 438px;
        height: 488px;
        margin: 0 10em 0 0;
        color: #000;
        overflow: hidden;

        .login-logo {
            width: 290px;
            height: 40px;
            background: url("~@/assets/logo.png") no-repeat 0;
            background-size: contain;
            margin: 36px auto;
        }

        form {
            padding: 0 26px;

            & > button {
                width: 100%;
                font-size: 16px;
            }

            .el-input__inner {
                color: #333333;
                border-color: #D9D9D9;
            }

            .el-input__prefix, .el-input__suffix {
                color: #46A8FF;
            }
        }
    }

    .loginTitle {
        text-transform: uppercase;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #333333;
        font-size: 30px;
        line-height: 66px;
        text-align: center;
        position: relative;
        font-weight: bold;
        height: 84px;

        b {
            color: #000;
        }

        img {
            width: 170px;
        }

        p {
            position: absolute;
            font-size: 12px;
            color: #92c427;
            left: 50%;
            top: 4px;
            margin-left: 94px;
        }

        span {
            position: absolute;
            font-size: 12px;
            color: #92c427;
        }
    }
</style>
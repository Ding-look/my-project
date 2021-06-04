<template>
    <div class="main-group">
        <el-button type="primary" @click="addNew" class="f_r m-b-25 main-button" size="small"><i
                class="el-icon-plus"></i> &nbsp;新增
        </el-button>
        <!-- 表格区 -->
        <customized-table
                :loading="loading"
                :Data="tableData"
                :Header="header"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @size-change="val=>{pageSizeChange(tableLoad,this,val)}"
                @current-change="val=>{pageChange(tableLoad,this,val)}"
                :show-operation="showOperation"
                :Operation="Operation"
                @edit="editUser"
                @delete="deleteUser"
        >
        </customized-table>
        <!-- /表格区 -->


        <!-- 新增编辑用户弹框 -->
        <customized-dialog
                :title="dialogTitle"
                :visible="dialogVisible"
                :show-footer="true"
                @cancel="resetDialog('addForm')"
                @submit="submitAdd('addForm')"
                @close="resetDialog('addForm')"
        >
            <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="60px" label-position="left"
                     class="dialog-body">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>
        </customized-dialog>
        <!-- /新增编辑用户弹框 -->
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import CustomizedTable from "@/components/CustomizedTable";
    import CustomizedDialog from "@/components/CustomizedDialog";
    import PaginationMixin from "@/mixins/PaginationMixin";
    import DialogMixin from "@/mixins/DialogMixin";
    import _header from "./User.json"
    import _Operation from "./User.js"

    export default {
        // 应用的组件
        components: {CustomizedTable, CustomizedDialog},
        mixins: [PaginationMixin, DialogMixin],

        // 初始化数据
        data() {
            let checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            };
            return {
                //弹框form数据
                addForm: {
                    username: '',
                    email: ''
                },
                //弹框form条件规则
                addRules: {
                    username: [
                        {required: true, message: '请输入用户姓名'}
                    ],
                    email: [
                        {required: true, validator: checkEmail}
                    ]
                }
            }
        },

        // 数据格式化
        computed: {
            ...mapState({}),
        },

        // 方法集合
        methods: {
            //表格数据请求
            axiosTable(page) {
                return this.$http.post("user/dictionary/index", {
                    page_size: this.pageSize,
                    page: page
                });
            },

            //添加用户
            axiosAdd() {
                return this.$http.post("user/dictionary/create", {
                    user_name: this.addForm.username,
                    email: this.addForm.email
                });
            },

            //编辑用户
            axiosEdit(email, user_name, id) {
                return this.$http.post("user/dictionary/update", {
                    email: email,
                    user_name: user_name,
                    id: id
                });
            },

            //删除用户
            axiosDelete(id) {
                return this.$http.post("user/dictionary/delete", {
                    id
                });
            },

            //表格初次加载或reload
            tableLoad(numb) {
                this.loading = true;
                this.axiosTable(numb).then((res) => {
                    if (res && res.data.code === 200) {
                        this.total = Number(res.data.data.pagination.total);
                        this.tableData = res.data.data.list;
                        this.currentPage = numb;
                    }
                }).catch((error) => {
                    console.warn(error);
                }).finally(() => {
                    this.loading = false;
                });
            },

            //打开新增广告主弹框
            addNew() {
                this.dialogVisible = true;
                this.dialogTitle = '新增';
                this.addForm = {
                    username: '',
                    email: ''
                };
            },

            //添加账号提交
            submitAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        if (this.dialogTitle === '新增') {
                            this.axiosAdd().then((res) => {
                                if (res.data.code === 200) {
                                    this.tableLoad(1);//重新加载表格
                                }
                            });
                        } else {
                            this.axiosEdit(this.addForm.email, this.addForm.username, this.addForm.id).then((res) => {
                                if (res.data.code === 200) {
                                    this.tableLoad(this.currentPage);//重新加载表格
                                    this.$message({showClose: true, message: '账号编辑成功', type: 'success'});
                                }
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //打开编辑账号弹框
            editUser(row) {
                this.dialogVisible = true;
                this.dialogTitle = '编辑';
                this.addForm = {
                    username: row.user_name,
                    email: row.email,
                    id: row.id,
                };
            },

            //打开编辑账号弹框
            deleteUser(row) {
                this.$confirm('确定要删除该用户？', '删除用户', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axiosDelete(row.id).then((res) => {
                        if (res.data.code === 200) {
                            this.$message('删除成功');
                            this.tableLoad(1);
                        }
                    })
                }).catch(res => {
                    console.warn(res);
                })
            },

            //打开弹框后，删除验证
            resetDialog(formName) {
                if (this.$refs[formName]) this.$refs[formName].resetFields();
                this.dialogVisible = false
            }
        },

        // 生命周期-准备创建dom
        created() {
            // 放在created中,beforeCreate时header等data数据还未创建
            this.header = _header;
            this.showOperation = true;
            this.Operation = _Operation;
        },

        // 生命周期-dom创建之后
        mounted() {
            //初次加载table
            this.tableLoad(1);
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .dialog-body .el-form-item__label {
        font-size: 16px;
    }
</style>
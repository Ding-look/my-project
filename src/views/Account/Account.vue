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
                @reset="resetUserPwd"
                @config="editAdvertiser"
        >
        </customized-table>
        <!-- /表格区 -->

        <!-- 新增编辑用户弹框 -->
        <customized-dialog
                :title="dialogTitle"
                :visible="dialogVisible"
                :show-footer="true"
                @cancel="resetDialog('addForm')"
                @submit="submitForm('addForm')"
                @close="resetDialog('addForm')"
        >
            <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="60px" label-position="left"
                     class="dialog-body">
                <el-form-item label="账号" prop="email">
                    <!--                    <el-input v-model="addForm.email" :disabled="onEdit" placeholder="新数工作邮箱注册"></el-input>-->
                    <el-select :disabled="onEdit" v-model="addForm.email" filterable placeholder="新数工作邮箱注册">
                        <el-option
                                v-for="item in accountList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-radio-group v-model="addForm.role">
                        <el-radio :label="1">管理员</el-radio>
                        <el-radio :label="2">优化师</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </customized-dialog>
        <!-- /新增编辑用户弹框 -->

        <!-- 新增用户成功弹框 -->
        <customized-dialog
                :title="accountSuccessDialogTitle"
                :visible="accountSuccessDialogVisible"
                :center="true"
                @cancel="resetAccountSuccessDialog"
                @close="resetAccountSuccessDialog"
        >
            <div slot="title" class="el-dialog__title"><span class="icon-success"></span>{{accountSuccessDialogTitle}}
            </div>
            <el-form ref="accountDetail" :model="accountDetail" label-width="60px" label-position="right"
                     class="dialog-body account-detail">
                <el-form-item label="账号:"><span class="font-16">{{accountDetail.email}}</span></el-form-item>
                <el-form-item label="密码:"><span class="font-16">{{accountDetail.password}}</span></el-form-item>
                <el-form-item label="角色:"><span class="font-16">{{accountDetail.role===1?'管理员':'优化师'}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer"></span>
        </customized-dialog>
        <!-- /新增用户成功弹框 -->

        <!-- 配置广告主 -->
        <customized-dialog
                title="配置广告主"
                :visible="advertiserDialogVisible"
                :width="860"
                @cancel="resetAdvertiserDialog"
                @submit="submitFormAdd"
                @close="resetAdvertiserDialog"
                class="advertiser-dialog"
        >
            <div class="advertiser-dialog-header font-16">
                <span>账户：{{currentRow.email}}</span>
                <span class="main-gutter"></span>
                <span>角色：{{accountDetail.role===0?'管理员':'优化师'}}</span>
                <el-input
                        class="f_r"
                        placeholder="请输入要搜索的广告主"
                        prefix-icon="el-icon-search"
                        v-model="advertiserKeyword"
                        @input="handleSearchChange"
                        clearable>
                </el-input>
            </div>
            <!-- 表格区 -->
            <customized-table
                    :loading="loadingCopy"
                    :Data="tableDataCopy"
                    :Header="headerCopy"
                    :total="totalCopy"
                    :page-size="pageSizeCopy"
                    :current-page="currentPageCopy"
                    :show-operation="showOperationCopy"
                    :Operation="OperationCopy"
                    pagination-layout="total, prev, pager, next, jumper"
                    @switch="switchTheStatus"
                    @current-change="val=>{pageChangeCopy(tableAdLoad,this,val)}"
            >
            </customized-table>
            <!-- /表格区 -->

        </customized-dialog>
        <!-- /配置广告主 -->

    </div>
</template>

<script>
    import CustomizedTable from "@/components/CustomizedTable";
    import PaginationMixin from "@/mixins/PaginationMixin";
    import CustomizedDialog from "@/components/CustomizedDialog";
    import DialogMixin from "@/mixins/DialogMixin";
    import TableMixin from "@/mixins/TableMixin";
    import {Header, Operation} from "./Account.js"
    import {HeaderCopy, OperationCopy} from "./AccountAd.js"

    export default {
        name: "Account",
        components: {CustomizedTable, CustomizedDialog},
        mixins: [PaginationMixin, DialogMixin, TableMixin],
        data() {
            return {
                accountSuccessDialogTitle: '新增账号成功！',
                accountSuccessDialogVisible: false,
                accountDetail: {
                    eamil: '',
                    password: '',
                    role: 0
                },
                currentRow: {
                    email: '',
                    password: '',
                    role: 0
                },
                addForm: {
                    email: '',
                    role: 2
                },
                addRules: {
                    nickname: [
                        {required: true, message: '请输入用户姓名'}
                    ]
                },
                timerId: null,
                onEdit: false,
                advertiserDialogVisible: false,
                advertiserKeyword: '',
                accountList: null
            }
        },
        created() {
            this.header = Header; // 放在created中,beforeCreate时header等data数据还未创建
            this.showOperation = true;
            this.Operation = Operation;
            this.headerCopy = HeaderCopy;
            this.showOperationCopy = true;
            this.OperationCopy = OperationCopy;
        },
        mounted() {
            this.tableLoad(1); //初次加载table
        },
        methods: {
            //表格数据请求
            axiosTable(page) {
                return this.$http.post("user/manage/index", {
                    page_size: this.pageSize,
                    page: page
                })
            },

            axiosResetPwd(id) {
                return this.$http.post("user/manage/resetPassword", {
                    id
                });
            },

            //编辑用户
            axiosEdit(role_id, id) {
                return this.$http.post("user/manage/updateAccount", {
                    role_id,
                    id
                });
            },

            //添加用户
            axiosAdd() {
                this.currentPage = 1;
                return this.$http.post("user/manage/createAccount", {
                    role_id: this.addForm.role,
                    email: this.addForm.email
                });
            },

            //获取所有未绑定用户
            axiosGetUnuse() {
                return this.$http.post("user/manage/getAccount");
            },

            axiosAdTable(page) {
                return this.$http.post("user/manage/getAdvertiser", {
                    page_size: this.pageSize,
                    user_id:this.currentRow.id,
                    page: page,
                    search: this.advertiserKeyword
                });
            },

            axiosSwitchStatus(advertiser_id, status) {
                return this.$http.post("user/manage/setAdvertiser", {
                    user_id: this.currentRow.id,
                    advertiser_id,
                    status
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

            //表格初次加载或reload
            tableAdLoad(numb) {
                this.loadingCopy = true;
                this.axiosAdTable(numb).then((res) => {
                    if (res && res.data.code === 200) {
                        this.totalCopy = Number(res.data.data.pagination.total);
                        this.tableDataCopy = res.data.data.list;
                        this.currentPageCopy = numb;
                    }
                }).catch((error) => {
                    console.warn(error);
                }).finally(() => {
                    this.loadingCopy = false;
                });
            },

            //打开新增广告主弹框
            addNew() {
                this.dialogVisible = true;
                this.dialogTitle = '新增账号';
                this.addForm = {
                    email: '',
                    role: 1
                };
                this.getUnusedAccount();
            },

            //打开编辑账号弹框
            editUser(row) {
                this.dialogVisible = true;
                this.dialogTitle = '编辑';
                this.onEdit = true;
                this.addForm = {
                    email: row.email,
                    role: row.role_id,
                    id: row.id
                };
            },

            resetUserPwd(row) {

                this.$confirm('确定要重置该用户密码？', '重置密码', {
                    confirmButtonText: '重置',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axiosResetPwd(row.id).then((res) => {
                        if (res.data.code === 200) {
                            this.showUserResult("重置密码成功", res.data.data);
                        }
                    })
                }).catch(res => {
                    console.warn(res);
                });

            },

            getUnusedAccount() {
                this.axiosGetUnuse().then(res => {
                    if (res.data.code === 200) {
                        this.accountList = res.data.data.email;
                    }
                });
            },

            editAdvertiser(row) {
                this.advertiserDialogVisible = true;
                this.currentRow = row;
                this.tableAdLoad(1);
            },

            submitFormAdd() {
                this.axiosAdd().then((res) => {
                    if (res.data.code === 200) {
                        this.showUserResult("新增账户成功", res.data.data);
                        this.tableLoad(1);//重新加载表格
                    }
                });
            },

            submitFormEdit() {
                this.axiosEdit(this.addForm.role, this.addForm.id).then((res) => {
                    if (res.data.code === 200) {
                        this.tableLoad(this.currentPage);//重新加载表格
                        this.$message({showClose: true, message: '账号编辑成功', type: 'success'});
                    }
                });
            },

            //添加账号提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        if (this.dialogTitle === '新增账号') {
                            this.submitFormAdd();
                        } else {
                            this.submitFormEdit();
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //打开弹框后，删除验证
            resetDialog(formName) {
                if (this.$refs[formName]) this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.onEdit = false;
            },

            showUserResult(title, data) {
                this.accountDetail.email = data.email;
                this.accountDetail.password = data.password;
                this.accountDetail.role = data.role_id;
                this.accountSuccessDialogTitle = title;
                this.accountSuccessDialogVisible = true;
            },

            resetAccountSuccessDialog() {
                this.accountSuccessDialogVisible = false
            },

            resetAdvertiserDialog() {
                this.advertiserDialogVisible = false
            },

            switchTheStatus(row) {
                console.log(row)
                let status = row.status == 0 ? 1 : 0;
                this.axiosSwitchStatus(row.advertiser_id, status).then(res => {
                    if (res.data.code === 200) {
                        this.tableAdLoad(this.currentPageCopy);
                    }
                })
            },

            handleSearchChange(val) {
                this.$common.throttle(this.tableAdLoad, this, 500, this.currentPageCopy);
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .dialog-body .el-form-item__label {
        font-size: 16px;
    }

    /deep/ .advertiser-dialog .el-dialog__body {
        padding: 0 0 30px 0 !important;
    }

    .icon-success {
        display: inline-block;
        width: 24px;
        margin: 0 12px 0 0;
        height: 24px;
        background: url("~@/assets/icon-success.png") no-repeat 0 0;
        background-size: contain;
        vertical-align: bottom;
    }

    .account-detail {
        margin: 20px 0 20px 64px;

        /deep/ .el-form-item {
            margin: initial;
        }
    }

    .advertiser-dialog-header {
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding: 0 30px;
        box-sizing: border-box;

        .el-input {
            width: 208px;
        }
    }
</style>
<template>
    <div>
        <div class="main-group">
            <!-- 条件筛选区 -->
            <el-form :inline="true" label-width="90px" class="custom-form-length">
                <el-form-item label="统计时间">
                    <customized-time-picker :date.sync="statisticsTime"></customized-time-picker>
                </el-form-item>
                <el-form-item label="投放账号ID">
                    <el-input v-model="accountDeliver"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="广告组ID">
                    <el-input v-model="adGroup"></el-input>
                </el-form-item>
                <el-form-item label="广告计划ID">
                    <el-input v-model="adPlan"></el-input>
                </el-form-item>
                <el-form-item class="f_r">
                    <el-button class="main-button" size="small" type="primary" @click="searchFn">查询</el-button>
                    <el-button class="main-button" size="small" @click="resetFn">重置</el-button>
                </el-form-item>
            </el-form>
            <!-- 条件筛选区 -->
        </div>
        <div class="main-group">

            <el-button type="primary" @click="exportData" class="f_r m-b-25 main-button" size="small"
                       :loading="exportLoading">下载报表
            </el-button>

            <!-- 表格区 -->
            <customized-table
                    ref="table"
                    :loading="loading"
                    :Data="tableData"
                    :Header="header"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @sort-change="sortChangeHandle"
                    @size-change="val=>{pageSizeChange(tableLoad,this,val)}"
                    @current-change="val=>{pageChange(tableLoad,this,val)}"
            >
            </customized-table>
            <!-- /表格区 -->
        </div>
    </div>
</template>

<script>

    import CustomizedTable from "@/components/CustomizedTable";
    import PaginationMixin from "@/mixins/PaginationMixin";
    import {_header} from "./AnalysisEffect.js"
    import CustomizedTimePicker from "@/components/CustomizedTimePicker";

    export default {
        name: "AnalysisEffect",
        components: {CustomizedTimePicker, CustomizedTable},
        mixins: [PaginationMixin],
        data() {
            return {
                statisticsTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime() - 3600 * 1000 * 24 * 1],
                accountDeliver: '',
                order: null,
                sort: null,
                adGroup: '',
                adPlan: '',
                export: null,
                exportLoading: false
            }
        },
        created() {
            this.header = _header; // 放在created中,beforeCreate时header等data数据还未创建
        },
        methods: {

            searchFn() {
                this.tableLoad(1);
            },

            resetFn() {
                this.statisticsTime = [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime() - 3600 * 1000 * 24 * 1];
                this.accountDeliver = '';
                this.adGroup = '';
                this.adPlan = '';
                this.order = null;
                this.sort = null;
                this.$refs['table'].clearSort();
                this.tableLoad(1);
            },

            //表格数据请求
            axiosTable(page, exp = false) {
                return this.$http.get("report/schedule/index", {
                    params: {
                        page_size: this.pageSize,
                        page: page,
                        start_date: this.$common.getNewDay(this.statisticsTime[0]),
                        end_date: this.$common.getNewDay(this.statisticsTime[1]),
                        ad_id: this.adPlan ? this.adPlan : null,
                        campaign_id: this.adGroup ? this.adGroup : null,
                        advertiser_id: this.accountDeliver ? this.accountDeliver : null,
                        is_export: this.export,
                        order: this.order,
                        sort: this.sort
                    },
                    responseType: exp ? 'blob' : null
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

            sortChangeHandle(data) {
                if (data.order) {
                    this.order = data.prop;
                    this.sort = data.order === 'descending' ? 'desc' : 'asc';
                } else {
                    this.order = null;
                    this.sort = null;
                }
                this.tableLoad(1);
            },

            exportData() {
                this.export = 1;
                this.loading = true;
                this.axiosTable(1, true).then((res) => {
                    new Promise(((resolve, reject) => {
                        if (this.$common.downloadFileBlob(res)) {
                            resolve();
                        } else {
                            reject();
                        }
                    })).catch((error) => {
                        console.warn(error);
                        this.$message.error("一次不能导出超过十万条数据");
                    })
                }).finally(() => {
                    this.export = null;
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
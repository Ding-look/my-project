<template>
    <div>
        <!-- 表格区 -->
        <el-table ref="customizedTable" v-loading="loading" :data="Data" stripe style="width: 100%"
                  @sort-change="((sortMessage)=>{$emit('sort-change',sortMessage)})"
                  @cell-click="(row,column,cell,event)=>{$emit('cell-click',{row,column,cell,event})}"
                  :height="pageSize>10?500:null">
            <el-table-column v-if="Index" type="index" :index="IndexContent.method" :label="IndexContent.label"
                             :width="IndexContent.width"></el-table-column>
            <el-table-column v-for="(it,idx) in Header" :key="idx" :align="it.align" :prop="it.prop" :width="it.width"
                             :label="it.label" :sortable="it.sortable"
                             :fixed="it.fixed" :formatter="it.formatter">
            </el-table-column>
            <el-table-column v-if="showOperation" label="操作" width="280" align="left">
                <template slot-scope="scope">
                    <span v-for="(it,idx) in Operation" :key="idx">
                        <span v-if="it.component==='SWITCH'">
                            <el-switch
                                    :value="it.getValue(scope.row)"
                                    :active-text="it.activeText"
                                    :disabled="it.disabled(scope.row)"
                                    @change="$emit(it.eventKey,scope.row)"
                            >
                            </el-switch>
                        </span>
                        <el-button v-else :type="it.type"
                                   :disabled="it.disabled(scope.row)"
                                   :size="it.size" plain @click="$emit(it.eventKey,scope.row)">{{it.label}}
                        </el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!-- /表格区 -->
        <!-- 分页 -->
        <el-pagination
                background
                :layout="paginationLayout"
                @size-change="val=>{$emit('size-change',val)}"
                @current-change="val=>{$emit('current-change',val)}"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="total" class="m-t-30 text-center">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
    export default {
        name: "CustomizedTable",
        props: {
            Index: {
                type: Boolean,
                default: false
            },
            IndexContent: {
                type: Object,
                default: function () {
                    return {
                        method: null,
                        label: '序号',
                        width: 'auto'
                    }
                }
            },
            Header: {
                type: Array,
                default: function () {
                    return [{
                        prop: '', label: '', width: '', align: '', sort: '', fixed: '', formatter: function () {
                        }
                    }];
                }
            },
            Data: {
                type: Array,
                default: null
            },
            showOperation: {
                type: Boolean,
                default: false
            },
            Operation: {
                type: Array,
                default: function () {
                    return [
                        {
                            type: '', size: '', label: '', eventKey: '', disabled: function () {
                            }
                        },
                        {
                            component: 'SWITCH', activeText: '', inactiveText: '', eventKey: '', disabled: function () {
                            }, getValue: function () {
                            }
                        },
                    ];
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            paginationLayout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            pageSize: Number,
            currentPage: Number,
            total: Number
        },
        methods: {
            clearSort(){
                this.$refs['customizedTable'].clearSort();
            }
        }
    }
</script>

<style scoped>
    .inactive-switch {
        display: none;
    }

    .is-plain {
        margin: 0 10px 0 0;
    }
</style>
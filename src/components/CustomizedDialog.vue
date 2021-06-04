<template>
    <!-- 新增编辑用户弹框 -->
    <el-dialog :title="title" :visible.sync="visible" :width="width+'px'" @open="$emit('open')" :center="center"
               :before-close="done=>{$emit('close')}">
        <slot name="title" slot="title"></slot>
        <slot></slot>
        <div v-if="showFooter" name="footer" slot="footer" class="dialog-footer text-center">
            <el-button @click="$emit('cancel')" size="small">取 消</el-button>
            <el-button type="primary" @click="$emit('submit')" size="small"> 确 认</el-button>
        </div>
    </el-dialog>
    <!-- /新增编辑用户弹框 -->
</template>

<script>
    export default {
        name: "CustomizedDialog",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: false
            },
            showFooter:{
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '提示'
            },
            width: {
                type:Number,
                default:420
            }
        }
    }
</script>

<style scoped>

</style>
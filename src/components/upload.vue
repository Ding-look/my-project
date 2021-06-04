<!-- 上传组件 支持分片上传-->
<template>
  <div v-loading='uploading'
    :element-loading-text='loadingText'
    element-loading-spinner="el-icon-loading">
    <el-upload ref="upload"
    action="" :limit="1"
    :before-upload="beforeExcelUpload"
    :before-remove="crowdUpload_beforeRemove"
    :on-exceed="crowdUpload_exceed" 
    :on-change="crowdUpload_change"
    :http-request="handleUploadRequest"
    :show-file-list="true"
    accept="text/plain,application/zip,application/x-zip,application/x-zip-compressed"
    >
    <el-button type="primary" plain icon="el-icon-upload2">{{uploadText}}</el-button>
  </el-upload>
  </div>
</template>

<script>
import {uploadByPieces} from '@/tools/upload/utils'
export default {
  name: 'upload',
  props: [
    'uploadText',
    'onBeforeUpload',
    'uploadToken'
  ],
  data () {
    return {
      uploading: false,
      loadingText: '上传进度',
      fileList: [],
      isRemove:true
    }
  },
  computed: {
  },
  watch: {
    fileList (fileList) {
      this.$nextTick(() => {
        this.dealUpload()
      })
    }
  },
  methods: {
    // 上传前
    beforeExcelUpload (file) {
      if(file.size/1024000>1000){
        this.$message.warning('文件大小不能大于1G');
        this.isRemove = false;
        return false;
      };
      this.onBeforeUpload && this.onBeforeUpload();
    },
    // 上传请求
    handleUploadRequest (back) {
      this.fileList.push(back.file);
    },
    // 处理上传文件
    dealUpload () {
      this.uploading = true
      uploadByPieces({
        uploadToken: this.uploadToken,
        files: this.fileList,
        pieceSize: 1,
        chunkUrl: 'upload/chunk',
        fileUrl: 'upload/chunk',
        progress: (num) => {
          this.loadingText = '上传进度' + num + '%'
        },
        success: (data) => {
          this.uploading = false
          this.$emit('uploaded', data)
        },
        error: (e) => {
          this.uploading = false;
          this.$message.error(e.data.msg + ',请重新上传');
          //清空文件
          this.$refs.upload.clearFiles();
        }
      })
    },
    crowdUpload_beforeRemove(file, fileList){
      if(this.isRemove){
        return this.$confirm(`确定移除 ${ file.name }？`);
      }else{
        return true;
      }
    },
    crowdUpload_exceed(files, fileList){
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    crowdUpload_change(file, fileList){
      console.log(file, fileList,"上传的文件");
    },
    clearfiles(){
      //清空文件
      this.$refs.upload.clearFiles();
    }
  },

  created () {
  }
}
</script>
<style lang="scss">

</style>

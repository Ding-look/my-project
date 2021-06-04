export default {
    data() {
        return {
            dialogVisible: false,
            dialogTitle: ''
        }
    },
    methods: {
        //页面变化事件
        pageChange(method, context, page) {
            this.currentPage = page;
            method.call(context, page);
        },

        //pageSize改变回调
        pageSizeChange(method, context, size) {
            this.pageSize = size;
            this.pageChange(method, context, 1);
        }
    }
}
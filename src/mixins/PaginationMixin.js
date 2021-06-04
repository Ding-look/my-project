export default {
    data() {
        return {
            pageSize: 10,
            total: 0,
            currentPage: 1,
            header: null,
            tableData: [],//表格数据
            Operation: null,
            loading: false,
            showOperation: false
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
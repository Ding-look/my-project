<template>
    <el-date-picker
            v-model="dateLocal"
            type="daterange"
            :align="align"
            @change="val=>{$emit('change',[new Date(val[0]).getTime(),new Date(val[1]).getTime()])}"
            unlink-panels
            :clearable='clearable'
            :range-separator="rangeSeparator"
            :start-placeholder="startPlaceholder"
            :end-placeholder="endPlaceholder"
            :value-format="valueFormat"
            :picker-options="pickerOptions">
    </el-date-picker>
</template>

<script>
    export default {
        name: "CustomizedTimePicker",
        computed: {
            dateLocal:{
                get:function(){
                    return [this.getNewDay(this.date[0]), this.getNewDay(this.date[1])];
                },
                set:function (val) {
                    this.$emit('update:date',[new Date(val[0]).getTime(),new Date(val[1]).getTime()]);
                }
            }
        },
        props: {
            date: {
                type: Array
            },
            clearable: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: 'left'
            },
            rangeSeparator: {
                type: String,
                default: '至'
            },
            startPlaceholder: {
                type: String,
                default: '开始日期'
            },
            endPlaceholder: {
                type: String,
                default: '结束日期'
            },
            valueFormat: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            pickerOptions: {
                type: Object,
                default: () => {
                    return {
                        disabledDate(time) {
                            return time.getTime() < new Date() - 3600 * 1000 * 24 * 93 || time.getTime() > new Date() - 3600 * 1000 * 24 * 1;
                        },
                        shortcuts: [{
                            text: '最近7天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近15天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                                end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近31天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
                                end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                    };
                }
            }
        },
        methods: {
            getNewDay(nS) {
                const newDate = nS ? new Date(nS) : new Date();
                let sMonth = newDate.getMonth() + 1;
                let sDate = newDate.getDate();
                let addZero = (number) => {
                    return number < 10 ? '0' + number : number;
                };
                return newDate.getFullYear() + '-' + addZero(sMonth) + '-' + addZero(sDate);
            }
        }
    }
</script>

<style scoped>

</style>
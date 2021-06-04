let formatter = (row) => {
    let ctr = row.ctr + " %";
    return ctr;
}
let _header = [{
        "prop": "stat_datetime",
        "label": "时间",
        "width": "200",
        "align": "auto",
        "fixed": true,
        "sortable": "custom"
    },
    {
        "prop": "advertiser_name",
        "label": "投放账号",
        "width": "200",
        "align": "auto",
        "fixed": true
    },
    {
        "prop": "advertiser_id",
        "label": "投放账号ID",
        "width": "200",
        "align": "auto",
        "fixed": true
    },
    {
        "prop": "campaign_name",
        "label": "广告组",
        "width": "200",
        "align": "auto"
    },
    {
        "prop": "campaign_id",
        "label": "广告组ID",
        "width": "200",
        "align": "auto"
    },
    {
        "prop": "ad_name",
        "label": "广告计划",
        "width": "300",
        "align": "auto"
    },
    {
        "prop": "ad_id",
        "label": "广告计划ID",
        "width": "200",
        "align": "auto"
    },
    {
        "prop": "cost",
        "label": "总花费",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "show",
        "label": "展示数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "avg_show_cost",
        "label": "平均千次展现费用",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "click",
        "label": "点击数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "ctr",
        "label": "点击率",
        "width": "200",
        "align": "auto",
        "sortable": "custom",
        "formatter": formatter
    },
    {
        "prop": "avg_click_cost",
        "label": "平均点击单价",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    }
];
export {
    _header
};
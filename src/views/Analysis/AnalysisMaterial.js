let valid_play_rate = (row) => {
    let valid_play_rate = row.valid_play_rate + " %";
    return valid_play_rate;
}
let play_over_rate = (row) => {
    let play_over_rate = row.play_over_rate + " %";
    return play_over_rate;
}
let _header = [{
        "prop": "material_id",
        "label": "素材ID",
        "width": "200",
        "align": "auto",
        "fixed": true,
        "sortable": "custom"
    },
    {
        "prop": "advertiser_id",
        "label": "投放账号ID",
        "width": "200",
        "align": "auto",
        "fixed": true
    },
    {
        "prop": "stat_datetime",
        "label": "投放时间",
        "width": "200",
        "align": "auto",
        "fixed": true,
        "sortable": "custom"
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
        "prop": "click",
        "label": "点击数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "convert",
        "label": "转化数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "active",
        "label": "激活数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "total_play",
        "label": "播放数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "valid_play",
        "label": "有效播放数",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    },
    {
        "prop": "valid_play_rate",
        "label": "有效播放率",
        "width": "200",
        "align": "auto",
        "sortable": "custom",
        "formatter": valid_play_rate
    },
    {
        "prop": "play_over_rate",
        "label": "完播率",
        "width": "200",
        "align": "auto",
        "sortable": "custom",
        "formatter": play_over_rate
    },
    {
        "prop": "average_play_time_per_play",
        "label": "平均播放时长",
        "width": "200",
        "align": "auto",
        "sortable": "custom"
    }
];
export {
    _header
};
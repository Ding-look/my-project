let checkDisabled = () => {
    return false;
};
let getValue = (row) => {
    return row.status === 1;
};

let OperationCopy = [
    {component: 'SWITCH', activeText: '关联', inactiveText: '未关联', eventKey: 'switch', disabled: checkDisabled, getValue}
];

let HeaderCopy = [
    {"prop": "", "label": "", "width": "20", "align": "auto"},
    {"prop": "name", "label": "广告主", "width": "", "align": "auto"},
];
export {
    OperationCopy,
    HeaderCopy
};
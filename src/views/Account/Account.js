let checkDisabled = () => {
    return false;
};

let getRole = (row) => {
    return row.role_id === 1 ? '管理员' : '优化师';
};

let Operation = [
    {type: 'text', size: 'mini', label: '编辑', eventKey: 'edit', disabled: checkDisabled},
    {type: 'text', size: 'mini', label: '重置密码', eventKey: 'reset', disabled: checkDisabled},
    {type: 'text', size: 'mini', label: '配置广告组', eventKey: 'config', disabled: checkDisabled}
];

let Header = [
    {"prop": "email", "label": "账户", "width": "", "align": "auto"},
    {"prop": "role_id", "label": "角色", "width": "", "align": "auto", formatter: getRole}
];

export {
    Operation,
    Header
};
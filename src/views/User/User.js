let checkDisabled = () => {
    return false;
};
let Operation = [
    {type: 'text', size: 'mini', label: '编辑', eventKey: 'edit', disabled: checkDisabled},
    {type: 'text', size: 'mini', label: '删除', eventKey: 'delete', disabled: checkDisabled},
];
export default Operation;
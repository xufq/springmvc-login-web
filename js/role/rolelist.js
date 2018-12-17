var vm = new Vue({
    el: '#app',
    data: function () {
        return {roleName: '', roleListColumns: [], roleListData: [], page: 1, limit: 10, total:0}
    },
    methods: {
        initPage: function () {
            vm.getColumns();
            vm.getRoleList();
        },
        // 编辑角色
        gotoEditPage:function (rowIndex) {
            var roleInfo = vm.roleListData[rowIndex];
            location.href = "roleinfo.html?roleId="+roleInfo.roleId;
        },
        // 获得列
        getColumns: function () {
            vm.roleListColumns = [];
            vm.roleListColumns.push({
                type: 'index',
                title: 'No'
            });
            vm.roleListColumns.push({
                title: '角色ID',
                key: 'roleId'
            });
            vm.roleListColumns.push({
                title: '角色名称',
                key: 'roleName'
            });
            vm.roleListColumns.push({
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: function (h, params) {
                    return h('div', [
                        h('Button', {
                                props: {type: 'primary', size: 'small'},
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: function () {
                                        vm.gotoEditPage(params.index);
                                    }
                                }
                            },
                            '编辑'
                        )
                    ])
                }
            });
        },
        // 获取角色列表
        getRoleList: function () {
            var param = vm.getParam();
            var url = baseUrl + "/sys/role/rolelist?page=" + vm.page + "&limit=" + vm.limit;
            axios.get(url, {
                params: param
            }).then(function (res) {
                var result = res.data;
                if (result.success) {
                    vm.roleListData = result.data;
                    vm.total = result.total;
                } else {
                    alert('faild');
                }
            });
        },
        reset:function () {
            const _self = this;
            _self.roleName = "";
        },
        gotoAddPage:function () {
            location.href = "roleinfo.html";
        },
        changePage: function (page) {
            vm.page = page;
            vm.getRoleList();
        },
        changePageSize: function (limit) {
            vm.limit = limit;
            vm.getRoleList();
        },
        getParam: function () {
            var param = {};
            param.roleName = vm.roleName;
            return param;
        }
    }
});

// 初始化页面
vm.initPage();
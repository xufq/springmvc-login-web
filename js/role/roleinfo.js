var vm = new Vue({
    el: '#app',
    mounted: function () {
        this.requestParam = getRequest();
        if (this.requestParam && this.requestParam.roleId) {
            this.disableFlag = true;
            this.queryRoleInfo();
        } else {
            this.disableFlag = false;
        }

    },
    data: {
        requestParam: {},
        roleForm: {
            roleId: '',
            roleName: ''
        },
        ruleValidation: {
            roleId: [
                {required: true, message: "请输入角色ID", trigger: "blur"}
            ],
            roleName: [
                {required: true, message: "请输入角色名称", trigger: "blur"}
            ]
        },
        disableFlag: false
    },
    methods: {
        close: function () {
            history.go(-1);
        },
        queryRoleInfo: function () {
            var _self = this;
            var url = baseUrl + "/sys/role/roleinfo";
            axios.get(url, {
                params: {
                    roleId: _self.requestParam.roleId
                }
            }).then(function (res) {

                _self.roleForm = res.data.data;

            });
        },
        updateRoleInfo: function (name) {
            var _self = this;
            // 校验
            _self.$refs[name].validate(function (valid) {
                if (valid) {
                    var url = baseUrl + "/sys/role/roleinfo";
                    axios.post(url, _self.roleForm).then(function (res) {
                        var result = res.data;
                        if (result.success) {
                            history.go(-1);
                        } else {
                            _self.$Message.error(result.msg);
                        }
                    })
                }
            });
        }

    }
});
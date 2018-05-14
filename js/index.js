Vue.component('my-menu', {
    template: '#myMenu',
    props: ['menus']
});

var vm = new Vue({
    el: '#app',
    data: function () {
        return {head: 'HEAD', menus: []}
    },
    created: function () {
        // this.menus = [{
        //     'subIndex': 1,
        //     'subName': '统计分析',
        //     'menuItemList': [{
        //         'itemIndex': 1,
        //         'itemUrl': 'http://www.baidu.com',
        //         'itemName': '新增和启动'
        //     }]
        // }];
        var url = baseUrl + "/menu/menulist";
        axios.get(url, {
            params: {}
        }).then(function (res) {
            var result = res.data;
            if (result.success) {
                vm.menus = result.list;
            }
        });
    },
    method: {
        getMenuList: function () {
            var url = baseUrl + "/menu/menulist";
            axios.get(url, {
                params: {}
            }).then(function (res) {
                var result = res.data;
                if (result.success) {
                    alert('success');
                    vm.menus = result.data;
                } else {
                    alert('faild');
                }
            });
        }

    }


});
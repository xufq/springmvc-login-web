Vue.component('my-menu', {
    template: '#myMenu',
    props: ['menus'],
    methods: {
        gotoPage: function (url) {
            $("#main").attr('src', url);
        }
    }
});

var vm = new Vue({
    el: '#app',
    data: function () {
        return {head: 'HEAD', menus: []}
    },
    created: function () {
        this.getMenuList();
    },
    methods: {
        getMenuList: function () {
            var url = baseUrl + "/menu/menulist";
            axios.get(url, {
                params: {}
            }).then(function (res) {
                var result = res.data;
                if (result.success) {
                    vm.menus = result.data;
                }
            });
        }
    }


});
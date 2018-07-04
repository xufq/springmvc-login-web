document.write("<link rel='stylesheet' type='text/css' href='/css/common.css'>");
document.write("<script type='text/javascript' src='/libs/jquery/jquery-3.3.1.min.js'></script>");
document.write("<script type='text/javascript' src='/libs/vue/vue.min.js'></script>");
document.write("<script type='text/javascript' src='/libs/vue/vue-router.js'></script>");
document.write("<link rel='stylesheet' href='/libs/iview/iview.css'>");
document.write("<script type='text/javascript' src='/libs/iview/iview.min.js'></script>");

var baseUrl = "/springmvc-login-api";

//axios.defaults.withCredentials=true;
axios.interceptors.response.use(function (response) {
    // token 已过期，重定向到登录页面
    if (response.data == 'logout') {
        // router.replace({
        //     path: '/login.html',
        //     query: {redirect: router.currentRoute.fullPath}
        // })
        window.location.href = "../login.html";
    }
    return response;
}, function (error) {
    // Do something with response error
    // return Promise.reject(error)
});


// 从url获取参数
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
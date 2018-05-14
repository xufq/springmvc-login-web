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
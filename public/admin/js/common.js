//3.显示加载效果
//引入插件NProgress
//1.引入文件css+js
//2.js代码  NProgressd.start()/ NProgressd.done()
//ajax的全局事件
//jquery.ajaxStart()
//jquery.ajaxStop()

$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function(){
        NProgress.done();
    },1000)
    
})

// NProgress.done();

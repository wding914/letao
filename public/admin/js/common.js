// $(function () {
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
        setTimeout(function () {
            NProgress.done();
        }, 1000)

    })

    // NProgress.done();


    //公共js-------------------------------------------------------
    //1.显示或隐藏二级菜单
    $(".second").prev().on("click", function () {
        $(this).next().slideToggle();
    })

    //2.显示或隐藏aside(侧边栏)
    $(".topbar .left").on("click", function () {
        $(".lt-aside,.main,.topbar").toggleClass("now");

    })
    //3.点击退出,弹出模态框
    $(".topbar .right").on("click", function () {
        $(".myModal").modal("show");
    })
    //4.点击模态框中的退出,退出后台管理系统
    $(".logout").on("click", function () {
        // location.href = "login.html";
        //需要后台删除session记录
        //需要发送ajax请求
        $.ajax({
            url: "/employee/employeeLogout",
            type: "get",
            success: function (res) {
                console.log(res);

                location.href = "login.html";
            },
            error: function () {
                console.log('error');
            }
        })

    })


    //封装了分页插件
   /**
    * 
    * @param {*} info 分页的数据
    * @param {*} render  点击分页的回调函数
    */

    function paginator(info,render) {
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: info.page,//当前页
            totalPages: Math.ceil(info.total / info.size),//总页数
            size: "normal",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                // console.log(page);
                render(page);
            }
        })
    }


// })

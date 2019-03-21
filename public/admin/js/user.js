var page = 1;
$(function () {

    var pageSize = 5;
    render();
    function render() {
        //1.发送ajax请求,请求数据,渲染在页面上(模板引擎)
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template('tmp', info));

                //2.引入分页插件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    // size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, p) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);   
                        //点击页码,渲染当前页(发送ajax,请求数据,渲染数据)
                        page = p;
                        render(page);
                    }
                });

            }

        })

    }

    //3.点击禁用或启用按钮,切换成启用或禁用
    //禁用或启用按钮,是模板引擎动态生成的,注册事件需要事件委托   
    var id, isDelete;
    $("tbody").on("click", ".btn", function () {
        //点击按钮,弹出模态框
        $(".userModal").modal("show");
        //点击模态框中的确定按钮,发送ajax请求
        //请求成功,关闭模态框,重新渲染当前页面

        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        id = $(this).data('id');
    })
   //事件内不要再注册事件(jq的点击事件不会覆盖)
   //当点击禁用按钮时,注册一个模态框的确认的点击事件
   //多次点击禁用按钮,注册多个事件,当触发事件时,事件会被执行多次

    $(".user-confirm").on("click", function () {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (info) {
                console.log(info);
                $(".userModal").modal("hide");
                render();
            }
        })
    })




})
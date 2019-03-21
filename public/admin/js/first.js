$(function () {
    render(1);
    function render(page) {
        //1.发送ajax,请求数据,然后渲染页面
        var pageSize = 5;
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $("tbody").html(template("tmp", info));

                //显示分页插件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        render(page);
                    }
                });

            }

        })
    }


    //添加分类的功能
    //1.注册点击事件
    //2.弹出模态框
    //3.表单校验
    //4.校验成功,点击添加按钮
    //5.阻止表单提交
    //6.发送ajax请求
    //ajax请求成功,重置表单
    //7.关闭模态框,后台重新渲染页面(第一页)

    $('.first-addCate').on("click", function () {
        $(".firstModal").modal("show");
        //表单校验
        //使用表单校验插件
        $("#form").bootstrapValidator({
            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //3. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                categoryName: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '一级分类名不能为空'
                        }
                    }
                },
            }

        });
    })




    // 点击取消按钮,重置表单
    // $("[type=reset]").on("click", function () {
    //     $('#form').data('bootstrapValidator').resetForm(true);
    // })

    //校验成功,阻止表单提交,发送ajax请求
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addTopCategory",
            type: 'post',
            data: $("#form").serialize(),
            success: function (info) {
                console.log(info);
                $('#form').data('bootstrapValidator').resetForm(true);
                $(".firstModal").modal('hide');
                render(1);
            }
        })
    });


})
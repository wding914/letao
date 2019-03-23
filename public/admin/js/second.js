$(function () {
    render(1);
    function render(page) {
        //1.发送ajax请求
        var pageSize = 5;
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $("tbody").html(template("tmp", info));

                //显示分页插件
                paginator(info, render);
                // $("#paginator").bootstrapPaginator({
                //     bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                //     currentPage: page,//当前页
                //     totalPages: Math.ceil(info.total / info.size),//总页数
                //     size: "normal",//设置控件的大小，mini, small, normal,large
                //     onPageClicked: function (event, originalEvent, type, page) {
                //         //为按钮绑定点击事件 page:当前点击的按钮值
                //         // console.log(page);
                //         render(page);
                //     }
                // });
            }
        })

    }

    //1.点击添加分类按钮,弹出模态框,进行表单验证
    //2.点击请选择一级分类,发送ajax请求,请求数据,进行渲染(模板引擎)
    //3.点击下拉菜单的子选项,让下拉菜单显示选中的一级分类(注册事件委托)
    //4.点击上传图片,将图片的路径赋值给img的src
    //5.处理隐藏域的表单校验
    //5.1js给name=categoryId  赋值id
    //5.2js给name=brandLogo   赋值图片路径
    //动态修改状态时,手动修改状态updateStatus

    //6.表单验证成功,阻止表单提交,发送ajax请求,关闭模态框,重置表单,渲染数据,恢复下拉按钮和显示图片
    //1.
    $('.second-addCate').on("click", function () {
        $(".secondModal").modal('show');
        //使用表单校验插件
        $("#form").bootstrapValidator({
            excluded: [],
            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            //3. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                categoryId: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择一级分类'
                        }
                    }
                },
                brandName: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入二级分类名称'
                        }
                    }
                },
                brandLogo: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请上传图片'
                        }
                    }
                },
            }

        });

    })
    //2.
    $("#dLabel").on("click", function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100

            },
            success: function (info) {
                // console.log(info);
                $(".dropdown-menu").html(template('add-tmp', info));
            }
        })
    })
    //3.
    $(".dropdown-menu").on("click", "li", function () {
        //下拉列表隐藏域
        //1.给隐藏域name=categoryId赋值
        //...发送ajax请求时,需要传参,必写
        //2.修改表单验证的excluded(默认隐藏域不作表单验证)
        //3.动态修改状态,js赋值不能做表单校验,需要手动修改状态(updateStatus)
        $(".dropdownText").text($(this).text());
        $('[name=categoryId]').val($(this).data('id'));
        $("#form").data("bootstrapValidator").updateStatus("categoryId", 'VALID');
    })

    //4.
    //引入插件 fileupload
    //1.引入文件 jq+2js
    //2.添加属性 name data-url
    //3.使用方法

    //1.显示图片
    //2.给隐藏域name=brandLogo赋值
    //3.动态修改状态
    $("#file").fileupload({
        done: function (e, data) {
            //    console.log(data.result.picAddr);
            $('.img').attr('src', data.result.picAddr);
            $('[name=brandLogo]').val(data.result.picAddr);
            $("#form").data("bootstrapValidator").updateStatus('brandLogo', 'VALID');

        }
    })


    //6.
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addSecondCategory",
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info);
                $(".secondModal").modal('hide');
                $("#form").data('bootstrapValidator').resetForm(true);
                render(1);
                //
                $(".dropdownText").text("请选择一级分类");
                $('.img').attr('src', './images/none.png');
            }
        })
    });


    $("[type=reset]").on("click", function () {
        $("#form").data('bootstrapValidator').resetForm(true);
        $(".dropdownText").text("请选择一级分类");
        $('.img').attr('src', './images/none.png');
    })

})
$(function () {
    //使用表单校验插件
    $('#form').bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }

            },
            //校验密码
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '密码长度必须在6到8之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            },
        }

    })

    //bootstrapvalidator进行格式验证
    //格式验证成功,应该发送ajax请求,后台进行用户名密码验证,验证成功进行页面跳转
    //≠≠格式验证成功,表单进行自动提交
    //实现效果:点击登录,阻止表单自动提交,发送ajax请求
    //当表单校验成功时，会触发success.form.bv事件，此时会提交表单，
    //这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/employee/employeeLogin",
            type: "post",
            data: $("#form").serialize(),
            success: function (res) {
                // NProgress.done();
                //    console.log(res);
                if (res.error === 1000) {
                    //2.格式校验成功后,用户名或密码校验失败,显示提示信息
                    //表单校验插件:updateStatus('field','status','callback');
                    $(form).data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                if (res.error === 1001) {
                    $(form).data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');

                }

                if (res.success) {
                    //用户名.密码验证成功,进行页面跳转
                    location.href = "index.html";
                }


            },
            // beforeSend: function () {
            //    NProgress.start();
            // },






        })

    })


    //1.重置表单
    //reset只是清除表单数据,不会清除格式校验提示信息
    //表单校验插件:resetForm
    //参数是true  清除表单校验提示信息+表单内容
    // 重置表单中设置过校验的内容，将隐藏所有错误提示和图标。
    // validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
    $('[type=reset]').on("click", function () {
        $(form).data('bootstrapValidator').resetForm();
    })
    //2.格式校验成功后,用户名或密码校验失败,显示提示信息
    //表单校验插件:updateStatus('field','status','callback');

    //3.显示加载效果
    //引入插件NProgress
    //1.引入文件css+js
    //2.js代码  NProgressd.start()/ NProgressd.done()
    //当ajax请求开始时,显示进度条
    //当ajax请求结束时,隐藏进度条

    //ajax的全局事件
    //jquery的ajaxStart()
    //jquery的ajaxStop()

    //4.上传login.html到远程仓库

})
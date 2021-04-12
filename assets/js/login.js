$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 定义校验规则
    const form = layui.form;
    const layer = layui.layer;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
    repwd: function (value) {
        const pwd = $('.reg-box [name=password]').val();
        if(pwd !== value) return '两次密码不一致'
    }
})

    //监听表单事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val(),
        }, function (res) {
            if (res.status !== 0) {   
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            $('#link_login').click();
        }
        )
    })
    
    // 登陆事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                console.log('登陆返回');
                console.log(res);
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})


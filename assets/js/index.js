$(function () {
    getUserInfo();
    // 绑定退出按钮点击事件
    $('.btnLogout').on('click', function () {
        layer.confirm('确认退出？', { icon: 3, title: '提示' },  function(index) {
            //清空本地存储的token
            localStorage.removeItem('token');
            //跳转登陆页面
            location.href = '/login.html'
            // 关闭confirm
            layer.close(index);
        })
       
    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.token,
        // },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        },
      // 不论成功还是失败，最终都会调用 complete 回调函数
complete: function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    // 1. 强制清空 token
    localStorage.removeItem('token')
    // 2. 强制跳转到登录页面
    location.href = '/login.html'
    }
    }
    
        
    })
}


function renderAvatar(user) {
    const name = user.nickname || user.username;
    console.log(name);
    $('.welcome').html('欢迎' + name);
    console.log($('#welcome'));
    //处理文字和图片头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        // 渲染
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

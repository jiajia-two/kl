require.config({
    paths: {
        jquery: "../lib/jquery-3.3.1"
    }
})

require(['jquery'], function($){
    var username_check =  $('#username_check')[0];
    var pwd_check = $('#pwd_check')[0];
    var checkCode_check =  $('#checkCode_check')[0];
    var _code = $('#getCode')[0];

    //获取验证码
    _code.innerHTML = getCode(1);
    function getCode(n){
        var Code = '';
        var allcode = '1234567890ABCDEFGHIJKLMNOPQRSTUVWSYZ1234567890abcdefghijklmnopqrstuvwxyz1234567890';
        for(var i = 0; i < n; i++){
            Code += allcode.substr(parseInt(Math.random()*allcode.length),1);
        }
        return Code;
    }


    // document.getElementById('getCode').onclick = function(){
    //     _code = document.getElementById('getCode');
    //     _code.innerHTML = getCode(1);
    // }

    // document.getElementById('username').onchange = function(){
    //     checked(username,username_check);
    // }
    // document.getElementById('pwd').onchange = function(){
    //    checked(pwd,pwd_check);
    // }
    // document.getElementById('checkCode').onchange = function(){
    //   checkedCode();
    // }
    
    //点击刷新验证码
    $('#getCode').on('click',function(){
        _code = document.getElementById('getCode');
        _code.innerHTML = getCode(1);
    });
    //验证用户名，密码和验证码
    $('#username').on('change',function(){
        checked(username,username_check);
    });
    $('#pwd').on('change',function(){
        checked(pwd,pwd_check);
    });
    $('#checkCode').on('change',function(){ 
        checkedCode();
    });

    function checked(ele,ele_check){
        var ele = ele.value;
        ele_check.innerHTML = '';
        if(ele != '' && /^[a-zA-Z]\w{5,17}$/.test(ele)){
            ele_check.innerHTML = '√';
            ele_check.style.color = '#58bc58';
        }else{
            ele_check.innerHTML = '必须6~20位首字符为字母且只含有字母、数字或下划线';
            ele_check.style.color = '#D12548';
        }
    }
    function checkedCode(){
        var checkCode = document.getElementById('checkCode' ).value;
        _code = document.getElementById('getCode');
        checkCode = checkCode.toLowerCase();
        _code = _code.innerText.toLowerCase();
        console.log(_code,checkCode);
        if(checkCode == _code){
            checkCode_check.innerHTML = '正确';
            checkCode_check.style.color = '#58bc58';

        }else{
            checkCode_check.innerHTML = '验证码错误';
            checkCode_check.style.color = '#D12548';
        }
    }

    //登录请求
    $('#btn_login').on('click',function(){
        var checkCode_check =  document.getElementById('checkCode_check');
        //验证码正确时发起登录请求
        if(checkCode_check.innerHTML == '正确'){
            var data = {
                username: document.getElementById('username').value, 
                pwd: document.getElementById('pwd').value
            };

            $.ajax({
                url: '/login',
                data,
                type: 'post',
                success: function(res){
                    if(res.status){
                        let name = res.message;
                        document.cookie = `username=${name}`;
                        window.location.href = 'index.html';
                    }else{
                        alert(res);
                    }
                }
            })
        } 
    })
})
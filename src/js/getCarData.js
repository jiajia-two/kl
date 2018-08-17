
define(['jquery',"x_calculate"],function($,cal){

    // 读取cookie用户信息
    var user_cookie
    var users =  document.cookie.split('; ');
    users.forEach(function(item){
        var arr = item.split('=');
        if(arr[0]==='username'){
            user_cookie = arr[1]
            $('.wel').html(user_cookie)
            $('.log').html('欢迎您')
            $('.log').attr('href','javascript:')
            $('.reg').html('退出')
            $('.reg').attr('href','login.html')
        }
    })

    function get(data,goodname){
        var r = '';
        data.forEach(function(item){
            if(item.taxation2== ''){
                taxation=0
            }else{
                taxation = item.taxation2.split("，")[0].split("￥")[1] * 1;
            }
            let amount = item.nowPrice * item.qty;
            r += `
            <ul>
                <li><input type="checkbox" name="goods" class="good" checked="true" /><img src="./images/${item.imgurl}" /></li>
                <li><p>${item.title}</p></li>
                <li><span class="old">￥${item.oldPrice}</span><br/><span">￥${item.nowPrice}</span></li>
                <li><span class="qty"><span class="del" style="cursor:pointer;">&nbsp;-&nbsp;</span><input type="text" value="${item.qty}" /><span class="add" style="cursor:pointer;" >&nbsp;+&nbsp;</span></li>
                <li><span style="color:#D12548;">${amount}</span><br/><span class="tax"><i></i>预估税费:${taxation}</span></li>
                <li><span class="close" style="cursor:pointer;">&times;</span></li>
            </ul>
            `;
        })
        $('#carList').text("");
        $('#carList').append(r);
        cal.calculate();
    }

    return {
        getData: () => {
            var chooseuser =  document.cookie.split('; ');
            chooseuser.forEach(function(item){
                var arr = item.split('=');
                if(arr[0]==='username'){
                    chooseu = arr[1]
                }
            })
            var data = {username: chooseu};
            $.ajax({
                url: '/car',
                data: data,
                type: 'post',
                success: function(res){
                    get(res);
                }
            })
        },
        deleteData: () => {
            $('#carList').on('click', function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "close"){
                    var data = {username: $('.wel').html(), title: target.parentNode.parentNode.children[1].children[0].innerText};
                    $.ajax({
                        url: '/deleteCarData',
                        data: data,
                        type: 'post',
                        success: function(res){
                            get(res);
                        },
                    })
                }
            });
        },
        clear: () => {
            $('#btnClear').on('click', function(e){
                var data = {username:$('.wel').html()}
                $.ajax({
                    url: '/clearCarData',
                    data: data,
                    type: 'post',
                    success: function(res){
                        get(res);
                    }
                })
            })
        },
        update: ()=>{
            $('#carList').click(function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className == 'del'){
                    var qty= $(target).next().val()
                    qty--;
                    $(target).next().val(qty)
                    if(qty<=1){
                        $(target).next().val(1)
                        qty=1
                    }
                    console.log(qty)
                    var data = {username:$('.wel').html(),title:target.parentNode.parentNode.parentNode.children[1].children[0].innerText,qty:qty}
                    $.ajax({
                        url: '/update',
                        data: data,
                        type: 'post',
                        success: function(res){
                            get(res);
                        },
                    })
                }
                if(target.className == 'add'){
                    var qty= $(target).prev().val()
                    qty++;
                    $(target).prev().val(qty)
                    var data = {username:$('.wel').html(),title:target.parentNode.parentNode.parentNode.children[1].children[0].innerText,qty:qty}
                    $.ajax({
                        url: '/update',
                        data: data,
                        type: 'post',
                        success: function(res){
                            get(res);
                        },
                    })
                }
            })
        }
        
    }

   
})
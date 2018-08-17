require.config({
    paths: {
        jquery: '../lib/jquery-3.3.1'
    }
})

require(['jquery'], function($){
    let operation = {
        pagination: (res) => {
            $('#main .page span').each(function(idx, ele){
                ele.className = '';
                if(ele.innerText == res.message.pageNum){
                    this.className ='active';
                }
            });
        },
        toTop: () => {
            $('body, html').animate({
                scrollTop: 0
            },400)
        },
        borderChange: () => {
            $('.goodslist li').mouseover(function(){
                $(this).css('border','1px solid red');
            });
            $('.goodslist li').mouseout(function(){
                $(this).css('border','1px solid #ccc');
            })
        },
        choose: () =>{
            $('.brands ul.fl li a').each(function(idx, ele){
                $(ele).click(function(){
                    var txt = this.innerText;
                    $('.brands ul.fl li a').css('color','#000');
                    $(this).css('color','red');
                    $.post('/goods', {qty: 28, pageNum: 1, keyWord: txt},function(res){
                        $('#main .goodslist').html('');
                        $('#main .page').html('');
                        if(res.status){
                            res.data.map(function(item){
                                $('#main .goodslist').append(`<li id="${item._id}">
                                    <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                                    <p>
                                        <span><i>￥</i>${item.nowPrice}</span>
                                        <span>￥${item.oldPrice}</span>
                                    </p>
                                    <a href = "./detail.html?id=${item._id}">${item.title}</a>
                                    <p>
                                        <span>自营</span>
                                        <span>税费优惠</span>
                                        <span>特价</span>
                                    </p>
                                    <p>评价:${item.buys}</p>
                                    </li>`);
                            })
                            for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                                $('#main .page').append(`<span>${j+1}</span>`)
                            }
                             
                        }
                        operation.pagination(res);
                        operation.toTop();
                        operation.borderChange();
                        operation.createCookie();
                    });
                    $('.page').click(function(e){
                        e =e.target || window.event;
                        if(e.tagName.toLowerCase() == 'span'){
                            $.post('/goods', {pageNum: e.innerText, keyWord: txt}, function(res){
                                $('#main .goodslist').html('');
                                $('#main .page').html('');
                                if(res.status){
                                    res.data.map(function(item){
                                        $('#main .goodslist').append(`<li id="${item._id}">
                                            <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                                            <p>
                                                <span><i>￥</i>${item.nowPrice}</span>
                                                <span>￥${item.oldPrice}</span>
                                            </p>
                                            <a href = "./detail.html?id=${item._id}">${item.title}</a>
                                            <p>
                                                <span>自营</span>
                                                <span>税费优惠</span>
                                                <span>特价</span>
                                            </p>
                                            <p>评价:${item.buys}</p>
                                            </li>`);
                                    })
                                    for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                                        $('#main .page').append(`<span>${j+1}</span>`)
                                    }
                                     
                                }
                                operation.pagination(res);
                                operation.toTop();
                                operation.borderChange();
                                operation.createCookie();
                            })
                        }
                    })
                })
                
            })
            
        },
        createCookie: () => {
            let date = new Date();
            date.setDate(date.getDate()+7);
            let links = document.querySelectorAll('.goodslist li a');
            links.forEach(function(item){
                item.onclick = function(){
                    let lis = this.parentNode;
                    let imgurl = $(lis.children[0].children[0]).attr('src');
                    let nowPrice = $(lis.children[1].children[0]).text();
                    let oldPrice = $(lis.children[1].children[1]).text();
                    let title = $(lis.children[2]).text();
                    let buy = $(lis.children[4]).text();
                    let buys = buy.substring(3)
                    let data = '' + imgurl +  ',' + nowPrice +  ',' + oldPrice +  ',' + title +  ',' + buys;
                    document.cookie = lis.id+'='+data+';expires='+date.toUTCString();
                }
            })
            $('.goodslist').click(function(e){
                
                console.log(date);
                e = e.target || window.event;
                if(e.tagName.toLowerCase() == 'a'){
                    let lis = e.parentNode;
                    let imgurl = $(lis.children[0].children[0]).attr('src');
                    let nowPrice = $(lis.children[1].children[0]).text();
                    let oldPrice = $(lis.children[1].children[1]).text();
                    let title = $(lis.children[2]).text();
                    let buys = $(lis.children[4]).text();
                    let data = '' + imgurl +  ',' + nowPrice +  ',' + oldPrice +  ',' + title +  ',' + buys;
                    document.cookie = lis.id+'='+data+';expires='+date.toUTCString();
                }
            });
        },
        create: () => {
            $.post('/goods', {qty: 28, pageNum: 1},function(res){
                if(res.status){
                    res.data.map(function(item){
                        $('#main .goodslist').append(`<li id="${item._id}">
                            <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                            <p>
                                <span><i>￥</i>${item.nowPrice}</span>
                                <span>￥${item.oldPrice}</span>
                            </p>
                            <a href = "./detail.html?id=${item._id}">${item.title}</a>
                            <p>
                                <span>自营</span>
                                <span>税费优惠</span>
                                <span>特价</span>
                            </p>
                            <p>评价:${item.buys}</p>
                            </li>`);
                    })
                    for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                        $('#main .page').append(`<span>${j+1}</span>`)
                    }
                     
                }
                operation.pagination(res);
                operation.toTop();
                operation.borderChange();
                operation.createCookie();

            });
        },
        page: () =>{
            $('.page').click(function(e){
                e =e.target || window.event;
                if(e.tagName.toLowerCase() == 'span'){
                    $.post('/goods', {pageNum: e.innerText}, function(res){
                        $('#main .goodslist').html('');
                        $('#main .page').html('');
                        if(res.status){
                            res.data.map(function(item){
                                $('#main .goodslist').append(`<li id="${item._id}">
                                    <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                                    <p>
                                        <span><i>￥</i>${item.nowPrice}</span>
                                        <span>￥${item.oldPrice}</span>
                                    </p>
                                    <a href = "./detail.html?id=${item._id}">${item.title}</a>
                                    <p>
                                        <span>自营</span>
                                        <span>税费优惠</span>
                                        <span>特价</span>
                                    </p>
                                    <p>评价:${item.buys}</p>
                                    </li>`);
                            })
                            for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                                $('#main .page').append(`<span>${j+1}</span>`)
                            }
                             
                        }
                        operation.pagination(res);
                        operation.toTop();
                        operation.borderChange();
                        operation.createCookie();
                    })
                }
            })
        }
    }
    operation.create();
    operation.page();
    operation.choose();
    $('.sorting').click(function(e){
        $('.sorting a').css({'color':'#000','display':'inline-block','border':'1px solid #fff','padding':'0px 5px'});
        e =e.target || window.event;
        if(e.className == 'normal'){
            $('#main .goodslist').html('');
            $('#main .page').html('');
            operation.create($);
            operation.page($);
            $(e).css({'color':'red','display':'inline-block','border':'1px solid red','padding':'0px 5px'});
        }
        if(e.className == 'up'){
            $.post('/goods', {sorting: e.className}, function(res){
                $('#main .goodslist').html('');
                $('#main .page').html('');
                if(res.status){
                    res.data.map(function(item){
                        $('#main .goodslist').append(`<li id="${item._id}">
                            <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                            <p>
                                <span><i>￥</i>${item.nowPrice}</span>
                                <span>￥${item.oldPrice}</span>
                            </p>
                            <a href = "./detail.html?id=${item._id}">${item.title}</a>
                            <p>
                                <span>自营</span>
                                <span>税费优惠</span>
                                <span>特价</span>
                            </p>
                            <p>评价:${item.buys}</p>
                            </li>`);
                    })
                    for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                        $('#main .page').append(`<span>${j+1}</span>`)
                    }
                     
                }
                operation.pagination(res);
                operation.toTop();
                operation.borderChange();
                operation.createCookie();
                $('.page').click(function(e){
                    e =e.target || window.event;
                    if(e.tagName.toLowerCase() == 'span'){
                        $.post('/goods', {pageNum: e.innerText,sorting: 'up'}, function(res){
                            $('#main .goodslist').html('');
                            $('#main .page').html('');
                            if(res.status){
                                res.data.map(function(item){
                                    $('#main .goodslist').append(`<li id="${item._id}">
                                        <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                                        <p>
                                            <span><i>￥</i>${item.nowPrice}</span>
                                            <span>￥${item.oldPrice}</span>
                                        </p>
                                        <a href = "./detail.html?id=${item._id}">${item.title}</a>
                                        <p>
                                            <span>自营</span>
                                            <span>税费优惠</span>
                                            <span>特价</span>
                                        </p>
                                        <p>评价:${item.buys}</p>
                                        </li>`);
                                })
                                for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                                    $('#main .page').append(`<span>${j+1}</span>`)
                                }
                                 
                            }
                            operation.pagination(res);
                            operation.toTop();
                            operation.borderChange();
                            operation.createCookie();
                        })
                    }
                })
            })
            $(e).css({'color':'red','display':'inline-block','border':'1px solid red','padding':'0px 5px'});

        }
        if(e.className == 'down'){
            $.post('/goods', {sorting: e.className}, function(res){
                $('#main .goodslist').html('');
                $('#main .page').html('');
                if(res.status){
                    res.data.map(function(item){
                        $('#main .goodslist').append(`<li id="${item._id}">
                            <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                            <p>
                                <span><i>￥</i>${item.nowPrice}</span>
                                <span>￥${item.oldPrice}</span>
                            </p>
                            <a href = "./detail.html?id=${item._id}">${item.title}</a>
                            <p>
                                <span>自营</span>
                                <span>税费优惠</span>
                                <span>特价</span>
                            </p>
                            <p>评价:${item.buys}</p>
                            </li>`);
                    })
                    for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                        $('#main .page').append(`<span>${j+1}</span>`)
                    }
                     
                }
                operation.pagination(res);
                operation.toTop();
                operation.borderChange();
                operation.createCookie();
                $('.page').click(function(e){
                    e =e.target || window.event;
                    if(e.tagName.toLowerCase() == 'span'){
                        $.post('/goods', {pageNum: e.innerText,sorting: 'down'}, function(res){
                            $('#main .goodslist').html('');
                            $('#main .page').html('');
                            if(res.status){
                                res.data.map(function(item){
                                    $('#main .goodslist').append(`<li id="${item._id}">
                                        <a href = "./detail.html?id=${item._id}"><img src = "./images/${item.imgurl}"/></a>
                                        <p>
                                            <span><i>￥</i>${item.nowPrice}</span>
                                            <span>￥${item.oldPrice}</span>
                                        </p>
                                        <a href = "./detail.html?id=${item._id}">${item.title}</a>
                                        <p>
                                            <span>自营</span>
                                            <span>税费优惠</span>
                                            <span>特价</span>
                                        </p>
                                        <p>评价:${item.buys}</p>
                                        </li>`);
                                })
                                for(let j = 0; j < Math.ceil(res.message.total/28); j++){
                                    $('#main .page').append(`<span>${j+1}</span>`)
                                }
                                 
                            }
                            operation.pagination(res);
                            operation.toTop();
                            operation.borderChange();
                            operation.createCookie();
                        })
                    }
                })
            })
            $(e).css({'color':'red','display':'inline-block','border':'1px solid red','padding':'0px 5px'});
        }




       
    })
    


     // 读取cookie用户信息
     var user_cookie
     var users = document.cookie.split('; ');
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
})
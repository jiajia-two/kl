require(['config'],function(){
    require(['jquery','xZoom'],function(){ 
        jQuery(function($){
            
            // 读取本地url的id，然后读取数据库id的信息
            var url=decodeURI(location.search.slice(1));
            var str=url.split('=');
            var id=str[1];
            $.ajax({
                url:'/detail',
                type:'post',
                data:{id:id},
                success:function(data){
                    get(data);
                      //放大镜
                    $('div.xzoom-t').xZoom({
                        width:400,
                        height:400
                    })
                    $(document).trigger('ajaxIsOk', data);
                }
            })

             //加入购物车
             $('span.dtadd').click(function(){
                 var qty = $('input.num').val()
                 var username = $('.wel').html()
                $.ajax({
                    url:'/detail',
                    type:'post',
                    data:{id:id},
                    success:function(data){
                        $.ajax({
                            url:'/wri_car',
                            type:'post',
                            async:true,
                            data:{
                                imgurl:data[0].imgurl,
                                _id:data[0]._id,
                                title:data[0].title,
                                nowPrice:data[0].nowPrice,
                                taxation2:data[0].taxation2,
                                qty:qty,
                                username:username,
                                oldPrice:data[0].oldPrice
                            }
                        })
                        $('#mask').show()
                    }
                })
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
            

            //生成页面商品信息
            function get(data){
                $('img.big-pic').attr('src','./images/'+data[0].imgurl);
                $('.imgs li img').attr('src','./images/nav2.png');
                $('p.more').html(data[0].more)
                $('.right h2').html(data[0].title);
                $('span.price').html('￥'+data[0].nowPrice);
                $('span.oldprice').text('￥'+data[0].oldPrice);
                $('em.explain').html(data[0].explain);
                $('span.assess').html(data[0].assess);
                $('span.buys').html(data[0].buys);
                if(data[0].taxation ==''){
                    $('.taxa').html(data[0].taxation2)
                }else if(data[0].taxation2 == ''){
                    let set = data[0].taxation.split(":")
                    let res =''
                    for(var i=0;i<set.length;i++){
                        res+=`<span>${set[i]}</span>`
                    }
                    $('.taxa').html(res)
                }
                // ========活动===
                if(data[0].active=='无'){
                    $('.active').hide()
                }else{
                    let setact = data[0].active.split(';')
                    let res = ''
                    for(var i=0;i<setact.length;i++){
                        let setact2 = setact[i].split(':')
                        res+=`<li><span class="actcommon">${setact2[0]}</span>${setact2[1]}</li>`
                    }
                    
                    $('.act').html(res)
                }
                


                // =======生成小图区

                let setimgs = data[0].imgs.split(';')
                let img = ''
                for(var i=0;i<setimgs.length;i++){
                    img+=`<li><img src='./images/${setimgs[i]}'></li>`
                }
                $('.imgs').html(img)
                $('.imgs').css('width',84*setimgs.length+'px')
                if(setimgs.length<=4){
                    $('.turn span').css('color','#eee')
                }
                
            }
            //点击图片左右移动,然后这异步解决了哈哈哈哈
            $(document).on('ajaxIsOk', function(e, results) {
                var temp = $('.imgs li').length-4
                let z=0
                if($('.imgs li').length<=4){
                    $('.imgs').css('transform','translateX(0px)')
                    $('.tl').css('color','#eee')
                    $('.tr').css('color','#eee')
                }else{
                    $('.tl').click(function(){
                        z--
                        if(z<=0){
                            $('.tl').css('color','#eee')
                            $('.tr').css('color','#f84563')
                            $('.imgs').css('transform','translateX(0px)')
    
                            z=0
                        }else{
                            $('.tl').css('color','#f84563')
                            $('.tr').css('color','#f84563')
                            $('.imgs').css('transform','translateX('+(-84*z)+'px)')
                        }
                    })
                    $('.tr').click(function(){
                        z++
                        if(z>=temp){
                            $('.tr').css('color','#eee')
                            $('.tl').css('color','#f84563')
                            $('.imgs').css('transform','translateX(-168px)')
                            z=temp
                        }else{
                            $('.tr').css('color','#f84563')
                            $('.tl').css('color','#f84563')
                            $('.imgs').css('transform','translateX('+(-84*z)+'px)')
                        }
                    })
                }
           });
        
            //点击加减商品数量
            $('p.add').click(function(e){
                var num = $('input.num').val()*1;
                if(e.target.className=='jia'){
                    num++;
                    $('input.num').val(num);
                } 
                if(e.target.className=='jian'){
                    num--;
                    $('input.num').val(num);
                    }
            })

            //图片点击效果
            $('ul.imgs').mouseover(function(e){
                if(e.target.tagName=='IMG'){
                    $('.xzoom-big img').prop('src',e.target.src)
                    $('img.big-pic')[0].src=e.target.src
                }
            })
            

            // 用户评价
            $('.gd').addClass('bor')
            $('.gd').click(function(){
                $('.one').show()
                $('.two').hide()
                $('.gd').addClass('bor')
                $('.user-assess').removeClass('bor')
            })
            $('.user-assess').click(function(){
                $('.one').hide()
                $('.two').show()
                $('.user-assess').addClass('bor')
                $('.gd').removeClass('bor')

            })


            // 读取本地cookie,写入那个浏览记录
            var cookies = document.cookie.split('; ');
            var aa=[]
            var bb=[]
            var cc=[]
            var aa1=[]
            for(var i=0;i<cookies.length;i++){
                aa = cookies[i].split('=');
                if(aa[0]=='username'){

                }else{
                    bb+=aa[1]+';'
                    aa1+=aa[0]+';'
                }
                
            }
            cc= bb.split(';')
            var aa2 = aa1.split(';')
            let res=''
            for(var i=0;i<cc.length-1;i++){
                var last = cc[i].split(',')
                res+=`<li>
                <a href="detail.html?id=${aa2[i]}">
                <img src="${last[0]}">
                <h3>${last[3]}</h3>
                <p class="money"><span>${last[1]}</span><span>${last[2]}</span></p>
                <p>${last[4]}人已评价</p>
                </a></li>`
            }
            $('.look').html(res)



            // 商品展示区的第一模块
            $('.open').click(function(){
                $('.close').show()
                $('.open').hide()
                $('.one-top').css('height','105px')
            })
            $('.close').click(function(){
                $('.close').hide()
                $('.open').show()
                $('.one-top').css('height','65px')
            })


          
        })
    })
})

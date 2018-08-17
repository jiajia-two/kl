require(['config'],function (){
    require(['jquery'],function(){
        jQuery(function($){
            // =======banner========
            for(var i=0;i<5;i++){
                if(i==0){
                    $('.imgs li').eq(0).css('display','block')
                    $('.points span').eq(0).css('background-color','red')
                }else{
                    $('.imgs li').eq(i).css('display','none')
                    $('.points span').eq(i).css('background-color','#eee')
                }
            }
            var timer=setInterval(show,2000)
            var idx = 0
            function show(){
                idx++;
                if(idx==5){
                    idx=0
                }
                for(var i=0;i<5;i++){
                    if(i==idx){
                        $('.imgs li').eq(i).css('display','block')
                        $('.points span').eq(i).css('background-color','red')
                    }else{
                        $('.imgs li').eq(i).css('display','none')
                        $('.points span').eq(i).css('background-color','#eee')
                    }
                }
               
            }
            for(let i=0;i<5;i++){
                $('.points span')[i].index=i;
                $('.points span')[i].onclick=function(){
                    console.log(this)
                    var x= this.index;
                    idx=i
                    for(j=0;j<5;j++){
                        $('.imgs li').eq(j).css('display','none')
                        $('.points span').eq(j).css('background-color','#eee') 
                    }
                    $('.imgs li').eq(x).css('display','block')
                    $('.points span').eq(x).css('background-color','red') 
                }
                show()
                
            } 
           
            $('#banner').on('mouseout', function(){
                timer=setInterval(show,2000)
            })
            $('#banner').on('mouseover', function(){
                clearInterval(timer);
            })
            
        //   =====内容区===
            $.ajax({
                url: '/index',
                type:'post',
                success: function(res){
                    console.log(res)
                    getData(res); 
                }
            })
            
            function getData(data){
                $('ul.hot-right').html('');
                let res=''
                for(var i=0;i<data.length;i++){
                    res+=`<li class="itm">
                    <div class="info" style="width: 100%;">
                        <img class="img" src="./images/${data[i].imgurl}" alt="JMsolution">
                        <p class="desc">${data[i].more}</p>
                    </div>
                    <div class="actions">
                        <a href="javascript:;" class="follow">+关注</a>
                        <p class="followers">${data[i].followers}</p>
                        <a class="enter" target="_blank" href="#">进入品牌</a>
                    </div>
                    </li>`
                };
                $('ul.hot-right').html(res);
            }
            // ======内容区的轮播图
            for(var i=0;i<3;i++){
                if(i==0){
                    $('.hot-left li').eq(0).show()
                    $('.progress').css('width','71px')
                }else{
                    $('.hot-left li').eq(i).hide()
                }
                
            }
            var timer2=setInterval(show2,2000)
            var index=0
            function show2(){
                index++
                if(index>=3){
                    index=0
                    $('.progress').css('width','71px')
                }
                for(var i=0;i<3;i++){
                    if(i==index){
                        $('.hot-left li').eq(i).show()
                    
                    }else{
                        $('.hot-left li').eq(i).hide()
                    }
                }
                let width = $('.progress').width()+71
                $('.progress').css('width',width+'px')
            if($('.progress').width()>220){
                    $('.progress').css('width','71px')
            } 
            }
            $('ul.hot-left').on('mouseout', function(){
                timer2=setInterval(show2,2000)
            })
            $('ul.hot-left').on('mouseover', function(){
                clearInterval(timer2);
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
    })
})


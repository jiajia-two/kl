define(["jquery", "x_calculate"],function($, cal){
    function btn_change(){
        var m = 0;
        for(let i = 0; i < $('.good').length; i++){
            if($('.good')[i].checked){
                m = 1;
            }
        }
        if(m){
            $('.btn_pay')[0].style.backgroundColor = '#D12548';
        }
        else{
            $('.btn_pay')[0].style.backgroundColor = '#ccc';
        }
    }
    return {
        select: () => {
            $('#carList').on('click', () => {
                var n = 0;
                for(let i = 0; i < $('.good').length; i++){
                    if(!$('.good')[i].checked){
                        n = 1;
                    }
                }
                if(n){
                    $('.goods')[0].checked = false;
                } else {
                    $('.goods')[0].checked = true;
                }
                btn_change();
                cal.calculate();
            })
            
        },
        selectAll: () => {
            $('.goods').on('click', () => {
                for(let i = 0; i < $('.good').length; i++){
                    $('.good')[i].checked = $('.goods')[0].checked;
                }
                btn_change();
                cal.calculate();
            })  
        }
    }
})
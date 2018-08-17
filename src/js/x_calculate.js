define(["jquery"],function($){
    return {
        calculate: () => {
            var car = $('#carList').children();
            var total = 0;
            var taxationAll = 0.00;
            var amountAll = 0.00;
            var num = 0;

            //计算商品金额和税收（选中的商品）
            for(let i = 0; i < car.length; i++){
                if(car[i].children[0].children[0].checked){
                    amountAll += car[i].children[4].children[0].innerText * 1;
                    taxationAll += car[i].children[4].children[2].innerText.split(':')[1] * 1;
                    num ++;
                }              
            }

            //计算总计，取两位小数
            taxationAll = taxationAll.toFixed(2)*1;
            amountAll = amountAll.toFixed(2)*1;
            total = taxationAll + amountAll;
            // console.log(amountAll,taxationAll,total);

            //结果插入页面中
            $('.goodsNum').text(num);
            $('.tatal').text(`￥${total}`);
            $('.amount').text(`￥${amountAll}`);
            $('.taxation').text(`￥${taxationAll}`);
        }
    }
})
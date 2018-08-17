require.config({
    paths:{
        jquery:'../lib/jquery-3.3.1',
        xZoom:'../lib/jquery-xZoom/jquery.xZoom',
        getData:'./getCarData',
        select: 'x_select'
    },
    // 配置依赖
    shim:{
        xZoom:['jquery'],
    }

});
require(['jquery', 'getData', 'select'], function($, _data, _sel){
    _data.getData();
    _data.deleteData();
    _data.clear();
    _data.update();
    _sel.select();
    _sel.selectAll();

});
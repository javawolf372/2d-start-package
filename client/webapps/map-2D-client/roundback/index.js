var serialId = '';
$(document).ready(function(){

});

function toBack(){
    serialId = getUrlParam("serialId");
    $.get("http://localhost:8080/queryPersonRoundDataBySerialId?serialId="+serialId,function(data){
        $("#headSpan").html("当前回放嫌疑人："+data.personName+"；手环号："+data.cuffNo);
        initRoomList(data.rounds);
        $(window.parent.document).contents().find("#myBackListIframe")[0].contentWindow.showGj(data.rounds);
        $(window.parent.document).contents().find("#myRoundBackIframe")[0].contentWindow.showBack(data.rounds, data.personSex);
    });
    /** 测试数据退休咯
    var total = parseInt(Math.random()*10,10)+10;
    var tempCoordinateList = [];
    for(var i=0; i<total; i++){
        var tempCoordinate = {
            "x":parseInt(Math.random()*1000,10)+1,
            "y":parseInt(Math.random()*500,10)+1,
            "roomName":"房间"+parseInt(Math.random()*1000,10)+1,
            "startTime":new Date().format("yyyy-MM-dd hh:mm:ss"),
            "endTime":new Date().format("yyyy-MM-dd hh:mm:ss")
        };
        tempCoordinateList.push(tempCoordinate);
    }
    data = {
        "name":"阿德飞",
        "cuffNo":"123821",
        "sex":parseInt(Math.random()*2,10)+1,
        "coordinateList": tempCoordinateList
    };
     **/
}

function initRoomList(coordinateList){
    $('#personBackList').datagrid({
        width:"100%",
        fitColumns:true,
        nowrap:false,
        scrollbarSize:0,
        data:coordinateList,
        columns:[[
            {field:'roomName',title:'房间名',width:100},
            {field:'startTime',title:'开始时间',width:100},
            {field:'endTime',title:'结束时间',width:100}
        ]]
    });
}

//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

var bfb = 1;
var mainDivW = 1230;
var mainDivH = 650;
$(document).ready(function(){
    $("#mainDiv").css({
        "width": mainDivW+"px",
        "height": mainDivH+"px",
        "background-size": mainDivW+"px "+mainDivH+"px"
    });
    initData();
    setInterval(initData, 5000);
});

function initData(){
    $.get("http://localhost:8080/queryPersonLocations",function(data){
        var divHtml = '';
        $('#mainDiv').html(divHtml);
        if(data.length>0){
            $.each(data, function(i, item) {
                var ico_left = item.x * bfb;
                var ico_top = item.y * bfb;
                var imageW = 30*bfb;
                var imageH = 30*bfb;
                var divW = 50*bfb;
                var fontSize = 16*bfb;
                var imageUrl = item.personSex==2?"image/woman.png":"image/man.png";
                divHtml += "<div name='personDiv' style='position:absolute;top:"+ico_top+"px;left:"+ico_left+"px;width:"+divW+"px'>" +
                    "<span style='display:none;background-color:red;color:yellow;font-size: "+fontSize+"px'>"+item.personName+"</span>" +
                    "<img id='personImg"+item.serialId+"' title='"+item.personName+"' src='"+imageUrl+"' width='"+imageW+"px' height='"+imageH+"px' onclick='showVieo("+item.currentRoomId+")'/></div>";
            });
            $('#mainDiv').html(divHtml);
        }
        parent.showPersonInfo(data);
    });
    /**
     * 用来造数据的代码  退休咯
        data = [];
        var tatol = parseInt(Math.random()*10,10)+1;
        for(var i=0; i<tatol; i++){
            var tempSex = parseInt(Math.random()*2,10)+1;
            var tempX = parseInt(Math.random()*mainDivW,10)+1;
            var tempY = parseInt(Math.random()*mainDivH,10)+1;
            var tempCuffNo = parseInt(Math.random()*899999,10)+100001;
            var tempInTime = "2019-01-01 12:23:23";
            var tempCaseType = "打非案件佛大减肥阿肥发";
            var tempCurrRoomId = parseInt(Math.random()*20,10)+1;
            var tempCurrRoomName = "房间"+tempCurrRoomId;
            var item = {"serialId":(i+1),"name":"嫌疑人","sex":tempSex,"x":tempX,"y":tempY,"cuffNo":tempCuffNo,
                "inTime":tempInTime,"caseType":tempCaseType,"currRoomId":tempCurrRoomId,"currRoomName":tempCurrRoomName};
            data.push(item);
        }
        setTimeout(function(){
            parent.showPersonInfo(data);
        },0);
     */
}

function changeSlier(val){
    bfb = val;
    $("#mainDiv").css({
        "width": (mainDivW*bfb)+"px",
        "height": (mainDivH*bfb)+"px",
        "background-size": mainDivW*bfb+"px "+mainDivH*bfb+"px"
    });
    initData();
}

function showVieo(roomId){
    alert("调用房间ID为【"+roomId+"】的实时视频啦！！！");
}

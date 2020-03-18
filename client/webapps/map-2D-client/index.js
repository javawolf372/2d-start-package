$(document).ready(function(){
    $("#mySlider").slider({
        onComplete:function(val){
            $(window.parent.document).contents().find("#myIframe")[0].contentWindow.changeSlier(val);
        }
    });
    $('#myVideoTree').combotree({
        data: [{
            id: "room1",
            text: '房间1',
            isMain:true,
            children: [{
                id: 11,
                text: '房间1特写'
            },{
                id: 12,
                text: '房间1靠门口'
            },{
                id: 13,
                text: '房间1对角'
            }]
        },{
            id: "room2",
            text: '房间2',
            isMain:true,
            children: [{
                id: 21,
                text: '房间2特写'
            },{
                id: 22,
                text: '房间2靠门口'
            },{
                id: 23,
                text: '房间2对角'
            }]
        }],
        onBeforeSelect:function(node){
            if((node.id+"").indexOf("room")>-1){
                return false;
            }
        },
        onClick: function(node){
            if((node.id+"").indexOf("room")<0){
                alert("查看【"+node.text+"】的视频咯！！摄像头的ID为："+node.id);
            }
        }
    });
});

var lastData = [];
function showPersonInfo(data){
    if(lastData && lastData.length>0){
        $.each(lastData, function(i, item){
            var tempTitle = item.personName+'（手环号：'+item.cuffNo+'）';
            $('#myAccordion').accordion("remove", tempTitle);
        });
    }
    if(data && data.length>0){
        $.each(data, function(i, item){
            var tempHtml = '<p><span style="font-weight: bold;color: red;">&nbsp;&nbsp;&nbsp;入区时间：</span>'+item.inTimeStr+'</p>' +
                '<p><span style="font-weight: bold;color: red;">&nbsp;&nbsp;&nbsp;案件类型：</span>'+item.caseType+'</p>' +
                '<p><span style="font-weight: bold;color: red;">&nbsp;&nbsp;&nbsp;所在房间：</span>'+item.currentRoomName+'</p>' +
                '<p style="padding-right: 10px;float: right;">' +
                    '<a href="#" class="easyui-linkbutton" name="noButton" onclick="checkPersonShowVieo('+item.serialId+')">实时视频</a>' +
                    '<a href="#" class="easyui-linkbutton" name="noButton" onclick="toRoundBack('+item.serialId+')">轨迹回放</a>' +
                '</p>';
            $('#myAccordion').accordion('add', {
                title: item.personName+'（手环号：'+item.cuffNo+'）',
                content: tempHtml,
                selected: true
            });
        });
    }
    lastData = data;
    $('#personListLayout').layout('panel','west').panel('setTitle','在区嫌疑人列表（'+data.length+'人）');
}

function checkPersonShowVieo(serialId){
    $(window.frames["myIframe"].document).find("#personImg"+serialId)[0].click();
}

function toRoundBack(serialId){
    window.open('roundback/index.jsp?serialId='+serialId,'target');
}

function toCoordinatesPage(){
    window.open('coordinates/main.html','target');
}

function changeCheckbox(){
    var flag = $("#myCheckbox")[0].checked;
    if(flag){
        $("#xyDiv").show();
        $("#mySlider").slider("setValue", 1);
        $("#mySlider").slider({disabled:true});
        $(window.parent.document).contents().find("#myIframe")[0].contentWindow.changeSlier(1);
        $($(window.frames["myIframe"].document).find("#mainDiv")[0]).bind("mousemove", function (e) {
            $("#x").val(e.pageX-35);
            $("#y").val(e.pageY-55);
        });
    }else{
        $("#xyDiv").hide();
        $("#mySlider").slider({disabled:false});
        $($(window.frames["myIframe"].document).find("#mainDiv")[0]).unbind("mousemove");
    }
}
var mainDivW = 1230;
var mainDivH = 650;
var intervalId = 0;
$(document).ready(function(){
    $("#backMainDiv").css({
        "width": mainDivW+"px",
        "height": mainDivH+"px",
        "background-size": mainDivW+"px "+mainDivH+"px"
    });
});

function showBack(data, sex){
    $("#backMainDiv").html('');
    if(intervalId!=0){
        clearInterval(intervalId);
    }
    if(data && data.length>0){
        var i=0;
		var dataJson = [];
		var $draw=document.createElementNS("http://www.w3.org/2000/svg","svg");
		$('#backMainDiv').prepend($draw);
		var defs=document.createElementNS("http://www.w3.org/2000/svg","defs");
		$draw.appendChild(defs);
		defs.appendChild(getSvgMarker("arrow1","#15428B"));
		defs.appendChild(getSvgMarker("arrow2","#ff3300"));
		defs.appendChild(getSvgMarker("arrow3","#ff3300"));
		var widthD = (mainDivW||800)-2;
		var heightD = (mainDivH||500)-2;
		$draw.coordsize = widthD*2+","+heightD*2;
		$draw.style.width = mainDivW + "px";
		$draw.style.height = mainDivH + "px";
		
        intervalId = setInterval(fun, 3000);
        function fun(){
            var item = data[i];
            var ico_left = item.x;
            var ico_top = item.y;
            var imageW = 30;
            var imageH = 30;
            var divW = 30;
            var imageUrl = sex==2?"../image/woman.png":"../image/man.png";
            var divHtml = $("<div id='person"+i+"' name='personDiv' style='position:absolute;top:"+ico_top+"px;left:"+ico_left+"px;width:"+divW+"px'></div>");
			var imgHtml = $("<img id='personImg"+item.serialId+"' src='"+imageUrl+"' width='"+imageW+"px' height='"+imageH+"px'/>");
			divHtml.append(imgHtml);	
			var dataObj = {};
			dataObj.left = ico_left;
			dataObj.top = ico_top;
			dataObj.width = divW;
			dataObj.height = imageH;
			dataJson.push(dataObj);
			if (dataJson.length > 1) {
				var res = calcStartEnd(dataJson[dataJson.length - 2], dataJson[dataJson.length - 1]);
				var line = drawLine(dataJson.length,res.start,res.end,true);
				$draw.appendChild(line);
				if (dataJson.length == 2) {
					console.log($("#person"+ (dataJson.length - 2)).attr('top'));
					$("#person0").find('img').attr('src','../image/start.jpg');
				}else {
					$("#person"+ (dataJson.length - 2)).find('img').attr('src','../image/history.jpg');
				}
			}
				
            $('#backMainDiv').append(divHtml);
            i++;
            if(i==data.length){
                clearInterval(intervalId);
            }
        }
    }
}

	function getSvgMarker(id,color){
		var m=document.createElementNS("http://www.w3.org/2000/svg","marker");
		m.setAttribute("id",id);
		m.setAttribute("viewBox","0 0 6 6");
		m.setAttribute("refX",5);
		m.setAttribute("refY",3);
		m.setAttribute("markerUnits","strokeWidth");
		m.setAttribute("markerWidth",6);
		m.setAttribute("markerHeight",6);
		m.setAttribute("orient","auto");
		var path=document.createElementNS("http://www.w3.org/2000/svg","path");
		path.setAttribute("d","M 0 0 L 6 3 L 0 6 z");
		path.setAttribute("fill",color);
		path.setAttribute("stroke-width",0);
		m.appendChild(path);
		return m;
	}

	function drawLine(id,sp,ep,mark,dash){
		var line;
		var useSVG="";
		if (navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 6.0")>0){
			useSVG="";	
		}else {
			useSVG="1";
		}	
		if(useSVG != ""){
			line=document.createElementNS("http://www.w3.org/2000/svg","g");
			var hi=document.createElementNS("http://www.w3.org/2000/svg","path");
			var path=document.createElementNS("http://www.w3.org/2000/svg","path");

			if(id!="")	line.setAttribute("id",id);
			line.setAttribute("from",sp[0]+","+sp[1]);
			line.setAttribute("to",ep[0]+","+ep[1]);
			hi.setAttribute("visibility","hidden");
			hi.setAttribute("stroke-width",9);
			hi.setAttribute("fill","none");
			hi.setAttribute("stroke","white");
			hi.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			hi.setAttribute("pointer-events","stroke");
			path.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			path.setAttribute("stroke-width",2.4);
			path.setAttribute("stroke-linecap","round");
			path.setAttribute("fill","none");
			if(dash)	path.setAttribute("style", "stroke-dasharray:6,5");
			if(mark){
				path.setAttribute("stroke","#ff3300");
				path.setAttribute("marker-end","url(#arrow2)");
			}
			else{
				path.setAttribute("stroke","#5068AE");
				path.setAttribute("marker-end","url(#arrow1)");
			}
			line.appendChild(hi);
			line.appendChild(path);
			line.style.cursor="crosshair";
			if(id!=""&&id!="GooFlow_tmp_line"){
				var text=document.createElementNS("http://www.w3.org/2000/svg","text");
				line.appendChild(text);
				var x=(ep[0]+sp[0])/2;
				var y=(ep[1]+sp[1])/2;
				text.setAttribute("text-anchor","middle");
				text.setAttribute("x",x);
				text.setAttribute("y",y);
				line.style.cursor="pointer";
				text.style.cursor="text";
			}
		}else{
			line=document.createElement("v:polyline");
			if(id!="")	line.id=id;
			//line.style.position="absolute";
			line.points.value=sp[0]+","+sp[1]+" "+ep[0]+","+ep[1];
			line.setAttribute("fromTo",sp[0]+","+sp[1]+","+ep[0]+","+ep[1]);
			line.strokeWeight="1.2";
			line.stroke.EndArrow="Block";
			line.style.cursor="crosshair";
			if(id!=""&&id!="GooFlow_tmp_line"){
				var text=document.createElement("div");
				//text.innerHTML=id;
				line.appendChild(text);
				var x=(ep[0]-sp[0])/2;
				var y=(ep[1]-sp[1])/2;
				if(x<0) x=x*-1;
				if(y<0) y=y*-1;
				text.style.left=x+"px";
				text.style.top=y-6+"px";
				line.style.cursor="pointer";
			}
			if(dash)	line.stroke.dashstyle="Dash";
			if(mark)	line.strokeColor="#ff3300";
			else	line.strokeColor="#5068AE";
		}
		return line;
	}

function calcStartEnd (n1,n2){
	var X_1,Y_1,X_2,Y_2;
	//X�жϣ�
	var x11=n1.left,x12=n1.left+n1.width,x21=n2.left,x22=n2.left+n2.width;
	//���2�ڽ��1���
	if(x11>=x22){
		X_1=x11;X_2=x22;
	}
	//���2�ڽ��1�ұ�
	else if(x12<=x21){
		X_1=x12;X_2=x21;
	}
	//���2�ڽ��1ˮƽ�����غ�
	else if(x11<=x21&&x12>=x21&&x12<=x22){
		X_1=(x12+x21)/2;X_2=X_1;
	}
	else if(x11>=x21&&x12<=x22){
		X_1=(x11+x12)/2;X_2=X_1;
	}
	else if(x21>=x11&&x22<=x12){
		X_1=(x21+x22)/2;X_2=X_1;
	}
	else if(x11<=x22&&x12>=x22){
		X_1=(x11+x22)/2;X_2=X_1;
	}
	
	var y11=n1.top,y12=n1.top+n1.height,y21=n2.top,y22=n2.top+n2.height;
	if(y11>=y22){
		Y_1=y11;Y_2=y22;
	}
	else if(y12<=y21){
		Y_1=y12;Y_2=y21;
	}
	else if(y11<=y21&&y12>=y21&&y12<=y22){
		Y_1=(y12+y21)/2;Y_2=Y_1;
	}
	else if(y11>=y21&&y12<=y22){
		Y_1=(y11+y12)/2;Y_2=Y_1;
	}
	else if(y21>=y11&&y22<=y12){
		Y_1=(y21+y22)/2;Y_2=Y_1;
	}
	else if(y11<=y22&&y12>=y22){
		Y_1=(y11+y22)/2;Y_2=Y_1;
	}
	return {"start":[X_1,Y_1],"end":[X_2,Y_2]};
}
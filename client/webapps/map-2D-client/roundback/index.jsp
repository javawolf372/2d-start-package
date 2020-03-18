<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
	<link rel="stylesheet" type="text/css"	href="../jquery-easyui-1.7.0/themes/bf/easyui2.css">
	<link rel="stylesheet" type="text/css"	href="../jquery-easyui-1.7.0/themes/icon.css">
	<link rel="stylesheet" type="text/css"	href="../jquery-easyui-1.7.0/demo/demo.css">
	<script type="text/javascript"	src="../jquery-easyui-1.7.0/jquery.min.js"></script>
	<script type="text/javascript"	src="../jquery-easyui-1.7.0/jquery.easyui.min.js"></script>
	<script type="text/javascript"	src="../jquery-easyui-1.7.0/locale/easyui-lang-zh_CN.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>手环地图-轨迹回放</title>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="index.js"></script>
</head>
<body onload="toBack()">
	<div class="easyui-layout" style="width: 100%;height: 100%">
		<div data-options="region:'west',collapsible:false" style="width:280px;height: 100%">
			<div class="easyui-tabs" style="height: 100%">
				<div title="轨迹可视化">
					<iframe id="myBackListIframe" src="ygt_index.html" style="width:100%;height: 98%;overflow: auto"></iframe>
				</div>
				<div title="轨迹列表">
					<table id="personBackList"></table>
				</div>
			</div>
		</div>
		<div data-options="region:'center'">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'north'" style="padding-left:20px;padding-top:20px;height:50px;">
					<span id="headSpan" style="float:right;font-size: 18px;color: yellow;">当前回放嫌疑人：占山；手环号：1201234</span>
					<a href="#" class="easyui-linkbutton" style="float: left;margin-left: 10px;" onclick="toBack()">重新回放</a>
				</div>
				<div data-options="region:'center'">
					<iframe id="myRoundBackIframe" src="main.html" style="width: 99%;height: 98%"></iframe>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
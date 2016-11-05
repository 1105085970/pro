//首页发送ajax请求
$(function(){	//当文档加载完成时

	var c=$('meta[name="csrf-token"]');		//获取csrf节点
	//修改ajax默认值
	$.ajaxSetup({
		url:c.attr('url'),
		headers:{'X-CSRF-TOKEN':c.attr('content')},
		type:'POST'
	});



});

//首页ajax逻辑
function index(Param1,Param2,Param3){
	
	//判断参数
	var U={Action:Param1},UU;
	if(Param2)U.Param1=Param2;
	if(Param3)U.Parma2=Param3;

	//发送ajax请求

	//头部
	UU=U;
	UU.Method='Top';
	$.ajax({
		data:UU,
		success:function(data){
			//当请求成功时
			console.log(data);
		},
		error:function(){
			//请求失败时
			alert('头部请求失败');
		}

	});

	//左侧导航
	UU=U;
	UU.Method='Left';
	$.ajax({
		data:UU,
		success:function(data){
			//当请求成功时
			console.log(data);
		},
		error:function(){
			//请求失败时
			alert('左侧导航请求失败');
		}

	});

	//主内容
	UU=U;
	UU.Method='Contents';
	$.ajax({
		data:UU,
		success:function(data){
			//当请求成功时
			console.log(data);
		},
		error:function(){
			//请求失败时
			alert('主内容请求失败');
		}

	});

}
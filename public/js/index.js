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
function index(Action='hom',Param=''){
	
	//判断参数
	var U={Action:Action,Param:Param},UU;

	//发送ajax请求

	//头部
	UU=U;
	UU.Method='Top';
	$.ajax({
		data:UU,
		success:function(data){
			//请求失败时
			if(!data){alert('头部请求失败'); return;};
			//当请求成功时
			//类别名
			if(data.CatName)$("#CatName").html(data.CatName);
			//标题
			if(data.Title)$("title").html(data.Title);
			//搜索框
			if(data.Search)$("#Search").html(data.Search);
			//背景色
			if(data.Background)$('#Top').css('background',data.Background);
			//横向导航条
			if(data.Nav){
				var N=data.Nav,SubClass=$('#SubClass');
				SubClass.empty();
				for(n in N){
					var p=N[n]['Param'],
					pp='',
					A=N[n].Action;

					if(p){
						for(var i=0;i<p.length;i++){
							pp+=","+p[i];
						}
					}

					var a=$('<a onclick="return index(\''+((A)?A:'')+'\',\''+(pp.slice(1))+'\')" href="'+N[n]['Url']+'" >'+n+'</a>');
					SubClass.append(a);

				}
			}
			
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
			//请求失败时
			if(!data){alert('左侧导航请求失败'); return;};
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
			//请求失败时
			if(!data){alert('主内容请求失败'); return;};
			//当请求成功时
			var Fun=Action+'Contents';
			eval(Fun+'(\''+JSON.stringify(data)+'\',\''+Param+'\')');
			//eval("data="+data+";");
			
		},
		error:function(){
			//请求失败时
			alert('主内容请求失败');
		}

	});

	return false;
}

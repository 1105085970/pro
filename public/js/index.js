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

//
function bg(background){
	//设置左侧导航被选中的颜色
	if(background=='#FFF')background='#000';
	var nav_now=$('#Navigation_now');
	nav_now.css('color',background);
	$('#Navigation_now > i').css('color',background);
}

//首页ajax逻辑
function index(Action='hom',Param='',Url=''){
	
	//判断参数
	var U={Action:Action,Param:Param},
		UU,
		background='',		//背景色
		Topdata='',			//头部数据
		Leftdata='',		//左侧导航数据
		Contentsdata='',	//主内容数据
		State=0;			//三个ajax完成状态

	

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
			Topdata=data;	//存数据
			State++;		//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			Top(data,Action);
			//背景色
			if(data.Background){
				$('#Top').css('background',data.Background);
				background=data.Background;
				//如果是白色背景
				if(background=='#FFF')
					$('#Top').addClass('text-muted');
				else
					$('#Top').removeClass('text-muted');
				//设置左侧导航被选中的颜色
				bg(background);
				
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
			Leftdata=data;	//存数据
			State++;		//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			Left(data,Action);
			//设置左侧导航被选中的颜色
			bg(background);
			
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
			Contentsdata=data;	//存数据
			State++;	//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			funa=eval(Action+'Contents');
			funa(data,Param);

		},
		error:function(){
			//请求失败时
			alert('主内容请求失败');
		}

	});

	//保存数据
	function Re(){
		if(Action=='hom')Url='';
		var Data={
			Action:Action,
			Param:Param,
			Topdata:Topdata,
			Leftdata:Leftdata,
			Contentsdata:Contentsdata,
			Url:Url
		};
		history.pushState(Data,'',Url);
	}

	return false;
}

//处理顶部函数
function Top(data,Action){
	//处理顶部
	//类别名
	if(data.CatName){
		$("#CatName").html(data.CatName);
		$("#CatName2").html(data.CatName);
	}
	//标题
	if(data.Title)$("title").html(data.Title);
	//搜索框
	if(Action!='sea'){
		//不是搜索页面
		//事件
		var on="index('sea','','/sea')";
		//覆盖
		$("#Search").html('<div onclick="'+on+'" ><i class="fa fa-search" aria-hidden="true"></i>Search</div>');
	}else{
		//是搜索页
		//事件
		var on="index('sea','','/sea');return false;";
		//图标
		var i='<i class="fa fa-search" aria-hidden="true"></i>';
		//表单
		var inp='<input type="text" placeholder="Search" autocomplete="off" autofocus value="'+data.Search+'">';
		//覆盖
		$("#Search").html('<form onsubmit="'+on+'">'+i+inp+'</form>');
	}

	//横向导航条
	if(data.Nav){
		var N=data.Nav,SubClass=$('#SubClass');
		SubClass.empty();
		SubClass.html('<div class="col-md-3"></div>');
		for(n in N){
			var p=N[n]['Param'],
			pp='',
			A=N[n].Action;

			if(p){	//如果有参数
				for(var i=0;i<p.length;i++){
					pp+=","+p[i];
				}
			}
			
			//onclick事件
			var on="return index('"+((A)?A:'')+"','"+(pp.slice(1))+"',"+Action+"Contents)";
			//a链接
			var href=N[n]['Url'];
			//class类
			var cla='col-xs-4 col-md-2';
			//创建节点
			var a=$('<a onclick="'+on+'" class="'+cla+'" href="'+href+'" >'+n+'</a>');
			//追加节点
			SubClass.append(a);

		}
		$("#Contents").css('margin-top','112px');
	}else{
		$("#Contents").css('margin-top','64px');
	}

}

//处理左侧导航函数
function Left(data,Action){
	var nav=$("#Navigation"),
		a='';
	for(v in data){
		var i='<i class="fa '+data[v]['Icon']+' fa-fw fa-lg" aria-hidden="true"></i>';
		var on="index('"+data[v]['Param']+"','','"+data[v]['Url']+"')";
		a+='<a id="'+((data[v]['Param']==Action)?'Navigation_now':'')+'" href="'+data[v]['Url']+'" onclick="'+on+'">'+i+v+'</a>';
	}
	//覆盖
	nav.html(a);
}

//当浏览器前进后退
window.onpopstate=function(event){
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	var s=event.state;
	Left(s.Leftdata,s.Action);
	Top(s.Topdata,s.Action);
	$('#Top').css('background',s.Topdata.Background);
	bg(s.Topdata.Background);
	fun=eval(s.Action+'Contents');
	fun(s.Contentsdata,s.Param);
}
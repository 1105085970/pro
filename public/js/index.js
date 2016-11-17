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
	//设置新帖按钮背景色
	$('#Newpost').css('background',background);
}

//首页ajax逻辑
function index(Action='hom',Param='',Url=''){

	if(!Action)return;

	$("#Contents").animate({opacity:-1,top:"10%"},500);

	//找已经存过的数据
	if(Action=='hom'&&!Param)
		var dat=$(window).data('/');
	else
		var dat=$(window).data(Url);

	if(dat){
		//如果缓存过当前的数据
		//恢复数据
		reduction(dat);
		//存到历史记录
		Re(dat);
		return false;
	}
	
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
			if(!data){Prompt('头部请求失败'); return;};
			//当请求成功时
			Topdata=data;	//存数据
			State++;		//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			Top(data,Action);
			//设置左侧导航被选中的颜色
			bg(data.Background);
			background=data.Background;
			
		},
		error:function(){
			//请求失败时
			Prompt('头部请求失败');
		}

	});

	//左侧导航
	var old_leftdata=$(window).data('LeftData');	//查找左侧导航的缓存
	if(old_leftdata){
		//缓存过左侧导航

		Leftdata=old_leftdata;	//存数据
		State++;		//加状态
		if(State==3)Re(); //如果三个ajax都完成就存储数据
		Left(old_leftdata,Action);
		//设置左侧导航被选中的颜色
		if(background){
			bg(background);
		}

	}else{
		//没有缓存过左侧导航
		UU=U;
		UU.Method='Left';
		$.ajax({
			data:UU,
			success:function(data){
				//请求失败时
				if(!data){Prompt('左侧导航请求失败'); return;};
				//当请求成功时
				Leftdata=data;	//存数据
				State++;		//加状态
				if(State==3)Re(); //如果三个ajax都完成就存储数据
				Left(data,Action);
				//设置左侧导航被选中的颜色
				if(background){
					bg(background);
				}

				//把数据存到缓存中
				$(window).data('LeftData',data);
				
			},
			error:function(){
				//请求失败时
				Prompt('左侧导航请求失败');
			}

		});

	}
	

	//主内容
	UU=U;
	UU.Method='Contents';
	$.ajax({
		data:UU,
		success:function(data){
			//请求失败时
			if(!data){Prompt('主内容请求失败'); return;};
			//当请求成功时
			Contentsdata=data;	//存数据
			State++;	//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			$("#Contents")[0].innerHTML='';
			funa=eval(Action+'Contents');
			funa(data,Param);
			$("#Contents").animate({opacity:1,top:"0%"});
			//滚动条滚动到顶部
			scrollTo(0,0);
		},
		error:function(){
			//请求失败时
			Prompt('主内容请求失败');
		}

	});

	//保存数据
	function Re(Data=''){
		if(Action=='hom'&&!Param)Url='/';
		//准备数据
		if(!Data){
			var Data={
			Action:Action,
			Param:Param,
			Topdata:Topdata,
			Leftdata:Leftdata,
			Contentsdata:Contentsdata,
			Url:Url
			};
		}

		//存数据
		$(window).data(Url,Data);

		//存到历史记录
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
	//新帖按钮右下角
	$('#Newpost').css('display','none');
	if(data.Newpost)$('#Newpost').css('display','block');
	//标题
	if(data.Title)$("title").html(data.Title);
	//搜索框
	if(Action!='sea'){
		//不是搜索页面
		//事件
		var on="index('sea','','/sea')";
		//覆盖
		$("#Search").html('<div onclick="'+on+'" ><i class="fa fa-search" aria-hidden="true"></i>Search</div>');
		$("#Search").addClass('hidden-md-down');
		$("#Searchmin").removeAttr('hidden');
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
		$("#Search").removeClass('hidden-md-down');
		$("#Searchmin").attr('hidden','1');
		$('#Search input').focus();
	}

	//横向导航条
	var N=data.Nav,SubClass=$('#SubClass');
	SubClass.empty();
	if(data.Nav){
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
			
			//a链接
			var href=N[n]['Url'];

			//onclick事件
			var on="return index('"+((A)?A:'')+"','"+(pp.slice(1))+"','"+href+"')";
			
			//class类
			var cla='col-xs-4 col-md-2';
			//创建节点
			var a=$('<a onclick="'+on+'" class="'+cla+'" href="'+href+'" >'+n+'</a>');
			//追加节点
			SubClass.append(a);

		}
		$("#Contents").css('margin-top','112px');
		$("#Navigation").css('top','112px');
	}else{
		$("#Contents").css('margin-top','64px');
		$("#Navigation").css('top','64px');
	}

	//背景色
	if(data.Background){
		$('#Top').css('background',data.Background);
		background=data.Background;
		//如果是白色背景
		if(background=='#FFF')
			$('#Top').addClass('text-muted');
		else
			$('#Top').removeClass('text-muted');
		
	}

}

//处理左侧导航函数
function Left(data,Action){
	var nav=$("#Navigation"),
		a='';
	for(v in data){
		var i='<i class="fa '+data[v]['Icon']+' fa-fw fa-lg" aria-hidden="true"></i>';
		var on="return index('"+data[v]['Param']+"','','"+data[v]['Url']+"')";
		a+='<a id="'+((data[v]['Param']==Action)?'Navigation_now':'')+'" href="'+data[v]['Url']+'" onclick="'+on+'">'+i+v+'</a>';
	}
	//覆盖
	nav.html(a);
}

//当浏览器前进后退
window.onpopstate=function(event){
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	var data=event.state;
	reduction(data);
}

//还原数据
function reduction(data){
	//如果没保存数据，就返回
	if(!data)return;
	if(!data.Action)return;
	//左侧导航
	Left(data.Leftdata,data.Action);
	//顶部
	Top(data.Topdata,data.Action);
	//设置头部和左侧导航背景色
	bg(data.Topdata.Background);

	
	//动画
	$("#Contents").animate({opacity:-1,top:"10%"},500,function(){
		//主内容
		$("#Contents")[0].innerHTML='';
		fun=eval(data.Action+'Contents');
		fun(data.Contentsdata,data.Param);
	}).animate({opacity:1,top:"0%"});


}

//中间弹出框
function Popup(arr,fun){
	//Id
	//Action	主类别
	//Method	方法名
	//Param		参数
	//Noajax	取消ajax
	//Height	框的高度
	//Width		相对宽度的偏移 1 或 -1

	var height=(arr.Height)?arr.Height:400;

	//黑背景
	var Black_bg=$('<div class="Black_bg"></div>');
	Black_bg.bind('click',function(e){
		//删除弹出框时 调用函数 data值为remove
		e.stopPropagation();	//阻止事件冒泡
		var t=$(this);
		//修改距离顶部距离动画
		Transparent_row.animate({'margin-top':0},200);
		//修改背景透明度动画
		row2.animate({'opacity':0},200,function(){t.remove();});
		//回调函数
		fun('remove');
		
	});

	//中间透明行
	var Transparent_row=$('<div class="row Transparent_row"></div>');
	//修改距离顶部距离动画
	Transparent_row.animate({'margin-top':($(window).height()-height)/2+"px"},200);

	var p=0;
	if(arr.Width)
		p=2*arr.Width;

	//中间白盒子
	var row1=$('<div class="col-sm-'+(1+(-p/2))+' col-md-'+(2+(-p/2))+' col-lg-'+(3+(-p/2))+' col-xl-'+(3+(-p/2))+' hidden-xs-down"></div>');
	var row2=$('<div class="White_box col-xs-12 col-sm-'+(10+p)+' col-md-'+(8+p)+' col-lg-'+(6+p)+' col-xl-'+(6+p)+'"></div>');
	row2.css('height',height+'px');

	//移动端顶部框 按钮
	var row3=$('<div class="row White_box_row1 hidden-sm-up"></div>');
	var row3_1=$('<div class="col-md-12" id="'+arr.Id+'_top" ></div>');
	var row3_1_1=$('<i class="fa fa-times fa-lg" aria-hidden="true"></i>');
	row3_1_1.click(function(){Black_bg.click();})
	row3_1.append(row3_1_1);
	row3.append(row3_1);

	var row4=$('<div class="row White_box_row2"><div id="'+arr.Id+'" class="col-md-12"></div></div>');
	
	row2.bind('click',function(e){
		return false;
	});

	//追加
	row2.append(row3).append(row4);
	Transparent_row.append(row1).append(row2);
	Black_bg.append(Transparent_row);
	$("#Eject").append(Black_bg);
	//修改背景透明度动画
	row2.animate({'opacity':1});

	if(arr.Id && $("#Eject").data(arr.Id)){
		//如果缓存过
		fun($("#Eject").data(arr.Id),arr);

	}else if(!arr.Noajax){
		var dat={
			Action:arr.Action,
			Method:arr.Method,
			Param:arr.Param
		};

		//ajax请求数据
		$.ajax({
			data:dat,
			success:function(data){
				if(arr.Id)$("#Eject").data(arr.Id,data);
				fun(data,arr);
			}
		});

	}else{
		fun('',arr);
	}


}


//底部提示框
function Prompt(data){
	var p=$('<div class="Prompt">'+data+'</div>');
	$('body').append(p);
	var x=$('.Prompt').length*74;
	p.animate({'opacity':1,'bottom':"+="+x+"px"},200).delay(3000).animate({'opacity':0},200);
	p.queue(function(){
		$(this).remove();
	});
}

//清除缓存
function Clear_cache(Url){
	if(!Url)Url=location.pathname;
	$(window).removeData(Url);
}

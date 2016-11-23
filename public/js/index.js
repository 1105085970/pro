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
			if(!data){Prompt('顶部请求失败'); return;};
			//当请求成功时
			Topdata=data;	//存数据
			State++;		//加状态
			if(State==3)Re(); //如果三个ajax都完成就存储数据
			Top(data,Action,Url);
			//设置左侧导航被选中的颜色
			bg(data.Background);
			background=data.Background;
			
		},
		error:function(){
			//请求失败时
			Prompt('顶部请求失败');
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

			$("#Contents").animate({opacity:-1,top:"10%"},300,function(){

				//主内容
				$("#Contents")[0].innerHTML='';
				funa=eval(Action+'Contents');
				funa(data,Param);
				//滚动条滚动到顶部
				//scrollTo(0,0);

			}).animate({opacity:1,top:"0%"});

			
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
function Top(data,Action,Url){
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
		var on="index('sea',$('#Top_search').val(),'/sea/'+$('#Top_search').val());return false;";
		//图标
		var i='<i class="fa fa-search" aria-hidden="true"></i>';
		//表单
		var inp='<input id="Top_search" type="text" placeholder="Search" autocomplete="off" autofocus value="'+data.Search+'">';
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
			var bai='';
			//如果是当前链接
			if(href==Url){
				cla+=' a_on';
				bai='<div id="SubClass_bai" class="col-xs-12 col-md-12"></div>';
			}

			//创建节点
			var a=$('<a onclick="'+on+'" class="'+cla+'" href="'+href+'" >'+n+bai+'</a>');
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
	Top(data.Topdata,data.Action,data.Url);
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

	//如果高度比屏幕大
	if(height>$(window).height()-40)
		height=$(window).height()-40;

	//黑背景
	var Black_bg=$('<div class="Black_bg"></div>');
	Black_bg.bind('click',function(e){
		//删除弹出框时 调用函数 data值为remove
		e.stopPropagation();	//阻止事件冒泡
		var t=$(this);
		//修改距离顶部距离动画
		Transparent_row.animate({'margin-top':0},200);
		//修改背景透明度动画
		row2.animate({'opacity':0},200,function(){

			t.remove();
			//显示滚动条
			if(!$('.Black_bg').length)
				$('body').css('overflow','');

		});
		
		//回调函数
		fun('remove');
		
	});

	//隐藏滚动条
	$('body').css('overflow','hidden');

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
		//阻止冒泡
		e.stopPropagation();
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


//选择图片弹出框
function File_upload(arr){

	//fun 回调函数
	//Many 多文件 最大选择数量

	//准备参数
	var arr2={
		Action:'hom',
		Method:'_getfile',
		Id:'File_upload',
		Height:800,
		Many:1,
		fid:[],
		fun:arr.fun
	}

	//如果有传高度
	if(arr.Height)
		arr2.Height=arr.Height;

	//如果有传宽度
	if(arr.Width)
		arr2.Width=arr.Width;

	//如果有参数
	if(arr.Param)
		arr2.Param=arr.Param;

	if(arr.Many)
		arr2.Many=arr.Many;

	//弹出框
	Popup(arr2,function filelist(data,arr){

		if(data=="remove")return;

		if(data==3){

			Prompt('请先登录');
			return;

		}

		//
		arr.fid={};

		//要追加内容的box
		var box=$('#File_upload');

		//清空box
		box.empty();
		$('.File_top_center').remove();
		$('.File_top_right').remove();

		//小屏幕时的top
		var box_t=$('#File_upload_top');

		var html_t='<span class="File_top_center" >选择图片</span>'
				  +'<div class="File_top_right">确认</div>';

		box_t.append(html_t);

		//要追加的内容

		//图片循环
		var imgs='';
		for(k in data){

			imgs+='<div class="File_imgs col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">'
					+'<div class="File_imgs_top"></div>'
					+'<img class="img-fluid" fid="'+data[k].id+'" path="'+data[k].path+'" src="'+data[k].path+'" >'
					+'<div class="File_imgs_bottom"></div>'
				+'</div>'

		}

		var on="$(this).parents('.Black_bg').click()";

		var html='<div class="row">'
			+'<div id="File_top" class="col-sm-12 hidden-xs-down">'

				//删除图标
				+'<i onclick="'+on+'" id="File_top_left" class="fa fa-times fa-2x" aria-hidden="true"></i>'

				//标题
				+'<span class="File_top_center" >选择图片</span>'

				//确认按钮
				+'<div class="File_top_right">确认</div>'

			+'</div>'
			+'</div>'

			+'<div class="row">'

				//上传框
				+'<div class="File_imgs_a col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">'

					+'<button class="File_imgs_botton" >'
						+'<i class="fa fa-upload" aria-hidden="true"></i>'
						+'<div>上传图片</div>'
					+'</button>'

					+'<div class="File_imgs_botton_a">'
						+'<form id="File_imgs_form" name="File_imgs_file">'
						+'<input type="file" id="File_imgs_file" accept="'+((arr.Param&&arr.Param.types)?arr.Param.types:'')+'" name="files[]" multiple>'
						+'<input id="File_imgs_submit" type="submit">'
						+'</form>'
					+'</div>'

				+'</div>'

				+imgs

			+'</div>';

		box.append(html);

		//默认数据
		$('#File_upload').data('check',arr);

		var formdata;

		//上传按钮被点击 选择上传文件后
		$('#File_imgs_file').change(function(){

			//新的 FormData对象
			formdata=new FormData(document.forms.namedItem("File_imgs_file"));
			//类别
			formdata.append('Action','hom');
			//方法名
			formdata.append('Method','_file_upload');
			//文件类型
			formdata.append('types',arr.Param.types);
			//点击提交按钮
			$('#File_imgs_submit').click();

		})

		//如果文件提交按钮被点击
		$('#File_imgs_form').submit(function(e){

			//发送ajax
			$.ajax({
				data:formdata,
				processData: false,  	// 告诉jQuery不要去处理发送的数据
  				contentType: false, 		// 告诉jQuery不要去设置Content-Type请求头
  				success:function(data){
  					//成功时

  					if(!data){

  						Prompt('未知错误。');
  						return;

  					}

  					if(data==3){

  						Prompt('请先登录。');
  						return;

  					}

  					if(data==2){

  						Prompt('上传出错。');
  						return;

  					}

  					if(data==1){

  						Prompt('不允许上传的类型。');
  						return;

  					}

  					//上传成功时
  					Prompt('上传成功。');

  					//更新缓存
  					$("#Eject").data('File_upload',data);

  					//调用自己
  					filelist(data,arr);

  				},
  				error:function(data){

  					//失败时
  					Prompt('上传失败。');
  					
  				}
			})

			e.preventDefault();
			
		})

		//如果文件被点击
		$('.File_imgs').click(function(){

			var t=$(this);

			//保存的数据
			var data=$('#File_upload').data('check');

			//文件id
			var fid=t.children('img').attr('fid');

			//已选文件数量
			var num=0;
			for(k in data.fid)num++;

			//如果已经被选中 取消选中
			if(t.hasClass('File_imgs_on')){

				t.removeClass('File_imgs_on');
				//移除check
				delete data.fid[fid];

				num--;

			}else if(data.Many>num){//可选数量

				//如果没有选择 添加
				t.addClass('File_imgs_on');
				//添加check
				data.fid[fid]=t.children('img').attr('path');

				num++;	

			}

			//如果有选中的 让按钮变色
			if(num){
				$('.File_top_right').addClass('File_top_right_on');
			}else{
				$('.File_top_right').removeClass('File_top_right_on');
			}

			//保存数据
			$('#File_upload').data('check',data);
			

		})


		//如果提交被点击
		$('.File_top_right').click(function(){

			//获取数据
			var data=$('#File_upload').data('check');

			var dat=[];

			//得到文件路径
			for(k in data.fid){
				dat.push({id:k,path:data.fid[k]});
			}

			//如果没有选择
			if(dat.length==0)return;

			//隐藏框
			$(this).parents('.Black_bg').click();

			//回调函数
			arr.fun(dat);

		})

	})

}


//

//如果主内容区被调整大小
$(window).resize(function(){

	//当前帖子有多少列
	var col=$("#Contents").find('.post_box_col').length;

	//如果没找到直接返回
	if(!col)return;

	var parent=$('.post_box_col').parent();

	//获得以前保存的数据
	var data=$(window).data(location.pathname);
	//帖子列表
	var posts=data.Contentsdata.posts;
	posts=(posts.posts)?posts:data.Contentsdata;
	//要追加的id
	var id={id:parent.attr('id')};

	if(col!=1 && parent.width()<=830){
		//一列
		homContents(posts,data.Param,id);

	}else if(col!=2 && parent.width()<=1690 && parent.width()>830){
		//两列
		homContents(posts,data.Param,id);

	}else if(col!=3 && parent.width()>1690){
		//三列
		homContents(posts,data.Param,id);
	}

});

//如果滚动条滚动
$(window).scroll(function(e){

	//如果没有帖子自动加载类 直接返回
	if(!$('.auto_jj').length)return;

	//如果滚动到底部了
	if($(window).scrollTop()+$(this).height()==$(document).height()){
		//调用追加帖子数据的方法
		auto_jj();
	}

})


//首页
function homContents(datas,param){

	var con=((datas.id)?$("#"+datas.id):$("#Contents"));		//主内容节点
	var data=datas.posts;
	//循环后的帖子
	var arr=posts_list(data);
	var da='';

	if(con.width()<=830){
		//一列
		var fan='<div class="post_box_col col-xs-12 col-sm-12 col-md-12 col-lg-12">';

		for(k in arr){
			fan+=arr[k];
		}

		fan+='</div>';

		//追加html到主内容
		con.html(fan);

	}else if(con.width()<=1690){
		//两列
		var col1=$('<div class="post_box_col post_box_col_right col-xs-6 col-sm-6 col-md-6 col-lg-6" ></div>');
		var col2=$('<div class="post_box_col post_box_col_left col-xs-6 col-sm-6 col-md-6 col-lg-6" ></div>');

		var num=0;

		for(k in arr){
			
			if(num%2==0)
				col1.append(arr[k]);
			else
				col2.append(arr[k]);
			num++;	

		}

		//清空主内容区
		con.empty();
		//追加两列到主内容区
		con.append(col1).append(col2);

	}else{
		//三列
		var col1=$('<div class="post_box_col post_box_col_right col-xs-4 col-sm-4 col-md-4 col-lg-4" style="margin: 0 0 0 auto;" ></div>');
		var col2=$('<div style="max-width:530px;" class="post_box_col col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>');
		var col3=$('<div class="post_box_col post_box_col_left col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>');

		var num=3;

		for(k in arr){

			if(num%3==0)
				col1.append(arr[k]);
			else if(num%3==1)
				col2.append(arr[k]);
			else
				col3.append(arr[k]);

			num++;	
		}

		//清空主内容区
		con.empty();
		//追加两列到主内容区
		con.append(col1).append(col2).append(col3);

	}

	//底部自动加载框
	var auto='<div class="auto_jj col-xs-12 col-sm-12 col-md-12 col-lg-12" >'
				+''
			+'</div>';
	//追加底部加载框到主内容区
	con.append(auto);

	//如果没有页数
	if(!datas.page)
		datas.page=1;

	//保存数据到自动加载框
	$('.auto_jj').data('datas',datas);

	//绑定事件
	onpost();

	
}


//帖子事件绑定
function onpost(){

	//取消事件绑定

	//如果 +1 按钮被点击
	$('.post_box_like').off("click");

	//如果评论按钮被点击
	$('.post_box_comm').off("click");

	//如果评论框被修改
	$('.commbox_textarea').off("keyup");

	//如果评论框提交按钮被点击
	$('.commbox_huifu_bottom_tij').off("click");

	//如果回复图标被点击
	$('.commbox_reply').off('click');


	//如果 +1 按钮被点击
	$('.post_box_like').click(function(){

		var t=$(this);

		//获得保存 +1 数量的节点
		var links=t.siblings('.post_box_likes');
		//获得当前被 +1 的数量
		var s=Number(links.html());

		//检查是否有被选中变红的类
		if(t.hasClass('post_box_like_red')){
			//如果有 移除变红的类
			t.removeClass('post_box_like_red');
			//改变后面被 +1 数量 减1
			links.html(--s);
		}else{
			//如果没有 添加变红的类
			t.addClass('post_box_like_red');
			//改变后面被 +1 数量 加1
			links.html(++s);
		}

		//发送ajax
		$.ajax({
			data:{
				Action:'pos',
				Method:'_set_like',
				post:t.attr('postid')
			},
			success:function(data){

				//清除当前链接的缓存
				Clear_cache();

				if(data==1){
					//+1 成功

					//添加变红的类
					t.addClass('post_box_like_red');
					return;

				}else if(data==2){
					//-1 成功

					//移除变红的类
					t.removeClass('post_box_like_red');
					return;

				}else if(data==3){
					//未登录
					Prompt('请先登录。');

					//移除变红的类
					t.removeClass('post_box_like_red');
					//改变后面被 +1 数量 减1
					links.html(--s);

					return;
				}

				//失败时
				Prompt('与服务器通信失败。');

			},
			error:function(data){
				//失败时
				Prompt('与服务器通信失败。');
			}

		});

	});

	//如果评论按钮被点击
	$('.post_box_comm').click(function(){

		//找到帖子box
		var postbox=$(this).parents('.post_box');
		//找到评论框
		var commbox=postbox.find('.post_box_commbox');

		//当前页面保存的信息
		var data=$(window).data(location.pathname);

		//当前登录用户的头像
		var toux=(data)?data.Topdata.user.toux:'/images/toux.png';

		//修改头像
		postbox.find('.commbox_huifu .commbox_toux').attr('src',toux);

		//如果评论框有这个类
		if(commbox.hasClass('post_box_commbox_h')){

			//隐藏评论框
			commbox.siblings('.commbox_huifu').slideUp();

			//帖子移除阴影
			postbox.removeClass('post_box_now');

			commbox.animate({height:'60px',opacity:0},500,function(){
				commbox.removeClass('post_box_commbox_h');	//删除
				commbox.animate({opacity:1},500,function(){
					if(commbox.css('display')!='none')
						commbox.removeAttr('style');	//移除样式属性
				});
			});
			

		}else{

			//显示评论框
			commbox.siblings('.commbox_huifu').slideDown();

			//帖子添加阴影
			postbox.addClass('post_box_now');

			commbox.addClass('post_box_commbox_h');		//添加
			var h=commbox[0].scrollHeight;
			h=(h+5>500)?500:h+5;
			commbox.animate({height:h+'px',opacity:1});

		}


	})

	//显示第一条评论
	$('.post_box_commbox').each(function(){

		$(this).children('.commbox_row:eq(0)').animate({opacity:1});

	})

	//如果评论框被修改
	$('.commbox_textarea').keyup(function(){

		//如果有内容
		if($(this).val()){

			$(this).parents('.commbox_huifu').find('.commbox_huifu_bottom_tij').addClass('commbox_huifu_bottom_tij_ok');

		}else{

			$(this).parents('.commbox_huifu').find('.commbox_huifu_bottom_tij').removeClass('commbox_huifu_bottom_tij_ok');

		}

		//设置表单高度
		$(this).css('height','');
		$(this).css('height',$(this)[0].scrollHeight+'px');
	})


	//如果评论框提交按钮被点击
	$('.commbox_huifu_bottom_tij').click(function(){

		var t=$(this);

		//回复box
		var huifu=t.parents('.commbox_huifu');

		//评论内容
		var text=huifu.find('.commbox_textarea').val();

		//如果没有评论或已经发送ajax 直接返回
		if(!text || t.attr('ajax'))return;

		//添加ajax属性 防止重复提交
		t.attr('ajax',1);

		//发送ajax
		$.ajax({
			data:{
				Action:'pos',
				Method:'_create_comment',
				post:t.attr('postid'),
				text:text,
				comm:t.attr('commid')
			},
			success:function(data){

				//没登录
				if(data==3){
					
					Prompt('请先登录。');

					//允许再次提交
					t.removeAttr('ajax');
					return;
				}

				//失败时
				if(!data[0] || !data[0].id){
					Prompt('与服务器通信失败。');
					return;
				}

				//成功时
				Prompt('评论成功。');

				//添加 html 标签
				var comm=forcomm(data);

				//评论box
				var commbox=t.parents('.post_box').find('.post_box_commbox');

				//移除评论box none
				commbox.css('display','block');

				//追加
				commbox.append(comm);

				//高度滚动变大
				var h=commbox[0].scrollHeight;
				h=(h+5>500)?500:h+5;
				commbox.animate({height:h+'px'});

				//允许再次提交
				t.removeAttr('ajax');

				//清空评论框
				huifu.find('.commbox_textarea').val('');

				//绑定事件
				onpost();

			},
			error:function(data){

				//失败时
				Prompt('与服务器通信失败。');

				//允许再次提交
				t.removeAttr('ajax');

			}

		})

	})


	//如果回复图标被点击
	$('.commbox_reply').click(function(){

		//父级帖子box
		var post=$(this).parents('.post_box');

		//要回复人的名字
		var name=$('<span>@'+$(this).attr('uname')+'</span>');

		//如果名字被点击
		name.click(function(){

			//提交按钮移除回复人的评论id
			$(this).parents('.post_box').find('.commbox_huifu_bottom_tij').removeAttr('commid');

			//清空要回复人的box
			$(this).parent().empty();

		})

		//清空要回复人的box
		post.find('.commbox_reply_box').empty();
		//把要回复人的名字加到评论框上边
		post.find('.commbox_reply_box').append(name);

		//提交按钮添加回复人的评论id
		post.find('.commbox_huifu_bottom_tij').attr('commid',$(this).attr('commid'));

		//回复框获得焦点
		post.find('.commbox_textarea').focus();

	})

}

//自动追加帖子数据的方法
function auto_jj(){

	//获得转圈的框
	var jj=$(".auto_jj");

	//判断是否在发送ajax
	if(jj.attr('ajax')==1)return;

	//添加ajax属性
	jj.attr('ajax',1);

	//获得保存的数据
	var datas=jj.data('datas');

	//页数
	datas.page=Number(datas.page)+1;

	//更新保存数据
	jj.data('datas',datas);

	//添加转圈图标
	jj.html('<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>');

	//准备数据
	var arr=new Object();
	for(i in datas){
		if(i!='posts')
			arr[i]=datas[i];
	}

	//发送ajax
	$.ajax({
		data:{
			Action:'pos',
			Method:'Contents',
			arr:arr
		},
		success:function(data){

			if(!data.posts){

				//失败时
				Prompt('与服务器通信失败。');

				jj.html('与服务器通信失败。');

				//还原保存数据
				datas.page=Number(datas.page)-1;
				jj.data('datas',datas);

				//删除ajax属性
				jj.removeAttr('ajax');
				return;
			}

			var posts=data.posts;

			//如果返回的数据是0 条
			if(!posts.length){

				jj.html('你已经看完了所有信息');

				//还原保存数据
				datas.page=Number(datas.page)-1;
				jj.data('datas',datas);

				//删除ajax属性
				jj.removeAttr('ajax');

				return;
			}

			//清除内容
			jj.html('');

			//把数据存到缓存中
			for(k in posts){
				datas.posts.push(posts[k]);
			}
			//保存数据
			jj.data('datas',datas);

			//帖子的列
			var col=$('.post_box_col');

			//返回的新帖子数组
			posts=posts_list(posts);

			

			if(col.length==1){
				//一列
				col.append(posts);
			}else if(col.length==2){
				//二列
				var num=0;

				for(i in posts){
					if(num%2==0)
						$('.post_box_col:eq(0)').append(posts[i]);
					else
						$('.post_box_col:eq(1)').append(posts[i]);

					num++;
				}

			}else{
				//三列
				var num=3;

				for(k in posts){

					if(num%3==0)
						$('.post_box_col:eq(0)').append(posts[k]);
					else if(num%3==1)
						$('.post_box_col:eq(1)').append(posts[k]);
					else
						$('.post_box_col:eq(2)').append(posts[k]);

					num++;	
				}
			}

			//删除ajax属性
			jj.removeAttr('ajax');

			//绑定事件
			onpost();

		},
		error:function(data){
			//失败时
			Prompt('与服务器通信失败。');
		}
	})

}

//帖子样式循环
function posts_list(data){

	var arr=new Array();

	//循环data对象得到数组
	for(var i=0;i<data.length;i++){

		//帖子评论大box
		var comm='';
		
		//如果有评论
		var com=data[i]['comm'];

		

		if(com){

			comm='<div class="col-sm-12 post_box_commbox">';
			comm+=forcomm(com);

		}else{

			comm='<div style="display:none" class="col-sm-12 post_box_commbox">';

		}
			
		comm+='</div>';	
	 		
		

		//回复框
		comm+='<div class="col-sm-12 commbox_huifu">'

				+'<div style="display:flex">'
				//头像
				+'<img class="commbox_toux" src="'+data[i]['toux']+'">'
				
				
				+'<div class="commbox_huifu_box">'

					//要回复的人
					+'<div class="commbox_reply_box"></div>'

					//评论框
					+'<textarea class="commbox_textarea" placeholder="添加评论..." ></textarea>'

				+'</div>'

				+'</div>'

				//回复条
				+'<div class="commbox_huifu_bottom">'

					+'<div class="commbox_huifu_bottom_left">'
					+'</div>'

					+'<div postid="'+data[i]['id']+'" class="commbox_huifu_bottom_tij">'
						+'提交'
					+'</div>'

				+'</div>'

			+'</div>';
 

	 da='<div class="row post_box">'

	 		+'<div class="col-sm-12 post_box_top">'

	 			//用户头像
	 			+'<img src="'+data[i]['toux']+'">'

	 			//用户名
	 			+data[i]['name']

	 			//帖子发布时间
	 			+'<div class="post_box_time">'+data[i]['time']+'</div>'

	 		+'</div>'

	 		//帖子主内容
	 		+'<div class="col-sm-12 post_box_cont">'
	 			+data[i]['cont']
	 		+'</div>'

	 		//帖子底部
	 		+'<div class="col-sm-12 post_box_bott">'

	 			// +1 按钮
	 			+'<div class="post_box_like '
	 				+((data[i]['my_like'])?'post_box_like_red':'')
	 				+'" postid="'+data[i]['id']+'">+1</div>'

	 			// +1 数量
	 			+'<div class="post_box_likes">'+((data[i]['likes'])?data[i]['likes']:'')+'</div>'

	 			//分享数量
	 			+'<div class="post_box_shares">'+((data[i]['shares'])?data[i]['shares']:'')+'</div>'

	 			//分享按钮
	 			+((data[i]['noshare']==1)?'<i class="fa fa-share-alt post_box_share" aria-hidden="true" postid="'+data[i]['id']+'"></i>':'')

	 			//评论数量
	 			+'<div class="post_box_comments">'+((data[i]['comms'])?data[i]['comms']:'')+'</div>'

	 			//评论按钮
	 			+((data[i]['nocomm']==1)?'<i class="fa fa-commenting post_box_comm" aria-hidden="true" postid="'+data[i]['id']+'"></i>':'')

	 		+'</div>'

	 		//帖子评论
	 		+((data[i]['nocomm']==1)?comm:'')

		+'</div>';

		arr.push(da);
	}

	return arr;
}

//帖子评论循环
function forcomm(com){
	var comm='';
	for(k in com){

	//父级评论者名字
	var pname='';

	if(com[k]['pid'])
		pname='<span class="commbox_fuji">@'+com[k]['pname']+' </span>';

	comm+='<div class="commbox_row">'

			//用户头像
			+'<img class="commbox_toux" src="'+com[k]['toux']+'">'

			//顶部窄的框
			+'<div class="commbox_top">'

				//缩小时的用户名
				+'<span class="commbox_name">'+com[k]['name']+'<span class="commbox_name_m">:</span> </span>'

				//@的父级评论的人
				+pname

				//帖子内容
				+com[k]['cont']

			+'</div>'

			
			+'<div class="commbox_time">'

				//评论时间
				+'<span class="commbox_times">'+com[k]['time']+'</span>'

				//回复标签
				+'<i commid="'+com[k]['id']+'" uname="'+com[k]['name']+'" class="commbox_reply fa fa-reply fa-2x" aria-hidden="true"></i>'

			+'</div>'

		 +'</div>';
	}

	return comm;
}

//搜索页
function seaContents(data,param){
	$("#Contents").html(data);
}

//添加帖子表单
function postform(data,arr){

	if(data=='remove'){
		$('#Newpost').css('display','block');
		return;
	}
	//隐藏按钮
	$('#Newpost').css('display','none');

	//获得保存的数据
	var datas=$(window).data(location.pathname);

	//准备
	//一行
	var row='';

	//一列
	var col='';

	//顶部大框
	var top=$('<div id="Post_form_top2"></div>');

	//头像
	var pic='<img src="'+data.pic+'">';;

	//姓名
	var name=data.name;

	//发表位置
	var types='公共';	//类别名
	var action='';		//社区或集合控制器名
	var param=datas.Param;		//社区或集合id
	if(data[datas.Action]){
		//如果data里有 社区或集合控制器名
		action=datas.Action;
		for(k in data[datas.Action]){
			if(data[datas.Action][k].id==datas.Param){
				types=data[datas.Action][k].title;		//类别名
			}
		}
	}else{
		param='';
	}
	var coll=' <i class="Post_create-right fa fa-caret-right" aria-hidden="true"></i> '
			+'<span action="'+action+'" param="'+param+'" id="Post_types">'+types+'</span>';

	top.html(pic+name+coll);

	col=$('<div class="col-sm-12"></div>').append(top);
	top=$('<div class="row"></div>').append(col);

	//追加顶部
	$('#Post_form').append(top);

	//文本域
	var form=$('<fieldset class="form-group"></fieldset>');
	form.append('<textarea class="form-control" rows="10" id="Post_form_text" placeholder="有什么新鲜事？"></textarea>')

	col=$('<div class="col-sm-12"></div>').append(form);
	form=$('<div class="row"></div>').append(col);

	//添加文本域
	$("#Post_form").append(form);

	//按钮
	var quxiao=$('<div id="Post_form_qx" >取消</div>');
	var tijiao=$('<div id="Post_form_tj" >提交</div>');
	col=$('<div class="col-sm-12" id="Post_form_anbox" ></div>').append(tijiao).append(quxiao);
	an=$('<div class="row"></div>').append(col);

	//添加按钮
	$('#Post_form').append(an);

	//如果取消按钮被点击
	$('#Post_form_qx').click(function(){
		$(this).parents('.Black_bg').click();
	});

	//统计要显示的收藏集和社区数量

	var collnum=data.col.length;	//收藏集数量
	var commnum=data.com.length;	//社区数量

	//如果有收藏集收藏集+1
	if(collnum)collnum++;

	//如果有社区社区+1			
	if(commnum)commnum++;

	//高度计算
	var colmh=(collnum+commnum+2)*60;

	//如果高度大于浏览器高度
	if(colmh>$(window).height()-40)
		colmh=$(window).height()-40;



	//如果类别被点击 弹出选择类别
	$('#Post_types').click(function(){

		//弹出框
		Popup({
			Id:'Post_types_list',
			Noajax:1,
			Height:colmh,
			Width:-1
		},function(){
			//收藏集
			var col=data.col;
			//社区
			var com=data.com;
			//要追加的数据
			var on="$(this).parents('.Black_bg').click()";
			var typ='<div class="Post_types_top">'
			 	   		+'<i onclick="'+on+'" class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>'
			 	   		+'<span class="Post_types_list_t" >与某人分享</span>'
			 	   +'</div>'

				   +'<div action="" param="" class="Post_types_list">'
				   		+'<i class="fa fa-futbol-o fa-2x" aria-hidden="true"></i>'
				   		+'<span class="Post_types_list_t" >公共</span>'
				   +'</div>';

			if(col){

				//收藏集
				typ+='<div class="Post_types_listt">收藏集</div>';
				for(k in col){
					typ+='<div action="coll" param="'+col[k].id+'"  class="Post_types_list">'
						+'<img src="'+col[k].bg+'">'
						+'<span class="Post_types_list_t" >'+col[k].title+'</span>'
					   +'</div>';

				}

			}

			if(com){
				//社区
				typ+='<div class="Post_types_listt">社区</div>'
				for(k in com){
					typ+='<div action="comm" param="'+com[k].id+'" class="Post_types_list">'
						+'<img src="'+com[k].bg+'">'
						+'<span class="Post_types_list_t" >'+com[k].title+'</span>'
					   +'</div>';

				}

			}
			

			//追加
			$('#Post_types_list').append(typ);

			//如果列表中的项目被点击
			$('.Post_types_list').click(function(){
				//设置
				var types=$('#Post_types');
				//类别名
				types.html($(this).children('.Post_types_list_t').html());
				types.attr('action',$(this).attr('action'));
				types.attr('param',$(this).attr('param'));
				//隐藏当前框
				$(this).parents('.Black_bg').click();
			})

		})

	})

	//如果文本域的内容被改变
	$('#Post_form_text').keyup(function(e){
		//如果有内容
		if($(this).val()){
			$('#Post_form_tj').addClass('Post_form_tj_ok');
		}else{
			$('#Post_form_tj').removeClass('Post_form_tj_ok');
		}

		//设置表单高度
		$(this).css('height','');
		$(this).css('height',20+$(this)[0].scrollHeight+'px');

		//设置白盒子的高度
		var whiteh=$('.White_box')[0].scrollHeight;
		
		//设置白盒子的top
		if(whiteh<$(window).height()-40){
			$('.White_box').height('');
			whiteh=$('.White_box')[0].scrollHeight;
			$('.White_box').height(whiteh);
			$('.Transparent_row').css('margin-top',($(window).height()-whiteh)/2+"px");
		}

		//设置白盒子的滚动条
		$('.White_box')[0].scrollTop=$(this)[0].scrollHeight;

	})

	//如果提交按钮被点击
	$('#Post_form_tj').click(function(){
		//如果没写贴子内容 直接返回
		//如果被点击过 直接返回
		if($(this).attr('ajax')||!$('#Post_form_text').val())return;

		//防止被再次点击
		$(this).attr('ajax',1);

		var text=$('#Post_form_text').val();	//贴子内容
		var t=$(this);
		var types=$('#Post_types');

		//准备参数
		var arr={
			Action:types.attr('action'),	//控制器名
			Param:types.attr('param')		//对应id
		};

		//发送ajax
		$.ajax({
			data:{
				Action:'pos',
				Method:'_create_in',
				Contents:text,
				Arr:arr
			},
			success:function(data){

				//让提交按钮可以被点击
				t.removeAttr('ajax');

				if(!data){
					//插入失败时
					//弹出提示框
					Prompt('与服务器通信失败。');
					return;
				}

				//成功时
				//弹出提示框
				Prompt('发布成功');
				//隐藏添加帖子表单
				t.parents('.Black_bg').click();
				//获取缓存
				var data=$(window).data(location.pathname);
				//清除当前链接的缓存
				Clear_cache();
				//刷新该页
				index(data.Action,data.Param,data.Url);

			},
			error:function(data){
				//如果出错
				//让提交按钮可以被点击
				t.removeAttr('ajax');
				//弹出提示框
				Prompt('连接服务器失败');
			}
		});

	});

}
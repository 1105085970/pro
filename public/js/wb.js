
//如果主内容区被调整大小
$(window).resize(function(){

	//当前帖子有多少列
	var col=$("#Contents").find('.post_box_col').length;

	//如果没找到直接返回
	if(!col)return;

	//获得以前保存的数据
	var data=$(window).data(location.pathname);

	if(col!=1 && $("#Contents").width()<=830){
		//一列
		homContents(data.Contentsdata,data.Param);

	}else if(col!=2 && $("#Contents").width()<=1690){
		//两列
		homContents(data.Contentsdata,data.Param);

	}else if(col!=3){
		//三列
		homContents(data.Contentsdata,data.Param);
	}

});


//首页
function homContents(data,param){

	var con=$("#Contents");		//主内容节点
	var arr=new Array();
	var da='';

	//循环data对象得到数组
	for(var i=0;i<data.length;i++){

		//帖子评论大box
		var comm='';
		if(data[i]['comm']){
			//如果有评论
			var com=data[i]['comm'];
			comm='<div class="col-sm-12 post_box_commbox">';
			comm+=forcomm(com);
	 		comm+='</div>';
		}
	 

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

	//如果 +1 按钮被点击
	$('.post_box_like').click(function(){

		//获得保存 +1 数量的节点
		var links=$(this).siblings('.post_box_likes');
		//获得当前被 +1 的数量
		var s=Number(links.html());

		//检查是否有被选中变红的类
		if($(this).hasClass('post_box_like_red')){
			//如果有 移除变红的类
			$(this).removeClass('post_box_like_red');
			//改变后面被 +1 数量 减1
			links.html(--s);
		}else{
			//如果没有 添加变红的类
			$(this).addClass('post_box_like_red');
			//改变后面被 +1 数量 加1
			links.html(++s);
		}

		//发送ajax
		$.ajax({
			data:{
				Action:'pos',
				Method:'_set_like',
				post:$(this).attr('postid')
			},
			success:function(data){

				if(data==1){
					//+1 成功

					//添加变红的类
					$(this).addClass('post_box_like_red');
					return;

				}else if(data==2){
					//-1 成功

					//移除变红的类
					$(this).removeClass('post_box_like_red');
					return;

				}

				//失败时
				Prompt('与服务器通信失败。');

			}

		});

	});

	
}

//帖子评论循环
function forcomm(com){
	var comm='';
	for(k in com){

	comm+='<div class="commbox_row">'

			//用户头像
			+'<img class="commbox_toux" src="'+com[k]['toux']+'">'

			//顶部窄的框
			+'<div class="commbox_top">'

				//用户名
				+com[k]['name']+': '

				//帖子内容
				+com[k]['cont']

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
	$('#'+arr.Id).html(data);

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
	var name=((data.nickname)?data.nickname:data.name);

	top.html(pic+name);

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

	//如果文本域的内容被改变
	$('#Post_form_text').keyup(function(e){
		//如果有内容
		if($(this).val()){
			$('#Post_form_tj').addClass('Post_form_tj_ok');
		}else{
			$('#Post_form_tj').removeClass('Post_form_tj_ok');
		}
	})

	//如果提交按钮被点击
	$('#Post_form_tj').click(function(){
		//如果没写贴子内容 直接返回
		//如果被点击过 直接返回
		if($(this).attr('ajax')||!$('#Post_form_text').val())return;

		//防止被再次点击
		//$(this).attr('ajax',1);

		var text=$('#Post_form_text').val();	//贴子内容
		var t=$(this);

		//发送ajax
		$.ajax({
			data:{
				Action:'pos',
				Method:'_create_in',
				Contents:text
			},
			success:function(data){

				//让提交按钮可以被点击
				t.removeAttr('ajax');

				if(!data){
					//插入失败时
					//弹出提示框
					Prompt('连接服务器失败');
					return;
				}

				//成功时
				//弹出提示框
				Prompt('发布成功');
				//隐藏添加帖子表单
				t.parents('.Black_bg').click();

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
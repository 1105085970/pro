
//登录页对象
var login={

	index:function(){

		//显示当前的框 第二个
		$(".login_box_mbox:eq(1)").animate({'opacity':'1'},200);

		//如果密码中的后退按钮被点击
		$("#back_email,#back_create").click(function(){
			$("#login_box_dbox").animate({'margin-left':"-100%"},200);
			$(this).parents('.login_box_mbox').animate({'opacity':'0'},200);
			$(".login_box_mbox:eq(1)").animate({'opacity':'1'},500);
		});

		//如果下一步按钮被点击
		$("#email_button").click(function(){
			//获得用户输入的email值
			var email=$("#email"),t=$(this);
			var ts=t.siblings('.login_box_tishi');
			var tm=t.parents('.login_box_mbox');

			//隐藏提示框
			ts.slideUp();

			//移除红色边框 红色叉
			login.re_danger(email);

			//如果没有填email
			if(!email.val()){
				//添加红色边框 红色叉
				login.add_danger(email);
				//获得焦点
				email.focus();
				return;
			}


			//设置按钮为不可点击
			t.attr('disabled','1');

			//发送ajax
			$.ajax({
				data:{Action:'log',Method:'_find_email',email:email.val()},
				success:function(data){
					//如果没找到email
					if(!data){
						ts.html('邮箱不存在。');
						ts.slideDown();
						//添加红色边框 红色叉
						login.add_danger(email);
						//让按钮可以被点击
						t.removeAttr('disabled');
						//获得焦点
						email.focus();
						return;
					}
					//找到了
					//设置头像
					var p_toux=$('#password_toux');
					$('#password_toux').attr('src',((data.pic)?data.pic:p_toux.attr('moren')));
					//设置用户名
					$('#password_username').html(data.name);
					//设置邮箱
					$('#password_email').html(email.val());
					//清空密码框
					$('#password').val('');
					//移除密码框红色边框
					$('#password').parent().removeClass("has-danger");
					//移除密码框红色叉
					$('#password').removeClass("form-control-danger");
					//密码框获得焦点
					$('#password').focus();
					//滚动到第三屏
					$("#login_box_dbox").animate({'margin-left':"-200%"},200);
					//隐藏当前的框
					tm.animate({'opacity':'0'},200);
					//显示下一个框
					tm.next().animate({'opacity':'1'});
					//让按钮可以被点击
					t.removeAttr('disabled');
				},
				error:function(){
					//如果请求失败
					ts.html('与服务器通信失败。');
					ts.slideDown();
					//添加红色边框 红色叉
					login.add_danger(email);
					//让按钮可以被点击
					t.removeAttr('disabled');
					//获得焦点
					email.focus();
					return;
				}
			});

		});

		//如果登录按钮被点击
		$('#password_button').click(function(){
			
			var pass=$("#password");	//获得用户输入的密码值
			var email=$('#email');		//获得邮箱
			var t=$(this);
			var ts=t.siblings('.login_box_tishi');	//提示框
			var tm=t.parents('.login_box_mbox');	//密码区大框

			//隐藏提示框
			ts.slideUp();

			//移除红色边框 红色叉
			login.re_danger(pass);

			//如果没有填密码
			if(!pass.val()){
				//添加红色边框 红色叉
				login.add_danger(pass);
				//获得焦点
				pass.focus();
				return;
			}

			//设置按钮为不可点击
			t.attr('disabled','1');

			//发送ajax
			$.ajax({
				data:{
					Action:'log',
					Method:'_sign_in',
					email:email.val(),
					pass:pass.val(),
					remember:$("#remember")[0].checked
				},
				success:function(data){
					if(data==1){
						//如果登录成功 跳到首页
						location.href="/";
						return;
					}else if(data==2){
						ts.html('账号被禁用。');
					}else{
						ts.html('密码错误。');
					}

					//如果登录失败
					ts.slideDown();
					//添加红色边框 红色叉
					login.add_danger(pass);
					//让按钮可以被点击
					t.removeAttr('disabled');
					//获得焦点
					pass.focus();
				},
				error:function(){
					//如果请求失败
					ts.html('与服务器通信失败。');
					ts.slideDown();
					//添加红色边框 红色叉
					login.add_danger(pass);
					//让按钮可以被点击
					t.removeAttr('disabled');
					//获得焦点
					pass.focus();
					return;
				}
			});


		});

		//如果创建账号被点击
		$('#create_user').click(function(){
			//滚动到创建账号屏
			$("#login_box_dbox").animate({'margin-left':"0%"},200);
			//透明所有屏
			$(".login_box_mbox").animate({'opacity':'0'},200);
			//显示创建账号屏
			$(".login_box_mbox:eq(0)").animate({'opacity':'1'},200);
			//用户名框获得焦点
			$('#zc_name').focus();
			//取消链接跳转
			return false;
		});

		//如果注册时表单失去焦点 判断正则
		$('#zc_name,#zc_email,#zc_pass,#zc_pass2').blur(function(){
			var t=$(this);
			var tm=t.parents('.login_box_mbox');	//密码区大框
			var ts=tm.children('.login_box_tishi');	//提示框
			var patt=new RegExp(t.attr('patt'));	//正则
			var cuo=t.attr('cuo')		//错误提示

			//隐藏提示框
			ts.slideUp();

			//如果是确认密码失去焦点 并且确认密码不一致
			if(t.attr('id')=='zc_pass2'&&t.val()!=$("#zc_pass").val()){
				//
				ts.html('确认密码不一致。');
				ts.slideDown();
				//添加红色边框 红色叉
				login.add_danger(t);
				//禁止提交按钮被点击
				$("#zc_button").attr('disabled','1');
				return;

			}

			//如果是用户名或邮箱失去焦点
			if(t.attr('id')=='zc_name'||t.attr('id')=='zc_email'){
				var obj={name:'该用户名注册过。',email:'该邮箱注册过。'};
				var now='name';
				//如果是邮箱
				if(t.attr('id')=='zc_email')now='email';
				//发送ajax
				$.ajax({
					data:{
						Action:'log',
						Method:'_find_'+now,
						name:t.val(),
						email:t.val()
					},
					success:function(data){
						if(data){
							//如果该用户名注册过
							ts.html(obj[now]);
							ts.slideDown();
							//添加红色边框 红色叉
							login.add_danger(t);
							//禁止提交按钮被点击
							$("#zc_button").attr('disabled','1');
							return;
						}
					}

				});
			}

			//允许提交按钮被点击
			$("#zc_button").removeAttr('disabled');

			if(!patt.test(t.val())){
				//如果不匹配
				ts.html(cuo);
				ts.slideDown();
				//添加红色边框 红色叉
				login.add_danger(t);
				//禁止提交按钮被点击
				$("#zc_button").attr('disabled','1');
				return;
			}

			//匹配上了
			//移除红色边框 红色叉
			login.re_danger(t);

		});

		//如果注册按钮被点击
		$('#zc_button').click(function(){
			var t=$(this);
			var ts=t.siblings('.login_box_tishi');	//提示框
			var name=$('#zc_name').val();	//用户名
			var email=$('#zc_email').val();	//邮箱
			var pass=$('#zc_pass').val();	//密码

			
			//隐藏提示框
			ts.slideUp();

			//清空提示框
			ts.html('');

			//禁止提交按钮被点击
			t.attr('disabled','1');

			//发送ajax
			$.ajax({
				data:{
					Action:'log',
					Method:'_create_in',
					name:name,
					email:email,
					pass:pass
				},
				success:function(data){
					if(!data){
						//注册失败时
						ts.html('注册失败。');
						ts.slideDown();
						//允许提交按钮被点击
						t.removeAttr('disabled');
						return;
					}

					//注册成功时
					//设置邮箱
					$("#email").val(email);
					$('#password_email').html(email);
					//设置用户名
					$('#password_username').html(name);
					//滚到登录页
					$("#login_box_dbox").animate({'margin-left':"-200%"},200);
					//透明所有屏
					$(".login_box_mbox").animate({'opacity':'0'},200);
					//显示创建账号屏
					$(".login_box_mbox:eq(2)").animate({'opacity':'1'},200);
					//清空密码框
					$('#password').val('');
					//移除密码框红色边框
					$('#password').parent().removeClass("has-danger");
					//移除密码框红色叉
					$('#password').removeClass("form-control-danger");
					//密码框获得焦点
					$('#password').focus();

				},
				error:function(data){
					//出现错误
					var cuo=data.responseJSON;
					var ti='';
					if(cuo){
						//如果name有错
						if(cuo.name)ti+='用户名不合法。';
						//如果eamil有错
						if(cuo.email)ti+='必须是一个有效的电子邮件地址。';
						//如果pass有错
						if(cuo.pass)ti+='密码至少6位，字母数字下划线';
					}else{
						ti='连接服务器失败。';
					}
					
					ts.html(ti);
					ts.slideDown();
					//允许提交按钮被点击
					t.removeAttr('disabled');
				}

			});

		});

		//给三个滚动屏绑定事件
		$('.login_box_mbox').keydown(function(e){
			//如果按下键盘回车键 自动点击确认按钮
			if(e.keyCode==13)$(this).children('button').click();
		});

	},

	re_danger:function(t){
		//移除红色边框
		t.parent().removeClass("has-danger");
		//移除红色叉
		t.removeClass("form-control-danger");
		//如果下一步和登录界面 直接返回
		if(t.attr('id')=='email'||t.attr('id')=='password')return;
		//添加绿色边框
		t.parent().addClass("has-success");
		//添加绿色对号
		t.addClass("form-control-success");
	},

	add_danger:function(t){
		//移除绿色边框
		t.parent().removeClass("has-success");
		//移除绿色对号
		t.removeClass("form-control-success");
		//添加红色边框
		t.parent().addClass("has-danger");
		//添加红色叉
		t.addClass("form-control-danger");
	}

};

$(function(){
	if($("#login").length)login.index();
});



//个人资料页
function proContents(data,param){

	//param转换成数组
	if(param)
		param=param.split(',');

	//如果是查看全部页面
	if(param && param[1]=='all'){
		proall(data);
		return;
	}

	var con=$("#Contents");		//主内容节点
	var col=$('<div id="pro_col" class="col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-11"></div>');
	var guanz='';

	//关注、取消关注、修改资料按钮
	if(data.guanz==1){
		//关注
		guanz='<div state="1" uid="'+data.uid+'" id="pro_guanz">关注</div>';

	}else if(data.guanz==2){
		//取消关注
		guanz='<div state="2" uid="'+data.uid+'" id="pro_guanz" class="pro_guanz">取消关注</div>';

	}else if(data.guanz==3){
		//修改资料
		guanz='<div state="3" uid="'+data.uid+'" id="pro_xiug">修改资料</div>';

	}else if(data.guanz==4){
		//未登录
		guanz='';
	}


	//背景图
	var bg='<div class="row">'
		  +'<div id="pro_bgbox" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

		  		//背景图
		  		+'<img id="pro_bg" src="'+data.bg+'" class="img-fluid" >'

		  		//头像，关注等
		  		+'<div class="row">'
		  		+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
		  		+'<div id="pro_toux_row">'

		  			//用户头像
		  			+'<img id="pro_toux" src="'+data.toux+'">'

		  			
		  			+'<div id="pro_namebox" >'
		  				//用户姓名
		  				+'<div id="pro_name">'+data.name+'</div>'
		  				//粉丝数量
		  				+((data.fans!=0)?'<div id="pro_fans">'+data.fans+' 位关注者</div>':'')
		  			+'</div>'

		  			//关注、取消关注、修改资料按钮
		  			+guanz

		  		+'</div>'
		  		+'</div>'
		  		+'</div>'

		  +'</div>'
		  +'</div>';

	//用户兴趣
	var xqlist=xq(data);	//兴趣列表
	

	//查看全部的事件
	var on="return index('pro','"+data.uid+",all','/pro/"+data.uid+"/all');";

	var interests='<div class="row">'
		+'<div id="pro_xqbox" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

			+'<div class="row">'
			+'<div id="pro_xqname" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

				+data.name+'的兴趣主题'
				+((data.coll.length!=0)?'<a id="pro_xqqb" onclick="'+on+'" href="/pro/'+data.uid+'/all">查看全部</a>':'')

			+'</div>'
			+'</div>'

			//兴趣列表
			+'<div class="row">'
			+xqlist
			+'</div>'

		+'</div>'
		+'</div>';

	//用户帖子列表
	var postlist='<div class="row">'
		+'<div id="pro_postlist" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
			+'<div class="row">'
			+'<div id="pro_postname" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

				+data.name+'的信息'

			+'</div>'
			+'</div>'

			//帖子列表
			+'<div id="pro_posts" class="row">'
			
			+'</div>'

		+'</div>'
		+'</div>';


	col.append(bg+interests+postlist);

	//追加到主内容
	con.append(col);

	//追加帖子列表
	homContents(data.posts);

	//关注、取消关注按钮被点击
	$('#pro_guanz').click(function(){
		//状态 关注、取消关注
		var state=$(this).attr('state');
		var t=$(this);

		if(state==1){
			Prompt('已关注。');
			//关注
			$(this).html('取消关注');
			//添加背景变透明的类
			$(this).addClass('pro_guanz');
			//把状态改成 2
			$(this).attr('state',2);

		}else if(state==2){
			Prompt('已经取消关注。');
			//取消关注
			$(this).html('关注');
			//移除背景变透明的类
			$(this).removeClass('pro_guanz');
			//把状态改成 1
			$(this).attr('state',1);

		}

		//发送ajax
		$.ajax({

			data:{
				Action:'pro',
				Method:'_follow_do',
				uid:$(this).attr('uid')
			},
			success:function(data){
				if(data==1){
					//取消关注
					t.html('关注');
					//移除背景变透明的类
					t.removeClass('pro_guanz');
					//把状态改成 1
					t.attr('state',1);
					//清除缓存
					Clear_cache();
					Clear_cache('/peo');
					Clear_cache('/peo/circles');
					return;
				}else if(data==2){
					//关注
					t.html('取消关注');
					//添加背景变透明的类
					t.addClass('pro_guanz');
					//把状态改成 2
					t.attr('state',2);
					//清除缓存
					Clear_cache();
					Clear_cache('/peo');
					Clear_cache('/peo/circles');
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


	//修改资料按钮被点击
	$('#pro_xiug').click(function(){

		//准备参数
		var arr={
			Id:'pro_xiug_edit',
			Action:'pro',
			Method:'_getuser',
			Height:800,
			Width:1
		};

		//弹出框
		Popup(arr,function(data,arr){

			//如果是删除弹出框 直接返回
			if(data=='remove')return;

			//如果没登录
			if(data==3){
				Prompt('请先登录。');
				return;
			}

			//要追加数据的div
			var box=$("#pro_xiug_edit");

			//行
			var row=$('<dic class="row"></div>');

			//列一
			var col1=$('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>');

			//列二
			var col2=$('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>');

			//顶部
			var top='<div class="row">'
				   +'<div class="col-md-12">'

				   	+'<div id="gedit_top" >编辑个人资料</div>'

				   +'</div>'
				   +'</div>';

			//列一的内容
			var col1d='<div class="row">'
				+'<div id="gedit_bg_box" class="col-sm-12">'

					//背景图
					+'<img id="gedit_bg" class="img-fluid" src="'+data.bg+'">'

					//相机图标
					+'<i id="gedit_bg_camera" param="bg" class="fa fa-camera" aria-hidden="true"></i>'

				+'</div>'
				+'</div>'

				+'<div class="row">'
				+'<div class="col-sm-12">'

					
					+'<div class="gedit_zhong">'

						//头像
						+'<div id="gedit_toux_box">'
							+'<img id="gedit_toux" src="'+data.toux+'">'

							//相机图标
							+'<i id="gedit_toux_camera" param="toux" class="fa fa-camera" aria-hidden="true"></i>'

						+'</div>'

						//用户名
						+'<div id="gedit_username">'+((data.nickname)?data.nickname:data.username)+'</div>'

						//注册时间
						+'<fieldset class="form-group">'
						+'<input type="text" id="gedit_created_at" class="form-control" disabled value="'+((data.created_at)?data.created_at.date.split('.')[0]:'')+'" >'
						+'<small class="text-muted">注册时间</small>'
						+'</fieldset>'

						//用户名
						+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" disabled value="'+data.username+'" >'
						+'<small class="text-muted">用户名</small>'
						+'</fieldset>'

						//签名
						+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="gedit_qianm" placeholder="Tagline" value="'+data.slogan+'" >'
						+'<small class="text-muted">签名</small>'
						+'</fieldset>'

						

					+'</div>'

				+'</div>'
				+'</div>';


			//列二的内容
			var col2d='<div class="row">'
				+'<div class="col-sm-12">'
					+'<div class="gedit_zhong">'

						//昵称
						+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="gedit_nickname" placeholder="Nickname" value="'+data.nickname+'" >'
						+'<small class="text-muted">昵称</small>'
						+'</fieldset>'

						//手机
						+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="gedit_phone" placeholder="Mobile phone" value="'+data.phone+'" >'
						+'<small class="text-muted">手机</small>'
						+'</fieldset>'
						
						//邮箱
						+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="gedit_email" placeholder="Emial" value="'+data.email+'" >'
						+'<small class="text-muted">邮箱</small>'
						+'</fieldset>'

						//性别
						+'<fieldset class="form-group">'
							+'<select class="form-control" id="gedit_sex">'
								+'<option value="0" '+((data.sex==0)?'selected':'')+' >保密</option>'
								+'<option value="1" '+((data.sex==1)?'selected':'')+' >男</option>'
								+'<option value="2" '+((data.sex==2)?'selected':'')+' >女</option>'
							+'</select>'
						+'<small class="text-muted">性别</small>'
						+'</fieldset>'

						//简介
						+'<fieldset class="form-group">'
							+'<textarea class="form-control" id="gedit_introduce" rows="3">'+data.introduce+'</textarea>'
						+'<small class="text-muted">简介</small>'
						+'</fieldset>'

					+'</div>'
				+'</div>'
				+'</div>';

			//底部
			var on="$(this).parents('.Black_bg').click()";
			var bottom='<div id="gedit_bottom" >'

				   		//取消按钮
				   		+'<div onclick="'+on+'" id="gedit_bottom_qs">取消</div>'

				   		//提交按钮
				   		+'<div id="gedit_bottom_tj">提交</div>'

				   +'</div>';

			col1.append(col1d);
			col2.append(col2d);

			//追加
			row.append(col1).append(col2);
			//追加
			box.append(top).append(row).append(bottom);

			//如果背景图或头像上传按钮被点击
			$('#gedit_bg_camera,#gedit_toux_camera').click(function(){

				var t=$(this);
				var bg=$('#gedit_'+$(this).attr('param'));

				//弹出上传框
				File_upload({

					Param:{types:'image/jpeg,image/png,image/gif'},

					fun:function(data,arr){

						//替换背景
						bg.attr('src',data[0].path);

						//准备参数
						var arr2={
							Action:'pro',
							Method:'_edit_tu',
							picid:data[0].id,
							type:t.attr('param')
						};

						//发送ajax
						$.ajax({
							data:arr2,
							success:function(data){

								if(data==3){

									Prompt('请先登录。');
									return;
								}

								if(data==1){

									Prompt('修改成功。');

									//清除缓存
									Clear_cache();

									//清除弹出框缓存
									$("#Eject").removeData('pro_xiug_edit');

									//刷新
									index('pro','','/pro');

									return;

								}

								if(data==2){

									//可能没修改
									return;
								}

								Prompt('未知错误。')

							},
							error:function(data){

								Prompt('连接服务器失败。');

							}
						})
					}
				});

			})


			//如果提交按钮被点击
			$('#gedit_bottom_tj').click(function(){

				var t=$(this);

				//防止再次点击
				if(t.attr('ajax'))return;

				//签名
				var qian=$('#gedit_qianm').val();

				//昵称
				var nickname=$('#gedit_nickname').val();

				//手机
				var phone=$('#gedit_phone').val();

				//邮箱
				var email=$('#gedit_email').val();

				//性别
				var sex=$('#gedit_sex').val();

				//简介
				var jj=$('#gedit_introduce').val();

				//如果没有邮箱
				if(!email){
					Prompt('邮箱没有填。');
					return;
				}

				//防止重复提交
				t.attr('ajax',1);

				//准备数据
				var arr={
					Action:'pro',
					Method:'_edit_user',
					slogan:qian,
					nickname:nickname,
					phone:phone,
					email:email,
					sex:sex,
					jj:jj,
				};

				//发送ajax
				$.ajax({
					data:arr,
					success:function(data){
						//成功时

						if(data==3){

							Prompt('请先登录。');
							t.removeAttr('ajax');
							return;

						}

						if(data=='email'){

							Prompt('邮箱不正确。');
							t.removeAttr('ajax');
							return;

						}

						if(data=='email2'){

							Prompt('邮箱重复。');
							t.removeAttr('ajax');
							return;

						}

						if(data=='phone'){

							Prompt('手机不正确。');
							t.removeAttr('ajax');
							return;

						}

						if(data=='phone2'){

							Prompt('手机重复。');
							t.removeAttr('ajax');
							return;

						}

						if(data==1){

							Prompt('修改成功。');

							//清除缓存
							Clear_cache();

							//清除弹出框缓存
							$("#Eject").removeData('pro_xiug_edit');

							//刷新
							index('pro','','/pro');

							t.removeAttr('ajax');
							return;

						}

						if(data==2){

							Prompt('没有要修改的。');
							t.removeAttr('ajax');
							return;

						}

						Prompt('修改失败。');
						t.removeAttr('ajax');

					},
					error:function(data){

						//失败时
						Prompt('与服务器通信失败。');
						t.removeAttr('ajax');

					}
				})

			})

		})

	})

}


//查看全部
function proall(data){

	var con=$("#Contents");		//主内容节点
	var col=$('<div id="pro_col_all" class="col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-10"></div>');

	var my_coll='';
	var coll='';
	var my_comm='';
	var comm='';

	//创建的收藏集
	if(data.my_coll){

		my_coll='<div class="row">'
			+'<div class="pro_all_title col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'拥有的收藏集'
			+'</div>'
			+'</div>'

			+'<div class="row">'
				+xq({coll:data.my_coll,name:data.name})
			+'</div>';

	}

	//关注的收藏集
	if(data.coll){

		coll='<div class="row">'
			+'<div class="pro_all_title col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'关注的收藏集'
			+'</div>'
			+'</div>'

			+'<div class="row">'
				+xq({coll:data.coll,name:data.name})
			+'</div>';

	}

	//创建的社区
	if(data.my_comm){

		my_comm='<div class="row">'
			+'<div class="pro_all_title col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'创建的社区'
			+'</div>'
			+'</div>'

			+'<div class="row">'
				+xq({coll:data.my_comm,name:data.name})
			+'</div>';

	}

	//关注的社区
	if(data.comm){

		comm='<div class="row">'
			+'<div class="pro_all_title col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'关注的社区'
			+'</div>'
			+'</div>'

			+'<div class="row">'
				+xq({coll:data.comm,name:data.name})
			+'</div>';

	}

	col.append(my_coll+coll+my_comm+comm);

	con.append(col);

}


//兴趣列表循环
function xq(data){

	var coll=data.coll;

	var xqlist=''

	for(var i=0;i<coll.length;i++){

		var colm=coll[i];

		if(!colm)break;

		if(colm.collid){
			//是收藏集
			//点击事件
			var on="return index('col','"+colm.collid+"','/col/"+colm.collid+"')";
			//a 链接
			var a='<a class="pro_xqlist pro_xqlist_coll" href="/col/'+colm.collid+'" onclick="'+on+'">';
			//副标题
			var fu=data.name;
			//背景色
			var bgc='style="background:'+colm.bg+'"';

		}else{
			//是社区
			//点击事件
			var on="return index('com','"+colm.commid+"','/com/"+colm.commid+"')";
			//a 链接
			var a='<a class="pro_xqlist" href="/com/'+colm.commid+'" onclick="'+on+'">';
			//副标题
			var fu=colm.members+' 个成员';
			//背景色
			var bgc='';

		}

		//头像循环
		var touxs='';
		var num=4;
		for(t in colm.touxs){
			touxs+='<img style="z-index:'+num+'" src="'+colm.touxs[t]+'">';
			num--;
		}

		xqlist+='<div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">'
			  //链接
			  +a
			  //图片
			  +'<div class="pro_imgbox">'
			  	+'<img src="'+colm.pic+'">'
			  +'</div>'

			  //头像等
			  +'<div '+bgc+' class="pro_toubox">'
			  	+'<div class="pro_touxbox">'
			  		//头像
			  		+touxs
			  		//标题
			  		+'<div class="pro_toutitle">'
			  			+colm.title
			  		+'</div>'
			  		//副标题
			  		+'<div class="pro_toufu">'
			  			+fu
			  		+'</div>'

			  	+'</div>'
			  +'</div>'

			  +'</a>'
			  +'</div>';

	}

	return xqlist;

}


//人脉页
function peoContents(data,param){

	//找人页面
	if(!param)return peo_people(data,param);

	//已关注页面
	if(param=='circles'){

		//圈子
		peo_circles(data,param);

		peo_people(data,param);

		return;
	}

	//关注者页面
	if(param=='haveyou'){

		//如果没有关注的人
		if(data.length==0){
			$('#Contents').html('<div class="no_haveyou col-sm-12">目前没有任何关注者。<br>关注你的人将会显示在此处。</div>')
			return;
		}

		return peo_people(data,param);

	}

}

//找人页面
function peo_people(datas,param){
	//找人页面

	//用户信息
	var data=datas.users;

	//主内容box
	var con=$('#Contents');

	//盒子
	var box=$('<div class="row"></div>');
	var box2=$('<div id="people_box" class="col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-10" ></div>');

	//标题
	var title='人员推荐';
	if(param=='circles'){
		var num=0;
		for(k in data)
			num++
		title='已关注 '+num;

	}else if(param=='haveyou')
		title='';

	if(title){
		var tit='<div class="row">'
			+'<div class="people_box2 col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-10">'
				+title
			+'</div>'
			+'</div>';
	}else{
		var tit='';
	}
	

	box2.append(tit).append(box);

	for(k in data){

		//人的box
		var peo=$('<div class="people_p_box col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3"></div>');

		//人的链接
		var on="return index('pro','"+data[k].id+"','/pro/"+data[k].id+"')"
		var a=$('<a onclick="'+on+'" class="people_p_a" href="/pro/'+data[k].id+'"></a>');

		//人的姓名
		var name=$('<div class="people_p_name">'+data[k].name+'</div>');

		//人的签名
		var qian=$('<div class="people_p_qian">'+data[k].qian+'</div>');

		//人的头像
		var tou=$('<img class="people_p_tou" src="'+data[k].toux+'" >');

		//关注按钮
		if(data[k].guanz==1){

			//关注
			guanz=$('<div state="1" uid="'+data[k].id+'" uname="'+data[k].name+'" class="people_p_guanz">关注</div>');

		}else if(data[k].guanz==2){

			//取消关注
			guanz=$('<div state="2" uid="'+data[k].id+'" uname="'+data[k].name+'" class="people_p_guanz" class="pro_guanz">已关注</div>');

		}

		//关注、取消关注按钮被点击
		guanz.click(function(e){

			e.stopPropagation();	//阻止事件冒泡

			//状态 关注、取消关注
			var state=$(this).attr('state');

			var t=$(this);

			if(state==1){
				//关注
				$(this).html('已关注');
				//把状态改成 2
				$(this).attr('state',2);

				//发送ajax
				$.ajax({

					data:{
						Action:'pro',
						Method:'_follow_do',
						uid:$(this).attr('uid')
					},
					success:function(data){
						if(data==1){
							Prompt('已经取消关注。');
							//取消关注
							t.html('关注');
							//把状态改成 1
							t.attr('state',1);
							//清除缓存
							Clear_cache('/peo');
							Clear_cache('/pro/'+t.attr('uid'));
							Clear_cache('/peo/circles');
							return;
						}else if(data==2){
							Prompt('已关注。');
							//关注
							t.html('已关注');
							//把状态改成 2
							t.attr('state',2);
							//清除缓存
							Clear_cache('/peo');
							Clear_cache('/peo/'+t.attr('uid'));
							Clear_cache('/peo/circles');
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

				return false;

			}

			//弹出框
			var h=datas.quans.length*50+160;
			Popup({
				Id:'circles_box',
				Noajax:1,
				Width:-1,
				Height:((h>$(window).height()-40)?$(window).height()-40:h)
			},function(data,arr){

				//如果是删除弹出框
				if(data=='remove')return;

				//创建div
				circles_bo(datas,t);

				var tt=t;

				//不再关注被点击
				$('.circles_box_circle_no').click(function(){

					var t=$(this);

					//隐藏弹出框
					t.parents('.Black_bg').click();

					//发送ajax
					$.ajax({

						data:{
							Action:'pro',
							Method:'_follow_do',
							uid:$(this).attr('uid')
						},
						success:function(data){
							if(data==1){
								Prompt('已经取消关注。');

								//清除缓存
								Clear_cache('/peo');
								Clear_cache('/pro/'+t.attr('uid'));
								Clear_cache('/peo/circles');

								tt.parents('.people_p_box').remove();

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

				})

				//如果圈子被点击
				$('.circles_box_circle').click(function(){

					var t=$(this);

					if(t.hasClass("circles_box_circle_now"))return;

					//圈子id
					var cid=t.attr('cid');

					//用户id
					var uid=t.attr('uid');

					//以前的圈子id
					var old_cid=t.parents('#circles_box').find('.circles_box_circle_now').attr('cid');

					//隐藏弹出框
					t.parents('.Black_bg').click();

					var arr={
						Action:'peo',
						Method:'_circle_move',
						cid:cid,	//圈子id
						uid:uid,	//用户id
						ocid:old_cid	//以前的圈子id
					}

					//发送ajax
					$.ajax({
						data:arr,
						success:function(data){

							if(!data){
								Prompt('与服务器通信失败。');
								return;
							}

							//清除缓存
							Clear_cache('/peo');
							Clear_cache('/pro/'+t.attr('uid'));
							Clear_cache('/peo/circles');

							if(location.pathname=='/peo/circles'){
								
								//刷新
								index('peo','circles','/peo/circles');

							}else{
								datas.quans=data;
							}
							

							Prompt('修改成功。');

						},
						error:function(data){
							Prompt('与服务器通信失败。');
						}
					})

				})

			})

			return false;
		})


		a.append(tou).append(name).append(qian).append(guanz);

		//追加
		peo.append(a);
		box.append(peo);

	}

	con.prepend(box2);

}


//圈子信息
function peo_circles(data,param){

	//主内容区
	var con=$("#Contents");

	var str='<div class="peo_circles_box_t col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-10">'
		+'<div class="row">'
			+'你的圈子'
		+'</div>'
		+'</div>';

	//循环圈子列表
	var quans=data.quans;
	var quan='';
	for(k in quans){

		var foll='';
		//如果圈子内有人
		if(quans[k].follow){
			//转成数组
			//圈子内人的id数组
			var wid=quans[k].follow;

			for(kk in wid){

				var on="return index('pro','"+wid[kk].id+"','/pro/"+wid[kk].id+"')";

				foll+='<div class="peo_circles_row3_box col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
						//头像
						+'<img class="peo_circles_row3_toux" src="'+wid[kk].toux+'">'
						//名字
						+'<a onclick="'+on+'" href="/pro/'+wid[kk].id+'" class="peo_circles_row3_name">'
							+wid[kk].name
						+'</a>'
						//按钮
						+'<div uname="'+wid[kk].name+'" uid="'+wid[kk].id+'" class="peo_circles_row3_name2">'+quans[k].name+'</div>'
						
					+'</div>';
			}
			
		}

		quan+='<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
			+'<div class="row peo_circles_row">'

				//标题
				+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'<div class="row peo_circles_row2">'

					//图标
					+'<i class="peo_circles_row2_i fa fa-dot-circle-o fa-2x" aria-hidden="true"></i>'

					//标题
					+'<div class="peo_circles_row2_name">'
						+quans[k].name
						//副标题
						+'<span> '+quans[k].follownum+' 人</span>'
					+'</div>'

					//按钮
					+'<i cid="'+quans[k].id+'" class="peo_circles_row2_i2 fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>'

				+'</div>'
				+'</div>'

				//隐藏的内容
				+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				+'<div class="row peo_circles_row3 ">'

					+foll

				+'</div>'
				+'</div>'

			+'</div>'
			+'</div>';

	}

	//圈子的box
	var box='<div class="peo_circles_box col-xs-12 col-sm-12 col-md-11 col-lg-12 col-xl-10">'

		   		+'<div class="row">'
		   			+quan
		   		+'</div>'

		   		+'<div class="row">'
		   		+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'
		   			+'<div class="peo_circles_new">新建圈子</div>'
		   		+'</div>'
		   		+'</div>'

		   +'</div>';

	con.append(str).append(box);

	//如果圈子标题被点击
	$('.peo_circles_row2').click(function(){
		$(this).parents('.peo_circles_row').find('.peo_circles_row3').slideToggle();
	})

	//如果要修改圈子
	$('.peo_circles_row3_name2').click(function(){

		var t=$(this);
		var h=data.quans.length*50+160;
		//弹出框
		Popup({
			Id:'circles_box',
			Noajax:1,
			Width:-1,
			Height:((h>$(window).height()-40)?$(window).height()-40:h)
		},function(dat,arr){

			circles_bo(data,t);

		})

		//	圈子被点击
		$('.circles_box_circle').click(function(){

			var t=$(this);

			if(t.hasClass("circles_box_circle_now"))return;

			//圈子id
			var cid=t.attr('cid');

			//用户id
			var uid=t.attr('uid');

			//以前的圈子id
			var old_cid=t.parents('#circles_box').find('.circles_box_circle_now').attr('cid');

			//隐藏弹出框
			t.parents('.Black_bg').click();

			var arr={
				Action:'peo',
				Method:'_circle_move',
				cid:cid,	//圈子id
				uid:uid,	//用户id
				ocid:old_cid	//以前的圈子id
			}

			//发送ajax
			$.ajax({
				data:arr,
				success:function(data){

					if(!data){
						Prompt('与服务器通信失败。');
						return;
					}

					Prompt('修改成功。');

					//清除缓存
					Clear_cache('/peo');
					Clear_cache('/pro/'+t.attr('uid'));
					Clear_cache('/peo/circles');

					//刷新
					index('peo','circles','/peo/circles');

				},
				error:function(data){
					Prompt('与服务器通信失败。');
				}
			})

		})

		//不在关注被点击
		$('.circles_box_circle_no').click(function(){
			//隐藏提示框
			$(this).parents('.Black_bg').click();

			//发送ajax
			$.ajax({

				data:{
					Action:'pro',
					Method:'_follow_do',
					uid:t.attr('uid')
				},
				success:function(data){
					if(data==1){
						Prompt('已经取消关注。');

						//清除缓存
						Clear_cache('/peo');
						Clear_cache('/pro/'+t.attr('uid'));
						Clear_cache('/peo/circles');

						t.parents('.peo_circles_row3_box').remove();

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

		})
		
	})

	//新建圈子被点击
	$('.peo_circles_new').click(function(){

		//弹出框
		Popup({
			Id:'peo_circles_new',
			Noajax:1,
			Width:-1,
			Height:200
		},function(data,arr){

			//box
			var box=$('#peo_circles_new');

			var str='<div class="row">'
				+'<div id="circles_new_top" class="col-sm-12">'
					+'新建圈子'
				+'</div>'
				+'</div>'

				+'<div class="row">'
				+'<div id="circles_new_con" class="col-sm-12">'
					+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="circles_new_name" placeholder="Name">'
						+'<small class="text-muted">为此圈子命名</small>'
					+'</fieldset>'
				+'</div>'
				+'</div>'

				+'<div class="row">'
				+'<div id="circles_new_bottom" class="col-sm-12">'

					+'<div class="circles_new_cj">创建</div>'
					+'<div class="circles_new_qs">取消</div>'
					
				+'</div>'
				+'</div>';

			box.append(str);
			
			//绑定事件
			add_edit_circle();

		})

	})


	//修改图标被点击
	$('.peo_circles_row2_i2').click(function(e){

		//阻止冒泡
		e.stopPropagation();

		var t=$(this);

		var d={};

		for(k in quans){
			//找到相关圈子数据
			if(quans[k].id==t.attr('cid')){
				d=quans[k];
			}
		}

		//弹出框
		Popup({
			Id:'peo_circles_new',
			Noajax:1,
			Width:-1,
			Height:200
		},function(data,arr){

			//
			var box=$('#peo_circles_new');

			var str='<div class="row">'
				+'<div id="circles_new_top" class="col-sm-12">'
					+'修改圈子'
				+'</div>'
				+'</div>'

				+'<div class="row">'
				+'<div id="circles_new_con" class="col-sm-12">'
					+'<fieldset class="form-group">'
						+'<input type="text" class="form-control" id="circles_new_name" placeholder="Name" value="'+d.name+'" >'
						+'<small class="text-muted">为此圈子命名</small>'
					+'</fieldset>'
				+'</div>'
				+'</div>'

				+'<div class="row">'
				+'<div id="circles_new_bottom" class="col-sm-12">'

					+'<div cid="'+d.id+'" class="circles_new_sc"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除圈子</div>'
					+'<div class="circles_new_cj">修改</div>'
					+'<div class="circles_new_qs">取消</div>'
					
				+'</div>'
				+'</div>';


			box.append(str);

			//绑定事件
			add_edit_circle(d.id);

			//删除圈子被点击
			$('.circles_new_sc').click(function(){

				var t=$(this);
				var arr={
					Action:'peo',
					Method:'_del_circle',
					cid:t.attr('cid')
				};
				//发送ajax
				$.ajax({
					data:arr,
					success:function(data){

						if(data==1){

							//隐藏框
							t.parents('.Black_bg').click();

							//清除缓存
							Clear_cache();

							//刷新
							index('peo','circles','/peo/circles');

							Prompt('删除成功');
							return;

						}

						if(data==2){

							Prompt('删除失败');
							return;

						}

						if(data==3){

							Prompt('请先移除圈子内用户');
							return;

						}

						if(data==4){

							//隐藏框
							t.parents('.Black_bg').click();

							Prompt('更新用户信息失败');
							return;

						}

						Prompt('与服务器通信失败。');

					},
					error:function(data){
						Prompt('与服务器通信失败。');
					}
				})

			})

		})

		
	})

}


//创建 修改用户的圈子div
function circles_bo(datas,t){

	//盒子
	var box=$('#circles_box');

	//顶部
	var top='<div class="row">'
		   +'<div id="circles_box_top" class="col-sm-12">'
		   		+t.attr('uname')
		   +'</div>'
		   +'</div>';

	//循环圈子
	var circles=datas.quans;
	var quan='';
	var now2;	//判断用户是否已经在圈子中
	for(k in circles){

		//圈子内用户ID列表
		var now='';
		var ren=circles[k].followid;
		if(ren){
			ren=ren.split(',');
			for(kk in ren){
				if(ren[kk]==t.attr('uid')){
					//用户在这个圈子中
					now='<i class="fa fa-check" aria-hidden="true"></i> ';
					now2=1;		
				}
			}
		}


		quan+='<div class="row">'
			+'<div cid="'+circles[k].id+'" uid="'+t.attr('uid')+'" class="'+((now)?'circles_box_circle_now':'')+' circles_box_circle col-sm-12">'
				+now
				+circles[k].name
			+'</div>'
		    +'</div>';

	}

	if(now2!=1){
		now='<i class="fa fa-check" aria-hidden="true"></i> ';
	}else{
		now='';
	}

	quan+='<div class="row">'
			+'<div cid="" uid="'+t.attr('uid')+'" class="'+((now)?'circles_box_circle_now':'')+' circles_box_circle col-sm-12">'
				+now
				+'已关注'
			+'</div>'
		    +'</div>';

	quan+='<div class="row">'
			+'<div uid="'+t.attr('uid')+'" class="circles_box_circle_no col-sm-12">'
				+'<i class="fa fa-close" aria-hidden="true"></i> '
				+'不再关注'
			+'</div>'
		    +'</div>';

	box.append(top).append(quan);

}

//添加 修改圈子的事件
function add_edit_circle(cid=''){

	//取消被点击
	$('.circles_new_qs').click(function(){
		//隐藏框
		$(this).parents('.Black_bg').click();

	})

	//如果文本框内容被改变
	$('#circles_new_name').keyup(function(){
		//如果有内容
		if($(this).val()){

			$(this).parents('#peo_circles_new').find('.circles_new_cj').addClass('circles_new_cj_on');

		}else{

			$(this).parents('#peo_circles_new').find('.circles_new_cj').removeClass('circles_new_cj_on');

		}
	})

	//创建按钮被点击
	$('.circles_new_cj').click(function(){

		var t=$(this);

		if(!t.hasClass('circles_new_cj_on'))return;

		var arr={
			Action:'peo',
			Method:'_add_circle',
			name:$('#circles_new_name').val()
		};

		if(cid){

			arr.Method='_edit_circle';
			arr.cid=cid;

		}

		//发送ajax
		$.ajax({

			data:arr,
			success:function(data){

				if(data==1){

					//隐藏框
					t.parents('.Black_bg').click();

					if(!cid){
						Prompt('创建成功。');
					}else{
						Prompt('修改成功。');
					}
					

					//清除缓存
					Clear_cache();

					//刷新
					index('peo','circles','/peo/circles');

					return;

				}else if(data==2){

					if(!cid){
						Prompt('创建失败。');
					}else{
						Prompt('修改失败。');
					}

					return;

				}

				Prompt('与服务器通信失败。');

			},
			error:function(data){
				Prompt('与服务器通信失败。');
			}

		})

	})


}
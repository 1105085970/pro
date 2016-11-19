
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
		  				+'<div id="pro_fans">'+data.fans+' 位关注者</div>'
		  			+'</div>'

		  			//关注、取消关注、修改资料按钮
		  			+guanz

		  		+'</div>'
		  		+'</div>'
		  		+'</div>'

		  +'</div>'
		  +'</div>';

	//用户兴趣
	var coll=data.coll;
	var xqlist='';	//兴趣列表
	for(var i=0;i<4;i++){

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

	var interests='<div class="row">'
		+'<div id="pro_xqbox" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

			+'<div class="row">'
			+'<div id="pro_xqname" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">'

				+data.name+'的兴趣主题'
				+'<div id="pro_xqqb" href="">查看全部</div>'

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
			//关注
			$(this).html('取消关注');
			//添加背景变透明的类
			$(this).addClass('pro_guanz');
			//把状态改成 2
			$(this).attr('state',2);

		}else if(state==2){
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
					return;
				}else if(data==2){
					//关注
					t.html('取消关注');
					//添加背景变透明的类
					t.addClass('pro_guanz');
					//把状态改成 2
					t.attr('state',2);
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

}

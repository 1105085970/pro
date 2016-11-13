
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
					}
					//如果登录失败
					ts.html('密码错误。');
					ts.slideDown();
					//让按钮可以被点击
					t.removeAttr('disabled');
					//获得焦点
					pass.focus();
				},
				error:function(){
					//如果请求失败
					ts.html('与服务器通信失败。');
					ts.slideDown();
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

				},
				error:function(data){
					//出现错误
					var cuo=data.responseJSON;
					var ti='';
					//如果name有错
					if(cuo.name)ti+='用户名不合法。';
					//如果eamil有错
					if(cuo.email)ti+='必须是一个有效的电子邮件地址。';
					//如果pass有错
					if(cuo.pass)ti+='密码至少6位，字母数字下划线';
					ts.html(ti);
					ts.slideDown();
					//允许提交按钮被点击
					t.removeAttr('disabled');
				}

			});

		});

	},

	re_danger:function(t){
		//移除红色边框
		t.parent().removeClass("has-danger");
		//移除红色叉
		t.removeClass("form-control-danger");
		//添加绿色边框
		t.parent().addClass("has-success");
		//添加绿色对号
		t.addClass("form-control-success");
	},

	add_danger:function(t){
		//添加红色边框
		t.parent().addClass("has-danger");
		//添加红色叉
		t.addClass("form-control-danger");
	}

};

$(function(){
	if($("#login").length)login.index();
});

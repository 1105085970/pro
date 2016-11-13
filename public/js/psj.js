
//登录页对象
var login={

	index:function(){

		//显示当前的框 第二个
		$(".login_box_mbox:eq(1)").animate({'opacity':'1'},200);

		//如果密码中的后退按钮被点击
		$("#back_email").click(function(){
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
						return;
					}
					//找到了
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
				data:{Action:'log',Method:'_sign_in',email:email.val(),pass:pass.val()},
				success:function(data){
					
				}
			});


		});

	},

	re_danger:function(t){
		//移除红色边框
		t.parent().removeClass("has-danger");
		//移除红色叉
		t.removeClass("form-control-danger");
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

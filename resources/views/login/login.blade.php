<!DOCTYPE html>
<html>
<head>
	<title>Google+</title>
	{{-- 引入公共文件 --}}
	@include('public')
</head>
<body style="background: #fff">

	{{-- 全宽容器 --}}
	<div class="container-fluid" id="login">

		{{-- LOGO --}}
		<div class="row">
			<div class="col-sm-12">
				<img id="login_logo" src="/images/logo.png" class="rounded mx-auto d-block" >
			</div>
		</div>

		{{-- 一个帐户，畅享 Google 所有服务！ --}}
		<div class="row">
			<div class="col-sm-12" id="login_h1">
				一个帐户，畅享 Google 所有服务！
			</div>
		</div>

		{{-- 登录帐户继续使用 Google+ --}}
		<div class="row hidden-xs-down">
			<div class="col-sm-12" id="login_h2">
				登录帐户继续使用 Google+
			</div>
		</div>

		{{-- 登录大框 --}}
		<div class="row flex-items-xs-center">
			<div class="col-xs-7 col-sm-6 col-md-5 col-lg-4 col-xl-3" id="login_box">
				<div id="login_box_dbox">
					<div class="login_box_mbox">

						{{-- 后退按钮 --}}
						<i id="back_create" class="fa fa-angle-right fa-2x" aria-hidden="true"></i>

						{{-- 表单 --}}
						<div class="input-group" style="margin-bottom: 10px">
							<input id="zc_name" type="text" patt="^[A-z0-9]+$" cuo="用户名任意长度字母数字。" class="form-control" placeholder="用户名" aria-describedby="basic-addon1" >
						</div>
						<div class="input-group" style="margin-bottom: 10px">
							<input id="zc_email" type="text" patt="^[A-z0-9]+@[a-z0-9]+(\.[a-z]+){1,2}$" cuo="邮箱不正确。" class="form-control" placeholder="邮箱" aria-describedby="basic-addon1" >
						</div>
						<div class="input-group" style="margin-bottom: 10px">
							<input id="zc_pass" type="password" patt="^[A-z0-9\.]{6,}$" cuo="密码至少6位，字母数字下划线" class="form-control" placeholder="密码" aria-describedby="basic-addon1" >
						</div>
						<div class="input-group">
							<input id="zc_pass2" type="password" patt="^[A-z0-9\.]{6,}$" cuo="密码至少6位，字母数字下划线" class="form-control" placeholder="确认密码" aria-describedby="basic-addon1" >
						</div>
						{{-- 提示 --}}
						<div class="login_box_tishi"></div>
						{{-- 注册 --}}
						<button id="zc_button" type="button" >注册</button>

					</div>
					<div class="login_box_mbox">

						{{-- 头像 --}}
						<img src="/images/toux.png" class="login_box_toux rounded mx-auto d-block" >
						{{-- 表单 --}}
						<div class="input-group">
							<input id="email" type="text" class="form-control" placeholder="输入您的电子邮件地址" aria-describedby="basic-addon1" autocomplete="off" autofocus>
						</div>
						{{-- 提示 --}}
						<div class="login_box_tishi"></div>
						{{-- 下一步 --}}
						<button id="email_button" type="button" >下一步</button>
						<div style="text-align: right;"><a href="">找回我的帐户</a></div>

					</div>
					<div class="login_box_mbox">

						{{-- 后退按钮 --}}
						<i id="back_email" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>

						{{-- 头像 --}}
						<img id="password_toux" moren="/images/toux.png" style="margin-bottom:10px;" src="/images/toux.png" class="login_box_toux rounded mx-auto d-block" >
						{{-- 用户名 --}}
						<p id="password_username">dfdsf</p>
						{{-- 邮箱 --}}
						<p id="password_email">dfdsf</p>
						{{-- 表单 --}}
						<div class="input-group">
							<input id="password" type="password" class="form-control" placeholder="密码" aria-describedby="basic-addon1">
						</div>
						{{-- 提示 --}}
						<div class="login_box_tishi"></div>
						{{-- 登录 --}}
						<button id="password_button" type="button" >登录</button>
						<div style="color: #404040;font-size: 13px;">
							<label><input id="remember" value="remember" type="checkbox" checked> 保持登录状态</label>
							<a style="float:right" href="">忘记了密码？</a>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div style="text-align:center;margin-top:22px;"><a id="create_user" href="">创建帐户</a></div>

	</div>

</body>
</html>
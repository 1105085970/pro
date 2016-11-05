<!DOCTYPE html>
<html>
<head>
	<title>加载中</title>
	{{-- CSRF保护 --}}
	<meta name="csrf-token" content="{{ csrf_token() }}" url="/ajax">

	{{-- 引入jQuery --}}
	<script type="text/javascript" src="/js/jquery-3.1.1.min.js"></script>

	{{-- 引入Bootstrap --}}
	<link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
	<script type="text/javascript" src="/js/bootstrap.min.js"></script>

	{{-- 引入我首页的js、css逻辑 --}}
	<link rel="stylesheet" type="text/css" href="/css/index.css">
	<script type="text/javascript" src="/js/index.js"></script>

	{{-- 首次加载自动发送ajax --}}
	<script type="text/javascript">
		$(function(){
			index('{{$U1}}','{{$U2}}','{{$U3}}');
		});
	</script>

	{{-- 禁止缩放 --}}
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	{{-- IE兼容性模式 --}}
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

</head>
<body>
	{{-- 全宽容器 --}}
	<div class="container-fluid">
  		<div class="row">

  			{{-- 顶部 --}}
			<div id="top">
     			
     			{{-- 搜索框等 --}}
				<div id="search">
				</div>

				{{-- 一些子类别 --}}
				<div id="subclass">
				</div>

    		</div>
    	</div>

    	<div id="contents" class="row">
    		
    	</div>
  		
	</div>
</body>
</html>
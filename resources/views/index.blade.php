<!DOCTYPE html>
<html>
<head>
	<title>加载中</title>
	{{-- 引入公共文件 --}}
	@include('public')

	{{-- 首次加载自动发送ajax --}}
	<script type="text/javascript">
		$(function(){
			index('{{$Action}}','{{$Param}}');
		});
	</script>

</head>
<body>
	{{-- 全宽容器 --}}
	<div class="container-fluid">

		{{-- 顶部 --}}
		<div id="Top">
				
			{{-- 搜索框等 --}}
			<div id="N_S_S">
				{{-- 导航按钮 --}}
				<div id="NavBut">
					<i class="fa fa-bars fa-lg" aria-hidden="true"></i>
				</div>

				{{-- 网站名 --}}
				<div id="SiteName" >
					<a href="/">Google+</a>
					<div id="CatName" ></div>
				</div>

				{{-- 搜索框 --}}
				<div id="Search">
				</div>
				
			</div>

			{{-- 一些子类别 --}}
			<div id="SubClass">
			</div>

		</div>

    	<div id="Contents" class="row">
    		
    	</div>
  		
	</div>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
	<title>加载中</title>
	{{-- 引入公共文件 --}}
	@include('public')

	{{-- 首次加载自动发送ajax --}}
	<script type="text/javascript">
		$(function(){
			index('{{$Action}}','{{$Param}}','{{$Url}}');
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
					<a href="/" class="hidden-xs-down">Google+</a>
					<div id="CatName" class="hidden-xs-down" ></div>
					<div id="CatName2" class="hidden-sm-up" ></div>
				</div>

				{{-- 搜索框 --}}
				<div id="Search" class="hidden-md-down col-sm-6 Search" >
				</div>
				{{-- 搜索图标 --}}
				<i id="Searchmin" class="fa fa-search fa-lg hidden-lg-up Search" aria-hidden="true" onclick="index('sea','','/sea')"></i>
				
			</div>

			{{-- 一些子类别 --}}
			<div id="SubClass" class="row">
			</div>

		</div>

		{{-- 左侧导航 --}}
		<div id="Navigation" class="hidden-sm-down"></div>

		<div id="Contentsbox" class="row">
			<div class="col-sm-3 col-lg-2 col-xl-2 hidden-sm-down"></div>
			<div class="col-md-9 col-sm-12 col-lg-10 col-xl-10">
		    	<div id="Contents" class="row">	
		    	</div>
	    	</div>
    	</div>
  		
	</div>
</body>
</html>

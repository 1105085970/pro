{{-- CSRF保护 --}}
<meta name="csrf-token" content="{{ csrf_token() }}" url="/ajax">

{{-- 引入jQuery --}}
<script type="text/javascript" src="/js/jquery-3.1.1.min.js"></script>
<script src="/js/jquery.form.min.js" type="text/javascript"></script>
{{-- 引入Bootstrap --}}
<link rel="stylesheet" type="text/css" href="/css/bootstrap-flex.min.css">
{{--<script type="text/javascript" src="/js/bootstrap.min.js"></script>--}}

{{-- 引入图标字体 --}}
<link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css">

{{-- 引入我首页的js、css逻辑 --}}
<link rel="stylesheet" type="text/css" href="/css/index.css">
<script type="text/javascript" src="/js/index.js"></script>

{{-- 引入三人的js、css逻辑 --}}
{{-- 裴思佳 --}}
<link rel="stylesheet" type="text/css" href="/css/psj.css">
<script type="text/javascript" src="/js/psj.js"></script>
{{-- 王如鹤 --}}
<link rel="stylesheet" type="text/css" href="/css/wrh.css">
<script type="text/javascript" src="/js/wrh.js"></script>
{{-- 王保 --}}
<link rel="stylesheet" type="text/css" href="/css/wb.css">
<script type="text/javascript" src="/js/wb.js"></script>

{{-- 禁止缩放 --}}
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

{{-- IE兼容性模式 --}}
<meta http-equiv="X-UA-Compatible" content="IE=edge">
@extends('layout.layout')

@section('container')
<link href="/admins/zhuye/css/public.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/admins/zhuye/js/jquery.min.js"></script>
<script type="text/javascript" src="/admins/zhuye/js/global.js"></script>
</head>
<body>

 <div id="index" class="mainBox" style="padding-top:18px;height:auto!important;height:550px;min-height:550px;">

   <table width="100%" border="0" cellspacing="0" cellpadding="0" class="indexBoxTwo" >
    <tr>
     <td width="65%" valign="top" class="pr">
      <div class="indexBox">
       <div class="boxTitle">网站基本信息</div>
       <ul>
        <table width="100%" border="0" cellspacing="0" cellpadding="7" class="tableBasic">
         <tr>
          <td width="120">单页面数：</td>
          <td><strong>5</strong></td>
          <td width="100">文章总数：</td>
          <td><strong>20</strong></td>
         </tr>
         <tr>
          <td>超级管理员：</td>
          <td><strong>裴思佳</strong></td>
          <td>系统语言：</td>
          <td><strong>中文</strong></td>
         </tr>
         <tr>
          <td>编辑器：</td>
          <td><strong>Sublime</strong></td>
          <td>编码：</td>
          <td><strong>UTF-8</strong></td>
         </tr>
         <tr>
          <td>laravel 版本：</td>
          <td><strong>Laravel Framework version 5.1.45 (LTS)</strong></td>
          <td>项目开启时间：</td>
          <td><strong>2016-11-21</strong></td>
         </tr>
        </table>
       </ul>
      </div>
     </td>
     <td valign="top" class="pl">
      <div class="indexBox">
       <div class="boxTitle">管理员  本次登录记录</div>
       <ul>
        <table width="100%" border="0" cellspacing="0" cellpadding="7" class="tableBasic">
         <tr>
          <th width="45%">管理员地址</th>
          <th width="55%">操作时间</th>
         </tr>
                  <tr>
          <td align="center">{{$_SERVER['SERVER_ADDR']}}</td>
          <td align="center">{{date("Y-m-d H:i:s",time())}}</td>
         </tr>
		</table>
       </ul>
      </div>
     </td>
    </tr>
   </table>
   <div class="indexBox">
    <div class="boxTitle">服务器信息</div>
    <ul>
     <table width="100%" border="0" cellspacing="0" cellpadding="7" class="tableBasic">
      <tr>
       <td width="120" valign="top">PHP 版本：</td>
       <td valign="top">5.6.19 </td>
       <td width="100" valign="top">MySQL 版本：</td>
       <td valign="top">5.7.11</td>
       <td width="100" valign="top">服务器操作系统：</td>
       <td valign="top">WINNT(127.0.0.1)</td>
      </tr>
      <tr>
       <td valign="top">文件上传限制：</td>
       <td valign="top">8M</td>
       <td valign="top">GD 库支持：</td>
       <td valign="top">是</td>
       <td valign="top">Web 服务器：</td>
       <td valign="top">Apache/2.4.18 (Win64)</td>
      </tr>
     </table>
    </ul>
   </div>
   <div class="indexBox">
    <div class="boxTitle">系统开发</div>
    <ul>
     <table width="100%" border="0" cellspacing="0" cellpadding="7" class="tableBasic">
      <tr>
       <td width="120"> Google+： </td>
       
      </tr>
      <tr>
       
      </tr>
      <tr>
       <td> 贡献者：</td>
       <td>裴思佳，王如鹤，王保</td>
      </tr>
      <tr>
       <td> 系统使用协议： </td>
       <td>我们不是码农</td>
      </tr>
     </table>
    </ul>
   </div>
    
  </div>
 </div>
 <div class="clear"></div>
<div id="dcFooter">
 <div id="footer">
  <div class="line"></div>
  <ul>
   版权所有 ©王保，王如鹤，裴思佳
  </ul>
 </div>
</div><!-- dcFooter 结束 -->
<div class="clear"></div> </div>


</body>
</html>
     
@endsection
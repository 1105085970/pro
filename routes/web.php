<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/


//后台登录
Route::get('/admin/login','admin\AdminController@login');
Route::post('/admin/logindo','admin\AdminController@logindo');
//注销
Route::get('/admin/logout','admin\AdminController@logout');


Route::group(['prefix'=>'admin','middleware'=>'login'],function(){ //网站后台GET路由
//后台主页 
Route::get('/','admin\AdminController@index'); //用户模块（新增管理员）
Route::get('/user','admin\user\UserController@add');
Route::post('/user','admin\user\UserController@insert'); 
//更改用户状态ajax接口
Route::post('/user/editstate','admin\user\UserController@editState'); 

//用户列表
Route::get('/user/index','admin\user\UserController@index'); 
//用户详情
Route::get('/user/xiangqing/{targetid}','admin\user\UserController@xiangqing'); 
//圈子列表
Route::get('/circles/index','admin\circles\CirclesController@index'); 
Route::post('/circles/index','admin\circles\CirclesController@index'); 
//收藏集列表
Route::get('/collections/index','admin\collections\CollectionsController@index'); 
Route::post('/collections/index','admin\collections\CollectionsController@index'); 
//社区
 Route::get('/communities/index','admin\communities\CommunitiesController@index'); 
Route::post('/communities/index','admin\communities\CommunitiesController@index'); 

//帖子
Route::get('/posts/index','admin\posts\PostsController@index'); 
Route::post('/posts/index','admin\posts\PostsController@index'); 
Route::get('/posts/xiangqing','admin\posts\PostsController@xiangqing'); 

 
});




//登录页GET路由
Route::get('/log','LogController@Index');

//注销GET路由
Route::get('/logout','LogController@Logout');

Route::post('/col/PostcharuCollImg','ColController@PostcharuCollImg');
Route::post('/col/PostxgCollImg/','ColController@PostxgCollImg');
Route::post('/com/PostxgCommImg/','ComController@PostxgCommImg');
Route::post('/com/pimg/','ComController@Postpimg');
//首页GET路由
Route::get('/{U1?}/{U2?}/{U3?}/{U4?}', 'IndexController@Index');

//首页ajax路由
Route::post('/ajax','IndexController@Ajax');

//返回文件路由
Route::get('/files/{a}/{b}/{c}/{d}/{e}', 'HomController@Files');


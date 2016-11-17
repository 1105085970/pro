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

 
});




//登录页GET路由
Route::get('/log','LogController@Index');

//注销GET路由
Route::get('/logout','LogController@Logout');

//首页GET路由
Route::get('/{U1?}/{U2?}/{U3?}/{U4?}', 'IndexController@Index');

//首页ajax路由
Route::post('/ajax','IndexController@Ajax');


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

//网站后台GET路由
Route::get('/admin',function(){
	return '后台';
});

//登录页GET路由
Route::get('/log','LogController@Index');

//首页GET路由
Route::get('/{U1?}/{U2?}/{U3?}/{U4?}', 'IndexController@Index');

//首页ajax路由
Route::post('/ajax','IndexController@Ajax');


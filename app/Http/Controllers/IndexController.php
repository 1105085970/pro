<?php

/**
* 类名 IndexController
*
* 类描述 网站基本框架控制器，所有ajax控制器
*
* @author 王保<1105085970@qq.com>
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
	/*
	所有类别
	hom home 首页
	pos posts 文章
	sea search 搜索
	col Collections 收藏集
	com Communities 社区
	pro Profile 	资料
	peo People		人
	not Notifications 通知
	set Settings 	设置
	*/
	public $Category=['hom','pos','sea','col','com','pro','peo','not','set'];

    //首页控制器
    public function Index($U1='hom',$U2='',$U3=''){
    	
    	$arr=$this->Category;

    	//判断用户访问的url中有没有这个预定类别，没有返回404。
    	if(!in_array($U1, $arr))return view('errors.404');

    	//存在返回主页视图
    	$arr=[
    		'U1'=>$U1,
    		'U2'=>$U2,
    		'U3'=>$U3
    	];
    	return view('index',$arr);

    }

    //首页ajax请求
    public function Ajax(Request $request){

    	//如果Post
    	$arr=$this->Category;
    	//判断用户访问的url中有没有这个预定类别，没有返回空
    	if(!in_array($request->input('Action'), $arr))
    		return;

    	//拼接命名空间和类名准备实例化
    	$C='\App\Http\Controllers\\'.ucfirst($request->input('Action')).'Controller';
    	//准备要调用的方法
    	$Method='Post'.$request->input('Method');

    	//当请求左侧时
    	if($Method=='PostLeft')return view('left');

    	//实例化类
    	$C=new $C;

    	//当请求顶部时
    	if($Method=='PostTop')return view('search').$C->$Method($request);

    	return $C->$Method($request);

    }

}

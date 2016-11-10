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
    log login 登录页
	hom home 首页
	pos posts 文章
	sea search 搜索
	col Collections 收藏集
	com Communities 社区
	pro Profile 	资料
	peo People		人脉
	not Notifications 通知
	set Settings 	设置
	*/
	public $Category=['log','hom','pos','sea','col','com','pro','peo','not','set'];

    //首页控制器
    public function Index($U1='hom',$U2='',$U3='',$U4=''){
    	
    	$arr=$this->Category;

    	//判断用户访问的url中有没有这个预定类别，没有返回404。
    	if(!in_array($U1, $arr))return view('errors.404');

        $Param=[];
        if($U2)$Param[]=$U2;
        if($U3)$Param[]=$U3;
        if($U4)$Param[]=$U4;

    	//存在返回主页视图
    	$arr=[
    		'Action'=>$U1,
    		'Param'=>((count($Param))?implode(',',$Param):''),
            'Url'=>$_SERVER['REQUEST_URI']
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
    	if($Method=='PostLeft'){
            $arr=[
                '首页'=>['Icon'=>'fa-home','Url'=>'/hom','Param'=>['hom']],
                '收藏集'=>['Icon'=>'fa-podcast','Url'=>'/col','Param'=>['col']],
                '社群'=>['Icon'=>'fa-th-large','Url'=>'/com','Param'=>['com']],
                '个人资料'=>['Icon'=>'fa-user-circle','Url'=>'/pro','Param'=>['pro']],
                '人脉'=>['Icon'=>'fa-users','Url'=>'/peo','Param'=>['peo']],
                '通知'=>['Icon'=>'fa-bell','Url'=>'/not','Param'=>['not']],
                '设置'=>['Icon'=>'fa-cog','Url'=>'/set','Param'=>['set']]
            ];
            return $arr;
        }

    	//实例化类
    	$C=new $C;

    	//当请求顶部时
    	if($Method=='PostTop'){
            $arr=['Search'=>''];
            return array_merge($arr,$C->$Method($request));
        }

    	return $C->$Method($request);

    }

}

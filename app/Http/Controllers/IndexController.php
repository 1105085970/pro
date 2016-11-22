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
use Illuminate\Support\Facades\Auth;
use DB;

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

    /*
    游客的类别
    log login 登录页
    hom home 首页
    sea search 搜索
    col Collections 收藏集
    */
    public $Category_Tourist=['log','hom','pos','sea','col','pro'];

    //首页控制器
    public function Index($U1='hom',$U2='',$U3='',$U4=''){

    	//判断用户访问的url中有没有这个预定类别，没有返回404。
    	if(!in_array($U1, $this->Category))return view('errors.404');

        $Param=[];
        if($U2)$Param[]=$U2;
        if($U3)$Param[]=$U3;
        if($U4)$Param[]=$U4;

    	//
    	$arr=[
    		'Action'=>$U1,
    		'Param'=>((count($Param))?implode(',',$Param):''),
            'Url'=>$_SERVER['REQUEST_URI']
    	];

        if (Auth::check()){
            //如果用户登录了
            $arr['login']=1;
        }else{
            //用户没登录
            $arr['login']=0;
            //如果访问的是登录后可见的分类 跳转到登录页
            if(!in_array($U1, $this->Category_Tourist))return redirect('/log');
            //如果访问的是个人资料页 要求必须带id
            if($U1=='pro'&&!$U2)return redirect('/log');
        }

        //存在返回主页视图
    	return view('index',$arr);

    }

    //首页ajax请求
    public function Ajax(Request $request){

    	//如果Post
    	$arr=$this->Category;
    	//判断用户访问的url中有没有这个预定类别，没有返回空
    	if(!in_array($request->input('Action'), $arr))
    		return;

        if (Auth::check()){
            //如果用户登录了
            $arr=[
                '首页'=>['Icon'=>'fa-home','Url'=>'/hom','Param'=>['hom']],
                '收藏集'=>['Icon'=>'fa-podcast','Url'=>'/col','Param'=>['col']],
                '社群'=>['Icon'=>'fa-th-large','Url'=>'/com','Param'=>['com']],
                '个人资料'=>['Icon'=>'fa-user-circle','Url'=>'/pro','Param'=>['pro']],
                '人脉'=>['Icon'=>'fa-users','Url'=>'/peo','Param'=>['peo']],
                '通知'=>['Icon'=>'fa-bell','Url'=>'/not','Param'=>['not']],
                '设置'=>['Icon'=>'fa-cog','Url'=>'/set','Param'=>['set']]
            ];

        }else{
            //用户没登录
            $arr=[
                '首页'=>['Icon'=>'fa-home','Url'=>'/hom','Param'=>['hom']],
                '收藏集'=>['Icon'=>'fa-podcast','Url'=>'/col','Param'=>['col']],
                '登录'=>['Icon'=>'fa-sign-in','Url'=>'/log','Param'=>['']]
            ];
            //如果访问的是登录后可见的分类 返回空
            if(!in_array($request->input('Action'), $this->Category_Tourist))
                return;
        }

    	//拼接命名空间和类名准备实例化
    	$C='\App\Http\Controllers\\'.ucfirst($request->input('Action')).'Controller';
    	//准备要调用的方法
    	$Method='Post'.$request->input('Method');

    	//当请求左侧时
    	if($Method=='PostLeft'){
            return $arr;
        }

    	//实例化类
    	$C=new $C;

    	//当请求顶部时
    	if($Method=='PostTop'){

            //搜索内容
            $arr=['Search'=>''];

            //当前登录用户默认头像
            $arr['user']['toux']='/images/toux.png';

            //如果登录了
            if(Auth::check()){
                
                //当前登录用户的数据
                $user=Auth::user();

                //当前登录用户的头像
                if($user->picid)
                    $toux=DB::table('files')->where('id',$user->picid)->first()->path;

                //如果有头像
                if(isset($toux))
                    $arr['user']['toux']=$toux;

            }

            return array_merge($arr,$C->$Method($request));

        }

    	return $C->$Method($request);

    }


}

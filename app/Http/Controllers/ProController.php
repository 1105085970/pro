<?php
/**
* 类名 ProController
*
* 类描述 资料页的控制器
*
* @author 
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class ProController extends Controller
{
    
    //Post请求顶部
    public function PostTop(Request $request){
        //要求返回一个数组
        //可能包含的键 
        //Background    背景色
        //Title         标题
        //CatName       类别名
        //Nav           横向导航链接数组
            //例 'Nav'=>['导航1'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']]]
        //Fun           请求主内容成功时要执行的函数 
        $arr=[
            'Background'=>'#FFF',
            'CatName'=>'资料',
            'Title'=>((Auth::user()->nickname)?Auth::user()->nickname:Auth::user()->username)
        ];
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        //得到param
        $param=explode(',',$request->input('Param'));
        if($param[0]){
            //如果当前param参数中有 用户id
            $user=DB::table('users')
                ->where('users.id',$param[0])
                ->first();

        }else{
            //如果没传 用户id
            //显示当前登录用户的资料页
            $user=Auth::user();

        }

        //如果没有 用户
        if(!$user)return;

        //查询头像
        if($user->picid){
            //如果有头像图片
            $user->toux=DB::table('files')
                        ->where('id',$user->picid)
                        ->first()
                        ->path;

        }else{
            //没有头像
            $user->toux='/images/toux.png';
        }


        //查询背景图
        if($user->background){
            //如果有背景图片
            $user->bg=DB::table('files')
                    ->where('id',$user->background)
                    ->first()
                    ->path;
        }else{
            //没有背景图片
            $user->bg='/images/bg.png';
        }

        //用户姓名
        $name=($user->nickname)?$user->nickname:$user->username;

        //准备返回的数组
        $arr=[
            'bg'=>$user->bg,         //背景图片地址
            'toux'=>$user->toux,     //头像图片地址
            'name'=>$name           //用户姓名
        ];

        return $arr;
        

    }

}

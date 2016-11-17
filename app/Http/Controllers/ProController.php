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

        if(Auth::check()){
            //如果用户登录了
            $user=Auth::user();

        }else{
            //用户没登录
            $user=DB::table('users')
                    ->where('id',explode(',',$request->input('Param'))[0])
                    ->first();
        }

        //用户姓名
        $name=($user->nickname)?$user->nickname:$user->username;

        $arr=[
            'Background'=>'#FFF',
            'CatName'=>$name,
            'Title'=>$name
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
            $param[0]=$user->id;

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

        //关注、取消关注、修改资料按钮
        // 1 关注 2 取消关注 3 修改资料 4 未登录
        $guanz=4;   //默认未登录

        if(Auth::check()){
            //如果登录了

            //当前登录用户已关注的 人员列表
            $ignores=explode(',',Auth::user()->ignore);

            if(Auth::id()==$param[0]){
                //要显示的个人资料页是当前登录用户的
                $guanz=3;   //修改资料

            }elseif(in_array($param[0],$ignores)){
                //当前登录的用户已经关注要显示的用户
                $guanz=2;   //取消关注

            }else{
                //当前登录的用户没有关注要显示的用户
                $guanz=1;   //关注

            }
        }

        //准备返回的数组
        $arr=[
            'bg'=>$user->bg,         //背景图片地址
            'toux'=>$user->toux,     //头像图片地址
            'name'=>$name,           //用户姓名
            'fans'=>count(explode(',',$user->followusers)),     //粉丝数量
            'user'=>((Auth::check())?Auth::id():0),      //登录用户id
            'guanz'=>$guanz,         //关注、取消关注、修改资料按钮
            'uid'=>$param[0]        //要展示的用户id
        ];

        return $arr;
        

    }

    //ajax 处理用户关注
    public function Post_follow_do(Request $request){
        //传过来的用户id
        $uid=$request->input('uid');

        //如果用户没登录 没有传id 传的id等于当前登录用户id 直接返回
        if(!Auth::check() || !$uid || Auth::id()==$uid)return;

        //获得传过来的id 的粉丝列表 数组
        $followusers=DB::table('users')
                        ->where('id',$uid)
                        ->first()
                        ->followusers;
        $followusers=explode(',',$followusers);

        //当前登录用户信息
        $user=Auth::user();

        //当前用户已关注用编号数组
        $ignores=explode(',',$user->ignore);

        //判断当前用户是否关注过了
        if(in_array($uid,$ignores)){
            //已经关注过了

            //删除用户编号
            unset($ignores[array_search($uid,$ignores)]);

            //更新数据库
            DB::table('users')
                ->where('id',$user->id)
                ->update(['ignore'=>implode(',', $ignores)]);

            //给传过来的用户减少粉丝
            unset($followusers[array_search($uid,$followusers)]);
            DB::table('users')
                ->where('id',$uid)
                ->update(['followusers'=>implode(',',$followusers)]);

            //返回 1
            return 1;

        }else{
            //没有关注过

            //添加用户编号
            $ignores[]=$uid;

            //更新数据库
            DB::table('users')
                ->where('id',$user->id)
                ->update(['ignore'=>implode(',', $ignores)]);

            //给传过来的用户添加粉丝
            $followusers[]=$uid;
            DB::table('users')
                ->where('id',$uid)
                ->update(['followusers'=>implode(',',$followusers)]);

            //返回 2
            return 2;


        }

    }

}

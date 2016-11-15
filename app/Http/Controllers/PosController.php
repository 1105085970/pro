<?php
/**
* 类名 PosController
*
* 类描述 文章页的控制器
*
* @author 王保<1105085970@qq.com>
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class PosController extends Controller
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
            'Background'=>'#db4437',
            'CatName'=>'Home'
        ];
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        //
        $rows=DB::table('posts')
            ->select(
                'posts.id as id',       //帖子id
                'users.username as name',   //用户名
                'files.path as toux',       //用户头像
                'posts.addtime as time',    //发帖时间的时间戳
                'posts.content as cont',    //帖子主内容
                'posts.likes as likes',     //+1 的数量
                'posts.likeuserid as likesid',  //+1 的用户编号列表
                'posts.shares as shares'    //分享的数量
            )
            ->leftjoin('users', 'posts.userid', '=', 'users.id')
            ->leftjoin('files', 'users.picid', '=', 'files.id')
            ->get();

        if(Auth::check()){
            //用户登录了
            $uid=Auth::id();
        }else{
            //没登录
            $uid='';
        }
            
        foreach($rows as $k=>$v){

            //如果没有头像 设置默认头像
            if($v->toux)
                $v->toux='/images/toux.png';

            //时间
            $v->time=$this->timep($v->time);

            //如果没有主内容
            if(!$v->cont)
                $v->cont='';

            //处理 +1 的用户编号 判断当登录用户是不是 +1 过
            if($uid && in_array($uid,explode(',',$v->likesid))){
                $v->my_like=1;
            }

            //删除 +1 的用户编号列表
            unset($v->likesid);

        }

        return $rows;
    }

    //Ajax帖子表单
    public function Postaddpost(Request $request){

        //获得当前登录用户数据库
        $user=Auth::user();

        //查找头像
        if($user->picid)
            $pic=DB::table('files')
                ->where('id',$user->picid)
                ->first()->path;
        else
            $pic='/images/toux.png';

        //准备返回的数组
        $arr=[
            'name'=>$user->username,
            'pic'=>$pic,
            'nickname'=>(($user->nickname)?$user->nickname:'')
        ];

        return $arr;
    }

    //ajax插入贴子
    public function Post_create_in(Request $request){
        //验证
        $this->validate($request, [
            'Contents' => 'required'
        ]);

        //插入数据
        $id=DB::table('posts')->insertGetId([
            'content'=>$request->input('Contents'),
            'addtime'=>time(),
            'userid'=>Auth::user()->id,
            'type'=>1
        ]);

        //成功时
        if($id)return $id;
        return;

    }

    //ajax 设置 +-1 
    public function Post_set_like(Request $request){
        //返回值  1 加一 2 减一

        //查到这条帖子数据
        $post=DB::table('posts')->where('id',$request->input('post'))->first();

        //如果没找到，直接返回
        if(!$post)return;

        //+1 过的用户编号列表 数组
        $likesid=explode(',',$post->likeuserid);

        //+1 的总数量
        $likes=$post->likes;

        //用户id
        $uid=Auth::id();

        //判断该用户是否 +1 过
        if(in_array($uid,$likesid)){
            //加过    删除
            unset($likesid[array_search($uid,$likesid)]);

            //喜欢数量减一
            $likes--;

            //返回值
            $retur=2;

        }else{
            //没加过 添加
            if(!$likesid[0])$likesid=[$uid];
            else $likesid[]=$uid;

            //喜欢数量加一
            $likes++;

            //返回值
            $retur=1;
        }

        //准备要更新的数据
        $arr=[
            'likes'=>$likes,
            'likeuserid'=>implode(',',$likesid)
        ];
        
        //更新数据库
        $ok=DB::table('posts')
            ->where('id',$request->input('post'))
            ->update($arr);

        //如果更新成功
        if($ok)return $retur;

        return;
    }

    //返回时间偏移
    public function timep($t){
        $time=time()-$t;
        if($time<60)
            return round($time)."s";
        
        if($time<3600)
            return round($time/60).'m';
        
        if($time<86400)
            return round($time/3600).'h';

        return round($time/86400).'d';

    }

}

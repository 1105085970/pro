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
        $rows=DB::table('posts')->get();

        foreach($rows as $k=>$v){
            //查询发表当前帖子的用户
            $Puser=DB::table('users')->where('id',$v->userid)->first();

            //id
            $new[$k]['id']=$v->id;

            //用户名
            $new[$k]['name']=$Puser->username;

            //头像
            $new[$k]['toux']=(($Puser->picid)?$Puser->picid:'/images/toux.png');

            //时间
            $new[$k]['time']=$this->timep($v->addtime);

            //主内容
            $new[$k]['cont']=(($v->content)?$v->content:'');

            //加一数量
            $new[$k]['likes']=$v->likes;

            //分享数量
            $new[$k]['shares']=$v->shares;

        }

        return $new;
    }

    //Ajax帖子表单
    public function Postaddpost(Request $request){

        //获得当前登录用户数据库
        $user=Auth::user();
        //准备返回的数组
        $arr=[
            'name'=>$user->username,
            'pic'=>(($user->picid)?$user->picid:'/images/toux.png'),
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

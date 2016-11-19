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
    public function PostContents(Request $request ,$arr=[]){
        //如果设置了查询条件
        if($request->input('arr'))
            $arr=$request->input('arr');    //通过ajax传过来的arr数组

        //默认where条件
        $where=[];
        //默认 跳过 0 条
        $skip=0;
        //默认 获取 10 条
        $take=10;

        //设置了where
        if(isset($arr['where']))
            $where=$arr['where'];

        //设置了 跳过 多少条
        if(isset($arr['skip']))
            $skip=$arr['skip'];

        //设置了 获取 多少条
        if(isset($arr['take']))
            $take=$arr['take'];

        //设置了 要显示的页数
        if(isset($arr['page']))
            $skip=$take*($arr['page']-1);

        //查询数据
        $rows=DB::table('posts')
            ->select(
                'posts.id as id',       //帖子id
                'users.username as name',   //用户名
                'files.path as toux',       //用户头像
                'posts.addtime as time',    //发帖时间的时间戳
                'posts.content as cont',    //帖子主内容
                'posts.likes as likes',     //+1 的数量
                'posts.likeuserid as likesid',  //+1 的用户编号列表
                'posts.shares as shares',    //分享的数量
                'posts.noshare as noshare',  //是否禁止分享
                'posts.comments as comms',   //评论的数量
                'posts.nocomment as nocomm'  //是否禁止评论
            )
            ->leftjoin('users', 'posts.userid', '=', 'users.id')
            ->leftjoin('files', 'users.picid', '=', 'files.id')
            ->where($where)
            ->orderBy('posts.addtime','desc')      //排序方式
            ->skip($skip)        //跳过多少条
            ->take($take)       //获取多少条
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
            if(!$v->toux)
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

            //如果禁止分享
            if($v->noshare==0)
                $v->shares=0;   //返回空的分享数量

            //默认没有评论
            $v->comm='';

            //如果允许评论
            if($v->nocomm==1){
                //查询几条最新评论
                $comms=$this->get_comments(['where'=>['postid'=>$v->id]]);

                //如果有评论 把评论放到要返回的对象中
                if(count($comms)){
                    //循环评论
                    foreach($comms as $vv){
                        //把时间转换成相对时间
                        $vv->time=$this->timep($vv->time);
                    }

                    $v->comm=$comms;
                }

            }else{
                //禁止评论时 返回空的评论数量
                $v->comms=0;
            }

        }

        $arr['posts']=$rows;
        return $arr;
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

        //获得当前用户创建和关注的收藏集
        $coll=DB::table('collections')
                ->select(
                    'collections.id as id',       //id
                    'collections.title as title',     //标题
                    'files.path as bg'          //背景图
                )
                ->where('collections.userid',$user->id)
                ->orWhereIn('collections.id',explode(',',$user->followcoll))
                ->leftjoin('files','collections.picid','=','files.id')
                ->get();

        //获得当前用户创建和关注的社区
        $comm=DB::table('communities')
                ->select(
                    'communities.id as id',       //id
                    'communities.title as title',     //标题
                    'files.path as bg'          //背景图
                )
                ->where('communities.userid',$user->id)
                ->orWhereIn('communities.id',explode(',',$user->followcomm))
                ->leftjoin('files','communities.picid','=','files.id')
                ->get();

        //准备返回的数组
        $arr=[
            'pic'=>$pic,        //背景图
            'name'=>(($user->nickname)?$user->nickname:$user->username),     //名字
            'col'=>$coll,       //收藏集
            'com'=>$comm       //社区
        ];

        return $arr;
    }

    //ajax插入贴子
    public function Post_create_in(Request $request){
        //验证
        $this->validate($request, [
            'Contents' => 'required'
        ]);

        //要插入的数据
        $arr=[
            'content'=>$request->input('Contents'),     //主内容
            'addtime'=>time(),                          //添加时间
            'userid'=>Auth::user()->id,                 //所属用户id
            'type'=>1                                   //帖子类型
        ];

        $arr2=$request->input('Arr');

        //判断当前帖子是不是在收藏集或社区内发布的
        if($arr2['Action']=='coll'&&$arr2['Param'])
            $arr['collid']=$arr2['Param'];    //所属收藏集id
        elseif($arr2['Action']=='comm'&&$arr2['Param'])
            $arr['commid']=$arr2['Param'];    //所属社区id


        //插入数据
        $id=DB::table('posts')->insertGetId($arr);

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


    //ajax 回复评论
    public function Post_create_comment(Request $request){

        //如果没有登录 直接返回
        if(!Auth::check())return;

        //当前登录用户 信息
        $user=Auth::user();

        //传过来的参数
        $param=$request->all();

        //如果参数不够 直接返回
        if(!$param['text'] || !$param['post'])return;

        //准备参数
        $arr=[
            'userid'=>$user->id,                //用户id
            'postid'=>$param['post'],           //帖子id
            'content'=>$param['text'],          //评论内容
            'parentid'=>'0',                    //父级id
            'path'=>'0,',                       //父级id 拼接
            'addtime'=>time()                   //添加时间 时间戳
        ];

        //数据库
        $id=DB::table('comments')
                ->insertGetId($arr);

        if($id){

            //准备条件
            $where=['where'=>['comments.id'=>$id]];

            //查询刚才评论的数据
            $comm=$this->get_comments($where);

            //转换时间
            $comm[0]->time=$this->timep($comm[0]->time);

            return $comm;

        }

    }


    //查询评论一些
    public function get_comments($arr=[]){

        //默认值
        $where=[];

        //如果设置了where
        if(isset($arr['where']))
            $where=$arr['where'];

        $rows=DB::table('comments')
            ->select(
                'comments.id as id',        //评论id
                'users.username as name',    //用户名
                'files.path as toux',        //用户头像
                'comments.content as cont',    //评论内容
                'comments.likes as likes',      // +1 的数量
                'comments.likeuserid as likesid',  //+1 的用户编号列表
                'comments.addtime as time'    //评论发布时间的时间戳
            )
            ->where($where)
            ->leftjoin('users', 'comments.userid', '=', 'users.id')
            ->leftjoin('files', 'users.picid', '=', 'files.id')
            ->orderBy('comments.id','desc')
            ->take(3)   //返回的条数
            ->get();

        return $rows;

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

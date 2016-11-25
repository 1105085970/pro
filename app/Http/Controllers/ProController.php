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
use \App\Http\Controllers\PosController;

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

        //如果没有用户
        if(!$user)return 404;

        //要展示的用户的姓名
        $name=($user->nickname)?$user->nickname:$user->username;

        //如果要显示全部  
        if(isset($param[1]) && $param[1]=='all'){
            //返回全部
            $arr=['user'=>$user,'all'=>1];

            //如果是访问自己主页
            if( $user->id==Auth::id())   
                $arr['hide']=1;

            $arr=$this->colm($arr);
            $arr['name']=$name;
            return $arr;
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

        $arr=['user'=>$user,'num'=>4];
        //如果是访问自己主页
        if($user->id==Auth::id())
            $arr['hide']=1;

        $coll=$this->colm($arr);

        $num=0;
        $coll2='';
        foreach($coll as $v){
            $num++;
            if($num>4)break;
            $coll2[]=$v;
        }

        //关注、取消关注、修改资料按钮
        // 1 关注 2 取消关注 3 修改资料 4 未登录
        $guanz=4;   //默认未登录

        if(Auth::check()){
            //如果登录了

            //当前登录用户已关注的 人员列表
            $followusers=explode(',',Auth::user()->followusers);

            if(Auth::id()==$param[0]){
                //要显示的个人资料页是当前登录用户的
                $guanz=3;   //修改资料

            }elseif(in_array($param[0],$followusers)){
                //当前登录的用户已经关注要显示的用户
                $guanz=2;   //取消关注

            }else{
                //当前登录的用户没有关注要显示的用户
                $guanz=1;   //关注

            }
        }

        //查找用户的帖子列表
        $posts=new PosController;

        $arr=[
            'where'=>['users.id'=>$param[0]],
            'id'=>'pro_posts'
        ];

        $posts=$posts->PostContents($request,$arr);

        //粉丝数量
        $fans=0;
        if($user->fans)
            $fans=count(explode(',',$user->fans));

        //准备返回的数组
        $arr=[
            'bg'=>$user->bg,         //背景图片地址
            'toux'=>$user->toux,     //头像图片地址
            'name'=>$name,           //用户姓名
            'fans'=>$fans,     //粉丝数量
            'user'=>((Auth::check())?Auth::id():0),      //登录用户id
            'guanz'=>$guanz,         //关注、取消关注、修改资料按钮
            'uid'=>$param[0],        //要展示的用户id
            'coll'=>$coll2,          //要展示的用户创建的收藏集
            'posts'=>$posts         //要展示的用户的帖子列表
        ];

        return $arr;
        

    }

    //ajax 处理用户关注
    public function Post_follow_do(Request $request){
        //传过来的用户id
        $uid=$request->input('uid');

        //传过来的圈子id
        $cid=$request->input('cid');

        //如果用户没登录 没有传id 传的id等于当前登录用户id 直接返回
        if(!Auth::check() || !$uid || Auth::id()==$uid)return;

        //获得传过来的id 的粉丝列表 数组
        $fans=DB::table('users')
                        ->where('id',$uid)
                        ->first()
                        ->fans;
        $fans=explode(',',$fans);

        //当前登录用户信息
        $user=Auth::user();

        //当前用户已关注用编号数组
        $followusers=explode(',',$user->followusers);

        //判断当前用户是否关注过了
        if(in_array($uid,$followusers)){
            //已经关注过了

            //删除用户编号
            unset($followusers[array_search($uid,$followusers)]);

            //更新数据库
            DB::table('users')
                ->where('id',$user->id)
                ->update(['followusers'=>trim(implode(',', $followusers),',')]);

            //给传过来的用户减少粉丝
            unset($fans[array_search($user->id,$fans)]);
            DB::table('users')
                ->where('id',$uid)
                ->update(['fans'=>trim(implode(',',$fans),',')]);

            if($cid){
                //如果有圈子id
                $cir=DB::table('circles')->where('id',$cid)->first();
                //数量
                $cirnum=$cir->follownum;
                //圈子内用户数组
                $folls=explode(',',$cir->followid);

                unset($folls[array_search($uid,$folls)]);

                DB::table('circles')
                    ->where('id',$cid)
                    ->update(['follownum'=>--$cirnum,'followid'=>trim(implode(',',$folls),',')]);

            }

            //返回 1
            return 1;

        }else{
            //没有关注过

            //添加用户编号
            $followusers[]=$uid;

            //更新数据库
            DB::table('users')
                ->where('id',$user->id)
                ->update(['followusers'=>trim(implode(',', $followusers),',')]);

            //给传过来的用户添加粉丝
            $fans[]=$user->id;
            DB::table('users')
                ->where('id',$uid)
                ->update(['fans'=>trim(implode(',',$fans),',')]);

            //返回 2
            return 2;


        }

    }


    //返回用户的合集和社区
    public function colm($arr){

        //用户信息
        $user=$arr['user'];

        //包含所有的数组
        $list=[];

        //如果要返回全部
        if(isset($arr['all'])){

            //要返回的数量
            $num=99999;

        }else{

            //要返回的数量
            $num=$arr['num'];

        }

        $where=['collections.userid'=>$user->id];
        //如果要显示全部
        if(!isset($arr['hide']))
            $where['collections.hide']=0;

        //要展示的用户创建的收藏集
        $coll=DB::table('collections')
                ->select(
                    'collections.id as collid',         //收藏集id
                    'collections.title as title',       //标题
                    'files.path as pic',            //背景图片地址
                    'collections.background as bg',      //背景色
                    'collections.userid as uid'         //所属用户id
                )
                ->where($where)
                ->leftjoin('files', 'collections.picid', '=', 'files.id')
                ->get();

        //头像
        $coll=$this->colmtoux($coll);

        //如果有收藏集
        if(count($coll))
            $list['my_coll']=clone $coll;

        //如果要显示全部
        if(isset($arr['hide']))
            $user->showcoll=1;

        //如果要展示的用户创建的收藏集小于$num个 并且 要展示的用户允许显示关注的收藏集
        if(count($coll)<$num && $user->showcoll==1 && $user->followcoll){
            $coll2=DB::table('collections')
                    ->select(
                        'collections.id as collid',         //收藏集id
                        'collections.title as title',       //标题
                        'files.path as pic',            //背景图片地址
                        'collections.background as bg',      //背景色
                        'collections.userid as uid'         //所属用户id
                    )
                    ->whereIn('collections.id',explode(',',trim($user->followcoll,',')))
                    ->leftjoin('files', 'collections.picid', '=', 'files.id')
                    ->get();

            //头像
            $coll2=$this->colmtoux($coll2);

            //循环合并
            foreach($coll2 as $v){
                $coll[]=$v;
            }

            //如果有收藏集
            if(count($coll2))
                $list['coll']=clone $coll2;

        }

        $where=['communities.userid'=>$user->id];

        //如果要显示全部
        if(!isset($arr['hide']))
            $where['communities.hide']=0;

        //如果要展示的用户创建的收藏集小于$num个
        if(count($coll)<$num){
            //查找要展示的用户创建的社区
            $comm=DB::table('communities')
                    ->select(
                        'communities.id as commid',         //收藏集id
                        'communities.title as title',       //标题
                        'files.path as pic',            //背景图片地址
                        'communities.admins as admins',      //管理员编号列表
                        'communities.membernum as members',      //成员数量
                        'communities.userid as uid'         //所属用户id
                    )
                    ->where($where)
                    ->leftjoin('files', 'communities.picid', '=', 'files.id')
                    ->get();

            //头像
            $comm=$this->colmtoux($comm);

            //如果有社区
            if(count($comm))
                $list['my_comm']=clone $comm;

            //如果要显示全部
            if(isset($arr['hide']))
                $user->showcomm=$user->followcomm;

            //如果要展示的用户创建的社区加收藏集小于$num个
            if(count($coll)+count($comm)<$num){
                $comm2=DB::table('communities')
                        ->select(
                            'communities.id as commid',         //收藏集id
                            'communities.title as title',       //标题
                            'files.path as pic',            //背景图片地址
                            'communities.admins as admins',      //管理员编号列表
                            'communities.membernum as members',      //成员数量
                            'communities.userid as uid'         //所属用户id
                        )
                        ->whereIn('communities.id',explode(',',trim($user->showcomm,',')))
                        ->leftjoin('files', 'communities.picid', '=', 'files.id')
                        ->get();

                //头像
                $comm2=$this->colmtoux($comm2);

                //循环合并
                foreach($comm2 as $v){
                    $comm[]=$v;
                }

                //如果有收藏集
                if(count($comm2))
                    $list['comm']=clone $comm2;

            }

            //循环合并
            foreach($comm as $v){
                $coll[]=$v;
            }

        }

        //如果要显示全部
        if(isset($arr['all']))
            return $list;
        else
            return $coll;

    }

    //循环返回头像
    public function colmtoux($coll){

        //循环收藏集、社区数组 得到返回数组
        foreach($coll as $v){

            //创建者头像
            $toux=DB::table('users')
                    ->select('files.path as path')
                    ->where('users.id',$v->uid)
                    ->leftjoin('files','users.picid','=','files.id')
                    ->first();

            //判断头像是否存在
            if($toux->path)
                $v->touxs=[$toux->path];
            else
                $v->touxs=['/images/toux.png'];     //默认头像

            if(isset($v->commid)){
                //社区
                //头像
                if($v->admins){
                    //如果有管理员头像列表
                    $touxs=DB::table('users')
                            ->select('files.path as path')
                            ->whereIn('users.id',explode(',',$v->admins))
                            ->leftjoin('files','users.picid','=','files.id')
                            ->get();
                    //循环合并
                    foreach($touxs as $vv){
                        if($vv->path)
                            $v->touxs[]=$vv->path;
                        else
                            $v->touxs[]='/images/toux.png';     //默认头像
                    }
                }

            }

        }

        return $coll;

    }


    //ajax 获取当前登录用户数据
    public function Post_getuser(Request $request){

        //如果没有登录
        if(!Auth::check())return 3;

        //当前登录用户信息
        $user=Auth::user();

        //默认头像
        $toux='/images/toux.png';

        //查找头像
        if($user->picid)
            $toux2=DB::table('files')->where('id',$user->picid)->first()->path;

        //如果有头像
        if(isset($toux2))
            $toux=$toux2;

        //默认背景图片
        $bg='/images/bg.png';

        //查找背景图
        if($user->background)
            $bg2=DB::table('files')->where('id',$user->background)->first()->path;

        //如果有背景图片
        if(isset($bg2))
            $bg=$bg2;


        //准备要返回的数据
        $arr=[
            'id'=>$user->id,                    //用户id
            'username'=>$user->username,        //用户名
            'nickname'=>(($user->nickname)?$user->nickname:''),        //昵称
            'phone'=>(($user->phone)?$user->phone:''),              //手机号
            'email'=>$user->email,              //邮箱
            'toux'=>$toux,                      //头像
            'sex'=>$user->sex,                  //性别
            'bg'=>$bg,                          //背景图片
            'slogan'=>(($user->slogan)?$user->slogan:''),               //个性宣言
            'created_at'=>$user->created_at,                            //注册时间
            'introduce'=>(($user->introduce)?$user->introduce:'')       //个人简介
        ];


        return $arr;

    }


    //alax 修改资料
    public function Post_edit_user(Request $request){

        //如果没有登录
        if(!Auth::check())return 3;

        //参数
        $arr=$request->all();

        //验证邮箱
        if(!preg_match('/^[A-z0-9]+@[a-z0-9]+(\.[a-z]+){1,2}$/',$arr['email']))
            return 'email';
 
        //验证手机号
        if($arr['phone'] && !preg_match('/^(\d+){11}$/',$arr['phone']))
            return 'phone';

        //判断邮箱重复
        $email=DB::table('users')->where('email',$arr['email'])->first();
        if($email && $email->id != Auth::id())
            return 'email2';

        //手机号判断重复
        if($arr['phone']){
            $phone=DB::table('users')->where('phone',$arr['phone'])->first();
            if($phone && $phone->id !=Auth::id())
                return 'phone2';
        }

        //当前登录用户判断
        $user=Auth::user();

        //要更新的数组
        $data=[];

        //签名
        if($user->slogan!=$arr['slogan'])
            $data['slogan']=$arr['slogan'];

        //昵称
        if($user->nickname!=$arr['nickname'])
            $data['nickname']=$arr['nickname'];

        //手机
        if($user->phone!=$arr['phone'])
            $data['phone']=$arr['phone'];

        //邮箱
        if($user->email!=$arr['email'])
            $data['email']=$arr['email'];

        //性别
        if($user->sex!=$arr['sex'])
            $data['sex']=$arr['sex'];

        //简介
        if($user->introduce!=$arr['jj'])
            $data['introduce']=$arr['jj'];

        //如果没有修改 直接返回
        if(!count($data))
            return 2;


        $up=DB::table('users')
                ->where('id',Auth::id())
                ->update($data);

        if($up)return 1;

        return;

    }


    //ajax 修改头像 背景图
    public function Post_edit_tu(Request $request){

        //如果没有登录
        if(!Auth::check())return 3;

        //所有参数
        $param=$request->all();

        if(!isset($param['type']) || !isset($param['picid']))return;

        //判断要更新头像还是背景图片
        if($param['type']=='bg'){
            //背景图
            $arr=['background'=>$param['picid']];

        }elseif($param['type']=='toux'){
            //头像
            $arr=['picid'=>$param['picid']];

        }else{
            return;
        }

        //更新
        $up=DB::table('users')->where('id',Auth::id())->update($arr);

        if($up)return 1;
        else return 2;


    }


}

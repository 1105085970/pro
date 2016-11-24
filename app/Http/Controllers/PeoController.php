<?php
/**
* 类名 PeoController
*
* 类描述 人脉页的控制器
*
* @author 
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class PeoController extends Controller
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
            'CatName'=>'People',
            'Title'=>'People',
            'Nav'=>[
                '找人'=>['Url'=>'/peo','Action'=>'peo'],
                '已关注'=>['Url'=>'/peo/circles','Action'=>'peo','Param'=>['circles']],
                '关注者'=>['Url'=>'/peo/haveyou','Action'=>'peo','Param'=>['haveyou']]
            ]
        ];
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        
        $param=explode(',',$request->input('Param'));

        if(!$param[0])$param[0]='people';

         //当前登录用户已关注的 人员列表
        $followusers=explode(',',Auth::user()->followusers);

        //当前登录用户的粉丝列表
        $fans=explode(',',Auth::user()->fans);

        //当前登录用户的圈子列表
        $quans=explode(',',Auth::user()->circle);
        $quan=[];

        //如果有圈子
        if($quans[0]){

            $quan=DB::table('circles')
                    ->select(
                        'id',
                        'name',         //圈子名
                        'follownum',     //圈子内用户数量
                        'followid'      //圈子内用户编号 列表
                    )
                    ->whereIn('id',$quans)
                    ->get();

        }

        //排除禁用的用户
        $where=[
            ['users.state','<>','0'],
            ['users.id','<>',Auth::id()]
        ];

        //找人页
        if($param[0]=='people'){

            $users=DB::table('users')
                ->where($where)
                ->leftjoin('files','users.picid','=','files.id')
                ->orderBy('id','desc')
                ->take(50);

        }elseif($param[0]=='haveyou'){
            //关注者页

            $users=DB::table('users')
                ->where($where)
                ->whereIn('users.id',$fans)
                ->leftjoin('files','users.picid','=','files.id')
                ->orderBy('id','desc');

        }elseif($param[0]=='circles'){
            //已关注页

            $users=DB::table('users')
                ->where($where)
                ->whereIn('users.id',$followusers)
                ->leftjoin('files','users.picid','=','files.id')
                ->orderBy('id','desc');

        }else{
            //404
            return 404;
        }

        $users=$users->select(
                    'users.id as id',
                    'users.username as username',
                    'users.nickname as name',
                    'files.path as toux',
                    'users.slogan as qian'
                )->get();

        //循环
        foreach($users as $k=>$v){

            //如果有没有昵称
            if(!$v->name)
                $v->name=$v->username;

            //如果没有签名
            if(!$v->qian)
                $v->qian='';

            unset($v->username);

            if(in_array($v->id,$followusers)){
                //当前登录的用户已经关注要显示的用户
                $v->guanz=2;   //取消关注

            }else{
                //当前登录的用户没有关注要显示的用户
                $v->guanz=1;   //关注

            }

            //如果没有头像
            if(!$v->toux)
                $v->toux='/images/toux.png';

            //如果是已关注页
            if($param[0]=='circles'){
                foreach($quan as $kk=>$vv){

                    $foll=explode(',', $vv->followid);

                    if(in_array($v->id, $foll)){
                        //用户在该圈子中
                        $vv->follow[]=$v;
                        unset($users[$k]);
                    }

                }
            }

        }

        //如果是已关注页
        if($param[0]=='circles'){

            

        }


        $arr=[
            'quans'=>$quan,
            'users'=>$users
        ];

        return $arr;
    }


    //ajax 移动用户到圈子
    public function Post_circle_move(Request $request){

        $arr=$request->all();

        //要移动的用户id
        $uid=$arr['uid'];

        //要移动到的圈子id
        $cid=$arr['cid'];

        //以前的圈子id
        $ocid=$arr['ocid'];

        //如果有以前的
        if($ocid && $ocid!='0'){

            //得到以前的圈子数据
             $old=DB::table('circles')->where('id',$ocid)->first();

            //成员数组
            $old_ren=explode(',',$old->followid);

            //从圈子中删除该用户
            unset($old_ren[array_search($uid,$old_ren)]);

            //更新
            $num=$old->follownum;
            $data=[
                'follownum'=>--$num,
                'followid'=>trim(implode(',', $old_ren),',')
            ];
            DB::table('circles')->where('id',$ocid)->update($data);

        }

        //如果有要移动到的圈子
        if($cid && $cid!='0'){

            //得到圈子数据
            $cir=DB::table('circles')->where('id',$cid)->first();

            //成员数组
            $ren=explode(',', $cir->followid);

            //添加
            $ren[]=$uid;

            //更新
            $num=$cir->follownum;
            $data=[
                'follownum'=>++$num,
                'followid'=>trim(implode(',', $ren),',')
            ];
            DB::table('circles')->where('id',$cid)->update($data);

        }

        //当前登录用户的圈子列表
        $quans=explode(',',Auth::user()->circle);

        $quan=DB::table('circles')
                    ->select(
                        'id',
                        'name',         //圈子名
                        'follownum',     //圈子内用户数量
                        'followid'      //圈子内用户编号 列表
                    )
                    ->whereIn('id',$quans)
                    ->get();

        return $quan;
       

    }


    //ajax 新建圈子
    public function Post_add_circle(Request $request){

        $arr=[
            'userid'=>Auth::id(),
            'name'=>$request->input('name'),
            'addtime'=>time()
        ];

        //添加圈子
        $id=DB::table('circles')->insertGetId($arr);

        if(!$id)return 2;

        //更新用户圈子
        $user=Auth::user();

        $circles=explode(',', $user->circle);

        $circles[]=$id;

        $circles=trim(implode(',',$circles),',');

        //更新用户信息添加 圈子
        $ok=DB::table('users')->where('id',Auth::id())->update(['circle'=>$circles]);

        if(!$ok)return 2;

        return 1;
       

    }


    //ajax 修改圈子
    public function Post_edit_circle(Request $request){

        $where=[
            ['id','=',$request->cid],
            ['userid','=',Auth::id()]
        ];

        $ok=DB::table('circles')->where($where)->update(['name'=>$request->name]);

        if($ok)return 1;
        else return 2;

    }

    //ajax 删除圈子
    public function Post_del_circle(Request $request){

        //要删除的圈子id
        $cid=$request->cid;

        $where=[
            ['userid','=',Auth::id()],
            ['id','=',$cid]
        ];

        //找寻圈子中的人
        $ren=DB::table('circles')->where($where)->first();

        if(!$ren)return 2;

        //需要先删除圈子内的用户
        if($ren->followid)return 3;

        //s删除圈子
        $ok=DB::table('circles')->where($where)->delete();

        if(!$ok)return 2;

        //更新用户的圈子列表
        $user=Auth::user();

        $list=explode(',', $user->circle);

        unset($list[array_search($cid,$list)]);

        $list=trim(implode(',', $list),',');

        $ok=DB::table('users')->where('id',$user->id)->update(['circle'=>$list]);

        if(!$ok)return 4;

        return 1;

    }

}

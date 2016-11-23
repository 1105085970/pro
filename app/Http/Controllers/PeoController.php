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

        }

        $users=$users->select(
                    'users.id as id',
                    'users.username as username',
                    'users.nickname as name',
                    'files.path as toux',
                    'users.slogan as qian'
                )->get();

        //循环
        foreach($users as $v){

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

}

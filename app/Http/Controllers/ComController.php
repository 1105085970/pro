<?php
/**
* 类名 ComController
*
* 类描述 社区的控制器
*
* @author 
*/

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ComController extends Controller
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
        if(!empty($request->Param)){
            $id=explode(',',$request->Param);
            $arr=DB::table('communities')->where('id',$id[0])->get();
            foreach($arr as $k=>$v){
                $list=array();
                $admin=explode(',',$arr[$k]->admins);
                if(count($admin)!=1){
                    foreach($admin as $kk=>$vv){
                        $list1=DB::table('users')->where('id',$vv)->first();
                        $list2=DB::table('files')->where('id',$list1->picid)->first();
                        $list[]=$list2->path;
                    }
                    $arr[$k]->img=$list;
                }
                
            }
            return ['key'=>$arr,'key2'=>$request->Param,'shequ'=>'shequ'];
        }
        $arr=DB::table('communities')->get();
        foreach($arr as $k=>$v){
            $list=array();
            $admin=explode(',',$arr[$k]->admins);
            if(count($admin)!=1){
                foreach($admin as $kk=>$vv){
                    $list1=DB::table('users')->where('id',$vv)->first();
                    $list2=DB::table('files')->where('id',$list1->picid)->first();
                    $list[]=$list2->path;
                }
                $arr[$k]->img=$list;
            }
            
        }
        return ['key'=>$arr,'key2'=>'Value2','list'=>$list];
    }
    public function Postjiaru(Request $request){
        if(Auth::check()){
            $i=0;
            $arr=DB::table('communities')->where('id',$request->input('id'))->first();
            $panduan=explode(',',$arr->members);
            $n=count($panduan);
            //!!!!!!!此时添加的fans路径下的id不是用户的id，后期要修改！！！！！！！！！！！！！！！！！！！！！！
            foreach($panduan as $k=>$v){
                if($v==$request->input('id')){
                    $i=$k;
                }
            }
            if($i!=0){
                unset($panduan[$k]);
                $members=implode(',',$panduan);
                $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['members'=>$members]);
                return ['id'=>'no'];
            }else{
                $members=$arr->members.$request->id.',';
                $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['members'=>$members]);
                return ['id'=>'yes'];
            }
        }else{
            return ['login'=>'login'];
        }
    }

}
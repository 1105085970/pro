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
            $arru=DB::table('users')->where('id',$arr[0]->userid)->first();
            foreach($arr as $k=>$v){
                $cun='加入';
                $id=explode(',',$arr[$k]->members);
                foreach($id as $kk=>$vv){
                    if(Auth::id()==$vv){
                        $cun='已加入';
                    }
                }
                $arr[$k]->cun=$cun;
                $list=array();
                $bg=DB::table('files')->where('id',$arr[$k]->picid)->first();
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
            return ['key'=>$arr,'key2'=>$request->Param,'user'=>$arru->username,'bg'=>$bg->path,'shequ'=>'shequ'];
        }
        $arr=DB::table('communities')->get();
        foreach($arr as $k=>$v){
            $cun='加入';
            $id=explode(',',$arr[$k]->members);
            foreach($id as $kk=>$vv){
                if(Auth::id()==$vv){
                    $cun='已加入';
                }
            }
            $arr[$k]->cun=$cun;
            $list=array();
            $bg=DB::table('files')->where('id',$arr[$k]->picid)->first();
            $arr[$k]->bg=$bg->path;
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
        return ['key'=>$arr,'bg'=>$bg->path,'list'=>$list];
    }
    public function Postjiaru(Request $request){
        if(Auth::check()){
            $k=-1;
            $m=-1;
            $followcoll=DB::table('users')->where('id',Auth::id())->first();
            if($followcoll->followcomm==null){
                $foll=$followcoll->followcomm.$request->input('id').',';
                $followcoll1=DB::table('users')->where('id',Auth::id())->update(['followcomm'=>$foll]);
            }else{
                $foll=explode(',',$followcoll->followcomm);
                $count1=count($foll);
                for($n=0;$n<$count1-1;$n++){
                    if($foll[$n]==$request->input('id')){
                        $m=$n;break;
                    }
                }
                if($m==-1){
                    $foll=$followcoll->followcomm.$request->input('id').',';
                    $followcoll1=DB::table('users')->where('id',Auth::id())->update(['followcomm'=>$foll]);
                    
                }else{
                    unset($foll[$m]);
                    $follw=implode(',',$foll);
                    $arr1=DB::table('users')->where('id',Auth::id())->update(['followcomm'=>$follw]);
                }
            }
            $arr=DB::table('communities')->where('id',$request->input('id'))->first();
            if($arr->members==null){
                $membernum=$arr->membernum+1;
               $members=$arr->members.Auth::id().',';
               $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['members'=>$members,'membernum'=>$membernum]);
                return ['id'=>'yes','key'=>$arr];
            }else{
            $panduan=explode(',',$arr->members);
            $count=count($panduan);
            for($i=0;$i<$count-1;$i++){
                if($panduan[$i]==Auth::id()){
                    $k=$i;break;
                }
            }

            if($k==-1){
                $membernum=$arr->membernum+1;
                $members=$arr->members.Auth::id().',';
                $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['membernum'=>$membernum,'members'=>$members]);
                return ['id'=>'yes','members'=>$k,'k'=>'增加'];
                
            }else{
                unset($panduan[$k]);
                $membernum=$arr->membernum-1;
                $members=implode(',',$panduan);
                $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['membernum'=>$membernum,'members'=>$members]);
                return ['id'=>'no','members'=>$count,'k'=>'删除'];
            }
        }
        }else{
            return ['login'=>'login'];
        }
    }

}
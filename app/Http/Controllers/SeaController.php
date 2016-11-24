<?php
/**
* 类名 SeaController
*
* 类描述 搜索页的控制器
*
* @author 王保<1105085970@qq.com>
*/

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;

class SeaController extends Controller
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
            'Background'=>'#455a64',
            'CatName'=>'搜索'
        ];
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        $bian=$request->Param;//接到的参数
        if($bian==''){
            
            $user=DB::table('users')->get();
            $cd=count($user);
            if($cd>0){
                foreach($user as $k=>$v){
                    $list1=DB::table('files')->where('id',$user[$k]->picid)->first();
                    
                    $user[$k]->tx=$list1->path;
                    if($user[$k]->background==''){
                        $user[$k]->bg='/images/bg.png';
                    }else{
                        $list2=DB::table('files')->where('id',$user[$k]->background)->first();
                        $user[$k]->bg=$list2->path;
                    }
                }
            }
            $comm=DB::table('communities')->get();
            $cd=count($comm);
            if($cd>0){
                foreach($comm as $j=>$v){
                    $mlist=DB::table('files')->where('id',$comm[$j]->picid)->first();
                    $mlist1=DB::table('users')->where('id',$comm[$j]->userid)->first();
                    $mlist3=DB::table('files')->where('id',$mlist1->picid)->first();
                    $comm[$j]->tx=$mlist3->path;
                    
                    $comm[$j]->bg=$mlist->path;
                    
                }
            }
            $coll=DB::table('collections')->get();
            $cd=count($coll);
            if($cd>0){
                foreach($coll as $h=>$v){
                    $llist=DB::table('files')->where('id',$coll[$h]->picid)->first();
                    $llist1=DB::table('users')->where('id',$coll[$h]->userid)->first();
                    $llist3=DB::table('files')->where('id',$llist1->picid)->first();
                    $coll[$h]->tx=$llist3->path;
                    
                    $coll[$h]->bg=$llist->path;
                    
                }
            }
            return ['key'=>'没传参','user'=>$user,'comm'=>$comm,'coll'=>$coll];
        }
        $user=DB::table('users')->where('username','like','%'.$bian.'%')->get();
        $cd=count($user);
        if($cd>0){
            foreach($user as $k=>$v){
                $list1=DB::table('files')->where('id',$user[$k]->picid)->first();
                
                $user[$k]->tx=$list1->path;
                if($user[$k]->background==''){
                    $user[$k]->bg='/images/bg.png';
                }else{
                    $list2=DB::table('files')->where('id',$user[$k]->background)->first();
                    $user[$k]->bg=$list2->path;
                }
            }
        }
        $comm=DB::table('communities')->where('title','like','%'.$bian.'%')->get();
        $cd=count($comm);
        if($cd>0){
            foreach($comm as $j=>$v){
                $mlist=DB::table('files')->where('id',$comm[$j]->picid)->first();
                $mlist1=DB::table('users')->where('id',$comm[$j]->userid)->first();
                $mlist3=DB::table('files')->where('id',$mlist1->picid)->first();
                $comm[$j]->tx=$mlist3->path;
                
                $comm[$j]->bg=$mlist->path;
                
            }
        }
        $coll=DB::table('collections')->where('title','like','%'.$bian.'%')->get();
        $cd=count($coll);
        if($cd>0){
            foreach($coll as $h=>$v){
                $llist=DB::table('files')->where('id',$coll[$h]->picid)->first();
                $llist1=DB::table('users')->where('id',$coll[$h]->userid)->first();
                $llist3=DB::table('files')->where('id',$llist1->picid)->first();
                $coll[$h]->tx=$llist3->path;
                
                $coll[$h]->bg=$llist->path;
                
            }
        }
        return ['user'=>$user,'comm'=>$comm,'coll'=>$coll,'key2'=>$cd];
    }

}

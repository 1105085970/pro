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
            return ['key'=>'没传参'];
        }
        $user=DB::table('users')->where('username','like','%'.$bian.'%')->get();
        $cd=count($user);
        if($cd>0){
            foreach($user as $k=>$v){
                $list1=DB::table('files')->where('id',$user[$k]->picid)->first();
                $list2=DB::table('files')->where('id',$user[$k]->background)->first();
                $user[$k]->tx=$list1->path;
                $user[$k]->bg=$list2->path;
            }
        }
        return ['user'=>$user,'key2'=>$cd];
    }

}

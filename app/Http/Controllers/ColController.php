<?php
/**
* 类名 ColController
*
* 类描述 收藏集的控制器
*
* @author 
*/

namespace App\Http\Controllers;
use DB;
use App\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ColController extends Controller
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
            'Background'=>'#03A9F4',
            'CatName'=>'Home',
            'Nav'=>['导航1'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']],'导航2'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']],'导航3'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']]]
        ];
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        //跳转至后带的值
        if(!empty($request->Param)){
            $id=explode(',',$request->Param);
            $arr=DB::table('collections')->where('id',$id[0])->first();
            $arru=DB::table('users')->where('id',$arr->userid)->first();
            $arrf=DB::table('files')->where('id',$arru->picid)->first();
            $arrb=DB::table('files')->where('id',$arr->picid)->first();

            $arr1=Posts::where('userid',$id[0])->get();
            return ['key'=>$arr,'key2'=>$arr1,'panduan'=>'tiao','tx'=>$arrf->path,'bg'=>$arrb->path];
        }
        //主页面返回时所带的值，第一次加载
        $arr=DB::table('collections')->get();
        $arr1=DB::table('files')->get();
        return ['key'=>$arr,'key2'=>$arr1];
    }
    public function Postguanzhu(Request $request){
        if(Auth::check()){

        


        $i=0;
        $arr=DB::table('collections')->where('id',$request->input('id'))->first();
        $panduan=explode(',',$arr->fans);
        $n=count($panduan);
        //!!!!!!!此时添加的fans路径下的id不是用户的id，后期要修改！！！！！！！！！！！！！！！！！！！！！！
        foreach($panduan as $k=>$v){
            if($v==$request->input('id')){
                $i=$k;
            }
        }
        if($i!=0){
            unset($panduan[$i]);
            $fansnum=$arr->fansnum-1;
            $fans=implode(',',$panduan);
            $arr1=DB::table('collections')->where('id',$request->input('id'))->update(['fansnum'=>$fansnum,'fans'=>$fans]);
            return ['id'=>'no'];
        }else{
            $fansnum=$arr->fansnum+1;
            $fans=$arr->fans.$request->id.',';
            $arr1=DB::table('collections')->where('id',$request->input('id'))->update(['fansnum'=>$fansnum,'fans'=>$fans]);
            return ['id'=>'yes'];
        }
        }else{
            return ['login'=>'login'];
        }
    }

}

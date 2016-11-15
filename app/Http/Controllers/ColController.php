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
        if(empty($request->Param)){
            $arr=[
                'Background'=>'#03A9F4',
                'CatName'=>'Home',
                'Nav'=>['精选'=>['Url'=>'/ts','Action'=>'hom','Param'=>[]],
                        '已关注'=>['Url'=>'/col/daohang2','Action'=>'col','Param'=>['daohang2','123']],
                        '你的'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']]]
            ];
        }else{
             $arr=[
                'Background'=>'#03A9F4',
                'CatName'=>'Home'
            ];
        }
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        //跳转至后带的值
        if($request->Param=='daohang2,123'){
            return ['key'=>789];
        }
        if(!empty($request->Param)){
            $id=explode(',',$request->Param);
            $arr=DB::table('collections')->where('id',$id[0])->first();
            foreach($arr as $k=>$v){
                $cun='关注';
                $arr1=DB::table('files')->where('id',$arr->picid)->first();
                $arr2=DB::table('files')->where('id',$arr->userid)->first();
                $id=explode(',',$arr->fans);
                foreach($id as $kk=>$vv){
                    if(Auth::id()==$vv&&Auth::id()!=''){
                        $cun='已关注';
                    }
                }
                $arr->bg=$arr1->path;
                $arr->tx=$arr2->path;
                $arr->cun=$cun;
            }
            $arru=DB::table('users')->where('id',$arr->userid)->first();
            $arrf=DB::table('files')->where('id',$arru->picid)->first();
            $arrb=DB::table('files')->where('id',$arr->picid)->first();

            $arr1=Posts::where('userid',$id[0])->get();
            return ['key'=>$arr,'key2'=>$arr1,'panduan'=>'tiao','userid'=>$arru->id,'user'=>$arru->username,'tx'=>$arrf->path,'bg'=>$arrb->path];
        }
        //主页面返回时所带的值，第一次加载
        $arr=DB::table('collections')->get();
        foreach($arr as $k=>$v){
            $cun='关注';
            $arr1=DB::table('files')->where('id',$arr[$k]->picid)->first();
            $arr2=DB::table('files')->where('id',$arr[$k]->userid)->first();
            $id=explode(',',$arr[$k]->fans);
            foreach($id as $kk=>$vv){
                if(Auth::id()==$vv&&Auth::id()!=''){
                    $cun='已关注';
                }
            }
            $arr[$k]->bg=$arr1->path;
            $arr[$k]->tx=$arr2->path;
            $arr[$k]->cun=$cun;
        }

        return ['key'=>$arr,'key2'=>Auth::id()];
    }
    public function Postguanzhu(Request $request){
        if(Auth::check()){
        $k=-1;
        $arr=DB::table('collections')->where('id',$request->input('id'))->first();
        
        //!!!!!!!此时添加的fans路径下的id不是用户的id，后期要修改！！！！！！！！！！！！！！！！！！！！！！
        if($arr->fans==null){//判断是否等于空
            $fansnum=$arr->fansnum+1;
            $fans=$arr->fans.Auth::id().',';
            $arr1=DB::table('collections')->where('id',$request->input('id'))->update(['fansnum'=>$fansnum,'fans'=>$fans]);
            return ['id'=>'yes','fans'=>$arr->fans];
        }else{
            $panduan=explode(',',$arr->fans);
            $count=count($panduan);
            for($i=0;$i<$count-1;$i++){
                if($panduan[$i]==Auth::id()){
                    $k=$i;break;
                }
            }

            if($k==-1){
                $fansnum=$arr->fansnum+1;
                $fans=$arr->fans.Auth::id().',';
                $arr1=DB::table('collections')->where('id',$request->input('id'))->update(['fansnum'=>$fansnum,'fans'=>$fans]);
                return ['id'=>'yes','fans'=>$k,'k'=>'增加'];
                
            }else{
                unset($panduan[$k]);
                $fansnum=$arr->fansnum-1;
                $fans=implode(',',$panduan);
                $arr1=DB::table('collections')->where('id',$request->input('id'))->update(['fansnum'=>$fansnum,'fans'=>$fans]);
                return ['id'=>'no','fans'=>$count,'k'=>'删除'];
            }
        }
        
        }else{
            return ['login'=>'login'];
        }
    }

}

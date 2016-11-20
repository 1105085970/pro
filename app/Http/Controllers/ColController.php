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
use \App\Http\Controllers\PosController;
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
                'Nav'=>['精选'=>['Url'=>'/col','Action'=>'col','Param'=>[]],
                        '已关注'=>['Url'=>'/col/daohang2','Action'=>'col','Param'=>['daohang2']],
                        '你的'=>['Url'=>'/col/yours','Action'=>'col','Param'=>['yours']]]
            ];
        
        return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
        //跳转至后带的值
        //第三个你的导航
        if($request->Param=='yours'){
            if(Auth::check()){
                $chuang='你还没有创建收藏集';
                $arr=DB::table('collections')->where('userid',Auth::id())->get();
                $pic=DB::table('users')->where('id',Auth::id())->first();
                $pictx=DB::table('files')->where('id',$pic->picid)->first();
                foreach($arr as $k=>$v){
                    $cun='关注';
                    $arr1=DB::table('files')->where('id',$arr[$k]->picid)->first();
                    //$arr2=DB::table('files')->where('id',$arr[$k]->userid)->first();
                    $id=explode(',',$arr[$k]->fans);
                    foreach($id as $kk=>$vv){
                        if(Auth::id()==$vv&&Auth::id()!=''){
                            $cun='已关注';
                        }
                    }
                    $arr[$k]->bg=$arr1->path;
                    $arr[$k]->cun=$cun;
                }
                if(count($arr)==0){
                    $sf='没有';
                }else{
                    $sf='有';
                }
                return ['key'=>$chuang,'sf'=>$sf,'key'=>$arr,'tx'=>'123','touxiang'=>$pictx->path];
            }else{
                return ['key'=>'mydl'];
            }
        }
        //第二个已关注
        if($request->Param=='daohang2'){
            if(Auth::check()){
                //$key=0;
                $arr=DB::table('users')->where('id',Auth::id())->get();
                $tx=DB::table('files')->where('id',$arr[0]->picid)->first();
                $arr['tx']=$tx->path;
                if($arr[0]->followcoll==null){
                    $key='你还没有关注';
                    return ['key'=>$key];
                }else{
                    $id=explode(',',$arr[0]->followcoll);
                    $num=count($id);
                    $allid=DB::table('collections')->get();
                    foreach($allid as $k=>$v){
                        $idjh[]=$v->id;
                    }
                    $shu=0;
                    for($n=0;$n<$num-1;$n++){
                        if(in_array($id[$n],$idjh)){
                            $key[$n]=DB::table('collections')->where('id',$id[$n])->first();
                            $bg=DB::table('files')->where('id',$key[$n]->picid)->first();
                            $upic=DB::table('users')->where('id',$key[$n]->userid)->first();
                            $tx=DB::table('files')->where('id',$upic->picid)->first();
                            $key1[$n]['bg']=$bg->path;
                            $key1[$n]['tx']=$tx->path;
                            $shu=1;
                        }
                    }
                    if($shu==0){
                        $key='你还没有关注';
                        return ['key'=>$key];
                    }
                }
                return ['key'=>$key,'pic'=>$key1];
            }else{
                return ['key'=>'mydl'];
            }
        }
        //点击某一个收藏级后出现的页面
        //点击某一个收藏级后出现的页面
        //点击某一个收藏级后出现的页面
        if(!empty($request->Param)){
            $id=explode(',',$request->Param);
            $arr=DB::table('collections')->where('id',$id[0])->first();
            $collid=$id[0];
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
           
            $posts=new PosController;
            $list=[
                'where'=>['posts.collid'=>$collid],
                'id'=>'scjcontent'
            ];
            $posts=$posts->PostContents($request,$list);

            $arr1=Posts::where('userid',$id[0])->get();
            return ['key'=>$arr,'key2'=>$arr1,'panduan'=>'tiao','userid'=>$arru->id,'user'=>$arru->username,'tx'=>$arrf->path,'bg'=>$arrb->path,'posts'=>$posts,'wwid'=>$collid];
        }
        //主页面返回时所带的值，第一次加载
        //主页面返回时所带的值，第一次加载
        //主页面返回时所带的值，第一次加载
        $arr=DB::table('collections')->get();
        foreach($arr as $k=>$v){
            $cun='关注';
            $arr1=DB::table('files')->where('id',$arr[$k]->picid)->first();
            $arr3=DB::table('users')->where('id',$arr[$k]->userid)->first();
            $arr2=DB::table('files')->where('id',$arr3->picid)->first();
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
        $m=-1;
        $arr=DB::table('collections')->where('id',$request->input('id'))->first();
        
        //!!!!!!!此时添加的fans路径下的id不是用户的id，后期要修改！！！！！！！！！！！！！！！！！！！！！！
        $followcoll=DB::table('users')->where('id',Auth::id())->first();
        if($followcoll->followcoll==null){
            $foll=$followcoll->followcoll.$request->input('id').',';
            $followcoll1=DB::table('users')->where('id',Auth::id())->update(['followcoll'=>$foll]);
        }else{
            $foll=explode(',',$followcoll->followcoll);
            $count1=count($foll);
            for($n=0;$n<$count1-1;$n++){
                if($foll[$n]==$request->input('id')){
                    $m=$n;break;
                }
            }
            if($m==-1){
                $foll=$followcoll->followcoll.$request->input('id').',';
                $followcoll1=DB::table('users')->where('id',Auth::id())->update(['followcoll'=>$foll]);
                
            }else{
                unset($foll[$m]);
                $follw=implode(',',$foll);
                $arr1=DB::table('users')->where('id',Auth::id())->update(['followcoll'=>$follw]);
            }
        }
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
    public function PostcharuCollImg(){
        if(is_uploaded_file($_FILES['upfile']['tmp_name'])){
            
            $hou=pathinfo($_FILES['upfile']['name']);
            $name=time().str_random(6).'.'.$hou['extension'];
            $path='/images/'.$name;
            move_uploaded_file($_FILES['upfile']['tmp_name'],'.'.$path);
            $arr['userid']=Auth::id();
            $arr['path']=$path;
            $id=DB::table('files')->insertGetId($arr);
            return ['arr'=>$id];
        }
    }
    public function PostcharuColl(Request $request){
        
        $this->validate($request,[
            'title'=>'required|unique:collections',
            'slogan'=>'required',
        ],[
            'title.required'=>'请填写收藏集名称',
            'title.unique'=>'收藏集名称已存在',
            'slogan.required'=>'请填写个性宣言',
        ]);
            if($request->gaitu=='gai'){
                $lastid=DB::table('files')->orderBy('id','desc')->first();
                 $arr['picid']=$lastid->id;
            }
            
            $arr['title']=$request->title;
            $arr['slogan']=$request->slogan;
            $arr['addtime']=time();
            $arr['userid']=Auth::id();
           
            $arr['background']=$request->background;
            $arr1=DB::table('collections')->insert($arr);
        return ['cg'=>'cg','background'=>$request->background];
    }
    public function Postfztp(Request $request){
        // move_uploaded_file($request->url,'/100.jpg');
        file_put_contents('E:/wamp/www/aaa.jpg',$request->url);
        //move_uploaded_file('/22.jpg','/111.jpg');
        return ['url'=>$request->url];
    }
    //判断
    public function Postcaozuo(Request $request){
        $arr=DB::table('collections')->where('id',$request->scid)->first();
        if($arr->userid==Auth::id()){
            $sbs='自己的';
        }else{
            $sbs='别人的';
        }
        return ['sbs'=>$sbs];
    }
    //删除收藏集
    public function Postdelete(Request $request){
        $arr=DB::table('collections')->where('id',$request->id)->delete();
        if($arr){
            $del='成功';
        }else{
            $del='失败';
        }
        return ['del'=>$del];
    }
    //修改收藏集
    public function Postxg(Request $request){
        $arr=DB::table('collections')->where('id',$request->xgid)->first();
        $pic=DB::table('files')->where('id',$arr->picid)->first();
        $arr->path=$pic->path;
        return ['arr'=>$arr];
    }
    public function PostxgCollImg(Request $request){
        if(is_uploaded_file($_FILES['upfile']['tmp_name'])){
            
            $hou=pathinfo($_FILES['upfile']['name']);
            $name=time().str_random(6).'.'.$hou['extension'];
            
            $path='/images/'.$name;
            move_uploaded_file($_FILES['upfile']['tmp_name'],'.'.$path);
            
            $arr['path']=$path;
            $id=DB::table('files')->where('id',$request->input('picid'))->update($arr);
            return ['arr'=>$request->input('picid')];
        }
       
    }
    public function PostxiugaiColl(Request $request){
        $this->validate($request,[
                'title'=>'required',
                'slogan'=>'required',
            ],[
                'title.required'=>'请填写收藏集名称',
                'slogan.required'=>'请填写个性宣言',
            ]);
            $arr['title']=$request->title;
            $arr['slogan']=$request->slogan;
            $arr['addtime']=time();
            $arr['userid']=Auth::id();
            $arr['background']=$request->background;
            $arr1=DB::table('collections')->where('id',$request->id)->update($arr);
        return ['cg'=>'cg','background'=>$request->background,'arr'=>$arr];
    }

}
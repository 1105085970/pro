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
        //
        $Newpost='';
        if(Auth::check()){
            $Newpost=1;
        }
        $param=explode(',',$request->Param);

        if(isset($param[1]) && ($param[1]=='admin'||$param[1]=='laji'||$param[1]=='shenhe')){
            $arr=[
            'Background'=>'#0F9D58',
            'CatName'=>'Home',
                'Nav'=>['加入申请'=>['Url'=>'/com/'.$param[0].'/admin','Action'=>'com','Param'=>[$param[0],'admin']],
                        '可能是垃圾内容'=>['Url'=>'/com/'.$param[0].'/laji','Action'=>'com','Param'=>[$param[0],'laji']],
                        '待审核'=>['Url'=>'/com/'.$param[0].'/shenhe','Action'=>'com','Param'=>[$param[0],'shenhe']]]
            ];
            return $arr;
        }else{
            $arr=[
                'Background'=>'#0F9D58',
                'CatName'=>'Home',
                    'Nav'=>['为你推荐'=>['Url'=>'/com','Action'=>'com','Param'=>[]],
                            '已加入'=>['Url'=>'/com/jiaru','Action'=>'com','Param'=>['jiaru']],
                            '你的'=>['Url'=>'/com/ndsq','Action'=>'com','Param'=>['ndsq']]]
                            //'Newpost'=>$Newpost
                ];
            
            return $arr;
        }
    }

    //Post请求主内容
    public function PostContents(Request $request){
        $param=explode(',',$request->Param);
        if(isset($param[1]) && $param[1]=='admin'){
            $arr=DB::table('communities')->where('id',$param[0])->first();
            $clist=DB::table('communities')->get();
            foreach($clist as $k=>$v){
                $clistid[]=$clist[$k]->id;
            }
            if(!in_array($param[0],$clistid)){
                return ['key'=>'不存在','clist'=>$clistid];
            }
            $ulist=DB::table('users')->get();

            foreach($ulist as $k=>$v){
                $listid[]=$ulist[$k]->id;
            }
            if($arr->sqjr==0){
                return ['key'=>'不需要'];
            }else if($arr->examineuser==null){
                return ['key'=>'没有'];
            }
            $uid=explode(',',$arr->examineuser);
            $count=count($uid)-1;
            $user=array();
            $i=0;
            for($n=0;$n<$count;$n++){
                if(in_array($uid[$n],$listid)){
                    $user[$n]=DB::table('users')->where('id',$uid[$n])->first();
                    $path=DB::table('files')->where('id',$user[$n]->picid)->first();
                    $user[$n]->path=$path->path;
                }
            }
            return ['key'=>$user,'key2'=>$param[0],'uid'=>$uid,'ulist'=>$listid];
            

        }elseif(isset($param[1]) && $param[1]=='shenhe'){
            $arr=DB::table('communities')->where('id',$param[0])->first();
            $clist=DB::table('communities')->get();
            foreach($clist as $k=>$v){
                $clistid[]=$clist[$k]->id;
            }
            if(!in_array($param[0],$clistid)){
                return ['key'=>'不存在','clist'=>$clistid];
            }
            if($arr->examinepost==0){
                return ['key'=>'不需要审核'];
            }
            $shenhe=DB::table('posts')->where('state',2)->where('commid',$param[0])->get();
            // if(!isset($shenhe)){
            //     return ['key'=>'没有要审核的'];
            // }
            foreach($shenhe as $k=>$v){
                $ftr=DB::table('users')->where('id',$shenhe[$k]->userid)->first();
                if($shenhe[$k]->picid==null){
                    $shenhe[$k]->path=1;
                }else{
                    $tzpic=DB::table('files')->where('id',$shenhe[$k]->picid)->first();
                    $shenhe[$k]->path=$tzpic->path;
                }
                $shenhe[$k]->username=$ftr->username;
                
            }
            return ['key'=>$shenhe,'shenhe'=>$shenhe,'cname'=>$arr->title,'cid'=>$param[0]];

        }elseif(isset($param[1]) && $param[1]=='laji'){

            $arr=DB::table('communities')->where('id',$param[0])->first();
            //判断是否存在这个id
            $clist=DB::table('communities')->get();
            foreach($clist as $k=>$v){
                $clistid[]=$clist[$k]->id;
            }
            if(!in_array($param[0],$clistid)){
                return ['key'=>'不存在','clist'=>$clistid];
            }
            if($arr->examinepost==0){
                return ['key'=>'没有'];
            }
            $shenhe=DB::table('posts')->where('state',0)->where('commid',$param[0])->get();
            foreach($shenhe as $k=>$v){
                $ftr=DB::table('users')->where('id',$shenhe[$k]->userid)->first();
                if($shenhe[$k]->picid==null){
                    $shenhe[$k]->path=1;
                }else{
                    $tzpic=DB::table('files')->where('id',$shenhe[$k]->picid)->first();
                    $shenhe[$k]->path=$tzpic->path;
                }
                $shenhe[$k]->username=$ftr->username;
                
            }
            return ['key'=>$shenhe,'shenhe'=>$shenhe,'cname'=>$arr->title,'cid'=>$param[0]];

        }elseif($request->Param=='ndsq'){//你的社区！！！！！！！！！！！！！！！！！！！！！！！！！！！
            if(Auth::check()){
                $chuang='你还没有创建社区';
                $arr=DB::table('communities')->where('userid',Auth::id())->get();
                $pic=DB::table('users')->where('id',Auth::id())->first();
                $pictx=DB::table('files')->where('id',$pic->picid)->first();
                $alluid=DB::table('users')->get();
                foreach($alluid as $k=>$v){
                    $uidjh[]=$v->id;
                }
                foreach($arr as $k=>$v){
                   
                    $arr1=DB::table('files')->where('id',$arr[$k]->picid)->first();
                    if($arr[$k]->admins!=null){
                        $path=array();
                        $admins=explode(',',$arr[$k]->admins);
                        for($a=0;$a<(count($admins));$a++){
                           if(in_array($admins[$a],$uidjh)){
                                $uu=DB::table('users')->where('id',$admins[$a])->first();
                                $pp=DB::table('files')->where('id',$uu->picid)->first();
                                $path[]=$pp->path;
                           }
                        }
                        $arr[$k]->path=$path;
                    }
                    $arr[$k]->bg=$arr1->path;
                   
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
        if($request->Param=='jiaru'){//已加入！！！！！！！！！！！！！！！！！！！！！！
            if(Auth::check()){
                //$key=0;
                
                $arr=DB::table('users')->where('id',Auth::id())->get();
                $tx=DB::table('files')->where('id',$arr[0]->picid)->first();
                $arr['tx']=$tx->path;
                if($arr[0]->followcomm==null){
                    $key='你还没有加入';
                    return ['key'=>$key,'aaa'=>1];
                }else{
                    $id=explode(',',$arr[0]->followcomm);
                    $num=count($id);
                    $allid=DB::table('communities')->get();
                    foreach($allid as $k=>$v){
                        $idjh[]=$v->id;
                    }
                    $alluid=DB::table('users')->get();
                    foreach($alluid as $k=>$v){
                        $uidjh[]=$v->id;
                    }
                    $shu=0;
                    for($n=0;$n<$num-1;$n++){
                        if(in_array($id[$n],$idjh)){
                            $key[$n]=DB::table('communities')->where('id',$id[$n])->first();
                            if($key[$n]->admins!=null){
                                $path=array();
                                $admins=explode(',',$key[$n]->admins);
                                for($a=0;$a<(count($admins));$a++){
                                   if(in_array($admins[$a],$uidjh)){
                                        $uu=DB::table('users')->where('id',$admins[$a])->first();
                                        $pp=DB::table('files')->where('id',$uu->picid)->first();
                                        $path[]=$pp->path;
                                   }
                                }
                                $key[$n]->path=$path;
                            }
                            $bg=DB::table('files')->where('id',$key[$n]->picid)->first();
                            $upic=DB::table('users')->where('id',$key[$n]->userid)->first();
                            $tx=DB::table('files')->where('id',$upic->picid)->first();
                            $key1[$n]['bg']=$bg->path;
                            $key1[$n]['tx']=$tx->path;
                            $shu=1;
                        }
                    }
                    if($shu==0){
                        $key='你还没有加入';
                        return ['key'=>$key,'bbb'=>$idjh,'ccc'=>$id];
                    }
                }
                return ['key'=>$key,'pic'=>$key1];
            }else{
                return ['key'=>'mydl'];
            }
        }

        //社区首页返回所需要的值
        if(!empty($request->Param)){
            $id=explode(',',$request->Param);
            $clist=DB::table('communities')->get();
            foreach($clist as $k=>$v){
                $clistid[]=$clist[$k]->id;
            }
            $ai=0;
            if(in_array($id[0],$clistid)){
                $ai=1;
            }
            if($ai==0){
                return ['key'=>'不存在','clist'=>$clistid];
            }else{
            $arr=DB::table('communities')->where('id',$id[0])->get();
            if($arr[0]->userid==Auth::id()){
                $gbg="管理";
            }else{
                $gbg='不是管理';
            }
            $commid=$id[0];
            $txid=DB::table('users')->where('id',$arr[0]->userid)->first();
            $txpath=DB::table('files')->where('id',$txid->picid)->first();
            $arru=DB::table('users')->where('id',$arr[0]->userid)->first();
            $alluid=DB::table('users')->get();
            foreach($alluid as $k=>$v){
                $uidjh[]=$v->id;
            }
            foreach($arr as $k=>$v){
                $cun='加入';
                if($arr[$k]->sqjr==1){
                     $cun='申请加入';
                }
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
                        if(in_array($vv,$uidjh)){
                            $list1=DB::table('users')->where('id',$vv)->first();
                            $list2=DB::table('files')->where('id',$list1->picid)->first();
                            $list[]=$list2->path;
                        }
                    }
                    $arr[$k]->img=$list;
                }
            }
            $posts=new PosController;
            $list=[
                'where'=>['posts.commid'=>$commid],
                'id'=>'sqcontent'
            ];
            $posts=$posts->PostContents($request,$list);
            return ['key'=>$arr,'key2'=>$request->Param,'user'=>$arru->username,'bg'=>$bg->path,'shequ'=>'shequ','tx'=>$txpath->path,'posts'=>$posts,'gbg'=>$gbg];
        }
        }
        $arr=DB::table('communities')->get();
        $alluid=DB::table('users')->get();
        foreach($alluid as $k=>$v){
            $uidjh[]=$v->id;
        }
        foreach($arr as $k=>$v){
            $cun='加入';
             if($arr[$k]->sqjr==1){
                 $cun='申请加入';
            }
            $id2=explode(',',$arr[$k]->examineuser);
            $id=explode(',',$arr[$k]->members);
            if(in_array(Auth::id(),$id2)){
                $cun='取消申请';
            }else{
                foreach($id as $kk=>$vv){
                    if(Auth::id()==$vv){
                        $cun='已加入';
                    }
                }
            }
            
            $arr[$k]->cun=$cun;
            $list=array();
            $txid=DB::table('users')->where('id',$arr[$k]->userid)->first();
            $txpath=DB::table('files')->where('id',$txid->picid)->first();
            $bg=DB::table('files')->where('id',$arr[$k]->picid)->first();
            $arr[$k]->bg=$bg->path;
            $arr[$k]->tx=$txpath->path;
            $admin=explode(',',$arr[$k]->admins);
            if(count($admin)!=1){
                foreach($admin as $kk=>$vv){
                    if(in_array($vv,$uidjh)){
                        $list1=DB::table('users')->where('id',$vv)->first();
                        $list2=DB::table('files')->where('id',$list1->picid)->first();
                        $list[]=$list2->path;
                    }
                }
                $arr[$k]->img=$list;
            }
        }
        return ['key'=>$arr,'bg'=>$bg->path,'list'=>$list,'key2'=>Auth::id()];
    }
    public function Postjiaru(Request $request){
        if(Auth::check()){
            $k=-1;
            $m=-1;
            $l=-1;
            $followcoll=DB::table('users')->where('id',Auth::id())->first();
            $sqjr=DB::table('communities')->where('id',$request->input('id'))->first();
            $exam2=explode(',',$sqjr->members);
            $count=count($exam2)-1;
            for($y=0;$y<$count;$y++){
                if($exam2[$y]==Auth::id()){
                    $l=$y;
                }
            }
            if($sqjr->sqjr==0){
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
            }else if($l!=-1){
                unset($exam2[$l]);
                $members=implode(',',$exam2);
                $arr6=DB::table('communities')->where('id',$request->input('id'))->update(['members'=>$members]);
                return ['id'=>'wanshi','y'=>$l];
            }else{
                $arr=DB::table('communities')->where('id',$request->input('id'))->first();
                if($arr->examineuser==null){
                    $examineuser=Auth::id().',';
                    $arr=DB::table('communities')->where('id',$request->input('id'))->update(['examineuser'=>$examineuser]);
                }else{
                    $pp=-1;
                    $sid=explode(',',$arr->examineuser);
                    $count1=count($sid);
                    for($n=0;$n<$count1-1;$n++){
                        if($sid[$n]==Auth::id()){
                            $pp=$n;break;
                        }
                    }
                    if($pp==-1){
                        $exam=$arr->examineuser.Auth::id().',';
                        $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['examineuser'=>$exam]);
                        
                    }else{
                        unset($sid[$pp]);
                        $exam=implode(',',$sid);
                        $arr1=DB::table('communities')->where('id',$request->input('id'))->update(['examineuser'=>$exam]);
                        $arr2=DB::table('users')->where('id',Auth::id())->first();
                        $comm8=explode(',',$arr2->followcomm);
                        $kkk=-1;
                        foreach($com8 as $k=>$v){
                            if($v==$request->input('id')){
                                $kkk=$k;break;
                            }
                        }
                        unset($com8[$kkk]);
                        $follow9=implode(',',$com8);
                        $arr3=DB::table('users')->where('id',Auth::id())->update($follow9);
                        return ['id'=>'quxiao'];
                    }
                }
                return ['id'=>'shenqing'];
            }
        }else{
            return ['login'=>'login'];
        }
    }
    public function PostcharuComm(Request $request){
        
        $this->validate($request,[
            'title'=>'required|unique:communities',
            'slogan'=>'required',
        ],[
            'title.required'=>'请填写社群名称',
            'title.unique'=>'社群名称已存在',
            'slogan.required'=>'请填写个性宣言',
        ]);
            
            $arr['title']=$request->title;
            $arr['slogan']=$request->slogan;
            $arr['sqjr']=$request->sqjr;
            $arr['examinepost']=$request->examinepost;
            $arr['addtime']=time();
            $arr['userid']=Auth::id();
           
            
            $arr1=DB::table('communities')->insert($arr);
        return ['cg'=>'cg'];
    }
    //判断社区是不是自己的
    public function Postcaozuo(Request $request){
        $arr=DB::table('communities')->where('id',$request->scid)->first();
        if($arr->userid==Auth::id()){
            $sbs='自己的';
        }else{
            $sbs='别人的';
        }
        return ['sbs'=>$sbs];
    }
    public function Postdelete(Request $request){
        $arr=DB::table('communities')->where('id',$request->id)->delete();
        if($arr){
            $del='成功';
        }else{
            $del='失败';
        }
        return ['del'=>$del];
    }
    public function Postpizhun(Request $request){
        $arr=DB::table('communities')->where('id',$request->comid)->first();
        $uid=explode(',',$arr->examineuser);
        $count=count($uid)-1;
        for($n=0;$n<$count;$n++){
            if($request->uid==$uid[$n]){
                unset($uid[$n]);
            }
        }
        $examineuser=implode(',',$uid);
        
        $members=$arr->members.$request->uid.',';
        $membernum=$arr->membernum+1;
        $update['examineuser']=$examineuser;
        $update['members']=$members;
        $update['membernum']=$membernum;
        $arr1=DB::table('communities')->where('id',$request->comid)->update($update);
        $arr2=DB::table('users')->where('id',$request->uid)->first();
        if($arr2->followcomm==''){
            $followcomm=$request->comid.',';
        }else{
            $followcomm=$arr2->followcomm.$request->comid.',';
        }
        $arr3=DB::table('users')->where('id',$request->uid)->update(['followcomm'=>$followcomm]);
        return ['key'=>$update];
    }
    public function Postjujue(Request $request){
        $arr=DB::table('communities')->where('id',$request->comid)->first();
        $uid=explode(',',$arr->examineuser);
        $count=count($uid)-1;
        for($n=0;$n<$count;$n++){
            if($request->uid==$uid[$n]){
                unset($uid[$n]);
            }
        }
        $examineuser=implode(',',$uid);
        
        //$members=$arr->members.$request->uid.',';
        //$membernum=$arr->membernum-1;
        $update['examineuser']=$examineuser;
        //$update['members']=$members;
        //$update['membernum']=$membernum;
        $arr1=DB::table('communities')->where('id',$request->comid)->update($update);
        return ['key'=>$update];
    }
    public function Postxg(Request $request){
        $arr=DB::table('communities')->where('id',$request->xgid)->first();
        $pic=DB::table('files')->where('id',$arr->picid)->first();
        $arr->path=$pic->path;
        return ['arr'=>$arr];
    }
    public function PostxgCommImg(Request $request){
        if(is_uploaded_file($_FILES['upfile']['tmp_name'])){
            
            $hou=pathinfo($_FILES['upfile']['name']);
            $name=time().str_random(6).'.'.$hou['extension'];
            
            $path='/images/'.$name;
            move_uploaded_file($_FILES['upfile']['tmp_name'],'.'.$path);
            
            $arr['path']=$path;
            if($request->input('picid')==1||$request->input('picid')==2){
                $arr['userid']=Auth::id();
                $arr['addtime']=time();
                $id=DB::table('files')->insertGetId($arr);
            }else{
                $id1=DB::table('files')->where('id',$request->input('picid'))->update($arr);
                $id=$request->input('picid');
            }
            
            return ['arr'=>$request->input('picid'),'id'=>$id];
        }
    }
    public function PostxiugaiComm(Request $request){
        $this->validate($request,[
                'title'=>'required',
                'slogan'=>'required',
            ],[
                'title.required'=>'请填写收藏集名称',
                'slogan.required'=>'请填写个性宣言',
            ]);
        if($request->ccc!=0){
           
            $arr['picid']=$request->ccc;
        }
            $arr['title']=$request->title;
            $arr['slogan']=$request->slogan;
            $arr['addtime']=time();
            $arr['userid']=Auth::id();
            if($request->describe!=''){
                $arr['describe']=$request->describe;
            }
            
            $arr1=DB::table('communities')->where('id',$request->id)->update($arr);
        return ['cg'=>'cg','arr'=>$arr,'describe'=>$request->describe];
    }
    public function Postfanhui(Request $request){
        $arr=DB::table('communities')->where('id',$request->comid)->first();
        $arr1=DB::table('users')->where('id',Auth::id())->first();
        return ['key'=>$arr,'key1'=>$arr1];
    }
    public function Postpimg(Request $request){
        if(is_uploaded_file($_FILES['upfile']['tmp_name'])){
            
            $hou=pathinfo($_FILES['upfile']['name']);
            $name=time().str_random(6).'.'.$hou['extension'];
            
            $path='/images/'.$name;
            move_uploaded_file($_FILES['upfile']['tmp_name'],'.'.$path);
            
            $arr['path']=$path;
            $arr['userid']=Auth::id();
            $arr['addtime']=time();
            $id=DB::table('files')->insertGetId($arr);
           
            return ['arr'=>$request->input('picid'),'id'=>$id];
        }
    }
    public function Postcharuposts(Request $request){
        
        if($request->zou!=0){
            
            $arr['picid']=$request->zou;
        }
        $arr1=DB::table('communities')->where('id',$request->commid)->first();
        $arr['content']=$request->content;
        $arr['addtime']=time();
        $arr['userid']=Auth::id();
        if($arr1->examinepost==1){
            $arr['state']=2;
        }else{
            $arr['state']=1;
        }
        $arr['commid']=$request->commid;
        $list=DB::table('posts')->insert($arr);
        return ['cg'=>'cg'];
    }
    public function Posttong(Request $request){
        $arr=DB::table('posts')->where('id',$request->id)->update(['state'=>1]);
        return ['key'=>'cg'];
    }
    public function Posthuishou(Request $request){
        $arr=DB::table('posts')->where('id',$request->id)->update(['state'=>0]);
        return ['key'=>'cg'];
    }
    public function Postsctz(Request $request){
        $arr=DB::table('posts')->where('id',$request->id)->delete();
        return ['key'=>'cg'];
    }
    public function Postaddadmin(Request $request){
        $arr=DB::table('communities')->where('id',$request->comid)->first();
        if($arr->members==''){
            $you='没有';
            return ['you'=>$you];
        }else{
            $list=explode(',',$arr->members);
            return ['list'=>$list,'arr'=>$arr];
        }
        
    }
    public function Postadd(Request $request){
        $arr=DB::table('communities')->where('id',$request->comid)->first();
        $arr1=$arr->admins.$request->id.',';
        $arr=DB::table('communities')->where('id',$request->comid)->update(['admins'=>$arr1]);
        return ['cg'=>'cg'];
    }
}
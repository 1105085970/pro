<?php
/**
* 类名 HomController
*
* 类描述 网站首页的控制器
*
* @author 王保<1105085970@qq.com>
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Http\Controllers\PosController;

class HomController extends Controller
{
    
    //Post请求顶部
    public function PostTop(Request $request){

        $Newpost='';

        if (Auth::check()){
            //登录了
            $Newpost=1;
        }
    	//要求返回一个数组
    	//可能包含的键 
    	//Background 	背景色
    	//Title 		标题
    	//CatName 		类别名
    	//Nav 			横向导航链接数组
    		//例 'Nav'=>['导航1'=>['Url'=>'/ts','Action'=>'hom','Param'=>['Param1','Param2']]]
    	//Newpost        显示发帖按钮
    	$arr=[
    		'Background'=>'#db4437',
    		'CatName'=>'Home',
            'Title'=>'Google+',
            'Newpost'=>$Newpost
            
    	];
    	return $arr;

    }

    //Post请求主内容
    public function PostContents(Request $request){
    	//
    	$pos=new PosController;
        return $pos->PostContents($request);

    }


    //ajax 返回文件列表
    public function Post_getfile(Request $request){

        //如果没有登录
        if(!Auth::check())return 3;

        //当前用户信息
        $user=Auth::user();

        //传过来的全部参数
        $param=$request->Param;

        //准备查询条件
        $arr=['state'=>1,'userid'=>$user->id];

        //返回的值
        $select=[
            'id',       //id
            'path'      //图片地址
        ];

        //如果有类型限制
        if(isset($param['types'])){
            //查询文件
            $file=DB::table('files')
                ->select($select)
                ->where($arr)
                ->whereIn('extension',explode(',', $param['types']))
                ->orderBy('id','desc')
                ->get();
        }else{

            //查询文件
            $file=DB::table('files')
                ->select($select)
                ->where($arr)
                ->orderBy('id','desc')
                ->get();

        } 

        //返回
        
        return $file;
        
    }


    //ajax上传文件
    public function Post_file_upload(Request $request){

        //如果没登录
        if(!Auth::check())return 3;

        //当前用户信息
        $user=Auth::user();

        //该用户文件要保存的路径
        $path=$this->filePath();

        //用户上传的文件
        $files=$request->file('files');

        //允许上传的文件类型
        $types=explode(',', $request->types);

        //循环保存
        foreach($files as $v){

            //判断文件上传是否出错
            if ($v->isValid()){
                //没出错

                //判断是否允许的类型
                if(!in_array($v->getMimeType(), $types))
                    return 1;

                //数据库增加一条文件
                $arr=[
                    'name'=>1,
                    'extension'=>$v->getMimeType(),     //文件类型
                    'userid'=>$user->id,
                    'path'=>1,
                    'addtime'=>time()
                ];
                //插入
                $fid=DB::table('files')->insertGetId($arr);

                //文件后缀名
                $hou=array_slice(explode('.',$v->getClientOriginalName()),-1)[0];

                //更新
                $arr=[
                    'name'=>$fid,
                    'path'=>$path.$fid.'.'.$hou
                ];
                DB::table('files')->where('id',$fid)->update($arr);

                //移动文件到新的位置
                $v->storeAs($path,$fid.'.'.$hou);
                
            }else{
                //上传出错
                return 2;
            }

        }

        $request->Param=['types'=>$request->types];

        //返回用户所有文件数据
        return $this->Post_getfile($request);


    }


    //返回用户文件地址保存
    public function filePath($userid=''){

        //如果没有名字
        if(!$userid)
            $user=Auth::user();
        else
            $user=DB::table('users')->where('id',$userid)->first();

        //用户注册时间
        $date=date_create($user->created_at);

        //年
        $year=date_format($date,"Y");

        //月
        $mon=date_format($date,"m");

        //日
        $day=date_format($date,"d");

        //该用户文件要保存的路径
        $path='/files/'.$year.'/'.$mon.'/'.$day.'/'.$user->id.'/';

        return $path;

    }


    //返回文件
    public function Files($a,$b,$c,$d,$e){

        return response()->file(storage_path('app/files/'.$a.'/'.$b.'/'.$c.'/'.$d.'/'.$e));

    }


}

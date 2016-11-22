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
                ->get();
        }else{

            //查询文件
            $file=DB::table('files')
                ->select($select)
                ->where($arr)
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

        //用户上传的文件
        $files=$request->file('files');

        //循环保存
        foreach($files as $v){

            //判断文件上传是否出错
            if ($v->isValid()){
                //没出错
                $v->store('123');
                return 111;
            }

        }


    }


}

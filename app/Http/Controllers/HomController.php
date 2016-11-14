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


}

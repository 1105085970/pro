<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers;

use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LogController extends Controller
{
    
    //GET请求
    public function Index(Request $request){
        return view('login.login');
    }

    //Post查找邮箱是否存在
    public function Post_find_email(Request $request){
    	//从数据库查询
    	$find=DB::table('users')->where('email',$request->input('email'))->first();
    	//如果存在返回用户名和头像
    	if($find)return ['name'=>$find->username,'pic'=>$find->picid];
    	return;
    }

    //Post登录验证
    public function Post_sign_in(Request $request){
    	if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('pass')])) {
            // Authentication passed...
            return redirect()->intended('dashboard');
        }
    }
    

}

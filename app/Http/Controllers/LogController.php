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
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class LogController extends Controller
{
    
    //GET请求
    public function Index(Request $request){

    	if (Auth::check()) {
    		// 如果已经登录 跳转到首页
    		return redirect('/');
		}
		//没登录返回登录页视图
        return view('login.login');
    }

    //ajax查找邮箱是否存在
    public function Post_find_email(Request $request){
    	//从数据库查询
    	$find=DB::table('users')
            ->where('users.email',$request->input('email'))
            ->leftjoin('files', 'users.picid', '=', 'files.id')
            ->first();
    	//如果存在返回用户名和头像
    	if($find)return ['name'=>$find->username,'pic'=>$find->path];
    	return;
    }

    //ajax查找用户名是否存在
    public function Post_find_name(Request $request){
    	//从数据库查询
    	$find=DB::table('users')->where('username',$request->input('name'))->first();
    	//如果存在返回1
    	if($find)return 1;
    	return;
    }

    //ajax登录验证
    public function Post_sign_in(Request $request){

    	if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('pass')],$request->input('remember'))) {
            // 如果验证通过
            if(Auth::user()->state==0){
            	//如果状态是禁用
            	return 2;
            }
            return 1;
        }
        //验证失败时
        return 0;
    }

    //get注销用户
    public function Logout(Request $request){
    	//注销用户
    	Auth::logout();
    	//跳到登录页
    	return redirect('/log');
    }
    
    //ajax 注册用户
    public function Post_create_in(Request $request){
    	//正则验证
    	$this->validate($request, [
        	'name' => 'required|unique:users,username|max:100',
        	'email' => 'required|unique:users,email|email',
        	'pass' =>  'required|max:100',
    	]);

    	//如果验证通过
    	
    	$user=new User;
    	$user->username=$request->input('name');
    	$user->email=$request->input('email');
    	$user->password=Hash::make($request->input('pass'));
    	$user->token=str_random(50);

    	if($user->save()){
    		//如果注册成功
    		return 1;
    	}

    	return;

    }

}

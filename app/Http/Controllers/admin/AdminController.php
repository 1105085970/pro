<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class AdminController extends Controller
{
    
   	public function Login(){

   		 return view('admin.login');

   }
   	public function Logindo(Request $request){

   		
   		if (Auth::attempt(array('username' => $request->input('username'), 'password' => $request->input('password')), true))
		{	


				if(Auth::user()->state==3 || Auth::user()->state==4){
						return redirect("/admin");
					}else{
						return redirect('/admin/login')->with('info','权限不够');
					}
		    
		}else{
			return redirect('/admin/login')->with('info','用户名或密码错误');
		}
		
		


   }

   public function index(){
   		$username=Auth::user()->username;
   		$pic=DB::table('users')
   				->join('files', 'users.picid', '=', 'files.id')
   				->select('files.path')
   				->first();
   				//dd($pic);

   		 return view('admin.index',['username'=>$username,'pic'=>$pic]);

   		
   		}
   		public function logout(){

   				Auth::logout();
   				return  redirect('/admin/login');
   			

   		}

}

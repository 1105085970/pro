<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin\circles;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class CirclesController extends Controller
{
      public function index(Request $request){
      //dd("ok");
       $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();
          $list=DB::table('users')
                  ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('username','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','10'));

        //dd($res);
         return view('admin.circles.index',['pic'=>$res,'list'=>$list,'request'=>$request,'username'=>$res->username]);
      }
  
    
   	

}

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
      
       $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();
          $list=DB::table('circles')
                  ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('name','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','5'));

        $list1=DB::table('circles')
                    ->leftJoin('users','users.id','=','circles.userid')
                    ->select('circles.name','circles.id','circles.follownum','circles.addtime','users.username')
                    ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('name','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','5'));

         return view('admin.circles.index',['pic'=>$res,'request'=>$request,'username'=>$res->username,'list1'=>$list1]);
      }
  
    
   	

}

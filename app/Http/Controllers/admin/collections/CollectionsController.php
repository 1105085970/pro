<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin\collections;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class CollectionsController extends Controller
{
      public function index(Request $request){
      
       $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();
          // $list=DB::table('collections')
          //         ->where(function($query)use($request){
          //            $search=$request->input('search');
          //            if(!empty($search)){
          //               $query->where('username','like','%'.$search.'%');
          //            }
          //         })
          //         ->paginate($request->input('show','5'));

        $list1=DB::table('collections')
                    ->leftJoin('users','collections.userid','=','users.id')
                    ->leftJoin('files','collections.picid','=','files.id')
                    ->select('collections.id as id','collections.title as title','users.username as username','collections.fansnum as fansnum','collections.postnum as postnum','files.path as path')
                    ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('title','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','5'));
                  
                    

         return view('admin.collections.index',['pic'=>$res,'request'=>$request,'username'=>$res->username,'list1'=>$list1]);
      }
  
    
   	

}

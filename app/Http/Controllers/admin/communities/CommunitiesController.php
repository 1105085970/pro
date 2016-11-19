<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin\communities;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class CommunitiesController extends Controller
{
      public function index(Request $request){
      
       $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();

                // $list=DB::table('communities')
                //         ->where(function($query)use($request){
                //            $search=$request->input('search');
                //            if(!empty($search)){
                //               $query->where('title','like','%'.$search.'%');
                //            }
                //         })
                //         ->paginate($request->input('show','5'));
                 // $list=0;
        $list1=DB::table('communities')
                    ->leftJoin('users','communities.id','=','users.id')
                    ->leftJoin('files','communities.picid','=','files.id')
                    ->leftJoin('commtypes','communities.typeid','=','commtypes.id')
                    ->select('communities.id as id','communities.title as title','users.username as username','files.path as path','communities.membernum as membernum','commtypes.name as name','commtypes.commid as commid')
                     ->where(function($query)use($request){
                           $search=$request->input('search');
                           if(!empty($search)){
                              $query->where('title','like','%'.$search.'%');
                           }
                        })
                        ->paginate($request->input('show','5'));
                    
                    

         return view('admin.communities.index',['pic'=>$res,'request'=>$request,'username'=>$res->username,'list1'=>$list1]);
      }
  
    
   	

}

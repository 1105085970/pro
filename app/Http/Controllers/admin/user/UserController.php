<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin\user;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    

      public function index(Request $request){
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
                  ->paginate($request->input('show','5'));

        // var_dump($list);
           return view('admin.user.index',['pic'=>$res,'username'=>$res->username,'list'=>$list,'request'=>$request]);
      }
      public function xiangqing(Request $request,$targetid){
          $userid=Auth::user()->id;
         //dd($targetid);
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();
        // dd($request->id);
            $list=DB::table('users')
                  ->where('users.id',$targetid)
                  ->leftJoin('files','users.picid','=','files.id')
                  ->select('users.phone as phone','users.slogan as slogan','users.nickname as nickname','users.introduce as introduce','files.path as path','users.residence as residence')
                  ->first();
                  
            
         return view('admin.user.xiangqing',['pic'=>$res,'username'=>$res->username,'list'=>$list]);
      }
      public function editState(Request $request){
          $statu=$request->input('statu');
          $userid=$request->input('userid');
          DB::table('users')
            ->where('id',$userid)
            ->update(['state'=>$statu]);
          return response()->json(array('isSuccess'=>true));
      }

}

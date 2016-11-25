<?php
/**
* 类名 LogController
*
* 类描述 登录注册页的控制器
*
* @author 
*/

namespace App\Http\Controllers\admin\posts;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class PostsController extends Controller
{
      public function index(Request $request){
      
       $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();
          $list=DB::table('posts')
                      ->leftJoin('users','posts.userid','=','users.id')
                      ->leftJoin('votes','posts.voteid','=','votes.id')
                      ->leftJoin('comments','posts.id','comments.postid')
                      ->select('users.username as username','posts.id as id','posts.title as title','posts.type as type','posts.state as state')
                  ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('title','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','5'));
         return view('admin.posts.index',['pic'=>$res,'list'=>$list,'request'=>$request,'username'=>$res->username,'list1'=>$list]);
      }
      public function xiangqing(Request $request){
         $userid=Auth::user()->id;
         $res=DB::table('users')
               ->where('users.id',$userid)
               ->leftJoin('files','users.picid','=','files.id')
               ->select('files.path','users.username')
               ->first();

               $list=DB::table('posts')
                  ->leftJoin('users','posts.userid','=','users.id')
                  ->leftJoin('collections','posts.collid','=','collections.id')
                  ->leftJoin('communities','posts.commid','=','communities.id')
                  ->leftJoin('comments','posts.id','=','comments.postid')
                  ->leftJoin('votes','posts.id','=','votes.postid')
                  ->select('communities.title as title','posts.addtime as addtime','votes.num as num','collections.title as title1','comments.content as content','posts.comments as comments')
                      
                  ->where(function($query)use($request){
                     $search=$request->input('search');
                     if(!empty($search)){
                        $query->where('username','like','%'.$search.'%');
                     }
                  })
                  ->paginate($request->input('show','5'));
               // dd($list);
              
        return view('admin.posts.xiangqing',['pic'=>$res,'list'=>$list,'request'=>$request,'username'=>$res->username,'list'=>$list]);
      }
  
    
   	

}

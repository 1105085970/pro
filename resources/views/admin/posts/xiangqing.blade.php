
@extends('layout.layout')
@section('title','帖子列表')
@section('container')
<div class="mws-panel grid_8">
 	<div class="mws-panel-header">
     	<span><i class='icon-zoom-in'></i>帖子详情</span>
     </div>
     <div class="mws-panel-body no-padding">
     	<form class="mws-form" action="form_layouts.html">
     		<div class="mws-form-inline">
     			<div class="mws-form-row">
     				<label class="mws-form-label">所属社区</label>
     				<div class="mws-form-item">
     					<input type="text" class="small" readonly="true" value="{{$list[0]->title}}">
     				</div>
     			</div>
     			<div class="mws-form-row">
                         <label class="mws-form-label">帖子创建时间</label>
                         <div class="mws-form-item">
                              <input type="text" class="small" readonly="true" value="{{$list[0]->addtime}}">
                         </div>
                    </div>
     			<div class="mws-form-row">
                         <label class="mws-form-label">投票数量</label>
                         <div class="mws-form-item">
                              <input type="text" class="small" readonly="true" value="{{$list[0]->num}}个">
                         </div>
                    </div>
                    <div class="mws-form-row">
                         <label class="mws-form-label">评论数量</label>
                         <div class="mws-form-item">
                              <input type="text" class="small" readonly="true" value="{{$list[0]->comments}}个">
                         </div>
                    </div>
                    <div class="mws-form-row">
                         <label class="mws-form-label">所属收藏集</label>
                         <div class="mws-form-item">
                              <input type="text" class="small" readonly="true" value="{{$list[0]->title1}}">
                         </div>
                    </div>
     			<div class="mws-form-row">
     				<label class="mws-form-label">评论内容</label>
     				<div class="mws-form-item">
     					<textarea rows="" cols="" class="large" readonly="true" style='width:500px;'>
                                   @foreach($list as $k =>$v)
                                        {{$v->content}}
                                   @endforeach                    
                              </textarea>
     				</div>
     			</div>
     			
     			
     		</div>
     		
     	</form>
     </div>    	
 </div>
 @endsection
@extends('layout.layout')
@section('title','用户列表')
@section('container')

<div class="mws-panel grid_8">
	<div class="mws-panel-header">
    	<span><i class="icon-table"></i>用户详情</span>
    </div>
    <div class="mws-panel-body no-padding">
    	<form class="mws-form" action="form_elements.html">
        	<div class="mws-form-inline">
            	<div class="mws-form-row">
                	<label class="mws-form-label">手机号</label>
                	<div class="mws-form-item">
                    	<input type="text" class="large" disabled="disabled" value="{{$list->phone}}">
                    </div>
                </div>
            	<div class="mws-form-row">
                	<label class="mws-form-label">昵称</label>
                	<div class="mws-form-item">
                    	<input type="text" class="large" disabled="disabled" value="{{$list->nickname}}">
                    </div>
                </div>
            	<div class="mws-form-row">
                	<label class="mws-form-label">个性宣言</label>
                	<div class="mws-form-item">
                    	<input type="text" class="large" disabled="disabled" value="{{$list->slogan}}">
                    </div>
                </div>
            	<div class="mws-form-row">
                	<label class="mws-form-label">个人简介</label>
                	<div class="mws-form-item">
                    	<input type="text" class="large" disabled="disabled" value="{{$list->introduce}}">
                    </div>
                </div>
                <div class="mws-form-row">
                    <label class="mws-form-label">头像 <span class="required">*</span></label>
                    <div class="mws-form-item">
                       <img src='{{$list->path}}'>
                    </div>
                </div>
                <div class="mws-form-row">
                    <label class="mws-form-label">居住地</label>
                    <div class="mws-form-item">
                        <input type="text" disabled="disabled" class="large" value="{{$list->residence}}" rel="tooltip" data-placement="left" data-original-title="This is a tooltip">
                    </div>
                </div>
            </div>
        </form>
    </div>    	
</div>

 @endsection
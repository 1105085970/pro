
@extends('layout.layout')
@section('title','社区列表')
@section('container')
<style>
    #pages li{
        float: left;
        height: 20px;
        padding: 0 10px;
        display: block;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        outline: none;
        background-color: #444444;
        color: #fff;
        text-decoration: none;
        border-right: 1px solid rgba(0, 0, 0, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5), inset 0px 1px 0px rgba(255, 255, 255, 0.15);
}
    }
    #pages .active{
        background-color: #88a9eb;
        color:#323232;
    }
    
    #pages a{color:#FFF;} 
    #pages .disabled{
        color:#666666 !important;
        cursor:default;

    }
    #pages{
        height:auto;
        overflow: hidden;
    }
    #pages ul{
        height: auto;
        overflow: hidden;
        margin:0px;
    }
    </style>
<div class="mws-panel grid_8">
<div class="mws-panel-header">
    <span><i class="icon-table"></i> 社区列表</span>
</div>
<div class="mws-panel-body no-padding">
    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper" role="grid">
<form action='/admin/communities/index' method="get">

    <div id="DataTables_Table_1_length" class="dataTables_length"><label>显示<select name='show' size="1" name="DataTables_Table_1_length" aria-controls="DataTables_Table_1">
                <option value="5" @if($request->input('show')==5)selected="selected" @endif>5</option>
                <option value="10" @if($request->input('show')==10)selected="selected" @endif>10</option>
                <option value="15" @if($request->input('show')==15)selected="selected" @endif>15</option>
                <option value="20"@if($request->input('show')==20)selected="selected" @endif>20</option>
                </select>条</label>
                </div>
                <div class="dataTables_filter" id="DataTables_Table_1_filter"><label>关键字: <input type="text" name='search' aria-controls="DataTables_Table_1"></label>
                <input type='submit' value="搜索" class='btn btn-primary'>
                </div>

</form>

     <table class="mws-datatable-fn mws-table dataTable" id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 156px;">社区序号</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 208px;">社区标题</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" style="width: 194px;">所属用户</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 136px;">社区图片</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 101px;">成员数量</th>
                    <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 101px;">所属社区</th>
                    <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 101px;">类别名称</th></tr>
                </thead>
        
     <tbody role="alert" aria-live="polite" aria-relevant="all">
           @foreach($list1 as $k=>$v)
                 <tr class="odd" style='text-align: center;'>
                        <td >{{$list1[$k]->id}}</td>
                        <td class=" ">{{$list1[$k]->title}}</td>
                        <td class=" ">{{$list1[$k]->username}}</td>
                        <td class=" "><img src='{{$list1[$k]->path}}'></td>
                        <td class=" ">{{$list1[$k]->membernum}}个</td>
                        <td class=" ">{{$list1[$k]->commid}}</td>
                        <td class=" ">{{$list1[$k]->name}}</td>
                    </tr>
            @endforeach

                   </tbody></table>
                   <div class="dataTables_paginate paging_full_numbers" id="DataTables_Table_1_paginate">

            <!-- 原分页 -->
           
            <!-- 原分页 -->
                         <div id='pages'>
                    {!! $list->render() !!}
                    </div>
                 </div>
            </div>
        </div>
    </div>
<script>
    $('.select-box').on('change',function(){

        var statu=$(this).val();
        var userid=$(this).attr("data-id");
         $.ajax({
            url:"/admin/user/editstate" ,            
            data:{
                statu:statu,
                userid:userid,
                _token:'{{csrf_token()}}'
            },           
            dataType:'json',           
            type:'POST',                
            success:function(data){
            }                           
        });
    });
        </script>
@endsection

@extends('layout.layout')
@section('title','圈子列表')
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
    <span><i class="icon-table"></i>圈子列表</span>
</div>
<div class="mws-panel-body no-padding">
    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper" role="grid">
<form action='/admin/user/index' method="get">

    <div id="DataTables_Table_1_length" class="dataTables_length"><label>显示<select name='show' size="1" name="DataTables_Table_1_length" aria-controls="DataTables_Table_1">
                <option value="10" @if($request->input('show')==10)selected="selected" @endif>10</option>
                <option value="25" @if($request->input('show')==10)selected="selected" @endif>25</option>
                <option value="50" @if($request->input('show')==10)selected="selected" @endif>50</option>
                <option value="100"@if($request->input('show')==10)selected="selected" @endif>100</option>
                </select>条</label>
                </div>
                <div class="dataTables_filter" id="DataTables_Table_1_filter"><label>关键字: <input type="text" name='search' aria-controls="DataTables_Table_1"></label>
                <input type='submit' value="搜索" class='btn btn-primary'>
                </div>

</form>

     <table class="mws-datatable-fn mws-table dataTable" id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 156px;">圈子编号</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 208px;">圈子名</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" style="width: 194px;">所属用户</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 136px;">圈内用户数量</th><th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 101px;">创建时间</th></tr>
                </thead>
        
     <tbody role="alert" aria-live="polite" aria-relevant="all">
           @foreach($list as $k=>$v)
                 <tr class="odd">
                        <td >{{$v->id}}</td>
                        <td class=" ">{{$v->name}}</td>
                        <td class=" ">{{$v->userid}}</td>
                        <td class=" ">{{$v->follwnum}}</td>
                        <td class=" ">{{$v->addtime}}</td>
                       
                    </tr>
                 @endforeach

                   </tbody></table>
                   <div class="dataTables_paginate paging_full_numbers" id="DataTables_Table_1_paginate">

            <!-- 原分页 -->
            <div class="dataTables_paginate paging_full_numbers" id="DataTables_Table_1_paginate"><a tabindex="0" class="first paginate_button paginate_button_disabled" id="DataTables_Table_1_first">First</a><a tabindex="0" class="previous paginate_button paginate_button_disabled" id="DataTables_Table_1_previous">Previous</a><span><a tabindex="0" class="paginate_active">1</a><a tabindex="0" class="paginate_button">2</a><a tabindex="0" class="paginate_button">3</a><a tabindex="0" class="paginate_button">4</a><a tabindex="0" class="paginate_button">5</a></span><a tabindex="0" class="next paginate_button" id="DataTables_Table_1_next">Next</a><a tabindex="0" class="last paginate_button" id="DataTables_Table_1_last">Last</a>
            <!-- 原分页 -->
                         <div id='pages'>
                    {!! $list->render() !!}
                    </div>
                 </div>
            </div>
        </div>
    </div>
@endsection
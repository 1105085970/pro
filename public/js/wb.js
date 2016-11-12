
//首页
function homContents(data,param){
	$("#Contents").html(data);
}

//搜索页
function seaContents(data,param){
	$("#Contents").html(data);
}

//新帖子表单
function postform(data,arr){

	if(data=='remove'){
		$('#Newpost').css('display','block');
		return;
	}
	//隐藏按钮
	$('#Newpost').css('display','none');
	$('#'+arr.Id).html(data);

}
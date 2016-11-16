var scj="";
var leftmargin=360;//距离左侧的距离
function colContents(data,param){
	if(param=='yours'){
		$('#Contents').empty();
		var div=createScj();
		var smalldiv='';
	
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		smalldiv="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian chuang' onclick='chuangjian()'><div class='fa fa-plus-circle jc'></div><div class='shou'>创建收藏集</div></div></div>";
		
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	if(param=='daohang2'){
		$('#Contents').empty();
		console.log(data['key']);
		//没有关注的时候
		if(data['key']=='你还没有关注'){
			var div=createScj();
			var mei="<div style='width:100%;line-height:100px;font-size:40px;text-align:center;color:#7A7A7A;margin-top:50px;'>暂无收藏集</div>";
			var mpic="<div style='margin:0px auto;'><img src='/meiyou.jpg' /></div>";
			var wenzi1="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>你关注的收藏集会在此处显示。</div>";
			var wenzi2="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>还没有头绪吗？请查看“精选”标签。</div>";
			div.html(mei+mpic+wenzi1+wenzi2);
			div.appendTo("#Contents");
			return;
		}
		
		//console.log(data['bg']);
		var div=createScj();
		var smalldiv='';
	
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		for(k in data['key']){
			var title="<div class='title'>"+data['key'][k].title+"</div>";
			var biaoyu="<div class='biaoyu'>"+((data['key'][k].slogan)?data['key'][k].slogan:'')+"</div>";
			var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>已关注</div>";
			var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
			var img="<a href='#' onclick=\""+on+"\"><img src='"+data['pic'][k].bg+"' class='img1'/></a>";
			var circle="<div class='circle' style='margin-left:-20px;'><img src='"+data['pic'][k].tx+"' class='img1'/></div>";
			smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	
	if(data['panduan']=='tiao'){
		$('.bigdiv').remove();
		var div=createT();
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang()' onmouseover='dmouse()'></div>";
		var tou="<div class='tou'><img src='"+data['tx']+"' /></div>";
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>"+data['user']+"</div>";
		//
		//
		//用户的ID用来查找个人资料
		var userid="<div class='user'>"+data['userid']+"</div>";
		//
		//
		//
		var title2="<div class='title2'>"+data['key']['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data['key']['slogan'])?data['key']['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		var guan="<span class='guan guan"+data['key'].id+"' onclick='gclick1("+data['key'].id+")' onmouseover='gover("+data['key'].id+")' onmouseout='gout("+data['key'].id+")'>"+data['key'].cun+"</span>";
		//var guanzhu="<div class='gz guanzhu"+data['key'].id+"' onclick='click1("+data['key'].id+")' onmouseover='over("+data['key'].id+")' onmouseout='out("+data['key'].id+")'>"+data['key'].cun+"</div>";
		var tleft="<div class='col-lg-3 col-sm-7 col-xs-7 tleft'>"+duo+"<img src='"+data['bg']+"' class='timg'><div style='width:100%;height:100%;background:#A900FF;'>"+tou+zw+user+title2+xuanyan+guan+"</div></div>";//跳转至后的左侧div

		var tx="<div class='tx'><img src='/photo.jpg' /></div>";//头像
		var name="<div class='name'>Meici Tail</div>";//名字
		var thumb="<div class='fa fa-thumb-tack biao'></div>";
		var tmtop="<div class='tmtop'>"+tx+name+thumb+"</div>";//上马的div
		var wen="<div class='wen'><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡。</p></div>";
		var jia1="<div class='jia1'  onmouseover='jia1()'>+1</div>";
		var jnum="<div class='jnum'>123</div>";
		var plan="<div class='fa  fa-commenting-o plan'></div>";//点击评论的按钮
		var tx2="<div class='tx2'><img src='/photo.jpg' /></div>";
		var nr="<div class='nr'>哈哈哈：哈哈哈哈哈哈哈哈啊啊哈哈哈哈啊哈哈哈</div>";
		var pl="<div class='pl'>"+tx2+nr+"</div>";
		var tmain="<div class='col-lg-5 col-sm-7 col-xs-7 tmain1 tmain'><div style='background:#FFF;'>"+tmtop+wen+"<img class='img' src='/1.jpg'/>"+jia1+jnum+plan+pl+"</div></div><div class='col-lg-5 col-sm-7 col-xs-7 tmain1 tmain'><img src='/2.jpg'/></div>";
		div.html(tleft+tmain);
		div.appendTo('#Contents');
		return;
	}
	var div=createScj();
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scjMain(data)+'</div>');
}
//鼠标悬浮效果


//创建收藏集的div

function createT(){
	var div=$('<div class="row tiao" style=""></div>');
	return div;
}
function createX(){
	var div=$('<div class="row fang"></div>');
	return div;
}
//当三个点被点击时出现的方块
var dian=0;
function fang(){
	if(dian==0){
		var div=createX();
		var hang1="<span class='fspan'>123123</span>";
		var hang2="<span class='fspan'>456456</span>";
		var nei=hang1+hang2;
		div.html(nei);
		div.appendTo('.tleft');
		$('.duo').addClass('duo1');
		
		dian=1;
	}else{
		$('.fang').remove();
		$('.duo').removeClass('duo1');
		dian=0;
	}
}
function dmouse(){
	document.title='ooooo';
	$('.duo').css('cursor','pointer');
}
function jia1(){
	document.title='ooooo';
	$('.jia1').css('cursor','pointer');
}



//社区的内容
function comContents(data2,Param){
	$('#Contents').empty();


	if(data2['shequ']=='shequ'){
		$('.bigdiv').remove();
		//$("#SubClass").remove();
		//$("#Navigation").remove();
		var div=createT();
		
		//var share="<div class='fa fa-share-alt share'></div>";
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang()' onmouseover='dmouse()'></div>";

		var tou="<div class='circle sqcircle' style='margin-left:-40px;z-index:20;'><img src='/2.webp'></div>";
		for(h in data2['key'][0].img){
			tou+="<div class='circle sqcircle' style='margin-left:"+h*40+"px;z-index:"+(data2['key'][0].img.length-h)+"'><img src='"+data2['key'][0].img[h]+"'></div>";
			document.title=data2['key'][0].img[h];
		}
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>"+data2['user']+"</div>";
		var title2="<div class='title2'>"+data2['key'][0]['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data2['key'][0]['slogan'])?data2['key'][0]['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		//var guan="<span class='guan'>"+data2['key'][0].cun+"</span>";
		var guan="<span class='guan jiaru"+data2['key'][0].id+"' onclick='click2("+data2['key'][0].id+")' onmouseover='over2("+data2['key'][0].id+")' onmouseout='out2("+data2['key'][0].id+")'>"+data2['key'][0].cun+"</span>";
		var tleft="<div class='col-lg-3 col-sm-7 col-xs-7 tleft'>"+duo+"<img src='"+data2['bg']+"' class='timg'><div style='width:100%;height:100%;background:#A900FF;'>"+tou+zw+user+title2+xuanyan+guan+"</div></div>";//跳转至后的左侧div
		div.html(tleft);
		div.appendTo('#Contents');
		return;
	}
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sqMain(data2)+'</div>');
}




//主内容区块
function createScj(){
	var div=$('<div class="row bigdiv col-md-11" style=""></div>');
	return div;
}
function scjMain(data){
	var smalldiv='';
	
	var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	for(k in data['key']){
		var title="<div class='title'>"+data['key'][k].title+"</div>";
		var biaoyu="<div class='biaoyu'>"+((data['key'][k].slogan)?data['key'][k].slogan:'')+"</div>";
		var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>"+data['key'][k].cun+"</div>";
		var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
		var img="<a href='#' onclick=\""+on+"\"><img src='"+data['key'][k].bg+"' class='img1'/></a>";
		var circle="<div class='circle' style='margin-left:-20px;'><img src='"+data['key'][k].tx+"' class='img1'/></div>";
		smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
	}
	var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
	
	scj=leftdiv+maindiv;
	return scj;
}
function click1(w){
	$.ajax({
		data:{Action:'col',Method:'guanzhu',id:w},
		success:function(data){
			document.title='hahah';
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				$('.guanzhu'+w).html('已关注');
			}else{
				$('.guanzhu'+w).html('关注');
			}
		},
		error:function(data){},
	})
}
function over(w){
	$('.guanzhu'+w).addClass('hover');
}
function out(w){
	$('.guanzhu'+w).removeClass('hover');
}
function gclick1(w){
	$.ajax({
		data:{Action:'col',Method:'guanzhu',id:w},
		success:function(data){
			document.title='hahah';
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				$('.guan'+w).html('已关注');
			}else{
				$('.guan'+w).html('关注');
			}
		},
		error:function(data){},
	})
}
function gover(w){
	$('.guan'+w).addClass('hover');
}
function gout(w){
	$('.guan'+w).removeClass('hover');
}
//社区的方法！！！！！！！！！！！！！！！
function createSq(){
	var div=$('<div class="row bigdiv col-md-11" style=""></div>');
	return div;
}
function sqMain(data2){
	var smalldiv1='';
	var leftdiv1="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	for(j in data2['key']){
		var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='/2.webp'></div>";//创建人的头像
		var title1="<div class='title'>"+data2['key'][j].title+"</div>";
		var biaoyu1="<div class='biaoyu'>"+((data2['key'][j].slogan)?data2['key'][j].slogan:'')+"</div>";
		var guanzhu1="<div class='gz jiaru"+data2['key'][j].id+"' onclick='click2("+data2['key'][j].id+")' onmouseover='over2("+data2['key'][j].id+")' onmouseout='out2("+data2['key'][j].id+")'>"+data2['key'][j].cun+"</div>";
		var on1="return index('com','"+data2['key'][j].id+",导航2','/com/"+data2['key'][j].id+"')";
		var img1="<div style='width:100%;overflow:hidden;'><a href='#' onclick=\""+on1+"\"><img src='"+data2['key'][j].bg+"' class='img1'></a></div>";
		for(h in data2['key'][j].img){//此处循环的是管理员的div
			circle1+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][j].img.length-h)+"'><img src='"+data2['key'][j].img[h]+"'></div>";
			document.title=data2['key'][j].img[h];
		}
		smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+guanzhu1+"</div></div></div>";
	}
	var maindiv1="<div class='row col-md-11 maindiv'>"+smalldiv1+"</div>";//主div
	
	sq=leftdiv1+maindiv1;
	return sq;
}
function click2(w){
	document.title='1231231';
	$.ajax({
		data:{Action:'com',Method:'jiaru',id:w},
		success:function(data){
			document.title='hahah';
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				$('.jiaru'+w).html('已加入');
			}else{
				$('.jiaru'+w).html('加入');
			}
		},
		error:function(data){},
	})
}
function over2(w){
	$('.jiaru'+w).addClass('hover');
}
function out2(w){
	$('.jiaru'+w).removeClass('hover');
}
function chuangjian(){
	var div=bd();
	var cjscj="<div class='cjscj'>创建收藏集</div>";
	var name="<div class='name'><input type='text'  placeholder='名称' class='iname'/></div>";
	var gkfw="<div class='gkfw'>公开范围：<select><option>公开</option></select></div>";
	var wfgg="<div class='wfgg'>设定后无法更改</div>";
	var gxxy="<div class='gxxy'><input type='text' placeholder='个性宣言' class='igxxy'/></div>";
	var quxiao="<div class='quxiao' onclick='haha()'>取消</div>";
	var mingcheng=$('iname').val();
	var xuanyan=$('igxxy').val();
	var cjjh="<div class='cjjh' onclick='createjh()'>创建</div>";
	var hj=cjscj+name+gkfw+wfgg+gxxy+quxiao+cjjh;
	div.html("<div class='col-lg-5 col-md-8 col-sm-10 col-xs-12 fabiao'>"+hj+"</div>");
	div.appendTo('body');
}
function bd(){
	var div=$("<div class='row haha' style='width:100%;height:100%;background:rgba(210,210,210,0.3);position:absolute;margin-top:120px;float:left;margin-top:-367px;margin-left:1px;z-index:101;'></div>");
	
	return div;
}
function haha(){
	$('.haha').remove();
}
function createjh(){
	var a=$('.iname').val();
	var b=$('.igxxy').val();
	var c=$('.igxxy').val().length;
	$(".fabiao").remove();
	var div=bd();
	var ctop="<div class='ctop'><div class='fa fa-remove remove' onclick='haha()'></div><div class='xiugai'>修改收藏集</div><div class='bc'>保存</div></div>";
	var tupian="<div class='tupian'><img src='/2.jpg'></div>";
	var mc="<div class='mc'><input type='text' class='tjmc' value='"+a+"'/></div>";
	var xy="<div class='xy'><input type='text' class='tjxy' value='"+b+"'/></div>";
	var num="<div class='num'>"+c+"/80</div>";
	var hh="<div class='hh'>"+mc+xy+num+"</div>";
	
	var yanse="<div class='yanse'>"+
				"<div class='cl1' ys='#E53935' onclick='bianse(1)' onmouseover='ysover(1)'></div>"+
				"<div class='cl2' ys='#EB3F79' onclick='bianse(2)' onmouseover='ysover(2)'></div>"+
				"<div class='cl3' ys='#A900FF' onclick='bianse(3)' onmouseover='ysover(3)'></div>"+
				"<div class='cl4' ys='#7D56C1' onclick='bianse(4)' onmouseover='ysover(4)'></div>"+
				"<div class='cl5' ys='#5B6ABF' onclick='bianse(5)' onmouseover='ysover(5)'></div>"+
				"<div class='cl6' ys='#1D87E4' onclick='bianse(6)' onmouseover='ysover(6)'></div>"+
				"<div class='cl7' ys='#029AE4' onclick='bianse(7)' onmouseover='ysover(7)'></div>"+
				"<div class='cl8' ys='#00ABC0' onclick='bianse(8)' onmouseover='ysover(8)'></div>"+
				"<div class='cl9' ys='#00887A' onclick='bianse(9)' onmouseover='ysover(9)'></div>"+
				"<div class='cl10' ys='#378D3B' onclick='bianse(10)' onmouseover='ysover(10)'></div>"+
				"<div class='cl11' ys='#679E37' onclick='bianse(11)' onmouseover='ysover(11)'></div>"+
				"<div class='cl12' ys='#F8A724' onclick='bianse(12)' onmouseover='ysover(12)'></div>"+
				"<div class='cl13' ys='#FF6F42' onclick='bianse(13)' onmouseover='ysover(13)'></div>"+
				"<div class='cl14' ys='#8C6D62' onclick='bianse(14)' onmouseover='ysover(14)'></div>"+
				"<div class='cl15' ys='#778F9B' onclick='bianse(15)' onmouseover='ysover(15)'></div>"+
				"<div class='cl16' ys='#414141' onclick='bianse(16)' onmouseover='ysover(16)'></div>"+
			   "</div>";
	var fw="<div class='fw'>公开范围：公开</div>";
	var nrtc="<div class='baocun1'>"+ctop+tupian+hh+yanse+fw+"</div>";
	div.html("<div class='baocun'>"+nrtc+"</div>");
	div.appendTo('body');
}
function bianse(n){
	var jj=$('.cl'+n).attr('ys');
	$('.hh').css('background',jj);
	$('.tjmc').css('background',jj);
	$('.tjxy').css('background',jj);
}
function ysover(n){
	$('.cl'+n).css('cursor','pointer');
}
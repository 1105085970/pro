var scj="";
var leftmargin=360;//距离左侧的距离
function colContents(data,param){
	if(data['panduan']=='tiao'){
		//跳转后的内容
		//移除原有的div
		$('.bigdiv').remove();
		//$("#SubClass").remove();
		//$("#Navigation").remove();
		var div=createT();
		console.log(data['key2']);
		//var share="<div class='fa fa-share-alt share'></div>";
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang()' onmouseover='dmouse()'></div>";
		var tou="<div class='tou'><img src='"+data['tx']+"' /></div>";
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>Meici Tail</div>";
		var title2="<div class='title2'>"+data['key']['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data['key']['slogan'])?data['key']['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		var guan="<span class='guan'>关注</span>";
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
		createX().appendTo('.tleft');
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
		console.log(data2['key']);
		//var share="<div class='fa fa-share-alt share'></div>";
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang()' onmouseover='dmouse()'></div>";
		var tou="<div class='tou'><img src='"+data2['tx']+"' /></div>";
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>Meici Tail</div>";
		var title2="<div class='title2'>"+data2['key'][0]['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data2['key'][0]['slogan'])?data2['key'][0]['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		var guan="<span class='guan'>关注</span>";
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
		var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>关注</div>";
		var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
		var img="<a href='#' onclick=\""+on+"\"><img src='/2.webp' class='img1'/></a>";
		var circle="<div class='circle'></div>";
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
//社区的方法！！！！！！！！！！！！！！！
function createSq(){
	var div=$('<div class="row bigdiv col-md-11" style=""></div>');
	return div;
}
function sqMain(data2){
	var smalldiv1='';
	console.log(data2);
	var leftdiv1="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	for(j in data2['key']){
		var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='/2.webp'></div>";
		var title1="<div class='title'>"+data2['key'][j].title+"</div>";
		var biaoyu1="<div class='biaoyu'>"+((data2['key'][j].slogan)?data2['key'][j].slogan:'')+"</div>";
		var guanzhu1="<div class='gz jiaru"+data2['key'][j].id+"' onclick='click2("+data2['key'][j].id+")' onmouseover='over1("+data2['key'][j].id+")' onmouseout='out1("+data2['key'][j].id+")'>加入</div>";
		var on1="return index('com','"+data2['key'][j].id+",导航2','/com/"+data2['key'][j].id+"')";
		var img1="<a href='#' onclick=\""+on1+"\"><img src='/2.webp' class='img1'></a>";
		for(h in data2['key'][j].img){
			circle1+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][j].img.length-h)+"'><img src='"+data2['key'][j].img[h]+"'></div>";
			document.title=data2['key'][j].img[h];
		}
		smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+guanzhu1+"</div></div></div>";
	}
	var maindiv1="<div class='row col-md-11 maindiv'>"+smalldiv1+"</div>";//主div
	
	sq=leftdiv1+maindiv1;
	console.log(data2['key']);
	return sq;
}
function click2(w){
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
			console.log(data['members']);
		},
		error:function(data){},
	})
}
function over1(w){
	$('.jiaru'+w).addClass('hover');
}
function out1(w){
	$('.jiaru'+w).removeClass('hover');
}
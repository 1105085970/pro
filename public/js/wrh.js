var scj="";
var smalldiv='';
var leftmargin=360;//距离左侧的距离
function colContents(data,param){
	if(data['panduan']=='tiao'){
		//跳转后的内容
		//移除原有的div
		$('.bigdiv').remove();
		$("#SubClass").remove();
		//$("#Navigation").remove();
		var div=createT();
		var share="<div class='fa fa-share-alt share'></div>";
		var duo="<div class='fa fa-ellipsis-v duo'></div>";
		var tou="<div class='tou'><img src='/photo.jpg' /></div>";
		var user="<div class='user'>Meici Tail</div>";
		var title2="<div class='title2'>秘境花園～創作文集Fam Garden Book Creation</div>";
		var xuanyan="<div class='xuanyan'>人生可以選擇～感恩珍惜，遺忘，放手讓它走。 那些曾經引起共鳴和學習成長的人事物，緊緊藏在秘境花園裡。</div>";
		var guan="<span class='guan'>关注</span>";
		var tleft="<div class='tleft'>"+share+duo+tou+"<img src='/zuo.webp'>"+user+title2+xuanyan+guan+"</div>";//跳转至后的左侧div
		var tx="<div class='tx'><img src='/photo.jpg' /></div>";//头像
		var name="<div class='name'>Meici Tail</div>";//名字
		var thumb="<div class='fa fa-thumb-tack biao'></div>";
		var tmtop="<div class='tmtop'>"+tx+name+thumb+"</div>";//上马的div
		var wen="<div><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡，</p><p>山際白雲天，念念杜鵑裡。</p></div>";
		var tmain="<div class='tmain1 tmain'>"+tmtop+wen+"<img src='/1.jpg'/></div><div class='tmain'><img src='/2.jpg'/></div>";
		div.html(tleft+tmain);
		div.appendTo('#Contents');
		return;
	}




	var div=createScj();
	var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	for(k in data['key']){
		var title="<div class='title'>"+data['key'][k].title+"</div>";
		var biaoyu="<div class='biaoyu'>"+((data['key'][k].slogan)?data['key'][k].slogan:'')+"</div>";
		var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>关注</div>";
		var on="return index('col','type,导航2','/col/"+data['key'][k].id+"')";
		var img="<a href='#' onclick=\""+on+"\"><img src='/2.webp'/></a>";
		var circle="<div class='circle'></div>";
		smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
	}
	var maindiv="<div class='col-md-11 maindiv'>"+smalldiv+"</div>";//主div
	
	scj=leftdiv+maindiv;
	div.html(scj);
	div.appendTo('#Contents');
}
//鼠标悬浮效果
function click1(w){
	$.ajax({
		data:{Action:'col',Method:'guanzhu',id:w},
		success:function(data){
			if(data['id']=='yes'){
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
//创建收藏集的div
function createScj(){
	var div=$('<div class="row bigdiv col-md-11" style=""></div>');
	return div;
}
function createT(){
	var div=$('<div class="row tiao" style=""></div>');
	return div;
}
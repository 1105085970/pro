var scj="";
var leftmargin=360;//距离左侧的距离
function colContents(data,param){
	if(param=='yours'){
		Clear_cache('/col/yours');
		$('#Contents').empty();
		if(data['key']=='mydl'){
			location.href='/log';
			return;
		}
		console.log(data);
		var div=createScj();
		var smalldiv='';
		
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		smalldiv="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian chuang' onclick='chuangjian()' style='box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);'><div class='fa fa-plus-circle jc'></div><div class='shou'>创建收藏集</div></div></div>";
		
		if(data['sf']=='有'){
			for(k in data['key']){
				var title="<div class='title'>"+data['key'][k].title+"</div>";
				var biaoyu="<div class='biaoyu'>"+((data['key'][k].slogan)?data['key'][k].slogan:'')+"</div>";
				//var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>"+data['key'][k].cun+"</div>";
				var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
				var img="<a href='#' onclick=\""+on+"\"><img src='"+data['key'][k].bg+"' class='img1'/></a>";
				var circle="<div class='circle' style='margin-left:-20px;'><img src='"+data['touxiang']+"' class='img1'/></div>";
				smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data['key'][k].background+";'>"+circle+title+biaoyu+"</div></div></div>";
			}
			var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		}
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	if(param=='daohang2'){
		Clear_cache('/col/daohang2');
		$('#Contents').empty();
		//没有关注的时候
		$('#Contents').empty();
		if(data['key']=='mydl'){
			location.href='/log';
			return;
		}
		if(data['key']=='你还没有关注'){
			var div=createScj();
			var mei="<div style='width:100%;line-height:100px;font-size:40px;text-align:center;color:#7A7A7A;margin-top:50px;'>暂无收藏集</div>";
			var mpic="<div style='margin:0px auto;'><img src='/images/meiyou.jpg' /></div>";
			var wenzi1="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>你关注的收藏集会在此处显示。</div>";
			var wenzi2="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>还没有头绪吗？请查看“精选”标签。</div>";
			console.log(data);
			div.html(mei+mpic+wenzi1+wenzi2);
			div.appendTo("#Contents");
			return;
		}
		
		var div=createScj();
		var smalldiv='';
	
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		console.log(data);
		for(k in data['key']){
			
			var title="<div class='title'>"+data['key'][k].title+"</div>";
			var biaoyu="<div class='biaoyu'>"+((data['key'][k].slogan)?data['key'][k].slogan:'')+"</div>";
			var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>已关注</div>";
			var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
			var img="<a href='#' onclick=\""+on+"\"><img src='"+data['pic'][k].bg+"' class='img1'/></a>";
			var circle="<div class='circle' style='margin-left:-20px;'><img src='"+data['pic'][k].tx+"' class='img1'/></div>";
			smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data['key'][k].background+"'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	
	if(data['panduan']=='tiao'){
		$('.bigdiv').remove();
		var div=createT();
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang("+data['key']['id']+")' onmouseover='dmouse()'></div>";
		var tou="<div class='tou'><img src='"+data['tx']+"' /></div>";
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>"+data['user']+"</div>";
		//
		//
		//用户的ID用来查找个人资料
		var userid="<div class='user'>"+data['userid']+"</div>";
		//
		//
		//点击某一个收藏级显示该收藏集里的所有帖子
		var title2="<div class='title2'>"+data['key']['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data['key']['slogan'])?data['key']['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		var guan="<span class='guan guan"+data['key'].id+"' onclick='gclick1("+data['key'].id+")' onmouseover='gover("+data['key'].id+")' onmouseout='gout("+data['key'].id+")'>"+data['key'].cun+"</span>";
		
		var tleft="<div class='col-lg-3 col-sm-4 col-xs-4 tleft'>"+duo+"<img src='"+data['bg']+"' class='timg'><div style='width:100%;height:100%;background:"+data['key'].background+";'>"+tou+zw+user+title2+xuanyan+guan+"</div></div>";//跳转至后的左侧div
		var leftdiv="<div class='col-lg-1 col-md-1 col-sm-1 col-xs-1 tleft'></div>";
		
		var main6="<div class='row' id='scjcontent' style='width:100%'></div>";
		div.html(tleft+main6);
		div.appendTo('#Contents');
		
		homContents(data.posts);
		return;
	}
	var div=createScj();
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scjMain(data)+'</div>');//此处调用了scjMain(data2)方法
}
//鼠标悬浮效果


//创建收藏集的div   style="width:100%;height:4000px;background:green;position:absolute;z-index:51;top:137px;left:-97px"

function createT(){
	var div=$('<div class="row tiao"></div>');
	return div;
}
function createX(){
	var div=$('<div class="row fang"></div>');
	return div;
}
//当三个点被点击时出现的方块
//当三个点被点击时出现的方块
//当三个点被点击时出现的方块
var dian=0;
function fang(scid){//传过来要操作的id
	$.ajax({
		data:{Action:'col',Method:'caozuo',scid:scid},
		success:function(data){
			if(data['sbs']=='自己的'){
				if(dian==0){
					var div=createX();
					var hang1="<span class='fspan' onclick='del("+scid+")'>删除收藏集</span>";
					var hang2="<span class='fspan' onclick='xgscj("+scid+")'>修改收藏集</span>";
					var hang3="<span class='fspan' onclick='bangzhu()'>帮助</span>";
					var nei=hang1+hang2+hang3;
					div.html(nei);
					div.appendTo('.tleft');
					$('.duo').addClass('duo1');
					
					dian=1;
				}else{
					$('.fang').remove();
					$('.duo').removeClass('duo1');
					dian=0;
				}
			}else{
				if(dian==0){
					var div=createX();
					var hang1="<span class='fspan' onclick='jubao()'>举报滥用行为</span>";
					var hang2="<span class='fspan' onclick='bangzhu()'>帮助</span>";
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
		},
		error:function(){}
	})
	
}
function jubao(){
	haha();
	//alert('恭喜你，你的账号已被封，截止日期3000年');
}
function del(id){
	$.ajax({
		data:{Action:'col',Method:'delete',id:id},
		success:function(data){
			if(data['del']=='成功'){
				Clear_cache('/col/yours');
				
				index('col','yours','/col/yours');
			}else{
				alert("删除失败");
			}
		},
		error:function(){}
	})
}
function xgscj(scid){
	$.ajax({
		data:{Action:'col',Method:'xg',xgid:scid},
		success:function(data){
			var a=data['arr']['title'];
			var b=data['arr']['slogan'];
			var bj=data['arr']['background'];
			var picid=data['arr']['picid'];
			var path=data['arr']['path'];
			if(data['arr']['slogan']==null){
				var c=0;
			}else{
				var c=data['arr']['slogan'].length;
			}
			$(".fabiao").remove();
			var div=bd();
			//("+scid+","+picid+","+path+")     
			var ctop="<div class='ctop'><div class='fa fa-remove remove' onclick='haha()'></div><div class='xiugai'>修改收藏集</div><div class='bc' onclick='xiugaiColl("+scid+")'>修改</div></div>";
			var hpicid="<input class='picid' type='hidden' value='"+picid+"'>";
			var hpath="<input class='path' type='hidden' value='"+path+"'>";
			var tupian="<div class='tupian'><img id='imgPre' src='"+path+"'></div>";
			var shang="<label><div class='fa fa-camera shang'>"+
				"<form enctype='multipart/form-data' id='sky_upform' name='sky_upform' action='' method='post'>"+
					"<input class='path' name='picid' type='hidden' value='"+picid+"'>"+
					"<input type='file' name='upfile' value='' id='imgUp' onchange=\"preImg(this.id,'imgPre');\" class='scpic'>"+
				"</form>"+
			  "</div></label>";
			var mc="<div class='mc'><input type='text' style='background:"+bj+"' class='tjmc' value='"+a+"'/></div>";
			var xy="<div class='xy'><input type='text' style='background:"+bj+"' id='tjxy' class='tjxy' value='"+b+"'/></div>";
			
			var num="<div class='num'>"+c+"/80</div>";
			var hh="<div class='hh' style='background:"+bj+"'>"+hpicid+hpath+mc+xy+num+"</div>";
			
			var yanse="<div class='yanse'>"+
						"<div class='cl1'  ys='#E53935' onclick='bianse(1)'  onmouseover='ysover(1)' ></div>"+
						"<div class='cl2'  ys='#EB3F79' onclick='bianse(2)'  onmouseover='ysover(2)' ></div>"+
						"<div class='cl3'  ys='#A900FF' onclick='bianse(3)'  onmouseover='ysover(3)' ></div>"+
						"<div class='cl4'  ys='#7D56C1' onclick='bianse(4)'  onmouseover='ysover(4)' ></div>"+
						"<div class='cl5'  ys='#5B6ABF' onclick='bianse(5)'  onmouseover='ysover(5)' ></div>"+
						"<div class='cl6'  ys='#1D87E4' onclick='bianse(6)'  onmouseover='ysover(6)' ></div>"+
						"<div class='cl7'  ys='#029AE4' onclick='bianse(7)'  onmouseover='ysover(7)' ></div>"+
						"<div class='cl8'  ys='#00ABC0' onclick='bianse(8)'  onmouseover='ysover(8)' ></div>"+
						"<div class='cl9'  ys='#00887A' onclick='bianse(9)'  onmouseover='ysover(9)' ></div>"+
						"<div class='cl10' ys='#378D3B' onclick='bianse(10)' onmouseover='ysover(10)'></div>"+
						"<div class='cl11' ys='#679E37' onclick='bianse(11)' onmouseover='ysover(11)'></div>"+
						"<div class='cl12' ys='#F8A724' onclick='bianse(12)' onmouseover='ysover(12)'></div>"+
						"<div class='cl13' ys='#FF6F42' onclick='bianse(13)' onmouseover='ysover(13)'></div>"+
						"<div class='cl14' ys='#8C6D62' onclick='bianse(14)' onmouseover='ysover(14)'></div>"+
						"<div class='cl15' ys='#778F9B' onclick='bianse(15)' onmouseover='ysover(15)'></div>"+
						"<div class='cl16' ys='#414141' onclick='bianse(16)' onmouseover='ysover(16)'></div>"+
					   "</div>";
			var fw="<div class='fw'>公开范围：公开</div>";
			var cuowu="<div class='cuowu'></div>";
			var nrtc="<div class='baocun1'>"+ctop+tupian+shang+hh+yanse+fw+cuowu+"</div>";//内容填充
			div.html("<div class='baocun'>"+nrtc+"</div>");
			div.appendTo('body');
			var tjxy=document.getElementById('tjxy');
			//显示剩余字数的方法
			$('.scpic').on('focus',function(){
				
			})
			$('.scpic').on('blur',function(){
				
			})
			var t1;
			tjxy.onfocus=function(){
				t1=setInterval(function(){
					if((80-tjxy.value.length)<=0){
						tjxy.onkeydown=function(e){
							if(e.keyCode==8){
								return true;
							}else{
								return false;
							}
						}
					}else{
						tjxy.onkeydown=function(){
							return true;
						}
					}
					$('.num').html(tjxy.value.length+"/80");
				},30);
				
			}
			tjxy.onblur=function(){
				clearInterval(t1);
			}
		},
		error:function(){}
	})
	
}
//修改收藏集的数据！！！！！！！！！！！！
//修改收藏集的数据！！！！！！！！！！！！
//修改收藏集的数据！！！！！！！！！！！！
//修改图片
function xiugaiImg(){
    var messtxt;
 	$("#sky_upform").ajaxSubmit({
        type:'post',
        url: "/col/PostxgCollImg",    
        beforeSubmit: function(){
            $("#sky_txt").html("图片上传中...");
        },
        success: function(data){
        	
        	console.log(data);
        },
        resetForm: false,
        clearForm: false
	});
}
//修改其他数据
function xiugaiColl(xgid){
	var picid=$('.picid').val();
	var path=$('.path').val();
	if($('#imgPre').attr('src')!=path){
		xiugaiImg();
	}
	$.ajax({
		data:{Action:'col',Method:'xiugaiColl',title:$('.tjmc').val(),slogan:$('.tjxy').val(),background:jj,id:xgid},
		success:function(data){
			if(data['cg']=='cg'){
				haha();//移除修改的框
				Clear_cache('/col/yours');
				Clear_cache('/col/'+xgid);
				index('col',xgid,'/col/'+xgid);
			}
			
		},
		error:function(data){
			var cuo=data.responseJSON;
			
			
			var i=0;
			var t=setInterval(function(){
				if(i%2==0){
					$('.cuowu').empty();
					if(cuo['title']=='请填写收藏集名称'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else if(cuo['title']=='收藏集名称已存在'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else{
						var tt='';
					}
					if(cuo['slogan']=='请填写个性宣言'){
						var sl="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['slogan']+"</div>";
					}else{
						var sl='';
					}
					var cuowu1="<span class='cuowu1'>"+tt+"</span>";
					var cuowu2="<span class='cuowu2'>"+sl+"</span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}else{
					$('.cuowu').empty();
					var cuowu1="<span class='cuowu1'></span>";
					var cuowu2="<span class='cuowu2'></span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}
				if(i==8){
					$('.cuowu').empty();
					clearInterval(t);
				}
			},500);
		}
	});
}

function bangzhu(){
	alert("这么简单你还看帮助,你咋不去幼儿园呢");
}
function dmouse(){
	
	$('.duo').css('cursor','pointer');
}
function jia1(){
	
	$('.jia1').css('cursor','pointer');
}




//主内容区块
//收藏集的相关方法开始！！！！！！！！！！！！！！
//收藏集的相关方法开始！！！！！！！！！！！！！！
//收藏集的相关方法开始！！！！！！！！！！！！！！
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
		if(data['key'][k].userid==data['key2']){
			var guanzhu='';
		}else{
			var guanzhu="<div class='gz guanzhu"+data['key'][k].id+"' onclick='click1("+data['key'][k].id+")' onmouseover='over("+data['key'][k].id+")' onmouseout='out("+data['key'][k].id+")'>"+data['key'][k].cun+"</div>";
		}
		
		var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
		var img="<a href='#' onclick=\""+on+"\"><img src='"+data['key'][k].bg+"' class='img1'/></a>";
		var circle="<div class='circle' style='margin-left:-20px;'><img src='"+data['key'][k].tx+"' class='img1'/></div>";
		smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data['key'][k].background+";'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
	}
	console.log(data);
	var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
	
	scj=leftdiv+maindiv;
	return scj;
}
function click1(w){
	$.ajax({
		data:{Action:'col',Method:'guanzhu',id:w},
		success:function(data){
			
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				Clear_cache('/col/daohang2');
				index('col','daohang2','/col/daohang2');
				$('.guanzhu'+w).html('已关注');
			}else{
				Clear_cache('/col/daohang2');
				index('col','daohang2','/col/daohang2');
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
			
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				Clear_cache('/col/daohang2');
				index('col','daohang2','/col/daohang2');
				$('.guan'+w).html('已关注');
			}else{
				Clear_cache('/col/daohang2');
				index('col','daohang2','/col/daohang2');
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

//收藏集的方法结束！！！！！！！！！！！！
//收藏集的方法结束！！！！！！！！！！！！
//收藏集的方法结束！！！！！！！！！！！！


function click2(w){
	
	$.ajax({
		data:{Action:'com',Method:'jiaru',id:w},
		success:function(data){
			
			if(data['login']=='login'){
				location.href='/log';
			}else if(data['id']=='yes'){
				$('.jiaru'+w).html('已加入');
				Clear_cache('/com/jiaru');
				index('com','jiaru','/com/jiaru');
				
			}else{
				$('.jiaru'+w).html('加入');
				Clear_cache('/com/jiaru');
				index('com','jiaru','/com/jiaru');
				
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

//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!



//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
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
	var div=$("<div class='row haha' style='width:100%;height:100%;background:rgba(210,210,210,0.3);position:absolute;margin-top:120px;float:left;top:-127px;margin-left:1px;z-index:101;'></div>");
	
	return div;
}
function haha(){
	$('.haha').remove();//移除创建搜藏集的div
}
//无刷新上传图片！！！！！！！！！！
//无刷新上传图片！！！！！！！！！！
//无刷新上传图片！！！！！！！！！！
function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
        url = document.getElementById(sourceId).value;
    } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}

function preImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
    $.ajax({
    	data:{Action:'col',Method:'fztp',url:url},
    	success:function(data){
    		
    	},
    	error:function(){}
    })
    
}
//无刷新上传图片！！！！！！！！！！
//无刷新上传图片！！！！！！！！！！
//无刷新上传图片！！！！！！！！！！
function createjh(){
	var a=$('.iname').val();
	var b=$('.igxxy').val();
	var c=$('.igxxy').val().length;
	$(".fabiao").remove();
	var div=bd();
	var ctop="<div class='ctop'><div class='fa fa-remove remove' onclick='haha()'></div><div class='xiugai'>修改收藏集</div><div class='bc' onclick='charuColl()'>保存</div></div>";
	var tupian="<div class='tupian'><img id='imgPre' src='/images/1.jpg'></div>";
	var shang="<label><div class='fa fa-camera shang'>"+
				"<form enctype='multipart/form-data' id='sky_upform' name='sky_upform' action='' method='post'>"+
					"<input type='file' name='upfile' value='' id='imgUp' onchange=\"preImg(this.id,'imgPre');\" class='scpic'>"+
				"</form>"+
			  "</div></label>";
	var mc="<div class='mc'><input type='text' class='tjmc' value='"+a+"'/></div>";
	var xy="<div class='xy'><input type='text' id='tjxy' class='tjxy' value='"+b+"'/></div>";
	
	var num="<div class='num'>"+c+"/80</div>";
	var hh="<div class='hh'>"+mc+xy+num+"</div>";
	
	var yanse="<div class='yanse'>"+
				"<div class='cl1'  ys='#E53935' onclick='bianse(1)'  onmouseover='ysover(1)' ></div>"+
				"<div class='cl2'  ys='#EB3F79' onclick='bianse(2)'  onmouseover='ysover(2)' ></div>"+
				"<div class='cl3'  ys='#A900FF' onclick='bianse(3)'  onmouseover='ysover(3)' ></div>"+
				"<div class='cl4'  ys='#7D56C1' onclick='bianse(4)'  onmouseover='ysover(4)' ></div>"+
				"<div class='cl5'  ys='#5B6ABF' onclick='bianse(5)'  onmouseover='ysover(5)' ></div>"+
				"<div class='cl6'  ys='#1D87E4' onclick='bianse(6)'  onmouseover='ysover(6)' ></div>"+
				"<div class='cl7'  ys='#029AE4' onclick='bianse(7)'  onmouseover='ysover(7)' ></div>"+
				"<div class='cl8'  ys='#00ABC0' onclick='bianse(8)'  onmouseover='ysover(8)' ></div>"+
				"<div class='cl9'  ys='#00887A' onclick='bianse(9)'  onmouseover='ysover(9)' ></div>"+
				"<div class='cl10' ys='#378D3B' onclick='bianse(10)' onmouseover='ysover(10)'></div>"+
				"<div class='cl11' ys='#679E37' onclick='bianse(11)' onmouseover='ysover(11)'></div>"+
				"<div class='cl12' ys='#F8A724' onclick='bianse(12)' onmouseover='ysover(12)'></div>"+
				"<div class='cl13' ys='#FF6F42' onclick='bianse(13)' onmouseover='ysover(13)'></div>"+
				"<div class='cl14' ys='#8C6D62' onclick='bianse(14)' onmouseover='ysover(14)'></div>"+
				"<div class='cl15' ys='#778F9B' onclick='bianse(15)' onmouseover='ysover(15)'></div>"+
				"<div class='cl16' ys='#414141' onclick='bianse(16)' onmouseover='ysover(16)'></div>"+
			   "</div>";
	var fw="<div class='fw'>公开范围：公开</div>";
	var cuowu="<div class='cuowu'></div>";
	var nrtc="<div class='baocun1'>"+ctop+tupian+shang+hh+yanse+fw+cuowu+"</div>";//内容填充
	div.html("<div class='baocun'>"+nrtc+"</div>");
	div.appendTo('body');
	var tjxy=document.getElementById('tjxy');
	//显示剩余字数的方法
	$('.scpic').on('focus',function(){
		
	})
	$('.scpic').on('blur',function(){
		
	})
	var t1;
	tjxy.onfocus=function(){
		t1=setInterval(function(){
			if((80-tjxy.value.length)<=0){
				tjxy.onkeydown=function(e){
					if(e.keyCode==8){
						return true;
					}else{
						return false;
					}
				}
			}else{
				tjxy.onkeydown=function(){
					return true;
				}
			}
			$('.num').html(tjxy.value.length+"/80");
		},30);
		
	}
	tjxy.onblur=function(){
		clearInterval(t1);
	}
}

//上传图片加入数据库时

//个性宣言的长度
//个性宣言的长度
//个性宣言的长度
function xycd(){
	$('.tjxy').on('change',function(){
		var c=$('.tjxy').val().length;
		return c;
	})
	
}
var jj='#00ABC0';
function bianse(n){
	jj=$('.cl'+n).attr('ys');
	$('.hh').css('background',jj);
	$('.tjmc').css('background',jj);
	$('.tjxy').css('background',jj);
}
function ysover(n){
	$('.cl'+n).css('cursor','pointer');
}

function sky_upfiles(){
    var messtxt;
 	$("#sky_upform").ajaxSubmit({
        type:'post',
        url: "/col/PostcharuCollImg",    
        beforeSubmit: function(){
            $("#sky_txt").html("图片上传中...");
        },
        success: function(data){},
        resetForm: false,
        clearForm: false
	});
}

function charuColl(){
	var gaitu='mei';
	if($('#imgPre').attr('src')!='/images/1.jpg'){
		sky_upfiles();
		gaitu='gai';
	}
	$.ajax({
		data:{Action:'col',Method:'charuColl',title:$('.tjmc').val(),slogan:$('.tjxy').val(),background:jj,gaitu:gaitu},
		success:function(data){
			if(data['cg']=='cg'){
				Clear_cache('/col/yours');
				haha();
			}
			
		},
		error:function(data){
			var cuo=data.responseJSON;
			
			var i=0;
			var t=setInterval(function(){
				if(i%2==0){
					$('.cuowu').empty();
					if(cuo['title']=='请填写收藏集名称'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else if(cuo['title']=='收藏集名称已存在'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else{
						var tt='';
					}
					if(cuo['slogan']=='请填写个性宣言'){
						var sl="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['slogan']+"</div>";
					}else{
						var sl='';
					}
					var cuowu1="<span class='cuowu1'>"+tt+"</span>";
					var cuowu2="<span class='cuowu2'>"+sl+"</span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}else{
					$('.cuowu').empty();
					var cuowu1="<span class='cuowu1'></span>";
					var cuowu2="<span class='cuowu2'></span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}
				if(i==8){
					$('.cuowu').empty();
					clearInterval(t);
				}
			},500);
		}
	});
}
//创建收藏集的方法结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！



//社区的内容!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//社区的内容!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//社区的内容!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//创建新社区的方法
function cjsq(){
	var div=bd();
	var cjscj="<div class='cjscj'>创建社群</div>";
	var name="<div class='name'><input type='text'  placeholder='为此社群命名' class='name1'/></div>";
	var gkfw="<div class='gkfw' style='padding-top:25px;'>公开范围：<select><option>公开</option></select></div>";
	var wfgg="<div class='sqjr' style='margin-top:25px;margin-left:10px;'><div style='float:left;'>申请加入</div><div class='slideThree' style='float:right;'><input type='checkbox' value='None' id='slideThree' name='check'  /><label for='slideThree' class='kai'></label></div></div>";
	var gxxy="<div class='gxxy'><input type='text' placeholder='社区简介' class='gxxy1'/></div>";
	var quxiao="<div class='quxiao' onclick='haha()'>取消</div>";
	var mingcheng=$('iname').val();
	var xuanyan=$('igxxy').val();
	var cjjh="<div class='cjjh' onclick='charuComm()'>创建</div>";
	var hj=cjscj+name+gkfw+wfgg+gxxy+quxiao+cjjh;
	div.html("<div class='col-lg-5 col-md-8 col-sm-10 col-xs-12 fabiao'>"+hj+"</div>");
	div.appendTo('body');
}
function charuComm(){
	var gaitu='mei';
	$.ajax({
		data:{Action:'com',Method:'charuComm',title:$('.name1').val(),slogan:$('.gxxy1').val()},
		success:function(data){
			if(data['cg']=='cg'){
				Clear_cache('/com/ndsq');
				haha();
			}
			
		},
		error:function(data){
			var cuo=data.responseJSON;
			
			var i=0;
			var t=setInterval(function(){
				if(i%2==0){
					$('.cuowu').empty();
					if(cuo['title']=='请填写收藏集名称'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else if(cuo['title']=='收藏集名称已存在'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else{
						var tt='';
					}
					if(cuo['slogan']=='请填写个性宣言'){
						var sl="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['slogan']+"</div>";
					}else{
						var sl='';
					}
					var cuowu1="<span class='cuowu1'>"+tt+"</span>";
					var cuowu2="<span class='cuowu2'>"+sl+"</span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}else{
					$('.cuowu').empty();
					var cuowu1="<span class='cuowu1'></span>";
					var cuowu2="<span class='cuowu2'></span>";
					$('.cuowu').html(cuowu1+cuowu2);
					i++;
				}
				if(i==8){
					$('.cuowu').empty();
					clearInterval(t);
				}
			},500);
		}
	});
}
function comContents(data2,Param){
	Clear_cache('/com');
	console.log(data2);
	if(Param=='ndsq'){
		Clear_cache('/com/ndsq');
		$('#Contents').empty();
		if(data2['key']=='mydl'){
			location.href='/log';
			return;
		}
		console.log(data2);
		var div=createSq();
		var smalldiv='';
		
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		smalldiv="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian chuang' onclick='cjsq()' style='box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);'><div class='fa fa-plus-circle jc'></div><div class='shou' style=''>创建社区</div></div></div>";
		
		if(data2['sf']=='有'){
			for(k in data2['key']){
				var title="<div class='title'>"+data2['key'][k].title+"</div>";
				var biaoyu="<div class='biaoyu'>"+((data2['key'][k].slogan)?data2['key'][k].slogan:'')+"</div>";
				//var guanzhu='"<div class='gz guanzhu"+data2['key'][k].id+"' onclick='click1("+data2['key'][k].id+")' onmouseover='over("+data2['key'][k].id+")' onmouseout='out("+data2['key'][k].id+")'>"+data2['key'][k].cun+"</div>"';
				var guanzhu='';
				var on="return index('com','"+data2['key'][k].id+",导航2','/com/"+data2['key'][k].id+"')";
				var img="<a href='#' onclick=\""+on+"\"><img src='"+data2['key'][k].bg+"' class='img1'/></a>";
				var circle="<div class='circle' style='margin-left:-20px;z-index:20'><img src='"+data2['touxiang']+"' class='img1'/></div>";
				for(h in data2['key'][k].path){//此处循环的是管理员的div
					circle+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][k].path.length-h)+"'><img src='"+data2['key'][k].path[h]+"'></div>";
					
				}
				smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data2['key'][k].background+";'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
			}
			var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
			sq=leftdiv+maindiv;
		}else{
			sq=leftdiv+smalldiv;
		}
		
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sq+'</div>');
		return;
	}
	if(Param=='jiaru'){
		//alert(123);
		Clear_cache('/com/jiaru');
		$('#Contents').empty();
		if(data2['key']=='mydl'){
			location.href='/log';
			return;
		}
		if(data2['key']=='你还没有加入'){
			var div=createSq();
			var mei="<div style='width:100%;line-height:100px;font-size:40px;text-align:center;color:#7A7A7A;margin-top:50px;'>没有加入任何社区</div>";
			var mpic="<div style='margin:0px auto;'><img src='/images/meiyou.jpg' /></div>";
			var wenzi1="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>你加入的社区会在此处显示。</div>";
			var wenzi2="<div style='width:100%;line-height:30px;font-size:20px;text-align:center;color:#7A7A7A;'>还没有头绪吗？请查看“为您推荐”标签。</div>";
			console.log(data2);
			div.html(mei+mpic+wenzi1+wenzi2);
			div.appendTo("#Contents");
			return;
		}
		
		var div=createSq();
		var smalldiv='';
	
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		console.log(data2);
		for(k in data2['key']){
			
			var title="<div class='title'>"+data2['key'][k].title+"</div>";
			var biaoyu="<div class='biaoyu'>"+((data2['key'][k].slogan)?data2['key'][k].slogan:'')+"</div>";
			var guanzhu="<div class='gz gz2 guanzhu"+data2['key'][k].id+"' onclick='click2("+data2['key'][k].id+")' onmouseover='over("+data2['key'][k].id+")' onmouseout='out("+data2['key'][k].id+")'>已加入</div>";
			var on="return index('com','"+data2['key'][k].id+",导航2','/com/"+data2['key'][k].id+"')";
			var img="<a href='#' onclick=\""+on+"\"><img src='"+data2['pic'][k].bg+"' class='img1'/></a>";
			var circle="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['pic'][k].tx+"' class='img1'/></div>";
			for(p in data2['key'][k].path){//此处循环的是管理员的div
				circle+="<div class='circle' style='margin-left:"+p*20+"px;z-index:"+(data2['key'][k].path.length-p)+"'><img src='"+data2['key'][k].path[p]+"'></div>";
				
			}
			smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data2['key'][k].background+"'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	$('#Contents').empty();


	if(data2['shequ']=='shequ'){
		$('.bigdiv').remove();
		//$("#SubClass").remove();
		//$("#Navigation").remove();
		var div=createT();
		
		//var share="<div class='fa fa-share-alt share'></div>";
		var duo="<div class='fa fa-ellipsis-v duo' onclick='fang()' onmouseover='dmouse()'></div>";

		var tou="<div class='circle sqcircle' style='margin-left:-40px;z-index:20;'><img src='"+data2.tx+"'></div>";
		for(h in data2['key'][0].img){
			tou+="<div class='circle sqcircle' style='margin-left:"+h*40+"px;z-index:"+(data2['key'][0].img.length-h)+"'><img src='"+data2['key'][0].img[h]+"'></div>";
			
		}
		var zw="<div style='height:36px;width:100%;'></div>";
		var user="<div class='user'>"+data2['user']+"</div>";
		var title2="<div class='title2'>"+data2['key'][0]['title']+"</div>";
		var xuanyan="<div class='xuanyan'>"+((data2['key'][0]['slogan'])?data2['key'][0]['slogan']:'这个人很懒，没有写任何东西')+"</div>";
		//var guan="<span class='guan'>"+data2['key'][0].cun+"</span>";
		var guan="<span class='guan jiaru"+data2['key'][0].id+"' onclick='click2("+data2['key'][0].id+")' onmouseover='over2("+data2['key'][0].id+")' onmouseout='out2("+data2['key'][0].id+")'>"+data2['key'][0].cun+"</span>";
		var tleft="<div class='col-lg-3 col-sm-7 col-xs-7 tleft'>"+duo+"<img src='"+data2['bg']+"' class='timg'><div style='width:100%;height:100%;background:#A900FF;'>"+tou+zw+user+title2+xuanyan+guan+"</div></div>";//跳转至后的左侧div
		var main8="<div class='row' id='sqcontent' style='width:100%'></div>";
		div.html(tleft+main8);
		div.appendTo('#Contents');
		homContents(data2.posts);
		console.log(data2);
		return;
	}
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sqMain(data2)+'</div>');//此处调用了sqMain(data2)方法
}

//社区的方法！！！！！！！！！！！！！！！
//社区的方法！！！！！！！！！！！！！！！
//社区的方法！！！！！！！！！！！！！！！
function createSq(){
	var div=$('<div class="row bigdiv col-md-11" style=""></div>');
	return div;
}
function sqMain(data2){
	var smalldiv1='';
	var leftdiv1="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	for(j in data2['key']){
		var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['key'][j].tx+"'></div>";//创建人的头像
		var title1="<div class='title'>"+data2['key'][j].title+"</div>";
		var biaoyu1="<div class='biaoyu'>"+((data2['key'][j].slogan)?data2['key'][j].slogan:'')+"</div>";
		if(data2['key'][j].userid==data2['key2']){
			var guanzhu1='';
		}else{
			var guanzhu1="<div class='gz gz2 jiaru"+data2['key'][j].id+"' onclick='click2("+data2['key'][j].id+")' onmouseover='over2("+data2['key'][j].id+")' onmouseout='out2("+data2['key'][j].id+")'>"+data2['key'][j].cun+"</div>";
		}
		
		var on1="return index('com','"+data2['key'][j].id+",导航2','/com/"+data2['key'][j].id+"')";
		var img1="<div style='width:100%;overflow:hidden;'><a href='#' onclick=\""+on1+"\"><img src='"+data2['key'][j].bg+"' class='img1'></a></div>";
		for(h in data2['key'][j].img){//此处循环的是管理员的div
			circle1+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][j].img.length-h)+"'><img src='"+data2['key'][j].img[h]+"'></div>";
			
		}
		smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+guanzhu1+"</div></div></div>";
	}
	var maindiv1="<div class='row col-md-11 maindiv'>"+smalldiv1+"</div>";//主div
	
	sq=leftdiv1+maindiv1;
	return sq;
}
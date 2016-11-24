var scj="";
var leftmargin=360;//距离左侧的距离    1670行是搜索
function colContents(data,param){
	Clear_cache('/col');
	if(param=='yours'){
		Clear_cache('/col/yours');
		$('#Contents').empty();
		if(data['key']=='mydl'){
			location.href='/log';
			return;
		}
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
			
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
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
			div.html(mei+mpic+wenzi1+wenzi2);
			div.appendTo("#Contents");
			return;
		}
		
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
			smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data['key'][k].background+"'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	if(data['key']!='不存在'){
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
			if(data['uid']==data['userid']){
				var guan='';
			}else{
				var guan="<span class='guan guan"+data['key'].id+"' onclick='gclick1("+data['key'].id+")' onmouseover='gover("+data['key'].id+")' onmouseout='gout("+data['key'].id+")'>"+data['key'].cun+"</span>";
			}
			
			//var guan='';

			var tleft="<div class='col-lg-3 col-sm-4 col-xs-4 tleft'>"+duo+"<img src='"+data['bg']+"' class='timg'><div style='width:100%;height:100%;background:"+data['key'].background+";'>"+tou+zw+user+title2+xuanyan+guan+"</div></div>";//跳转至后的左侧div
			var leftdiv="<div class='col-lg-1 col-md-1 col-sm-1 col-xs-1 tleft'></div>";
			
			var mainz="<div class='zhu' onclick='addPost1("+data['key']['id']+")' style='margin-top:20px;'><div class='stx'><img src='/images/mrtx.jpg' style='margin-top:15px;margin-left:20px;display:block;float:left;'></div><div style='margin-top:15px;margin-left:20px;float:left;line-height:40px;color:#BDBDBD'>分享内容...</div><div class='zhao'><img style='margin-top:15px;margin-right:20px;display:block;float:right;' src='/images/zhaoxiang.jpg'></div></div>";
				var main8="<div class='row' id='scjcontent' style='margin-top:0px;width:100%'></div>";


			//var main6="<div class='row' id='scjcontent' style='width:100%'></div>";
			div.html(tleft+mainz+main8);
			div.appendTo('#Contents');
			
			homContents(data.posts);
			return;
		}
	}else{
		$('#Contents').html('<div class="row bigdiv col-md-11" style="font-size:50px;line-height:50px;margin-left:24%;margin-top:100px;"><img src="/images/404.png"></div>');
		return;
	}
	var div=createScj();
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scjMain(data)+'</div>');//此处调用了scjMain(data2)方法
}
//鼠标悬浮效果

function addPost1(scid){
	var name='';
	var comname='';
	$.ajax({
		data:{Action:'col',Method:'fanhui',comid:scid},
		success:function(data){
			var div=bd();
			var top1="<div class='top1'><img src='/images/mrtx.jpg' style='margin-top:20px;margin-left:20px;display:block;float:left;'><div class='uname'>"+data['key1'].username+"</div><div class='fa fa-caret-right sanjiao'></div><div class='cname'>"+data['key'].title+"</div></div>";
			var center1="<div class='centerz'><textarea onfocus='qx(\"center1\")' onblur='cx()' class='center1'>分享内容...</textarea></div>";
			//var bottom1="<div class='bottom1'><img style='margin-top:0px;margin-left:20px;float:left;' src='/images/xiang.jpg'></div>";
			var tupian8="<div class='tupian2'><img id='imgPre'></div>";
			var bottom1="<label><div class='fa fa-camera bottom1'>"+
				"<form enctype='multipart/form-data' id='sky_upform' name='sky_upform' action='' method='post'>"+
					
					"<input type='file' name='upfile' value='' id='imgUp1' onchange=\"preImg8(this.id,'imgPre');\" class='scpic'>"+
				"</form>"+
			  "</div></label>";
			var ttt="<div class='ttt' style='width:150px;height:16px;margin-top:20px;margin-left:30px;'></div>";
			var qxan="<div class='qxan' onclick='haha()'>取消</div>";
			var fabu="<div class='fabu' onclick='return fb1("+data['key'].id+")'>发布</div>";
			var body1="<div class='body1'>"+top1+center1+tupian8+bottom1+ttt+qxan+fabu+"</div>";
			div.html("<div class='baocun'>"+body1+"</div>");
			div.appendTo('body');
		}
	})
}

function postImg1(){
    var txt;
 	$("#sky_upform").ajaxSubmit({
        type:'post',
        url: "/com/pimg",    
        beforeSubmit: function(){
            $("#sky_txt").html("图片上传中...");
        },
        success: function(data){
        	txt=data['id'];
        },
        resetForm: false,
        clearForm: false,
        async:false
	});
	return txt;
}
function fb1(id){
	if($('.center1').val()=='分享内容...'){
		return false;
	}
	var zou=0;
	if($('.body1').height()==570){
		//zou=1;
		zou=postImg1();
	}
	//alert($('.center1').val());

	$.ajax({
		data:{Action:'col',Method:'charuposts',content:$('.center1').val(),zou:zou,commid:id},
		success:function(data){
			if(data['cg']=='cg'){
				
				Clear_cache('/col/yorsu');
				Clear_cache('/col/'+id);
				index('col',String(id),'/col/'+id);
				haha();
				
			}
			
		},
		error:function(data){
			
		}
	});
}
//创建收藏集的div   style="width:100%;height:4000px;background:green;position:absolute;z-index:51;top:137px;left:-97px"

function createT(){
	var div=$('<div class="row tiao"></div>');
	return div;
}
function createTc(){
	var div=$('<div class="row tiao1"></div>');
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
	alert('恭喜你，你的账号已被封，截止日期3000年');
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
	fang(scid);
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
			var fw="<div class='fw'>公开范围：公开</div>";//
			var yyy="<div class='yyy' style='display:none;'>"+bj+"</div>";
			var cuowu="<div class='cuowu'></div>";
			var nrtc="<div class='baocun1'>"+ctop+tupian+shang+hh+yanse+yyy+fw+cuowu+"</div>";//内容填充
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
        	messtxt=data['arr']
        },
        resetForm: false,
        clearForm: false,
        async:false
	});
	return messtxt;
}
//修改其他数据
function xiugaiColl(xgid){
	var picid=$('.picid').val();
	var path=$('.path').val();
	var ppp=0;
	if($('#imgPre').attr('src')!=path){
		
		ppp=xiugaiImg();
	}
	$.ajax({
		data:{Action:'col',Method:'xiugaiColl',title:$('.tjmc').val(),slogan:$('.tjxy').val(),background:$('.yyy').html(),id:xgid,ppp:ppp},
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
					var cuowu1="<span class='cuowu1' style='margin-top:30px;'>"+tt+"</span>";
					var cuowu2="<span class='cuowu2' style='margin-top:10px;'>"+sl+"</span>";
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
		//onclick=\"return index('pro',id,'/pro/'+id);\"     data['key'][k].uid
		var on="return index('col','"+data['key'][k].id+",导航2','/col/"+data['key'][k].id+"')";
		var onn="return index('pro','"+data['key'][k].uid+"','/pro/"+data['key'][k].uid+"')";
		var img="<a href='#' onclick=\""+on+"\"><img src='"+data['key'][k].bg+"' class='img1'/></a>";
		var circle="<div class='circle' style='margin-left:-20px;'><img onclick=\""+onn+"\" src='"+data['key'][k].tx+"' class='img1'/></div>";
		smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data['key'][k].background+";'>"+circle+title+biaoyu+guanzhu+"</div></div></div>";
	}
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
//
//社区相关的方法结束!!!!!!!!!!!!!!!
//社区相关的方法结束!!!!!!!!!!!!!!!
//
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//创建收藏集的方法开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function chuangjian(){
	var div=bd();
	var cjscj="<div class='cjscj'>创建收藏集</div>";
	var name="<div class='name'><input type='text'  placeholder='名称' class='iname'/></div>";
	var gkfw="<div class='gkfw'>公开范围：<select><option>公开</option></select></div>";
	var wfgg="<div class='wfgg'>设定后无法更改</div>";
	var gxxy="<div class='gxxy'><input type='text' id='igxxy' placeholder='个性宣言' class='igxxy'/></div>";
	var zishu="<div class='zishu' style='width:40px;height:20px;position:absolute;right:20px;'>0/80</div>";
	var tishi="<div class='tishi' style='width:200px;height:50px;margin-top:10px;margin-left:10px;'></div>";
	var quxiao="<div class='quxiao' onclick='haha()'>取消</div>";
	var mingcheng=$('iname').val();
	var xuanyan=$('igxxy').val();
	var cjjh="<div class='cjjh' onclick='return createjh()'>创建</div>";
	var hj=cjscj+name+gkfw+wfgg+gxxy+zishu+tishi+quxiao+cjjh;
	div.html("<div class='col-lg-5 col-md-8 col-sm-10 col-xs-12 fabiao'>"+hj+"</div>");
	div.appendTo('body');
	var t1;
	var tjxy=document.getElementById('igxxy');
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
			$('.zishu').html(tjxy.value.length+"/80");
		},30);
		
	}
	tjxy.onblur=function(){
		clearInterval(t1);
	}
}
function bd(){
	var div=$("<div class='row haha' style='width:100%;height:100%;background:rgba(210,210,210,0.3);position:fixed;margin-top:120px;float:left;top:-127px;margin-left:1px;z-index:101;'></div>");
	
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
	if(a==''&&b==''){
		var scjmc="<div style='line-height:24px;color:black;'>收藏集名称不能为空</div>";
		var scjxy="<div style='line-height:24px;color:black;'>收藏集宣言不能为空</div>";
		$('.tishi').html(scjmc+scjxy);
		return false;
	}else if(a==''){
		var scjmc="<div style='line-height:24px;color:black;'>收藏集名称不能为空</div>";
		$('.tishi').html(scjmc);
		return false;
	}else if(b==''){
		var scjxy="<div style='line-height:24px;color:black;'>收藏集宣言不能为空</div>";
		$('.tishi').html(scjxy);
		return false;
	}
	
	var c=$('.igxxy').val().length;
	$(".fabiao").remove();
	var div=bd();
	var ctop="<div class='ctop'><div class='fa fa-remove remove' onclick='haha()'></div><div class='xiugai'>修改收藏集</div><div class='bc' onclick='charuColl()'>保存</div></div>";
	var tupian="<div class='tupian'><img id='imgPre' src='/images/2.jpg'></div>";
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
	var yyy="<div class='yyy' style='display:none;'>#00ABC0</div>";
	var fw="<div class='fw'>公开范围：公开</div>";
	var cuowu="<div class='cuowu'></div>";
	var nrtc="<div class='baocun1'>"+ctop+tupian+shang+hh+yanse+yyy+fw+cuowu+"</div>";//内容填充
	div.html("<div class='baocun'>"+nrtc+"</div>");
	div.appendTo('body');
	var tjxy=document.getElementById('tjxy');
	//显示剩余字数的方法
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

function bianse(n){
	var jj=$('.cl'+n).attr('ys');
	$('.hh').css('background',jj);
	$('.tjmc').css('background',jj);
	$('.tjxy').css('background',jj);
	$('.yyy').html(jj);
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
        success: function(data){
        	messtxt=data['arr'];
        },
        resetForm: false,
        clearForm: false,
        async:false
	});
	return messtxt;
}

function charuColl(){
	
	var gaitu='mei';
	if($('#imgPre').attr('src')!='/images/2.jpg'){
		
		gaitu=sky_upfiles();
	}
	
	$.ajax({
		data:{Action:'col',Method:'charuColl',title:$('.tjmc').val(),slogan:$('.tjxy').val(),background:$('.yyy').html(),gaitu:gaitu},
		success:function(data){
			if(data['cg']=='cg'){
				Clear_cache('/col/yours');
				haha();
				index('col','yours','/col/yours');
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
	var gkfw="<div class='gkfw' style='padding-top:30px;'>公开范围：<select><option>公开</option></select></div>";
	var wfgg="<div class='sqjr' style='margin-top:35px;margin-left:10px;'><div style='float:left;'>申请加入</div><div class='slideThree' style='float:right;'><input type='checkbox' value='None' id='slideThree' name='check' onclick='sqjrz()' /><label for='slideThree' class='kai'></label></div></div>";
	var wfgg1="<div class='sfsh' style='margin-top:70px;margin-left:10px;'><div style='float:left;'>是否审核</div><div class='slideThree' style='float:right;'><input type='checkbox' value='None' id='slidefour' name='check' onclick='sfsh()' /><label for='slidefour' class='kai'></label></div></div>";
	var gxxy="<div class='gxxy' style='padding-top:40px;margin-left:10px;'><input type='text' placeholder='个性宣言' class='gxxy1'/></div>";
	var quxiao="<div class='quxiao' onclick='haha()'>取消</div>";
	var mingcheng=$('iname').val();
	var xuanyan=$('igxxy').val();
	var cjjh="<div class='cjjh' onclick='charuComm()'>创建</div>";
	var inp="<input type='hidden' value='' class='inp'>";
	var cuowu="<div class='cuowu' style='padding-top:40px;'></div>";
	var hj=cjscj+name+gkfw+wfgg+wfgg1+gxxy+cuowu+quxiao+cjjh;
	div.html("<div class='col-lg-5 col-md-8 col-sm-10 col-xs-12 fabiao'>"+hj+"</div>");
	div.appendTo('body');
}
var sqjr_z=0;
function sqjrz(){
	if(sqjr_z==0){
		sqjr_z=1;
	}else{
		sqjr_z=0;
	}
}
var sfsh_z=0;
function sfsh(){
	if(sfsh_z==0){
		sfsh_z=1;
	}else{
		sfsh_z=0;
	}
}
function charuComm(){
	var gaitu='mei';
	$.ajax({
		data:{Action:'com',Method:'charuComm',title:$('.name1').val(),slogan:$('.gxxy1').val(),sqjr:sqjr_z,examinepost:sfsh_z},
		success:function(data){
			if(data['cg']=='cg'){
				Clear_cache('/com/ndsq');
				haha();
				index('com','ndsq','/com/ndsq');
			}
			
		},
		error:function(data){
			var cuo=data.responseJSON;
			
			var i=0;
			var t=setInterval(function(){
				if(i%2==0){
					$('.cuowu').empty();
					if(cuo['title']=='请填写社群名称'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else if(cuo['title']=='社群名称已存在'){
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


//批准方法
function pizhun(comid,uid){
	//alert(comid);
	$.ajax({
		data:{Action:'com',Method:'pizhun',comid:comid,uid:uid},
		success:function(data){
			Clear_cache('/com/'+comid+'/admin');
			index('com',comid+',admin','/com/'+comid+'/admin');
		}
	})
}
function jujue(comid,uid){
	//alert(comid);
	$.ajax({
		data:{Action:'com',Method:'jujue',comid:comid,uid:uid},
		success:function(data){
			Clear_cache('/com/'+comid+'/admin');
			index('com',comid+',admin','/com/'+comid+'/admin');
		}
	})
}
//拒绝方法
function meiyou1(){
	var div=$("<div class='meiyou row col-md-11'></div>");
	return div;
}
function comContents(data2,Param){
	Clear_cache('/com');
	var param=Param.split(',');
	if(param[1]=='admin'){
		var div=shenqing();
		var tleft="<div class='col-md-2 hidden-sm-down leftdiv'></div>";
		var zhuyao='';
		if(data2['key']=='不存在'){
			var div1=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			var mm2="<div class='mm2'><img src='/images/404.png'></div>";
			var zhu="<div class='col-md-6' style='margin-top:100px;'>"+mm2+"</div>";
			div1.html(yc+zhu);
			div1.appendTo("#Contents");
			return;

		}else if(data2['key']=='不需要'){

			var div1=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			var mm2="<div class='mm2'>该社群不需要申请加入。</div>";
			var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
			div1.html(yc+zhu);
			div1.appendTo("#Contents");
			
		}else if(data2['key']=='没有'){
			//zhuyao+="<div class='jujue col-lg-8 col-md-9 col-sm-10'>没有新的加入申请</div>";
			var div2=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			//var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
			var mm2="<div class='mm2'>没有新的加入申请。</div>";
			var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
			div2.html(yc+zhu);
			div2.appendTo("#Contents");
		}else{
			
			if(data2['key'].length==0){
				var div3=meiyou1();
				var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
				//var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
				var mm2="<div class='mm2'>没有新的加入申请。</div>";
				var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
				div3.html(yc+zhu);
				console.log(data2);
				div3.appendTo("#Contents");
			}
			
			for(k in data2['key']){
				zhuyao+="<div class='jujue col-lg-8 col-md-9 col-sm-10'><div class='sqtx'><img src='"+data2['key'][k].path+"'></div><div class='wenzi'>"+data2['key'][k].username+"</div><div class='tongyi'  onclick='pizhun("+data2['key2']+","+data2['key'][k].id+")'>批准</div><div class='butongyi' onclick='jujue("+data2['key2']+","+data2['key'][k].id+")'>拒绝</div></div>";
			}
		}
		var liebiao="<div class='col-md-10'>"+zhuyao+"</div>";
		var main=tleft+liebiao;
		div.html(main);
		div.appendTo("#Contents");
		return;
	}
	if(param[1]=='shenhe'){
		if(data2['key']=='不存在'){
			var div1=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			var mm2="<div class='mm2'><img src='/images/404.png'></div>";
			var zhu="<div class='col-md-6' style='margin-top:100px;'>"+mm2+"</div>";
			div1.html(yc+zhu);
			div1.appendTo("#Contents");
			return;

		}else if(data2['key']=='不需要审核'){
			var div=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
			var mm2="<div class='mm2'>你可以在“创建社群”社群时添加此功能。</div>";
			var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm1+mm2+"</div>";
			div.html(yc+zhu);
			div.appendTo("#Contents");
			return;
		}else{
			var div=meiyou1();
			var left1='';
			if(data2['key'].length==0){
				var div=meiyou1();
				var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
				//var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
				var mm2="<div class='mm2'>没有需要审核的帖子</div>";
				var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
				div.html(yc+zhu);
				div.appendTo("#Contents");
				return;
			}
			var yc="<div class='col-md-1 hidden-sm-down leftdiv'></div>";
			for(k in data2['key']){
				var sssq="<div class='sssq'>所属社区："+data2['cname']+"</div>";
				var content="<div class='sssq'>内容："+data2['key'][k].content+"</div>";
				var ftr="<div class='sssq'>发帖人："+data2['key'][k].username+"</div>";
				if(data2['key'][k].path==1){
					var tpic='';
				}else{
					var tpic="<div class='tpic'><img src='"+data2['key'][k].path+"'></div>";
				}
				var tyfb="<div class='tyfb' onclick='tong("+data2['cid']+","+data2['key'][k].id+")'>同意发布</div>";
				var frhsz="<div class='frhsz' onclick='huishou("+data2['cid']+","+data2['key'][k].id+")'>放入回收站</div>";
				var bao="<div style='background:#FFF;' class='bao'>"+sssq+ftr+content+tpic+tyfb+frhsz+"</div>";
				left1+="<div class='col-lg-6 col-md-6 col-sm-8 col-xs-8 left1'>"+bao+"</div>";
			}
			var zhu="<div class='col-md-11' style='margin-top:20px;'>"+left1+"</div>";
			div.html(yc+zhu);
			div.appendTo("#Contents");
			return;
		}
	}
	if(param[1]=='laji'){
		if(data2['key']=='不存在'){
			var div1=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			var mm2="<div class='mm2'><img src='/images/404.png'></div>";
			var zhu="<div class='col-md-6' style='margin-top:100px;'>"+mm2+"</div>";
			div1.html(yc+zhu);
			div1.appendTo("#Contents");
			return;

		}else if(data2['key']=='没有'){
			var div=meiyou1();
			var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
			//var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
			var mm2="<div class='mm2'>没有被标记为垃圾内容的信息</div>";
			var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
			div.html(yc+zhu);
			div.appendTo("#Contents");
			return;
		}else{
			console.log(data2);
			var div=meiyou1();
			if(data2['key'].length==0){
				var div=meiyou1();
				var yc="<div class='col-md-3 hidden-sm-down leftdiv'></div>";
				//var mm1="<div class='mm1'>信息必须通过审核和批准，才能在社群中显示。</div>";
				var mm2="<div class='mm2'>没有包含垃圾内容的帖子 </div>";
				var zhu="<div class='col-md-6' style='margin-top:200px;'>"+mm2+"</div>";
				div.html(yc+zhu);
				div.appendTo("#Contents");
				return;
			}
			var left1='';
			var yc="<div class='col-md-1 hidden-sm-down leftdiv'></div>";
			for(k in data2['key']){
				var sssq="<div class='sssq'>所属社区："+data2['cname']+"</div>";
				var content="<div class='sssq'>内容："+data2['key'][k].content+"</div>";
				var ftr="<div class='sssq'>发帖人："+data2['key'][k].username+"</div>";
				if(data2['key'][k].path==1){
					var tpic='';
				}else{
					var tpic="<div class='tpic'><img src='"+data2['key'][k].path+"'></div>";
				}
				var tyfb="<div class='tyfb' onclick='tong1("+data2['cid']+","+data2['key'][k].id+")'>同意发布</div>";
				var frhsz="<div class='frhsz' onclick='sctz("+data2['cid']+","+data2['key'][k].id+")'>删除帖子</div>";
				var bao="<div style='background:#FFF;' class='bao'>"+sssq+ftr+content+tpic+tyfb+frhsz+"</div>";
				left1+="<div class='col-lg-6 col-md-6 col-sm-8 col-xs-8 left1'>"+bao+"</div>";
			}
			var zhu="<div class='col-md-11' style='margin-top:20px;'>"+left1+"</div>";
			div.html(yc+zhu);
			div.appendTo("#Contents");
			return;
		}
	}
	if(Param=='ndsq'){
		Clear_cache('/com/ndsq');
		$('#Contents').empty();
		if(data2['key']=='mydl'){
			location.href='/log';
			return;
		}
		var div=createSq();
		var smalldiv='';
		
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		smalldiv="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian chuang' onclick='cjsq()' style='box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);'><div class='fa fa-plus-circle jc'></div><div class='shou' style=''>创建社区</div></div></div>";
		
		if(data2['sf']=='有'){
			for(k in data2['key']){
				var title="<div class='title'>"+data2['key'][k].title+"</div>";
				var biaoyu="<div class='biaoyu'>"+((data2['key'][k].slogan)?data2['key'][k].slogan:'')+"</div>";
				//var guanzhu='"<div class='gz guanzhu"+data2['key'][k].id+"' onclick='click1("+data2['key'][k].id+")' onmouseover='over("+data2['key'][k].id+")' onmouseout='out("+data2['key'][k].id+")'>"+data2['key'][k].cun+"</div>"';
				var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:5px;'>"+data2['key'][k].membernum+"个成员</div>";
				var guanzhu='';
				var on="return index('com','"+data2['key'][k].id+",导航2','/com/"+data2['key'][k].id+"')";
				var img="<a href='#' onclick=\""+on+"\"><img src='"+data2['key'][k].bg+"' class='img1'/></a>";
				var circle="<div class='circle' style='margin-left:-20px;z-index:20'><img src='"+data2['touxiang']+"' class='img1'/></div>";
				for(h in data2['key'][k].path){//此处循环的是管理员的div
					circle+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][k].path.length-h)+"'><img src='"+data2['key'][k].path[h]+"'></div>";
					
				}
				smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data2['key'][k].background+";'>"+circle+title+biaoyu+chengyuan+guanzhu+"</div></div></div>";
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
			div.html(mei+mpic+wenzi1+wenzi2);
			div.appendTo("#Contents");
			return;
		}
		
		var div=createSq();
		var smalldiv='';
	
		var leftdiv="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		for(k in data2['key']){
			
			var title="<div class='title'>"+data2['key'][k].title+"</div>";
			var biaoyu="<div class='biaoyu'>"+((data2['key'][k].slogan)?data2['key'][k].slogan:'')+"</div>";
			var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:5px;'>"+data2['key'][k].membernum+"个成员</div>";
			var guanzhu="<div class='gz gz2 guanzhu"+data2['key'][k].id+"' onclick='click2("+data2['key'][k].id+")' onmouseover='over("+data2['key'][k].id+")' onmouseout='out("+data2['key'][k].id+")'>已加入</div>";
			var on="return index('com','"+data2['key'][k].id+",导航2','/com/"+data2['key'][k].id+"')";
			var img="<a href='#' onclick=\""+on+"\"><img src='"+data2['pic'][k].bg+"' class='img1'/></a>";
			var circle="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['pic'][k].tx+"' class='img1'/></div>";
			for(p in data2['key'][k].path){//此处循环的是管理员的div
				circle+="<div class='circle' style='margin-left:"+p*20+"px;z-index:"+(data2['key'][k].path.length-p)+"'><img src='"+data2['key'][k].path[p]+"'></div>";
				
			}
			smalldiv+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img+"<div class='col-md-12 down' style='background:"+data2['key'][k].background+"'>"+circle+title+biaoyu+chengyuan+guanzhu+"</div></div></div>";
		}
		var maindiv="<div class='row col-md-11 maindiv'>"+smalldiv+"</div>";//主div
		
		scj=leftdiv+maindiv;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+scj+'</div>');
		return;
	}
	$('#Contents').empty();
console.log(data2['key']);
	if(data2['key']!='不存在'){
		if(data2['shequ']=='shequ'){
			$('.bigdiv').remove();
			var div=createTc();
			
			//var share="<div class='fa fa-share-alt share'></div>";
			var duo="<div class='fa fa-ellipsis-v duo' onclick='fang2("+data2['key'][0]['id']+")' onmouseover='dmouse()'></div>";
			var tou="<div class='circle sqcircle' style='margin-left:-40px;z-index:20;'><img src='"+data2.tx+"'></div>";
			for(h in data2['key'][0].img){
				tou+="<div class='circle sqcircle' style='margin-left:"+h*40+"px;z-index:"+(data2['key'][0].img.length-h)+"'><img src='"+data2['key'][0].img[h]+"'></div>";
				
			}
			var zw="<div style='height:36px;width:100%;'></div>";
			var user="<div class='user' style='color:black;'>创 建 者："+data2['user']+"</div>";
			var title2="<div class='title2'  style='color:black;font-size:20px;margin-top:0px;'> 社群名称："+data2['key'][0]['title']+"</div>";
			var xuanyan="<div class='xuanyan'  style='color:black;margin-top:0px;'>个性宣言："+((data2['key'][0]['slogan'])?data2['key'][0]['slogan']:'这个人很懒，没有写任何东西')+"</div>";
			//var guan="<span class='guan'>"+data2['key'][0].cun+"</span>";
			var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:-55px;margin-bottom:20px;margin-left:21px;color:black;' >社群成员："+data2['key'][0].membernum+"个成员</div>";
			if(data2['gbg']=='管理'){
				var guan="<span class='guan jiaru"+data2['key'][0].id+"' onclick='guanli("+data2['key'][0].id+")' onmouseover='over2("+data2['key'][0].id+")' onmouseout='out2("+data2['key'][0].id+")' style='background:#0F9D58'>管理</span>";
			}else{
				var guan="<span class='guan jiaru"+data2['key'][0].id+"' onclick='click2("+data2['key'][0].id+")' onmouseover='over2("+data2['key'][0].id+")' onmouseout='out2("+data2['key'][0].id+")' style='background:#0F9D58'>"+data2['key'][0].cun+"</span>";
			}
			if(data2['key'][0].describe==null){
				var sqjj="<div></div>";
			}else{
				var sqjj="<div class='sqjj'><div><b>社群介绍：</b></div><div class='zhengwen'>"+data2['key'][0].describe+"</div></div>";
			}
			
			var tleft="<div class='col-lg-3 col-sm-7 col-xs-7 tleft'>"+duo+"<img src='"+data2['bg']+"' class='timg'><div style='width:100%;height:100%;background:#FFF;'>"+tou+zw+user+title2+xuanyan+chengyuan+guan+sqjj+"</div></div>";//跳转至后的左侧div
			var mainz="<div class='zhu' onclick='addPost("+data2['key'][0]['id']+")'><div class='stx'><img src='/images/mrtx.jpg' style='margin-top:15px;margin-left:20px;display:block;float:left;'></div><div style='margin-top:15px;margin-left:20px;float:left;line-height:40px;color:#BDBDBD'>分享内容...</div><div class='zhao'><img style='margin-top:15px;margin-right:20px;display:block;float:right;' src='/images/zhaoxiang.jpg'></div></div>";
			var main8="<div class='row' id='sqcontent' style='margin-top:0px;width:100%'></div>";
			
			div.html(tleft+mainz+main8);
			div.appendTo('#Contents');
			homContents(data2.posts);
			
			return;
		}
	}else{
		$('#Contents').html('<div class="row bigdiv col-md-11" style="font-size:50px;line-height:50px;margin-left:24%;margin-top:100px;"><img src="/images/404.png"></div>');
		return;
	}
	$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sqMain(data2)+'</div>');//此处调用了sqMain(data2)方法
}
function tong(q,w){
	$.ajax({
		data:{Action:'com',Method:'tong',id:w},
		success:function(data){
			Clear_cache('/com/'+q+'/shenhe');
			index('com',q+',shenhe','/com/'+q+'/shenhe');
		}
	})
}
function tong1(q,w){
	$.ajax({
		data:{Action:'com',Method:'tong',id:w},
		success:function(data){
			Clear_cache('/com/'+q+'/laji');
			index('com',q+',laji','/com/'+q+'/laji');
		}
	})
}
function sctz(q,w){
	$.ajax({
		data:{Action:'com',Method:'sctz',id:w},
		success:function(data){
			Clear_cache('/com/'+q+'/laji');
			index('com',q+',laji','/com/'+q+'/laji');
		}
	})
}
function huishou(q,w){
	$.ajax({
		data:{Action:'com',Method:'huishou',id:w},
		success:function(data){
			Clear_cache('/com/'+q+'/shenhe');
			index('com',q+',shenhe','/com/'+q+'/shenhe');
		}
	})
}
function guanli(id){
	Clear_cache('/com/'+id+'/admin');
	index('com',id+',admin','/com/'+id+'/admin');
}
function shenqing(){
	var div=$("<div class='row bigdiv col-md-11'></div>");
	return div;
}
function fang2(scid){//传过来要操作的id
	$.ajax({
		data:{Action:'com',Method:'caozuo',scid:scid},
		success:function(data){
			if(data['sbs']=='自己的'){
				if(dian==0){
					var div=createX();
					var hang0="<span class='fspan' onclick='addadmin("+scid+")'>添加管理员</span>";
					var hang1="<span class='fspan' onclick='del2("+scid+")'>删除社群</span>";
					var hang2="<span class='fspan' onclick='xgsq("+scid+")'>修改社群</span>";
					var hang3="<span class='fspan' onclick='bangzhu()'>帮助</span>";
					var nei=hang0+hang1+hang2+hang3;
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
function addadmin(cid){

	$.ajax({
		data:{Action:'com',Method:'addadmin',comid:cid},
		success:function(data){
			$('.fang').remove();
			$('.duo').removeClass('duo1');
			var div=bd();
			if(data['you']=='没有'){
				var cen1="<div style='width:300px;text-align:center;padding-top:150px;'>您的社群没有目前没有人加入</div>";
				var cen2="<div style='width:300px;text-align:center;'>不能设置社群管理员</div>";
				var fabu="<div class='fabu' onclick='haha()'>取消</div>";
				var body1="<div class='body2'>"+cen1+cen2+fabu+"</div>";
				div.html("<div class='baocun'>"+body1+"</div>");
				div.appendTo('body');
			}else{
				var opt="<option value='请选择'>请选择</option>";
				for(k in data['list']){
					opt+="<option value='"+data['list'][k]+"'>"+data['list'][k]+"</option>";
				}
				var sel="<select class='sel'>"+opt+"</select>";
				var cen0="<div style='width:300px;text-align:center;padding-top:150px;'>社 群 名 称："+data['arr'].title+"</div>";
				var cen1="<div style='width:300px;text-align:center;padding-top:10px;'>添加管理员："+sel+"</div>";
				var qxan="<div class='qxan' onclick='haha()'>取消</div>";
				var fabu="<div class='fabu' onclick='return add("+data['arr'].id+")'>发布</div>";
				var body1="<div class='body2'>"+cen0+cen1+qxan+fabu+"</div>";
				div.html("<div class='baocun'>"+body1+"</div>");
				div.appendTo('body');
			}
		}
	});
}
function add(w){
	if($('.sel').val()=='请选择'){
		return false;
	}
	$.ajax({
		data:{Action:'com',Method:'add',id:$('.sel').val(),comid:w},
		success:function(){
			haha();
			Clear_cache('/com/'+w);
			index('com',String(w),'/com/'+w);
		}
	});
}
function del2(id){
	$.ajax({
		data:{Action:'com',Method:'delete',id:id},
		success:function(data){
			if(data['del']=='成功'){
				Clear_cache('/com/ndsq');
				
				index('com','ndsq','/com/ndsq');
			}else{
				alert("删除失败");
			}
		},
		error:function(){}
	})
}

function addPost(scid){
	var name='';
	var comname='';
	$.ajax({
		data:{Action:'com',Method:'fanhui',comid:scid},
		success:function(data){
			var div=bd();
			var top1="<div class='top1'><img src='/images/mrtx.jpg' style='margin-top:20px;margin-left:20px;display:block;float:left;'><div class='uname'>"+data['key1'].username+"</div><div class='fa fa-caret-right sanjiao'></div><div class='cname'>"+data['key'].title+"</div></div>";
			var center1="<div class='centerz'><textarea onfocus='qx(\"center1\")' onblur='cx()' class='center1'>分享内容...</textarea></div>";
			//var bottom1="<div class='bottom1'><img style='margin-top:0px;margin-left:20px;float:left;' src='/images/xiang.jpg'></div>";
			var tupian8="<div class='tupian2'><img id='imgPre'></div>";
			var bottom1="<label><div class='fa fa-camera bottom1'>"+
				"<form enctype='multipart/form-data' id='sky_upform' name='sky_upform' action='' method='post'>"+
					
					"<input type='file' name='upfile' value='' id='imgUp1' onchange=\"preImg8(this.id,'imgPre');\" class='scpic'>"+
				"</form>"+
			  "</div></label>";
			var ttt="<div class='ttt' style='width:150px;height:16px;margin-top:20px;margin-left:30px;'></div>";
			var qxan="<div class='qxan' onclick='haha()'>取消</div>";
			var fabu="<div class='fabu' onclick='return fb("+data['key'].id+")'>发布</div>";
			var body1="<div class='body1'>"+top1+center1+tupian8+bottom1+ttt+qxan+fabu+"</div>";
			div.html("<div class='baocun'>"+body1+"</div>");
			div.appendTo('body');
		}
	})
}
function preImg8(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
    $('.body1').css('margin-top','30px');
    $('.body1').css('height','570px');
    $('.tupian2').css('display','block');
}
//var fff=0;
function postImg(){
    var txt;
 	$("#sky_upform").ajaxSubmit({
        type:'post',
        url: "/com/pimg",    
        beforeSubmit: function(){
            $("#sky_txt").html("图片上传中...");
        },
        success: function(data){
        	txt=data['id'];
        },
        resetForm: false,
        clearForm: false,
        async:false
	});
	return txt;
}
function fb(id){
	if($('.center1').val()=='分享内容...'){
		return false;
	}
	var zou=0;
	if($('.body1').height()==570){
		zou=postImg();
		
	}
	//alert($('.center1').val());

	$.ajax({
		data:{Action:'com',Method:'charuposts',content:$('.center1').val(),zou:zou,commid:id},
		success:function(data){
			if(data['cg']=='cg'){
				
				Clear_cache('/com/ndsq');
				Clear_cache('/com/'+id);
				index('com',String(id),'/com/'+id);
				haha();
				
			}
			
		},
		error:function(data){
			
		}
	});
}
function qx(cs){
	
	if($('.'+cs).val()=='分享内容...'){
		$('.center1').val('');
	}
}
function cx(){
	if($('.center1').val()==''){
		$('.center1').val('分享内容...');
	}
}
//修改社群！！！！！！！！！！！！！！！！！！
//修改社群！！！！！！！！！！！！！！！！！！
//修改社群！！！！！！！！！！！！！！！！！！

function xgsq(scid){
	haha();
	$.ajax({
		data:{Action:'com',Method:'xg',xgid:scid},
		success:function(data){
			var a=data['arr']['title'];
			var b=data['arr']['slogan'];
			
			var picid=data['arr']['picid'];
			var path=data['arr']['path'];
			if(data['arr']['describe']==null){
				var jieshao='';
			}else{
				var jieshao=data['arr']['describe'];
			}
			
			if(data['arr']['slogan']==null){
				var c=0;
			}else{
				var c=data['arr']['slogan'].length;
			}
			$(".fabiao").remove();
			var div=bd();
			//("+scid+","+picid+","+path+")     
			var ctop="<div class='ctop'><div class='fa fa-remove remove' onclick='haha()'></div><div class='xiugai'>修改社群</div><div class='bc' onclick='xiugaicomm("+scid+")'>修改</div></div>";
			var hpicid="<input class='picid' type='hidden' value='"+picid+"'>";
			var hpath="<input class='hpath' type='hidden' value='"+path+"'>";
			var tupian="<div class='tupian'><img id='imgPre' src='"+path+"'></div>";
			var shang="<label><div class='fa fa-camera shang'>"+
				"<form enctype='multipart/form-data' id='sky_upform' name='sky_upform' action='' method='post'>"+
					"<input class='path' name='picid' type='hidden' value='"+picid+"'>"+
					"<input type='file' name='upfile' value='' id='imgUp' onchange=\"preImg(this.id,'imgPre');\" class='scpic'>"+
				"</form>"+
			  "</div></label>";
			var mc="<div class='mc'><input type='text' class='tjmc' style='background:#FFF;' value='"+a+"'/></div>";
			var xy="<div class='xy'><input type='text' id='tjxy' style='background:#FFF;' class='tjxy' value='"+b+"'/></div>";
			
			var num="<div class='num'>"+c+"/80</div>";
			var hh="<div class='hh' style='background:#FFF;'>"+hpicid+hpath+mc+xy+num+"</div>";
			
			var fw="<div class='fw' style='padding-top:0px;padding-left:20px;'>公开范围：公开</div>";
			var jieshao="<div class='jstext'><div style='margin-left:10px;float:left;'>社群简介：</div><textarea class='text1'>"+jieshao+"</textarea></div>";
			var cuowu="<div class='cuowu'></div>";
			var nrtc="<div class='baocun1'>"+ctop+tupian+shang+hh+fw+jieshao+cuowu+"</div>";//内容填充
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
function commImg(){
    var txt;
 	$("#sky_upform").ajaxSubmit({
        type:'post',
        url: "/com/PostxgCommImg",    
        beforeSubmit: function(){
            $("#sky_txt").html("图片上传中...");
        },
        success: function(data){
        	txt=data['id'];
        },
        resetForm: false,
        clearForm: false,
        async:false
	});
	return txt;
}

function xiugaicomm(xgid){
	var picid=$('.picid').val();
	var path=$('.hpath').val();
	// alert(path);
	// alert($('#imgPre').attr('src'));
	// return;
	var ccc=0;
	if($('#imgPre').attr('src')!=path){
		ccc=commImg();
	}
	$.ajax({
		data:{Action:'com',Method:'xiugaiComm',title:$('.tjmc').val(),slogan:$('.tjxy').val(),id:xgid,ccc:ccc,describe:$('.text1').val()},
		success:function(data){
			if(data['cg']=='cg'){
				haha();//移除修改的框
				Clear_cache('/com/ndsq');
				Clear_cache('/com/'+xgid);
				index('com',String(xgid),'/com/'+xgid);
			}
			
		},
		error:function(data){
			var cuo=data.responseJSON;
			
			
			var i=0;
			var t=setInterval(function(){
				if(i%2==0){
					$('.cuowu').empty();
					if(cuo['title']=='请填写社群名称'){
						var tt="<span class='fa fa-exclamation-circle'>&nbsp;&nbsp;"+cuo['title']+"</div>";
					}else if(cuo['title']=='社群名称已存在'){
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
		var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:5px;'>"+data2['key'][j].membernum+"个成员</div>";
		var on1="return index('com','"+data2['key'][j].id+",导航2','/com/"+data2['key'][j].id+"')";
		var img1="<div style='width:100%;overflow:hidden;'><a href='#' onclick=\""+on1+"\"><img src='"+data2['key'][j].bg+"' class='img1'></a></div>";
		for(h in data2['key'][j].img){//此处循环的是管理员的div
			circle1+="<div class='circle' style='margin-left:"+h*20+"px;z-index:"+(data2['key'][j].img.length-h)+"'><img src='"+data2['key'][j].img[h]+"'></div>";
			
		}
		smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
	}
	var maindiv1="<div class='row col-md-11 maindiv'>"+smalldiv1+"</div>";//主div
	
	sq=leftdiv1+maindiv1;
	return sq;
}

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
				
			}else  if(data['id']=='shenqing'){
				$('.jiaru'+w).html('取消申请');
				Clear_cache('/com/jiaru');
				//index('com','jiaru','/com/jiaru');
			}else if(data['id']=='quxiao'){
				$('.jiaru'+w).html('申请加入');
				Clear_cache('/com/jiaru');
				//index('com','jiaru','/com/jiaru');
			}else if(data['id']=='wanshi'){
				$('.jiaru'+w).html('申请加入');
				Clear_cache('/com/jiaru');
				//index('com','jiaru','/com/jiaru');
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
function geren(id){
	index('pro',id,'/pro/'+id);
}

//搜索
function seaContents(data2,param){
	var smalldiv1='';
	var smalldiv2='';
	var smalldiv3='';
	var maindiv1='';
	if(data2['key']=='没传参'){
		console.log(data2);
		var leftdiv1="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
		var i=0;
		if(data2['user'].length>0){
			for(j in data2['user']){
				if(j>3){
					break;
				}
				var circle1="<div class='circle' onclick='yonghu("+data2['user'][j].id+")' style='margin-left:-20px;z-index:20;'><img src='"+data2['user'][j].tx+"'></div>";//创建人的头像
				var title1="<div class='title'>"+data2['user'][j].username+"</div>";
				var biaoyu1="<div class='biaoyu'>"+((data2['user'][j].slogan)?data2['user'][j].slogan:'')+"</div>";
				var guanzhu1="";
				var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:5px;'>"+data2['user'][j].email+"</div>";
				var on1="return index('com','"+data2['user'][j].id+",导航2','/com/"+data2['user'][j].id+"')";
				var img1="<div style='width:100%;overflow:hidden;'><a onclick='yonghu("+data2['user'][j].id+")' ><img src='"+data2['user'][j].bg+"' class='img1'></a></div>";
				smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
			}
		var maindiv1="<div class='row col-md-11 maindiv6'>"+smalldiv1+"</div>";//主div
		var main1="<div><div class='row col-md-11 main1'><div class='tjyh' style='font-size:18px;'>推荐用户</div><div class='gd' onclick='onpro()'>更多</div></div>"+maindiv1+"</div>";
		}
		if(data2['comm'].length>0){
			for(j in data2['comm']){
				if(j>3){
					break;
				}
				var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['comm'][j].tx+"'></div>";//创建人的头像
				var title1="<div class='title'>"+data2['comm'][j].title+"</div>";
				var biaoyu1="<div class='biaoyu'>"+((data2['comm'][j].slogan)?data2['comm'][j].slogan:'')+"</div>";
				var guanzhu1="";
				var chengyuan="";
				var on1="return index('com','"+data2['comm'][j].id+",导航2','/com/"+data2['comm'][j].id+"')";
				var img1="<div style='width:100%;overflow:hidden;'><a onclick=\""+on1+"\"><img src='"+data2['comm'][j].bg+"' class='img1'></a></div>";
				smalldiv2+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
			}
		var maindiv2="<div class='row col-md-11 maindiv6'>"+smalldiv2+"</div>";//主div
		var main2="<div><div class='row col-md-11 main1'><div class='tjyh' style='font-size:18px;'>推荐社群</div><div class='gd' onclick='oncomm()'>更多</div></div>"+maindiv2+"</div>";
		}
		if(data2['coll'].length>0){
			for(j in data2['coll']){
				if(j>3){
					break;
				}
				var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['coll'][j].tx+"'></div>";//创建人的头像
				var title1="<div class='title'>"+data2['coll'][j].title+"</div>";
				var biaoyu1="<div class='biaoyu'>"+((data2['coll'][j].slogan)?data2['coll'][j].slogan:'')+"</div>";
				var guanzhu1="";
				var chengyuan="";
				var on1="return index('col','"+data2['coll'][j].id+",导航2','/col/"+data2['coll'][j].id+"')";
				var img1="<div style='width:100%;overflow:hidden;'><a onclick=\""+on1+"\"><img src='"+data2['coll'][j].bg+"' class='img1'></a></div>";
				smalldiv3+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
			}
		var maindiv3="<div class='row col-md-11 maindiv6'>"+smalldiv3+"</div>";//主div
		var main3="<div><div class='row col-md-11 main1'><div class='tjyh' style='font-size:18px;'>推荐收藏集</div><div class='gd' onclick='oncoll()'>更多</div></div>"+maindiv3+"</div>";
		sq=leftdiv1+main1+main2+main3;
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sq+'</div>');
		return;
		}
	}
	//用户！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	var leftdiv1="<div class='col-md-1 hidden-sm-down leftdiv'></div>";//左侧距离
	var i=0;
	if(data2['user'].length>0){
		for(j in data2['user']){
			var circle1="<div class='circle' onclick='yonghu("+data2['user'][j].id+")' style='margin-left:-20px;z-index:20;'><img src='"+data2['user'][j].tx+"'></div>";//创建人的头像
			var title1="<div class='title'>"+data2['user'][j].username+"</div>";
			var biaoyu1="<div class='biaoyu'>"+((data2['user'][j].slogan)?data2['user'][j].slogan:'')+"</div>";
			var guanzhu1="";
			var chengyuan="<div style='width:100%;height:20px;font-size:14px;line-height:20px;margin-top:5px;'>"+data2['user'][j].email+"</div>";
			var on1="return index('com','"+data2['user'][j].id+",导航2','/com/"+data2['user'][j].id+"')";
			var img1="<div style='width:100%;overflow:hidden;'><a  onclick='yonghu("+data2['user'][j].id+")' ><img src='"+data2['user'][j].bg+"' class='img1'></a></div>";
			smalldiv1+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
		}
	var maindiv1="<div class='row col-md-11 maindiv6'>"+smalldiv1+"</div>";//主div
	var main1="<div><div class='row col-md-11 main1 main5'><div class='tjyh' style='font-size:18px;'>符合搜索条件用户</div></div>"+maindiv1+"</div>";
	}else{
		var main1="";
	}
	if(data2['comm'].length>0){
		for(j in data2['comm']){
			var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['comm'][j].tx+"'></div>";//创建人的头像
			var title1="<div class='title'>"+data2['comm'][j].title+"</div>";
			var biaoyu1="<div class='biaoyu'>"+((data2['comm'][j].slogan)?data2['comm'][j].slogan:'')+"</div>";
			var guanzhu1="";
			var chengyuan="";
			var on1="return index('com','"+data2['comm'][j].id+",导航2','/com/"+data2['comm'][j].id+"')";
			var img1="<div style='width:100%;overflow:hidden;'><a onclick=\""+on1+"\"><img src='"+data2['comm'][j].bg+"' class='img1'></a></div>";
			smalldiv2+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
		}
	var maindiv2="<div class='row col-md-11 maindiv6'>"+smalldiv2+"</div>";//主div
	var main2="<div><div class='row col-md-11 main1 main5'><div class='tjyh' style='font-size:18px;'>符合搜索条件社群</div></div>"+maindiv2+"</div>";
	}else{
		var main2="";
	}
	if(data2['coll'].length>0){
		for(j in data2['coll']){
			var circle1="<div class='circle' style='margin-left:-20px;z-index:20;'><img src='"+data2['coll'][j].tx+"'></div>";//创建人的头像
			var title1="<div class='title'>"+data2['coll'][j].title+"</div>";
			var biaoyu1="<div class='biaoyu'>"+((data2['coll'][j].slogan)?data2['coll'][j].slogan:'')+"</div>";
			var guanzhu1="";
			var chengyuan="";
			var on1="return index('col','"+data2['coll'][j].id+",导航2','/col/"+data2['coll'][j].id+"')";
			var img1="<div style='width:100%;overflow:hidden;'><a onclick=\""+on1+"\"><img src='"+data2['coll'][j].bg+"' class='img1'></a></div>";
			smalldiv3+="<div class='col-lg-3 col-sm-6 col-xs-6 smalldiv'><div class='bian'>"+img1+"<div class='col-md-12 down'>"+circle1+title1+biaoyu1+chengyuan+guanzhu1+"</div></div></div>";
		}
	var maindiv3="<div class='row col-md-11 maindiv6'>"+smalldiv3+"</div>";//主div
	var main3="<div><div class='row col-md-11 main1 main5'><div class='tjyh' style='font-size:18px;'>符合搜索条件收藏集</div></div>"+maindiv3+"</div>";
	}else{
		var main3="";
	}
	sq=leftdiv1+main1+main2+main3;
	if(main1==''&&main2==''&&main3==''){
		$('#Contents').html('<div class="row bigdiv col-md-11" style="text-align:center;line-height:50px;margin-top:200px;font-size:50px;margin-left:23%">没有符合该条件的文章</div>');
	}else{
		$('#Contents').html('<div class="row bigdiv col-md-11" style="">'+sq+'</div>');
	}
	
}
function yonghu(id){
	index('pro',String(id),'/pro/'+id);
}
function oncomm(){
	index('com','','/com');
}
function oncoll(){
	index('col','','/col');
}
function onpro(){
	index('pro','','/pro');
}
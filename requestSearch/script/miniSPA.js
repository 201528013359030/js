var configs = {};
configs.partialCache = {};
configs.divDemo = document.getElementById("J_innerContent");

var miniSPA ={};

miniSPA.render = function(url){
	configs.rootScope = window[url];
	miniSPA.refresh(url,configs.divDemo);
}

miniSPA.changeUrl = function(){
	var hashs = location.hash.replace("#",""); // hash:设置或返回从井号 (#) 开始(包括#号)的 URL（锚）。--fyq
	var str = hashs.split("_");	//分解#号后面的字符串 --fyq
	var url = str[0],
		attrID = str[1],
		attrCon = str[2];
	if(url ===""){
		url = "form";
	}
	if(!window[url]){ //检查window窗口中有没有url所指定的框架名称 --fyq
		url="notfound";		
	}
	//此处解决tab切换时，多重点击显示404页面的问题
	if(window[url].id){
		if(/tab/.test(window[url].id)){
			return false;
		}
	}
	
	//console.log(window[url]);
	//获取相应的本地html片段代码
	miniSPA.ajaxRequest(window[url].partial,"GET","HTML","","",function(status,page){
		//console.log("ajaxRequest status:"+status+"page:"+page);
		if(attrID){
			window[url].parame=attrID;
		}
		if(attrCon){
			window[url].parameCon = attrCon;
		}
		configs.divDemo.innerHTML = page;
		miniSPA.initFunc(url);
	});
}

miniSPA.ajaxRequest = function(url,method,dataType,data,loading,callback){
	console.log(url);
	if(configs.partialCache[url]){ //settings.partialCache[url]		
        callback(200, configs.partialCache[url]);
    }else{
    	var settings = {
			"url":url,
			"type":method,
			"data":data,
			"dataType":dataType
		}
		getAjax(settings,loading,function(status,page){
			//console.log("getAjax");
			switch(status){
				case 404:
					url = "notfound";
					page = configs.partialCache[url];					
					break;
				default:					
					var parts = url.split(".");				
					if(parts.length>1 && parts[parts.length-1] =="html"){
						//如果不是页面，则不需要缓存
						configs.partialCache[url]= page;
					}
			}
			callback(status,page);
		});
    }
	
}


miniSPA.refresh = function(url,scope){
	/*
	 * 渲染模版页面时的部分
	 */
	/*
	var content = "";
	miniSPA.scriptHtml(url);	
	var data =window[url][url];
	//console.log(data);
	templates(url,configs.divDemo,data);
	configs.divDemo.style.display="block";
	$("#J_pageLoading").css("display","none");
	*/
	configs.divDemo.style.display="block";
	
}
/**
 * 使用artTemplate的时候需要生成一个 script代码块，才能生成页面 
 */
miniSPA.scriptHtml = function(url){
	if($(".scriptTemp")){
		$(".scriptTemp").remove();
	}
	
	$("body").append("<script id="+url+" class='scriptTemp' type='text/html'>"+configs.divDemo.innerHTML+"</script>")
}

miniSPA.initFunc = function(partial) {
    var fn = window[partial].init;
    
    if(typeof fn === 'function') {
        fn();
    }
}

miniSPA.appendScript = function(name){
	$("body").append("<script type='text/javascript' src='"+name+".js'></script>");
}

miniSPA.ajaxRequest("../html/temp/404.html", "GET","HTML","","",function(status, partial){
	//console.log("miniSPA.ajaxRequest"+partial);
    configs.partialCache["notfound"] = partial;
}); 

/*
 * 函数名：      ajax 调用
 * 调用方法：  get与post方法均可为一个
 * 		setting 为基础设置，参数可以为空不填写则为默认值
 */

function getAjax(setting,loading,callback,ext){
	$.ajax({
		type:setting.type||"POST",
		url:setting.url,
		dataType:setting.dataType||"JSON",		
		data:setting.data,
		async:setting.async||true,
		beforeSend:function(){
			if(loading){
				loading(ext);
			}
		},
		success:function(data){
			if(callback){
				callback(200,data,ext);
			}
		},
		error:function(xhr,err){
			if(callback){
				//console.log("moudle,error"+xhr.status+JSON.stringify(err),ext)
				callback(404);
			}
		}
	});
}






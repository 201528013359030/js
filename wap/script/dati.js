//所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。
//全局变量是 window 对象的属性。访问window['name']
//全局函数是 window 对象的方法。
var notfound = {};
//var notfound = {w:3};
//alert(window['notfound'].w+'2333');
notfound.partial = "../html/temp/404.html";
notfound.init = function(){
    console.log('网址不存在');
}
var noweb = {};
noweb.partial = "../html/temp/noweb.html";
noweb.init = function(){
	$("#J_backHome").on("click",function(){
		window.location.replace("#home");
	});
    console.log('网址不存在');
}
var home= {};
//home.partial = "../html/temp/partyStudyQuestionSummary.html";
home.partial = "../html/temp/home.html";
home.init = function(){
	miniSPA.render("home");
	page_home=1;
	$("body").css("background-color","#F1F2F4");
	setListIteam(page_home);
	commonFunction.load_page("#page_innerContent");
	
	$("#search_bar").on("click","#search_clear",function(){
		var searchtitle = $("#search_input").val();
//		alert(searchtitle);
		$("#J_listGroup").empty(); //empty() 方法从被选元素移除所有内容，包括所有文本和子节点。 --fyq
		setSearchListIteam(searchtitle);
	})
	
	$('#search_input').focus(function(){
		$('#search_clear').css('display','block');
		$('#search_cancel').css('display','block');
	})
	
	$('#search_input').blur(function(){
		var searchtitle = $("#search_input").val();
		if(searchtitle){
			$("#J_listGroup").empty(); //empty() 方法从被选元素移除所有内容，包括所有文本和子节点。 --fyq
			setSearchListIteam(searchtitle);
		}
		$('#search_clear').css('display','none');
		$('#search_cancel').css('display','none');
	})
	
	if($("#page_innerContent")[0]) {
		$("#tab1").pullToRefresh().on("pull-to-refresh", function() {
		    var self = this;		    
		    setTimeout(function() {
		      	window.location.reload();
		        $(self).pullToRefreshDone(); // 重置下拉刷新
		    }, 2000);   //模拟延迟
	    });
	    
	    $("#tab1").infinite().on("infinite", function() { //无限加载 --fyq
	    	
			console.log("infiniteScroll.html");
			
			if(flag_home){
				var self = this;			    
			    if(self.loading) return;
			    self.loading = true;
			    setTimeout(function() {
			    	setListIteam(page_home);
			        self.loading = false;
			    }, 2000);   //模拟延迟
			}
			
		    
	    });
	}    
	    
}

var examine= {};
examine.partial = "../html/temp/examine.html";
examine.init = function(){
	miniSPA.render("examine");
	var bankid = examine.parame;
	
	$("body").css("background-color","#F1F2F4");
	//初始化设置：隐藏loading
	commonFunction.load_page("#page_innerContent");
	//初始化答题页面
	setExamine(bankid);
		
	$("#page_innerContent").on("click","#J_restar",function(){
		
		$.confirm(commonTiptext.confirm_restar_con,commonTiptext.confirm_restar_title,function(){
			//$.toast("重新开始答题");
			window.location.href = "#begin_"+bankid+"_1";
		}, function() {
			//取消操作
		});
	});
	$("#page_innerContent").on("click","#J_continue",function(){
		window.location.href = "#begin_"+bankid;
	});
		
}

var begin= {};
begin.partial = "../html/temp/begin.html";
begin.init = function(){
	miniSPA.render("begin");
	var setting = {};
	var bankid = begin.parame,
		bank_count = begin.parameCon;
	//alert(bankid);
	$("body").css("background-color","#fff");
	commonFunction.load_page("#page_innerContent");
	
	//初始化开始答题
	
	if( bank_count ){
		setting = {"id":bankid,"new":bank_count};
	}else{
		setting = {"id":bankid}
	}
	setBegin(setting);
	
	/*
	 * 因为有模版所以要带着父元素 切记 
	 */
	$("#page_innerContent").on("change","input[name='duty']",function(){
		var value = $("input[name='duty']:checked").val();
		if(value){
			$("#page_innerContent #J_btn_submit").attr("class","weui_btn weui_btn_primary");
		}else{
			$("#page_innerContent #J_btn_submit").attr("class","weui_btn weui_btn_default weui_btn_disabled");
		}
	});
	
	$("#page_innerContent").on("click","#J_btn_submit",function(){
		var obj = this,
			cls = $(this).attr("class");
		if(/weui_btn_primary/.test(cls)){
			$("#page_innerContent input[name='duty']").attr("disabled","true");
			var arr ={
				"paperid":begin.data.paperId,
				"questionid":$(obj).attr("data-questionid"),
				"answer":getInputOption()
			}	
			//var str = JSON.stringify(arr);
			begin.answer = getInputOption();
			//提交答案
			sendQuestion(arr);
		}
	});
	
	$("#page_innerContent").on("click","#J_btn_next",function(){
		console.log(begin.data + CURRCOUNT);
		setBeginIteam(begin.data.questions[CURRCOUNT]);
	});
	
	$("#page_innerContent").on("click","#J_btn_half_finish",function(){
		$.confirm(commonTiptext.confirm_finish_half_con, commonTiptext.confirm_finish_half_title,function(){
			submitQuestion(begin.data.paperId);			
		}, function() {
		//取消操作
		});
	});
	
	$("#page_innerContent").on("click","#J_btn_finish",function(){
		submitQuestion(begin.data.paperId);
	});
}

var finish= {};
finish.partial = "../html/temp/finish.html";
finish.init = function(){
	miniSPA.render("finish");
	var paperId = finish.parame;
	$("body").css("background-color","#FDFDFD");
	commonFunction.load_page("#page_innerContent");
	//初始化开始答题
	setFinish(paperId);
	$("#page_innerContent").on("click","#J_restar",function(){
		var bankid = $(this).attr("data-bankid");
		window.location.replace("#examine_"+bankid);
	});
	$("#page_innerContent").on("click","#J_overview",function(){
		var bankid = $(this).attr("data-bankid");
		window.location.replace("#overview_"+bankid);
	});
	

}


var overview= {};
overview.partial = "../html/temp/overview.html";
overview.init = function(){
	miniSPA.render("overview");
	var bankid = overview.parame;
	END_CURRCOUNT = 0;
	$("body").css("background-color","#fff");
	commonFunction.load_page("#page_innerContent");
	setOverview(bankid);
	var max = overview.data.count;
	$("#page_innerContent").on("click","#J_prev",function(){
		if(END_CURRCOUNT==0){
			$.toast("已是第一题了", "cancel");
		}else{
			END_CURRCOUNT--;
			var data = overview.data.list[END_CURRCOUNT];
			setEndIteam(data);
		}
		
	});
	$("#page_innerContent").on("click","#J_next",function(){
		if(END_CURRCOUNT==(max-1)){
			$.toast("已是最后一题", "cancel");
		}else{
			END_CURRCOUNT++;
			var data = overview.data.list[END_CURRCOUNT];
			setEndIteam(data);
		}
	});
	//alert(bankid);
	$("#page_innerContent").on("click","#J_goback",function(){
		var obj = this;
		var examid = $(obj).attr("data-bankid");
		window.location.replace("#examine_"+examid);
	});
}

var ranking= {};
ranking.partial = "../html/temp/ranking.html";
ranking.init = function(){
	miniSPA.render("ranking");
	
	page_rank = 1;
	var bankid = ranking.parame;
	$("body").css("background-color","#fff");
	commonFunction.load_page("#page_innerContent");
	setRanking(bankid,page_rank);
	if($("#page_innerContent")[0]) {
		$("#tab1").pullToRefresh().on("pull-to-refresh", function() {
		    var self = this;
		    
		    setTimeout(function() {
		      	window.location.reload();
		        $(self).pullToRefreshDone(); // 重置下拉刷新
		    }, 2000);   //模拟延迟
	    });
	    
	    $("#tab1").infinite().on("infinite", function() {	    	
			console.log("infiniteScroll.html");
			
			if(flag_rank){
			    var self = this;			    
			    if(self.loading) return;
			    self.loading = true;
			    setTimeout(function() {
			    	//formID 在lappmod.js中进行全局变量赋值
			    	setRanking(bankid,page_rank);
			        self.loading = false;
			    }, 2000);   //模拟延迟		    
		    }
	    });
	}  
}





















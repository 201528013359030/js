var SERVER_IP = sessionStorage.getItem("SERVER_IP"), //获取url?后面的参数serverIp --fyq
	NATIVE_UID = sessionStorage.getItem("NATIVE_UID");//获取url后面的参数uid --fyq
	NATIVE_PLANID =sessionStorage.getItem("NATIVE_PLANID");
	NATIVE_PLANID ='2';
//alert(SERVER_IP);
//alert(NATIVE_UID);
var urlbase = SERVER_IP+"/partyqing2/backend/web/index.php"
var limit_home = 15,
	limit_rank = 15; //与服务器规定最多显示多少条，死的
var page_home = 1,
	page_rank = 1; //翻页 第几页
var flag_home = true,
	flag_rank = true; //true  可以继续翻页； false 不能继续翻页
var CURRCOUNT = 0,
	END_CURRCOUNT = 0; //currcount 答题     End_currcount查看错题

var bh = $(window).height();
if(bh<480){
    $('body').addClass('xs-screen');
}

//获取首页列表
function setListIteam(page){
//	var info ="{\"limit\":\"20\",\"offset\":\"0\",\"valid\":\"1\",\"uid\":\"6@3\",\"planid\":\"2\",\"p\":\""+page+"\"}";
	var info = {
			"uid":NATIVE_UID,
			"p":page,
			"planid":NATIVE_PLANID
	}
	info = JSON.stringify(info);//将参数字符串化 --fyq;
//	alert(info);
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/list&uid="+NATIVE_UID+"&p="+page
		"url":SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.list.get",
		"arr":{"info":info},
		"type":"post"
	};
	//获取数据
	var getList = commonFunction.getJsonResult(arr);//返回值为数组 --fyq
	if( /error/.test(getList) ){
//		alert("22"+getList);
		$.toast("有异常，请返回重试", "cancel");
		console.log("获取专题getList报错："+getList);
		return false;
	}
	
	console.log(getList);
//	return ;
	
			
	//生成页面
	var tpl_list = $("#tpl_list_iteam").html();
	var html = [];
	
	for( var i=0; i<getList.length; i++ ){
		var src = /questionpaperadd/.test(getList[i].pic)?"../images/mr.png":getList[i].pic;// test():RegExpObject.test(string)=>如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
		var html_iteam = tpl_list
			.replace( /\{bankid\}/g,getList[i].bankid )
			.replace( /\{pic\}/g,"src='"+src+"'" )
			.replace( /\{questionnum\}/g,getList[i].questionnum )
			.replace( /\{title\}/g,getList[i].title )
			.replace( /\{oname\}/g,getList[i].oname )
			.replace( /\{createtime\}/g,getList[i].createtime.split(" ")[0] );
		html.push(html_iteam); //push()	向数组的末尾添加一个或更多元素，并返回新的长度。 --fyq
	}
	
	//append()	向匹配元素集合中的每个元素结尾插入由参数指定的内容。 --fyq
	//join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 --fyq
	$("#J_listGroup").append( html.join('') ); 
	
	//$(selector).html(content) html() 方法返回或设置被选元素的内容 (inner HTML)。	如果该方法未设置参数，则返回被选元素的当前内容。
	//当使用该方法返回一个值时，它会返回第一个匹配元素的内容。当使用该方法设置一个值时，它会覆盖所有匹配元素的内容
	
	
	//判断显示是否可以继续加载下一页
	//先算一下一共有几页
	var totalpage = Math.ceil(getList[0].count/limit_home);
	//如果数据小于limit 则不能继续翻页 下拉加载
	if( getList.length<limit_home||getList[0].count==1||totalpage==page_home ){
		$(".resultEnd").hide();
		$(".resultEnd_nodata").show();
		flag_home = false;
	}else{
		flag_home = true;
		page_home++;
	}
	
	
}


//首页列表页面中搜索
function setSearchListIteam(searchtitle){
//	var info ="{\"limit\":\"20\",\"offset\":\"0\",\"valid\":\"1\",\"uid\":\"6@3\",\"planid\":\"2\",\"p\":\""+page+"\"}";
	var info = {
			"uid":NATIVE_UID,
			"searchtitle":searchtitle,
			"planid":NATIVE_PLANID
	}
	info = JSON.stringify(info);//将参数字符串化 --fyq;
//	alert(info);
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/list&uid="+NATIVE_UID+"&p="+page
		"url":SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.search.get",
		"arr":{"info":info},
		"type":"post"
	};
	//获取数据
	var getList = commonFunction.getJsonResult(arr);//返回值为数组 --fyq
	if( /error/.test(getList) ){
//		alert("22"+getList);
		$.toast("有异常，请返回重试", "cancel");
		console.log("获取专题getList报错："+getList);
		return false;
	}
	
	console.log(getList);
//	return ;
	
			
	//生成页面
	var tpl_list = $("#tpl_list_iteam").html();
	var html = [];
	
	for( var i=0; i<getList.length; i++ ){
		var src = /questionpaperadd/.test(getList[i].pic)?"../images/mr.png":getList[i].pic;// test():RegExpObject.test(string)=>如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
		var html_iteam = tpl_list
			.replace( /\{bankid\}/g,getList[i].bankid )
			.replace( /\{pic\}/g,"src='"+src+"'" )
			.replace( /\{questionnum\}/g,getList[i].questionnum )
			.replace( /\{title\}/g,getList[i].title )
			.replace( /\{oname\}/g,getList[i].oname )
			.replace( /\{createtime\}/g,getList[i].createtime.split(" ")[0] );
		html.push(html_iteam); //push()	向数组的末尾添加一个或更多元素，并返回新的长度。 --fyq
	}
	
	//append()	向匹配元素集合中的每个元素结尾插入由参数指定的内容。 --fyq
	//join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 --fyq
	$("#J_listGroup").append( html.join('') ); 
	
	//$(selector).html(content) html() 方法返回或设置被选元素的内容 (inner HTML)。	如果该方法未设置参数，则返回被选元素的当前内容。
	//当使用该方法返回一个值时，它会返回第一个匹配元素的内容。当使用该方法设置一个值时，它会覆盖所有匹配元素的内容
	
	
	//判断显示是否可以继续加载下一页
	//先算一下一共有几页
	var totalpage = Math.ceil(getList[0].count/limit_home);
	//如果数据小于limit 则不能继续翻页
	if( getList.length<limit_home||getList[0].count==1||totalpage==page_home ){
		$(".resultEnd").hide();
		$(".resultEnd_nodata").show();
		flag_home = false;
	}else{
		flag_home = true;
		page_home++;
	}
	
	
}


function setExamine(id){
	//获取数据
	var isFirst = false,
		isContinue = false;
	var bankid = id;
//	var info ="{\"id\":\""+bankid+"\"}";
	var info = {
			"id":bankid
	}
	info = JSON.stringify(info);
	
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/info&id="+bankid,
			"url":SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.info.get",
			"arr":{"info":info},
			"type":"post"
	};
	
	var getInfo = commonFunction.getJsonResult(arr);
	if( /error/.test(getInfo) ){
		$.toast("有异常，请稍后再试", "cancel");
		console.log("查看试题getInfo报错："+getInfo);
		return false;
	}
	
	console.log(getInfo);
	
	if(getInfo.sum==0){
		isFirst = true;
	}
	if(getInfo.finishflag==0){
		isContinue=true;
	}
	
	//生成页面
	var top_first = $("#tpl_first").html(),
		tpl_second_first = $("#tpl_second_first").html(),
		tpl_second = $("#tpl_second").html(),
		tpl_echarts = $("#tpl_echarts").html(),
		tpl_defalut_btn = $("#tpl_defalut_btn").html(),
		tpl_continue_btn = $("#tpl_continue_btn").html();
	var html = '',
		html_btn = '';
	
	if(isFirst){
		html=top_first
		.replace( /\{bank\}/g,getInfo.bank )
		.replace( /\{questionnum\}/g,getInfo.questionnum )
		.replace( /\{bankid\}/g,getInfo.bankid );
		$("#tpl_echarts").hide();
	}else{
		
		if(getInfo.count==0){
			html=tpl_second_first
			.replace( /\{bank\}/g,getInfo.bank )
			.replace( /\{questionnum\}/g,getInfo.questionnum )
			.replace( /\{bankid\}/g,getInfo.bankid );
		}else{
				
			html = tpl_second
			.replace( /\{bank\}/g,getInfo.bank )
			.replace( /\{questionnum\}/g,getInfo.questionnum )
			.replace( /\{count\}/g,getInfo.count )
			.replace( /\{correctNum\}/g,getInfo.questionnum-getInfo.falseNuM )
			.replace( /\{falseNuM\}/g,getInfo.falseNuM )
			.replace( /\{ranking\}/g,getInfo.ranking )
			.replace( /\{sum\}/g,getInfo.sum );
		}
			html += tpl_echarts
				.replace( /\{bankid\}/g,getInfo.bankid );
			//绘制	
			$("#tpl_echarts").hide();
			
			if(isContinue){
				html_btn = tpl_continue_btn
					.replace( /\{bankid\}/g,getInfo.bankid );
					
			}else{
				html_btn = tpl_defalut_btn
					.replace( /\{bankid\}/g,getInfo.bankid );
			}
			//console.log(getInfo.bankid);
			html += html_btn;
		
	}
		
	$("#page_innerContent").html( html );
	if(!isFirst){
		setChart({"title":getInfo.top.title,"xdata":getInfo.top.name,"ydata":getInfo.top.value,"max":getInfo.questionnum});
	}
	
	if( !isFirst&&getInfo.count>0 ){		
		$("#page_innerContent #J_viewDisable").hide();
		$("#page_innerContent #J_viewError").show();
		
	}
	
}

function setChart(setting){
	console.log(setting);
	var myChart = echarts.init(document.getElementById('J_c'));
    // 指定图表的配置项和数据
    var option = {
    	title:{
    		left:'center',
    		text:setting.title
    	},
    	color:['#FF7143'],
        xAxis: {
            data:/,/.test(setting.xdata)?setting["xdata"].split(","):setting["xdata"].split(" ")
        },
        yAxis: {
        	max:setting.max
        },
        series: [{
            name: '题数',
            type: 'bar',
            barWidth: '50%',
            data: /,/.test(setting.ydata)?setting["ydata"].split(","):setting["ydata"].split(" ")
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/*
 * 在本页时时更新题目
 */
function setBegin(setting){
	
	var iteams="",
		isNew="",
		question_sum = "";		
	var bankid = setting.id;
	var	bank_new = setting.new;
	var info ={
			"id":bankid
	}
	
			
	//判断是否重新开始 new=1重新开始没有则继续答题
	if(bank_new){
		isNew = "&new="+bank_new;
	}
	info.id=info.id+isNew;
	info = JSON.stringify(info);
	//获取数据
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/topic&id="+bankid+isNew
//			"url":SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api?method=Leaquestion.topic.get",
			"url":SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.topic.get",
			"arr":{"info":info},
			"type":"post"
	};
//	alert(JSON.stringify(arr));
	var getTopic = commonFunction.getJsonResult(arr);
	if( /error/.test(getTopic) ){
		$.toast("有异常，请稍后再试", "cancel");
		console.log("获取专题getTopic报错："+getTopic);
		return false;
	}
	console.log( getTopic );
	if( getTopic.count==getTopic.questions.length ){
		submitQuestion(getTopic.paperId);
		return false;
	}
	CURRCOUNT = getTopic.count;
	begin.data = getTopic;
	
	//生成页面
	var data = getTopic.questions[CURRCOUNT];
	setBeginIteam(data);
	
}
function setBeginIteam(data){
	var data = data
		iteam = "";
	
	var isRadio = false;
	isRadio = data.questionflag==3?false:true;
	
	var tpl_question = $("#tpl_question").html(),
		tpl_radio = $("#tpl_radio").html(),
		tpl_checkbox = $("#tpl_checkbox").html(),	
		tpl_btn_checkanswer = $("#tpl_btn_checkanswer").html();

	var html = "",
		html_btn = "";
	var type = commonTiptext.questionflag[data.questionflag];
	
	html = tpl_question
		.replace( /\{questionflag\}/g, type)
		.replace( /\{question_num\}/g,Number(CURRCOUNT)+1 )
		.replace( /\{question\}/g,data.question )
		.replace( /\{count\}/g,Number(CURRCOUNT)+1 )
		.replace( /\{question_sum\}/g,begin.data.questions.length );
	
	html_btn = tpl_btn_checkanswer
		.replace( /\{questionid\}/g, data.questionid);
	
	if(isRadio){
		iteam = tpl_radio;
	}else{
		iteam = tpl_checkbox;
	}
	
	var iteams = ""
	//判断有几个选项
	if(data.answerA){
		iteams += iteam
			.replace( /\{answer\}/g, data.answerA)
			.replace( /\{option\}/g, "A");
	}
	if(data.answerB){
		iteams += iteam
			.replace( /\{answer\}/g, data.answerB)
			.replace( /\{option\}/g, "B");
	}
	if(data.answerC){
		iteams += iteam
			.replace( /\{answer\}/g, data.answerC)
			.replace( /\{option\}/g, "C");
	}
	if(data.answerD){
		iteams += iteam
			.replace( /\{answer\}/g, data.answerD)
			.replace( /\{option\}/g, "D");
	}
	
	//把html代码汇总在这里
	html = html
		.replace( /\{question_list\}/g, iteams);
	html += html_btn;
	
	$("#page_innerContent").html( html );
	
}
function getInputOption(){
	var chk_value =[]; 
	$('#page_innerContent input[name="duty"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	return chk_value.join("");
}
//提交答案
function sendQuestion(str){	
	//
	var isLastChild = false,
		isRight = false;
	var info = str;
	info = JSON.stringify(info);
	//提交数据	
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/submit",
			"url" : SERVER_IP+"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.submit.get",
		"type":"post",
		"arr":{"info":info}
	};
	//console.log(arr);
	var sendQue = commonFunction.getJsonResult(arr);
	if( /error/.test(sendQue) ){
		$.toast("有异常，请返回重试", "cancel");
		console.log("提交答案sendQue报错："+sendQue);
		return false;
	}
	console.log(sendQue);
	
	//处理结果
	if(sendQue.finishflag==1){
		isLastChild = true;
	}
	if(sendQue.answerCorrect==begin.answer ){
		isRight = true;
	}
		
	if( isLastChild ){
		//如果是最后一个，则显示交卷一个按钮
		$("#page_innerContent #btn_submit").hide();
		$("#page_innerContent #btn_next").hide();
		$("#page_innerContent #btn_finish").show();
	}else{
		$("#page_innerContent #btn_submit").hide();
		$("#page_innerContent #btn_next").show();
		$("#page_innerContent #btn_finish").hide();
	}
	
	var infos = begin.data.questions[CURRCOUNT];
	console.log(infos);
	var	tpl_information = $("#tpl_information").html();
	var html ="";
	html = tpl_information
		.replace( /\{answerYours\}/g, begin.answer)
		.replace( /\{answerCorrect\}/g, infos.answerCorrect)
		.replace( /\{analysis\}/g, "<p>"+infos.analysis+"</p>");
		
	$("#page_innerContent #J_information").html(html);
	
	
	if(infos.questionflag==3){
		var correctAns = (infos.answerCorrect).split(""),
			yourAns =  (begin.answer).split("");
		for(var i=0;i<correctAns.length;i++){				
			$("#page_innerContent ."+correctAns[i]).addClass("ui-txt-warning");
		}
				
	}else{			
		$("#page_innerContent ."+infos.answerCorrect).addClass("ui-txt-warning");
	}
	
	
	CURRCOUNT = Number(CURRCOUNT)+ 1;
	
}

function submitQuestion(paperId){
	$.toast("已提交成功!");
	window.location.replace("#finish_"+paperId);
}

function setFinish(paperId){
	
	var info ={
			"paperid" : paperId
	}
	info = JSON.stringify(info);
	//获取数据
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/end&paperid="+paperId
			"url" : SERVER_IP +"/partyqing2/backend/web/index.php?r=leaquestion/api&method=Leaquestion.end.get",
//			"url" : "http://192.168.139.87/partyqing2/backend/web/index.php?r=leaquestion?method=Leaquestion.end.get",
			"arr" : {"info":info},
			"type":"post"
	};
	
	var getEnd = commonFunction.getJsonResult(arr);
	if( /error/.test(getEnd) ){
		var errorArr = getEnd.split("_");
		if(errorArr[2]=="-2"){
			window.location.href = "#home";
		}else{
			$.toast("有异常，请返回重试", "cancel");
			return false;
		}
		console.log("交卷getEnd报错："+getEnd);
	}
	
	//生成页面
	var tpl_finishTop = $("#tpl_finishTop").html();
	var html = "";
	
	var successNum = (getEnd.correctNum/getEnd.questionNum).toFixed(2);
	var successStr = "";
	switch (successNum){
		case successNum>80:
			successStr = "1"
			break;
		case 79>successNum>70:
			successStr = "2"
			break;
		case 69>successNum>60:
			successStr = "3"
			break;
		case 59>successNum>50:
			successStr = "4"
			break;
		default:
			successStr = "5"
	}
	//console.log(successStr);
	html = tpl_finishTop
		.replace( /\{correctNum\}/g, getEnd.correctNum)
		.replace( /\{falseNuM\}/g, getEnd.falseNuM)
		.replace( /\{questionNum\}/g, getEnd.questionNum)
		.replace( /\{bankid\}/g, begin.parame)
		.replace( /\{salutatory\}/g, commonTiptext["score"+successStr]);
	
	$("#page_innerContent").html( html );
	//console.log(getEnd.correctNum+getEnd.questionNum);
	if(getEnd.correctNum!=getEnd.questionNum){
		$("#page_innerContent #J_viewDisable").hide();
		$("#page_innerContent #J_overview").show();
	}else{
		$("#page_innerContent #J_overview").hide();
		$("#page_innerContent #J_viewDisable").show();
		
	}
	
}

function setOverview(id){
	//console.log("setOverview："+id);
	var iteams="",
		isNew="",
		question_sum = "";
	var info = {
			"bankId" : id
	}
	info = JSON.stringify(info);
		
	//获取数据
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/false&bankId="+id
			"url":urlbase+"?r=leaquestion/api&method=Leaquestion.false.get",
			"arr":{"info":info},
			"type":"post"
	};
	
	var getFalse = commonFunction.getJsonResult(arr);
	if( /error/.test(getFalse) ){
		$.toast("有异常，请返回重试", "cancel");
		console.log("查看错题getFalse报错:"+getFalse);
		return false;
	}
	console.log(getFalse);
	if(getFalse.count==0){
		var nodata = commonFunction.dataEmpty("noError","暂无错题","太棒了，您上次都答对了！");
		$("#J_innerContent").html( nodata );
		return false;
	}
	
	overview.data = getFalse;
	
	//生成页面
	var data = getFalse.list[END_CURRCOUNT];
	
	setEndIteam(data);
	
}

function setEndIteam(data){
	var data = data,
		iteam = "";
	console.log("setEndIteam:");
	console.log(data);
	var isRadio = false;
	isRadio = data.info.questionflag==3?false:true;
	
	var tpl_question = $("#tpl_question").html(),
		tpl_radio = $("#tpl_radio").html(),
		tpl_checkbox = $("#tpl_checkbox").html(),	
		tpl_btn = $("#tpl_btn").html();

	var html = "",
		html_btn = "";
	var type = commonTiptext.questionflag[data.info.questionflag];
	
	html = tpl_question
		.replace( /\{questionflag\}/g, type)
		.replace( /\{question_num\}/g,Number(END_CURRCOUNT)+1 )
		.replace( /\{question\}/g,data.info.question )
		.replace( /\{answerYours\}/g, data.answer==0?"(未答)":data.answer)
		.replace( /\{answerCorrect\}/g, data.info.answerCorrect)
		.replace( /\{analysis\}/g, "<p>"+data.info.analysis+"</p>");
	
	html_btn = tpl_btn
		.replace( /\{bankid\}/g, data.info.bankID);
	
	if(isRadio){
		iteam = tpl_radio;
	}else{
		iteam = tpl_checkbox;
	}
	
	var iteams = ""
	//判断有几个选项
	if(data.info.answerA){
		iteams += iteam
			.replace( /\{answer\}/g, data.info.answerA)
			.replace( /\{option\}/g, "A");
	}
	if(data.info.answerB){
		iteams += iteam
			.replace( /\{answer\}/g, data.info.answerB)
			.replace( /\{option\}/g, "B");
	}
	if(data.info.answerC){
		iteams += iteam
			.replace( /\{answer\}/g, data.info.answerC)
			.replace( /\{option\}/g, "C");
	}
	if(data.info.answerD){
		iteams += iteam
			.replace( /\{answer\}/g, data.info.answerD)
			.replace( /\{option\}/g, "D");
	}
	
	//把html代码汇总在这里
	
	html = html
		.replace( /\{question_list\}/g, iteams);
	html += html_btn;
	
	$("#page_innerContent").html( html );
	if(data.info.questionflag==3){
		var correctAns = (data.info.answerCorrect).split(""),
			yourAns =  (data.answer).split("");
		for(var i=0;i<correctAns.length;i++){				
			$("#page_innerContent ."+correctAns[i]).addClass("ui-txt-warning");
		}
		console.log(yourAns);
		for(var j=0; j<yourAns.length; j++){
			$("#page_innerContent .input"+yourAns[j]).attr("checked","true");
			
		}
		
	}else{
		$("#page_innerContent .input"+data.answer).attr("checked","true");	
		$("#page_innerContent ."+data.info.answerCorrect).addClass("ui-txt-warning");
	}
	
}


function setRanking(bankid,page){
	
	var info = {
			"id":bankid,
			"p":page
	}
	info = JSON.stringify(info);
	//获取数据
	var arr = {
//		"url":SERVER_IP+"/question/web/index.php?r=test/top&id="+bankid+"&p="+page
			"url":urlbase+"?r=leaquestion/api&method=Leaquestion.top.get",
			"arr":{"info":info},
			"type":"post"
	};
	
	var getRank = commonFunction.getJsonResult(arr);
	if( /error/.test(getRank) ){
		$.toast("有异常，请返回重试", "cancel");
		console.log("获取列表getRank报错:"+getRank);
		return false;
	}
	console.log(getRank);
	//生成页面
	var rankNums = getRank.length;
	
	var tpl_rankIteam = $("#tpl_rankIteam").html();
	var html = [];
	
	for( var i=0;i<rankNums;i++ ){
		var src = getRank[i].photo?getRank[i].photo:"../images/icon_male.png";
		var _html ="";
		_html = tpl_rankIteam
			.replace( /\{top\}/g,getRank[i].top )
			.replace( /\{photo\}/g,"src='"+src+"'")
			.replace( /\{name\}/g,getRank[i].name)
			.replace( /\{correctNum\}/g,getRank[i].correctNum);
		html.push(_html);
	}
	
	$("#page_innerContent #J_listGroup").append( html.join('') );
	
	//判断显示是否可以继续加载下一页
	//先算一下一共有几页
	var totalpage = Math.ceil(getRank[0].count/limit_home);
	//如果数据小于limit 则不能继续翻页
	if( getRank.length<limit_home||getRank[0].count==1||totalpage==page_rank ){
		$(".resultEnd").hide();
		$(".resultEnd_nodata").show();
		flag_rank = false;
	}else{
		flag_rank = true;
		page_rank++;
	}
	
	
}








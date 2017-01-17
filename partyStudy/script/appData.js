//http://192.168.139.11/mycrm/frontend/web/index.php?r=api/mdview&id=44

/*
 * @ getRequestList
 * @ 说明：获取意见反馈列表
 * @ parameter json参数说明：
 *  title	false	string	查询条件
	date	false	string	查询条件
	page	false	string	第几页
	status	false	string	0未处理，1已处理
 */

// 文件上传
function upLoad(){
	var transferid = parseInt(new Date().getTime()/1000);
	var webAppTransferID = parseInt(new Date().getTime()/1000)+"22323";
	NativeInteractive.upload({
		"uploadUrl":sessionStorage.getItem("SERVER_IP")+"/media_file/",
		"webAppTransferID":transferid,
		"taskID":webAppTransferID
		});
	
}

function OnUploadCb(datas){
	
	var status = datas.result.status,
		params = datas.result.params;

if(params){
	
	var transferStatus = params.transferStatus;
	if(transferStatus=="Success"){
		$.hideLoading();
		var results = [{"name":params.fileName,"size":params.size,"path":params.uploadPath}];
		var html = renderAttach(results);
		$("#J_attachList").append(html);
//		var str_para = JSON.stringify(params);
//		alert("OnUploadCb 文件已上传:"+str_para);
		
	}
}
	
	console.log(JSON.stringify(datas));
}


//渲染生成附件
function renderAttach( results ){
	
	var tpl = $("#tpl_attach").html();
	var html =[];
	for(var i=0; i<results.length; i++){
		var _html = tpl
		.replace( /\{name\}/g,results[i].name )
		.replace( /\{size\}/g,results[i].size )
		.replace( /\{path\}/g,results[i].path);
		html.push(_html);
	}
	return html;
}


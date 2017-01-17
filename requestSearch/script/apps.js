var commonTxt = {
	"nodata":"暂无数据",
	"nodata_sub":"暂时没有相应的信息",
	"noweb":"网络连接失败",
	"noweb_sub":"网络链接失败，请价差您的网络设置！"
}

var noweb = {};
noweb.partial = "../html/temp/noweb.html";
noweb.init = function(){
    console.log('网址不存在');
}

var notfound = {};
notfound.partial = "../html/temp/404.html";
notfound.init = function(){
    console.log('网址不存在');
}

var partyStudyWriteExperience= {};
partyStudyWriteExperience.partial = "../html/temp/partyStudyWriteExperience.html";
partyStudyWriteExperience.init = function(){
	var requestType ="";
//	var requestType = getRequestType();
	miniSPA.render("partyStudyWriteExperience");
	//获取用户基本信息
	var userInfo ="";
//	var userInfo = getUserinfo();

	$("#contact").val(userInfo.mobile);
	$("#userName").val(userInfo.username);
	$("#companyName").val(userInfo.company);
	
	commonFun.load_page("#page_innerContent"); //loading加载
	
	$("#sel-questionType").select({
	  title: "选择反馈类型",
	  items: requestType
	});
	
	$("#J_uploadAttach").on("click",function(){		
//		chooseSheetPhoto();
		var attachs = $("#J_attachList .J_delAttach");
		if(attachs.length<3){
			$('.ic_text').html('上传附件')
			upLoad();
		}
		else{
			$('.ic_text').html('最大上传文件为3个')
		}
	});
//	$("#weui_icon_cancel").on("click",function(){		
////		chooseSheetPhoto();
//		var attachs = $("#J_attachList .J_delAttach");
//		if(attachs.length<5){
//			$('.ic_text').html('上传附件')
//		}
//	});
	
	$(document).on("click",".J_delAttach",function(){
		var obj = this;
		$.confirm("您确定要删除文件吗?", "确认删除?", function() {
			$.toast("文件已经删除!");
			$(obj).remove();
			var attachs = $("#J_attachList .J_delAttach");
			if(attachs.length<3){
				$('.ic_text').html('上传附件')
			}
		}, function() {
			//取消操作
			
		});
	});
	
	$("#J_requestUpdate").on("click",function(){
		var title = $("#title").val();
		var content = $("#content").val();
		var contact = $("#contact").val();
		//新增基本信息
		//var senderName = $("#userName").val();
		//var company = $("#companyName").val();
		//var type = $("#sel-questionType").val();
		//var type_value=$("#sel-questionType").attr("data-values");
		var files = [];
		var attachs = $("#J_attachList .J_delAttach");
		if(attachs.length>0){
			for(var i=0;i<attachs.length;i++){
				var _file = {};
				_file["name"]=attachs.eq(i).attr("data-name");
				_file["size"]=attachs.eq(i).attr("data-size");
				_file["path"]=attachs.eq(i).attr("data-path");
				//files[i]=_file;
				files.push(_file);
			}
		}
//		var reg_tel = /^0\d{2,3}-?\d{7,8}$/;
//		var reg_email =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/ ;
//		if( !reg_phone.test(contact)&&!reg_email.test(contact)&&!reg_tel.test(contact)){
//			$.toast("请输入正确的联系方式","cancel");
//			return false;
//		}
		$("#J_requestUpdate").attr("disabled","true");
		var parameter = {"title":title,"type":type_value,"content":content,"contact":contact,"senderName":senderName,"company":company,"file":files};
		console.log(parameter);
		var isupdate = updateRequest(parameter);
		if(isupdate.succeed==1){
			$.toast("已经提交成功!");
			window.location.replace("#home");
		}else{
			$.toast("提交失败，请重试!");
			$("#J_requestUpdate").attr("disabled","false");
		}
	});
	
}









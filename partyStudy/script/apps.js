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

var home= {};
home.partial = "../html/temp/home.html";
home.init = function(){
	miniSPA.render("home");
	commonFun.load_page("#page_innerContent")
}

var partyStudyList= {};
partyStudyList.partial = "../html/temp/partyStudyList.html";
partyStudyList.init = function(){
    miniSPA.render("partyStudyList");
    /*
     * 实际使用的过程中把代码写到这里
     * 否则js文件会越累计越多
     */
   // miniSPA.appendScript("../script/views/searchBar");
}

var partyStudyItem= {};
partyStudyItem.partial = "../html/temp/partyStudyItem.html";
partyStudyItem.init = function(){
    miniSPA.render("partyStudyItem");
    if($("#page_innerContent")[0]) {

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

            console.log("infiniteScroll.html");

            if(flag_home){
                var self = this;
                if(self.loading) return;
                self.loading = true;
                setTimeout(function() {
                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
                    self.loading = false;
                }, 2000);   //模拟延迟
            }


        });
    }
}

var partyStudyTasks= {};
partyStudyTasks.partial = "../html/temp/partyStudyTasks.html";
partyStudyTasks.init = function(){
    miniSPA.render("partyStudyTasks");
    if($("#page_innerContent")[0]) {

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

            console.log("infiniteScroll.html");

            if(flag_home){
                var self = this;
                if(self.loading) return;
                self.loading = true;
                setTimeout(function() {
                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
                    self.loading = false;
                }, 2000);   //模拟延迟
            }


        });
    }
}

var partyStudyTasksContent= {};
partyStudyTasksContent.partial = "../html/temp/partyStudyTasksContent.html";
partyStudyTasksContent.init = function(){
    miniSPA.render("partyStudyTasksContent");
    $(document).ready(function(){
        var winWidth = $(window).width();
        $('.party-task-button-box').css('width',winWidth);

    })
}

var partyStudyMaterialSummary= {};
partyStudyMaterialSummary.partial = "../html/temp/partyStudyMaterialSummary.html";
partyStudyMaterialSummary.init = function(){
    miniSPA.render("partyStudyMaterialSummary");
//	miniSPA.render("home");
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

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

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
//            if(flag_home){
//                var self = this;
//                if(self.loading) return;
//                self.loading = true;
//                setTimeout(function() {
//                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
//                    self.loading = false;
//                }, 2000);   //模拟延迟
//            }


        });
    }
}

var partyStudyMaterialContent = {};
partyStudyMaterialContent.partial = "../html/temp/partyStudyMaterialContent.html";
partyStudyMaterialContent.init = function(){
    miniSPA.render("partyStudyMaterialContent");
    setContent(partyStudyMaterialContent.parame);
    commonFunction.load_page("#page_innerContent");

}

var partyStudyExperience= {};
partyStudyExperience.partial = "../html/temp/partyStudyExperience.html";
partyStudyExperience.init = function(){
    miniSPA.render("partyStudyExperience");
    if($("#page_innerContent")[0]) {

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

            console.log("infiniteScroll.html");

            if(flag_home){
                var self = this;
                if(self.loading) return;
                self.loading = true;
                setTimeout(function() {
                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
                    self.loading = false;
                }, 2000);   //模拟延迟
            }


        });
    };
    $(document).on("click", ".party-experience-download-btn", function() {
        $.confirm("您确定要下载两学一做附件文件吗?", "确认下载?", function() {
            $.toast("已经开始下载!");
        }, function() {
            //取消操作
        });
    });
    var g = 0;
    $(document).on("click", ".party-experience-great1", function() {
        var G = parseInt($(this).children('.party-experience-great-num').html());
        if(g==0){
            $(this).children('.party-experience-great-img').attr('src','../images/icon/icon_great2.png')
            $(this).children('.party-experience-great-num').html(G+1).css('color','#cf2629');
            g = 1;
        }
        else{
            $(this).children('.party-experience-great-img').attr('src','../images/icon/icon_great.png')
            $(this).children('.party-experience-great-num').html(G-1).css('color','#999');
            g = 0;
        }
    });
    $('.party-experience-box').click(function(){
        window.onload.href = "#"
    });
    $(document).ready(function(){
        var winWidth = $(window).width();
        $('.party-experience-button-box').css('width',winWidth);

    })
}

var partyStudyQuestionSummary= {};
partyStudyQuestionSummary.partial = "../html/temp/partyStudyQuestionSummary.html";
partyStudyQuestionSummary.init = function(){
    miniSPA.render("partyStudyQuestionSummary");
    if($("#page_innerContent")[0]) {

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

            console.log("infiniteScroll.html");

            if(flag_home){
                var self = this;
                if(self.loading) return;
                self.loading = true;
                setTimeout(function() {
                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
                    self.loading = false;
                }, 2000);   //模拟延迟
            }


        });
    };

}

var partyStudyExperienceContent = {};
partyStudyExperienceContent.partial = "../html/temp/partyStudyExperienceContent.html";
partyStudyExperienceContent.init = function(){
    miniSPA.render("partyStudyExperienceContent");
    if($("#page_innerContent")[0]) {

        var flag_home = true; //是否继续加载

        $("#tab1").pullToRefresh().on("pull-to-refresh", function() {
            var self = this;
            setTimeout(function() {
                window.location.reload();
                $(self).pullToRefreshDone(); // 重置下拉刷新
            }, 2000);   //模拟延迟
        });

        $("#tab1").infinite().on("infinite", function() {

            console.log("infiniteScroll.html");

            if(flag_home){
                var self = this;
                if(self.loading) return;
                self.loading = true;
                setTimeout(function() {
                    $("#J_pullContent").append("<p>在此例子中，每一个tab都包含个字的代码块，在修改时，要对应修改例如#tab1, #tab2, #tab3等相关类，切记</p>")
                    self.loading = false;
                }, 2000);   //模拟延迟
            }


        });
    };
    $(document).ready(function(){
        var winWidth = $(window).width();
        $('.party-experience-button-box').css('width',winWidth);
        $('.party-experience-comment-content').css('width',winWidth-70)

    })
    $(document).on("click", ".party-experience-download-btn", function() {
        $.confirm("您确定要下载两学一做附件文件吗?", "确认下载?", function() {
            $.toast("已经开始下载!");
        }, function() {
            //取消操作
        });
    });
    var g = 0;
    $(document).on("click", ".party-experience-comment-content1-2", function() {
        var G = parseInt($(this).children('.party-experience-comment-great').html());
        if(g==0){
            $(this).children('.party-experience-comment-great-img').attr('src','../images/icon/icon_great2.png')
            $(this).children('.party-experience-comment-great').html(G+1).css('color','#cf2629');
            g = 1;
        }
        else{
            $(this).children('.party-experience-comment-great-img').attr('src','../images/icon/icon_great.png')
            $(this).children('.party-experience-comment-great').html(G-1).css('color','#999');
            g = 0;
        }
    });
}

var partyStudyWriteComment = {};
partyStudyWriteComment.partial = "../html/temp/partyStudyWriteComment.html";
partyStudyWriteComment.init = function(){
    miniSPA.render("partyStudyWriteComment");
    $(document).ready(function(){
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        $('.party-task-button-box').css('width',winWidth);
        $('.party-write-comment').css('height',winHeight-140);
        window.onresize = function(){
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            $('.party-task-button-box').css('width',winWidth);
            $('.party-write-comment').css('height',winHeight-140);
        };
        $('.party-write-comment').focus(function(){
            $(this).html(null).css('color','#666');
        })
    })
}
var partyStudyWriteExperience = {};
partyStudyWriteExperience.partial = "../html/temp/partyStudyWriteExperience.html";
partyStudyWriteExperience.init = function(){
    miniSPA.render("partyStudyWriteExperience");
    $(document).ready(function(){
        var winWidth = $(window).width();
        $('.party-task-button-box').css('width',winWidth);
        window.onresize = function(){
            var winWidth = $(window).width();
            $('.party-task-button-box').css('width',winWidth);
        };
        $('.party-write-experience').focus(function(){
            $(this).html(null).css('color','#666');
        })
    })
}


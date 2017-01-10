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
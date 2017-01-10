

if($("#page-ptr-navbar")[0]) {
    $("#tab1, #tab2, #tab3").pullToRefresh().on("pull-to-refresh", function() {
      var self = this;
      console.log(self);
      setTimeout(function() {
      	//$(self).find(".content-padded").append("<p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p>");
      	//window.location.reload();
        $(self).pullToRefreshDone(); // 重置下拉刷新
      }, 2000);   //模拟延迟
    });
    /*
     * infinite方法必须指定外围div 否则失效： 外围指  内容区+loading显示区
     * */
    $("#tab1, #tab2, #tab3").infinite().on("infinite", function() {			
	    var self = this;
	    if(self.loading) return;
	    self.loading = true;
	    //console.log(self);
	    setTimeout(function() {
	        $(self).find(".content-padded").append("<p>从广告行业转入UI设计后，他在魅族工作了整整10年，操刀了从M8 到Flyme 5的全部交互设计。</p><p>从广告行业转入UI设计后，他在魅族工作了整整10年，操刀了从M8 到Flyme 5的全部交互设计。</p><p>从广告行业转入UI设计后，他在魅族工作了整整10年，操刀了从M8 到Flyme 5的全部交互设计。</p><p>从广告行业转入UI设计后，他在魅族工作了整整10年，操刀了从M8 到Flyme 5的全部交互设计。</p><p>从广告行业转入UI设计后，他在魅族工作了整整10年，操刀了从M8 到Flyme 5的全部交互设计。</p>");
	       self.loading = false;
	    }, 2000);   //模拟延迟
    });
    
}
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
	commonFun.load_page("#page_innerContent"); //loading加载
}
$("#sel-area").select({
  title: "选择手机",
  items: [
    {
      title: "iPhone 3GS",
      value: "001",
    },
    {
      title: "iPhone 5",
      value: "002",
    },
    {
      title: "iPhone 5S",
      value: "003",
    },
    {
      title: "iPhone 6",
      value: "004",
    },
    {
      title: "iPhone 6S",
      value: "005",
    },
    {
      title: "iPhone 6P",
      value: "006",
    },
    {
      title: "iPhone 6SP",
      value: "007",
    },
    {
      title: "iPhone SE",
      value: "008",
    },
    {
      title: "iPhone 7",
      value: "009"
    }
  ],
  onChange:function(e){
  	console.log(e);
  }
});

var capitals = [{title: "中德高端装备制造产业园",value: "001"},{title: "先进装备制造产业园",value: "002"},{title: "中法生态城",value: "003"},{title: "化工医药产业园",value: "004"},{title: "商住服务聚集区",value: "005"},{title: "现代建筑产业园",value: "006"},{title: "西部新城",value: "007"}];
$("#sel-capital").select(
	"update",	{	items:capitals,
	onChange:function(e){
		console.log("title:"+e.titles+"value:"+e.values);
	}
});






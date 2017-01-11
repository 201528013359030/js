 $("#date").calendar({
    onChange: function (p, values, displayValues) {
      console.log(values, displayValues);
    }
});
$("#date_cn").calendar({
	value: ['2016-12-12'],
	dateFormat: 'yyyy年mm月dd日'  // 自定义格式的时候，不能通过 input 的value属性赋值 '2016年12月12日' 来定义初始值，这样会导致无法解析初始值而报错。只能通过js中设置 value 的形式来赋值，并且需要按标准形式赋值（yyyy-mm-dd 或者时间戳)
});
$("#date_multiple").calendar({
    multiple: true,
    onChange: function (p, values, displayValues) {
      console.log(values, displayValues);
    }
});


$("#time").datetimePicker({
	min: "2012-12-12",
	max: "2022-12-12 12:12"
});




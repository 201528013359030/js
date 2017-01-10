$(document).on("click", "#show-notification", function() {
	$.noti({
		title: "中奖啦！",
		text: "点击领取腾讯撸啊撸杯二等奖！",
		media: "<img src='../images/temp/present.png' />",
		data: {
			message: "逗你玩的!"
		},
		time: 3000,
		onClick: function(data) {
			$.alert(data.message);
		}
	});
});

$(document).on("click", "#show-alert", function() {
	$.alert("AlphaGo 就是天网的前身，人类要完蛋了！", "警告！");
});
$(document).on("click", "#show-confirm", function() {
	$.confirm("您确定要删除文件<<苍井空全集>>吗?", "确认删除?", function() {
		$.toast("文件已经删除!");
	}, function() {
		//取消操作
	});
});
$(document).on("click", "#show-prompt", function() {
	$.prompt({
		text: "名字不能超过6个字符，不得出现不和谐文字",
		title: "输入姓名",
		onOK: function(text) {
			$.alert("您的名字是:" + text, "角色设定成功");
		},
		onCancel: function() {
			console.log("取消了");
		},
		input: 'Mr Noone'
	});
});
$(document).on('click', '#show-login', function() {
	$.login({
		title: '登录',
		text: '请输入用户名和密码',
		onOK: function(username, password) {
			console.log(username, password);
			$.toast('登录成功!');
		},
		onCancel: function() {
			$.toast('取消登录!', 'cancel');
		}
	});
});
$(document).on("click", "#show-custom", function() {
	$.modal({
		title: "Hello",
		text: "我是自定义的modal",
		buttons: [{
			text: "支付宝",
			onClick: function() {
				$.alert("你选择了支付宝");
			}
		}, {
			text: "微信支付",
			onClick: function() {
				$.alert("你选择了微信支付");
			}
		}, {
			text: "取消",
			className: "default"
		}, ]
	});
});


$(document).on("click", "#show-toast", function() {
	$.toast("操作成功");
//  $.toast("操作成功", function() {
//    console.log('close');
//  });
})
.on("click", "#show-toast-cancel", function() {
    $.toast("取消操作", "cancel", function(toast) {
      console.log(toast);
	});
})
.on("click", "#show-toast-forbidden", function() {
    $.toast("禁止操作", "forbidden");
})
.on("click", "#show-toast-text", function() {
    $.toast("纯文本", "text");
})
.on("click", "#show-loading", function() {
    $.showLoading("自定义文字");

    setTimeout(function() {
      $.hideLoading();
    }, 3000)
});

$(document).on('click', '#show-success', function() {
    $.toptip('操作成功', 'success');
})
.on('click', '#show-error', function() {
    $.toptip('操作失败', 'error');
})
.on('click', '#show-warning', function() {
    $.toptip('警告', 'warning');
})





$(function(){
	var socket = io.connect();

	// 登录
	$("#loginBtn").on('click',function(){
		var username = $("#username").val();
		if(username!=""){
			socket.emit('login',String(username),function(isset){
				if(isset){
					$('.js_tips').html('该名字已存在');
				}else{
					$("#loginForm").hide();
					$("#playGame").show();
				}
			});
		}else{
			$('.js_tips').html('请输入名称');
		}
	});

	// 更新上线人员
	socket.on('update_online',function(users){
		var str = "";
		for(var i in users){
			str += '<li class="user_item">'+users[i]+'</li>';
		}
		$(".js_user_list").html(str);
	});

	// 更新记录
	socket.on('record_info',function(str){
		$("#record").prepend('<p>'+decodeURIComponent(str)+'</p>');
	});

	socket.on('error', function (err) {
	  if (err.description) throw err.description;
	  else throw err; // Or whatever you want to do
	});

	// 初始化血条
	socket.on('init_blood',function(num){
		$(".js_blood").css({
			width:num+'px'
		});
		if(num == 0){
			$("#attack").addClass('stop');
		}
	});

	// 修改血量
	socket.on('change_blood',function(num){
		$(".js_blood").css({
			width:num+'px'
		});

		$("#monster").addClass('hit');
		setTimeout(function(){
			$("#monster").removeClass('hit');
		},500);
	});

	// 停止攻击
	socket.on('stop_attack',function(){
		$("#attack").addClass('stop');
	});

	// 攻击
	$("#attack").on('click',function(){
		if(!$(this).hasClass('stop')){
			var num = Math.floor(Math.random()*10+1);
			socket.emit('attack',num);
		}
	});

});

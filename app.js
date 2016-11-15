// 使用connect中间层来处理静态文件请求
// 详情参考：https://github.com/senchalabs/connect
var connect = require('connect');
var app = connect.createServer(
  // 挂载当前文件所在目录
  connect.static(__dirname)
).listen(9000);
console.log("listening at the port 9000");


var sio = require('socket.io')
var io = sio.listen(app)

var blood = 700;

// 用户
var users = {};

// app.set('views','./pages');
// app.set('view engine','html');




io.sockets.on('connection', function(socket) {
	// 登录
	socket.on('login',function(name,fn){
		if(users[name]){
			fn(true);
		}else{
			users[name] = socket.username = name;
			// online[name] = name;
			fn(false);
			io.sockets.emit('update_online',users);
			console.log('<span class="username">'+name+'</span>'+'加入了战队')
			socket.broadcast.emit('record_info',encodeURIComponent('<span class="username">'+name+'</span>'+'加入了战队'));
			socket.emit('init_blood',blood);
		}
	});

	// 断开
	socket.on('disconnect',function(){
		if(!socket.username){
			return;
		}
		delete users[socket.username];
		console.log(1);
		socket.broadcast.emit('update_online',users);
		socket.broadcast.emit('record_info',encodeURIComponent('<span class="username">'+socket.username+'</span>'+' 已离开战队'));
	});

	// 错误报错
	socket.on('error',function(err){
		console.log(err);
	});

	// 攻击
	socket.on('attack',function(num){
		blood -= num;
		if(blood > 0){
			io.sockets.emit('record_info',encodeURI('<span class="username">'+socket.username+'</span>'+'给怪物造成了<span class="attacknum">'+num+'</span>点伤害'));
			io.sockets.emit('change_blood',blood);
		}else{
			io.sockets.emit('record_info',encodeURI('<span class="username">'+socket.username+'</span>'+'给了怪物最后一击，击败了怪物！'));
			io.sockets.emit('change_blood',0);
			io.sockets.emit('stop_attack');
		}
	});

});



全名打怪物小游戏
================================================
### 说明<br/>
这是利用websocket写的一个多人同时打怪物的小游戏。<br/>

监听加入战队与离开战队的提示。<br/>
设置了怪物的血量。<br/>
点击攻击随机产生1-10的血量。<br/>
当怪物血量为0时，停止攻击操作。<br/>
<br/>
使用node.js做服务端后台。<br/>
没有使用数据库来存数据，只是存数据在服务端变量里，所以刷新会失去连接数据。<br/>

### 使用方法<br/>
跟着安装了package.json里的包<br/>
然后运行node app.js即可在本地访问<br/>

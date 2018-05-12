# Overview
This is a client of [yolo_ws_server](https://github.com/komorin0521/yolo_ws_server)
In chrome browse, this scripts does not worked well, because `getUserMedia` worked only https protocol.


# SetUp
## 1. Modify host and port following yolo_ws_server config

modify `js/script.js`, line number of 49

```
47         function ws_init(){
48             console.log("init");
49             ws = new WebSocket("ws://localhost:3000"); //接続
50             ws.onopen = wsOnOpen; //接続できたとき
```

## 2. Copy this scripts `/var/www/html`

```bash
$ sudo mkdir /var/www/html/yolo_ws_client
$ sudo cp -r * /var/www/html/yolo_ws_client
```

## 3. access pages
Access `http://localhost:3000/yolo_ws_client`


# Contacs
If you have any questions, please send me an email or pull request.

email: yu.omori0521@gmail.com

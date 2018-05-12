$(function() {
	//videoタグを取得
	var video = document.getElementById('camera');
	//カメラが起動できたかのフラグ
	var localMediaStream = null;
	//カメラ使えるかチェック
	var hasGetUserMedia = function() {
		return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	};

	//エラー
	var onFailSoHard = function(e) {
		console.log('エラー!', e);
	};

	if(!hasGetUserMedia()) {
		alert("未対応ブラウザです。");
	} else {
		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		navigator.getUserMedia({video: true}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			localMediaStream = stream;
		}, onFailSoHard);
	}

        function wsOnOpen(){
            console.log("onOpen");
        }

        function wsOnMessage(event){
            console.log("call onMessage");
            var pred_canvas = document.getElementById('pred_canvas');
	    //canvasの描画モードを2sに
	    var pred_ctx = pred_canvas.getContext('2d');
	    var img = document.getElementById('yolo_img');
            pred_img = new Image();
            pred_img.onload = function(){
                pred_ctx.drawImage(pred_img, 0, 0);
            };
            pred_img.src = "data:image/png;base64," + event.data;

        }



        function ws_init(){
            console.log("init");
            ws = new WebSocket("ws://localhost:3000"); //接続
            ws.onopen = wsOnOpen; //接続できたとき
            ws.onerror = wsOnError; //接続エラーのとき
            ws.onclose = wsOnClose; //接続を閉じたとき
            ws.onmessage = wsOnMessage;
        }
         function wsOnError() {
             //接続エラーのときの処理..
             console.log("err");
             ws_init();
         }

         function wsOnClose() {
            //接続を閉じたときの処理..
            console.log("closed");
            ws_init();
         }

	yolo_pred = function(){
                console.log("yolo pred");
		if (localMediaStream) {
			var canvas = document.getElementById('canvas');
			//canvasの描画モードを2sに
			var ctx = canvas.getContext('2d');
			var img = document.getElementById('img');

			//videoの縦幅横幅を取得
			var w = video.offsetWidth;
			var h = video.offsetHeight;

			//同じサイズをcanvasに指定
			canvas.setAttribute("width", w);
			canvas.setAttribute("height", h);

                         //canvasにコピー
			 ctx.drawImage(video, 0, 0, w, h);

			//imgにpng形式で書き出し
                        // img_data = canvas.toDataURL('image/png');
                        img_data = canvas.toDataURL();
                        image = new Image();
                        img.onload = function() {
                           //canvasにコピー
   			 ctx.drawImage(video, 0, 0, w, h);
                            ws.send(img_data.replace(/^data:image\/(png|jpg);base64,/, ''), {binary:true, mask:false});
                        };
			img.src = img_data;
                        image.src = img_data;
		}
	};
        ws_init();
        setInterval("yolo_pred()",300);
});

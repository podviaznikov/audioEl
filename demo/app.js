/*global Backbone: true, ui: true, _:true */
"use strict";
var models={},ui={},
    AppController={
    init:function(){
        var xhr=new XMLHttpRequest();
        xhr.open('GET','https://api.soundcloud.com/tracks/17774737/stream?oauth_token=5d4a209d0df90ab7da97eeaf92118071',true);
        xhr.responseType='arraybuffer';




        var audioEl=AudioEl.newAudio('player');
        audioEl.on('started',function(){
            console.log('started');
        });
        audioEl.on('updated',function(duration,time){
            console.log('updated',duration,time);
            console.log(audioEl.timeCounter);
        });

        xhr.onload=function(e){
            console.log('loaded');
            if(this.status===200){
		var bb = new BlobBuilder();
		bb.append(this.response);
                var blob=bb.getBlob('audio/mp3');
                var url=window.webkitURL.createObjectURL(blob);
                audioEl.play(url);
            }

        };
	xhr.send();
        //audioEl.play('demo.mp3');
    //    audioEl.play('https://api.soundcloud.com/tracks/17774737/stream?oauth_token=5d4a209d0df90ab7da97eeaf92118071')

//        setTimeout(function(){
//            var audioEl2=AudioEl.newAudio('player2','demo.mp3');
//             audioEl2.bind('started',function(){
//                console.log('started2');
//            });
//             audioEl2.play();
//        },2000);
    }
};

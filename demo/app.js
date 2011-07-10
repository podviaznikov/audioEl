/*global Backbone: true, ui: true, _:true */
"use strict";
var models={},ui={},
    AppController={
    init:function(){
        var audioEl=AudioEl.newAudio('player','demo.mp3');
        audioEl.bind('started',function(){
            console.log('started');
        });
        audioEl.bind('updated',function(duration,time){
            console.log('updated',duration,time);
            console.log(audioEl.timeCounter);
        });
        audioEl.play();

//        setTimeout(function(){
//            var audioEl2=AudioEl.newAudio('player2','demo.mp3');
//             audioEl2.bind('started',function(){
//                console.log('started2');
//            });
//             audioEl2.play();
//        },2000);
    }
};
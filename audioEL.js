var AudioEl={
    this.newEl(id,src)=function{
        _.extend(this,Backbone.Events);
        this.el=$('#'+id);
        if(url){
            this.el.setAttribute('src',url);
        }
        this.el.bind('timeupdate',this.timeupdate);
        this.el.bind('pause',this.pause);
    },
    this.timeupdate=function(){
        var time=this.getTime(),
            duration=this.getDuration(),
            remaining=parseInt(duration-time,10);
        if(remaining===0){
            this.trigger('finished');
        }
        else{
            this.trigger('updated',duration,time);
        }
//    var timeInSeconds=parseInt(currentTime,10),
//                songDuration=parseInt(duration,10),
//                rem=parseInt(duration-currentTime,10),
//                pos=(timeInSeconds/duration) * 100,
//                mins=Math.floor(currentTime/60,10),
//                secs=timeInSeconds-mins*60,
//                timeCounter= mins + ':' + (secs > 9 ? secs : '0' + secs),

    },
    this.play=function(url){
        if(url){
            this.el.setAttribute('src',url);
        }
        this.el.play();
        this.trigger('started');
    },
    this.pause=function(){
        this.el.pause();
        this.trigger('paused');
    },
    this.stop=function(){
        this.pause();
        this.el.currentTime=0;
        this.trigger('stopped');
    },
    this.setVolume=function(volume){
        this.el.volume=volume;
    },
    this.getVolume=function(){
        return this.el.volume;
    },
    this.getDuration=function(){
        return parseInt(this.el.duration,10);
    },
    this.setTime=function(time){
        this.el.currentTime=time;
        this.trigger('updated',this.el.duration,time);
    },
    this.getTime=function(){
        return parseInt(this.el.currentTime,10);
    },
    this.getPercent=function(){
        return (this.getTime()/this.getDuration())*100;
    }
};

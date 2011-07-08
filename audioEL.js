var AudioEl={
    newEl(id){
        _.extend(this,Backbone.Events);
        this.el=$('#'+id);
        this.el.bind('timeupdate',this.timeupdate);
    },
    timeupdate:function(){
       this.trigger('audio:update',this.el.duration,this.el.currentTime);
    },
    play:function(url){
        if(url){
            this.el.setAttribute('src',url);
        }
        this.el.play();
    },
    pause:function(){
        this.el.pause();
    },
    stop:function(){
        this.pause();
        this.el.currentTime=0;
    },
    setVolume:function(volume){
        this.el.volume=volume;
    },
    getVolume:function(){
        return this.el.volume;
    },
    getDuration:function(){
        return this.el.duration;
    },
    setTime:function(time){
        this.el.currentTime=time;
        this.trigger('audio:update',this.el.duration,time);
    }
};

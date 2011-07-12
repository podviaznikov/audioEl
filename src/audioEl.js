var MicroEventEmitter=Object.create({},{
    //object with all event's listeners
    events:{
        value:{}
    },
    //listener for event
    on:{
        value:function(event,fn){
		    this.events[event]=this.events[event]||[];
		    this.events[event].push(fn);
        }
    },
    //fire event
    fire:{
        value:function(event /* , args... */){
            if(event in this.events===false){
            	return;
            }
            var listeners=this.events[event],
                i=0;
            for(;i<listeners.length;i++){
                listeners[i].apply(this,Array.prototype.slice.call(arguments,1));
            }
	    }
    }
});
var AudioEl=Object.create({},{
    //current version of the library
    version:{value:0.5},
    //factory method.
    newAudio:{
        value:function(id,options){
            var audio=Object.create(AudioEl.Audio);
            audio.init(id,options);
            return audio;
        }
    },
    //audio element with handy methods
    Audio:{
        value:Object.create(MicroEventEmitter,{
            //init function. Id of the DOM audio element should be passed and some optional parameters.
            init:{
                value:function(id,options){
                    var self=this,
                        options=options||{};
                    this.el=document.getElementById(id);
                    if(options.url){
                        this.el.setAttribute('src',options.url);
                    }
                    if(options.volume){
                        this.volume=options.volume;
                    }
                    //Playback has begun. Fired after the play() method has returned, or when the autoplay attribute has caused playback to begin.
                    this.el.addEventListener('play',function(){
                        self.fire('started');
                    });
                    //The current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously.
                    this.el.addEventListener('timeupdate',function(){
                        self.fire('updated',self.duration,self.time);
                    });
                    //Either the volume attribute or the muted attribute has changed. Fired after the relevant attribute's setter has returned.
                    this.el.addEventListener('volumechange',function(){
                        self.fire('volumechange');
                    });
                    //Playback has been paused. Fired after the pause() method has returned.
                    this.el.addEventListener('pause',function(){
                        self.fire('paused');
                    });
                    //Playback has stopped because the end of the media resource was reached.
                    this.el.addEventListener('ended',function(){
                        self.fire('finished');
                    });
                    return this;
                }
            },
            //play audio. Fires 'started' event
            play:{
                value:function(url){
                    if(url){
                        this.el.setAttribute('src',url);
                    }
                    this.el.play();
                }
            },
            //stop audio. Fires 'paused' event
            pause:{
                value:function(){
                    this.el.pause();
                }
            },
            //indicates whether audio was paused
            isPaused:{
                value:function(){
                    return this.el.paused;
                }
            },
            //stop audio. Fires 'stopped' event
            stop:{
                value:function(){
                    this.pause();
                    this.el.currentTime=0;
                    this.fire('stopped');
                }
            },
            //indicates whether audio was played until the end
            isFinished:{
                value:function(){
                    return this.el.ended;
                }
            },
            //unmute: turn volume on
            volumeOn:{
                value:function(){
                    this.el.muted=false;
                }
            },
            //mute: turn volume off
            volumeOff:{
                value:function(){
                    this.el.muted=true;
                }
            },
            //mute/unmute: change current value on opposite.
            toggleVolume:{
                value:function(){
                    this.el.muted=!this.el.muted;
                }
            },
            //check whether audio element is muted. Returns true if volume is 'on'.
            isVolumeOn:{
                value:function(){
                    return this.el.muted!==true;
                }
            },
            //volume property. Readable and writable.
            volume:{
                get:function(){
                    return this.el.volume;
                },
                set:function(volume){
                    if(volume<0){
                        volume=0;
                    }
                    if(volume>1){
                        volume=1;
                    }
                    this.el.volume=volume;
                }
            },
            //duration property. Read-only
            duration:{
                get:function(){
                    return this.el.duration;
                }
            },
            //current time audio property. Readable and writable.
            time:{
                get:function(){
                    return this.el.currentTime;
                },
                set:function(time){
                    this.el.currentTime=time;
                }
            },
            //percent property.Get percent of the played audio. Read-only
            percent:{
                get:function(){
                    return (this.getTime()/this.getDuration())*100;
                }
            },
            //get just hours remaining from duration
            hours:{
                get:function(){
                    var hours=Math.floor(this.time/3600,10);
                    return isNaN(hours)?0:hours;
                }
            },
            //get just minutes remaining from duration
            minutes:{
                get:function(){
                    var minutes=Math.floor((this.time-this.hours*3600)/60,10);
                    return isNaN(minutes)?0:minutes;
                }
            },
            //get just seconds remaining from duration
            seconds:{
                get:function(){
                    return parseInt(this.time-this.hours*3600-this.minutes*60,10);
                }
            },
            //get user readable remaining time
            timeCounter:{
                get:function(){
                    var h=this.hours,
                        m=this.minutes,
                        s=this.seconds;
                    if(h>0){
                        return h+':'+(m>9?m:'0'+m)+':'(s>9?s:'0'+s);
                    }
                    else{
                        return m+':'+(s>9?s:'0'+s);
                    }
                }
            }
        })
    }
});

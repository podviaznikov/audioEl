/**(c) 2011 Enginimation Studio (http://enginimation.com). May be freely distributed under the MIT license.*/
var AudioEl=Object.create({},{
    //current version of the library
    version:{value:0.5},
    //factory method.
    newAudio:{
        value:function(id,url){
            var audio=Object.create(AudioEl.Audio);
            audio.init(id,url);
            return audio;
        }
    },
    //audio element with handy methods
    Audio:{
        value:Object.create({},{
            //init function. Id of the DOM audio element should be passed. audio url parameter is optional
            init:{
                value:function(id,url){
                    _.bindAll(this,'_timeupdate','pause');
                    _.extend(this,Backbone.Events);
                    this.el=document.getElementById(id);
                    if(url){
                        this.el.setAttribute('src',url);
                    }
                    this.el.addEventListener('timeupdate',this._timeupdate);
                    this.el.addEventListener('pause',this.pause);
                    return this;
                }
            },
            //internal function for handling progress with playing
            //Fires 'updated' or 'finished' event
            _timeupdate:{
                value:function(){
                    var time=this.time,
                        duration=this.duration,
                        remaining=parseInt(duration-time,10);
                    if(remaining===0){
                        this.trigger('finished');
                    }
                    else{
                        this.trigger('updated',duration,time);
                    }
                }
            },
            //play audio. Fires 'started' event
            play:{
                value:function(url){
                    if(url){
                        this.el.setAttribute('src',url);
                    }
                    this.el.play();
                    this.trigger('started');
                }
            },
            //stop audio. Fires 'paused' event
            pause:{
                value:function(){
                    this.el.pause();
                    this.trigger('paused');
                }
            },
            //stop audio. Fires 'stopped' event
            stop:{
                value:function(){
                    this.pause();
                    this.el.currentTime=0;
                    this.trigger('stopped');
                }
            },
            //volume property. Readable and writable.
            volume:{
                get:function(){
                    return this.el.volume;
                },
                set:function(volume){
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

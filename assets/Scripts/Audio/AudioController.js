// AudioEngine.js
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
cc.Class({
    extends: cc.Component,

    properties: {
        menuMusic: {
            default: null,
            type: cc.AudioClip
        },
        success: {
            default: null,
            type: cc.AudioClip
        },
        tap: {
            default: null,
            type: cc.AudioClip
        },

        soundBool: {
            default: true,
            type: cc.Boolean
        },
        soundBut:{
            default: null,
            type: cc.Button
        },
        soundButSprites:{
            default: [],
            type: [cc.SpriteFrame]
        },

    },
    /*
    onLoad: function () {
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
    */
    start(){
        sleep(500).then(() =>
        {
            this.PlayMenuMusic();
        });

    },

    PlayMenuMusic(){
        if(this.soundBool)
        {
            //console.log('Play');
            this.MenuMusicObj = cc.audioEngine.play(this.menuMusic, true, 1);
        }

    },
    StopMenuMusic(){
        cc.audioEngine.stop(this.MenuMusicObj);
    },

    PlaySuccess(){
        if(this.soundBool)
            this.SuccessObj = cc.audioEngine.play(this.success, false, 1);
    },

    PlayTap(){
        if(this.soundBool)
            this.FailObj = cc.audioEngine.play(this.tap, false, 1);
    },



    Soundtap(){
        if(this.soundBool){
            this.soundBool = false;
            this.StopMenuMusic();
            this.soundBut.normalSprite = this.soundButSprites[1];
            console.log("Tapped");
        }
        else{
            this.soundBool = true;
            this.PlayMenuMusic();
            this.soundBut.normalSprite = this.soundButSprites[0];
            console.log("Tapped");
        }
    }



});
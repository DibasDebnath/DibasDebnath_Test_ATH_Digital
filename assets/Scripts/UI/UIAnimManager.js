// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        mainMenuAnim : {
            default: null,
            type: cc.Animation,
        },
        endMenuAnim : {
            default: null,
            type: cc.Animation,
        },
        gameMenuAnim : {
            default: null,
            type: cc.Animation,
        },
        tryAgainAnim : {
            default: null,
            type: cc.Animation,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    MainMenuIn(){
        this.mainMenuAnim.play("MenuIn");
    },
    MainMenuOut(){
        this.mainMenuAnim.play("MenuOut");
    },
    EndMenuIn(){
        this.endMenuAnim.play("EndMenuIn");
    },
    EndMenuOut(){
        this.endMenuAnim.play("EndMenuOut");
    },
    GameMenuIn(){
        this.gameMenuAnim.play("GameIn");
    },
    GameMenuOut(){
        this.gameMenuAnim.play("GameOut");
    },
    TryAgain(){
        this.tryAgainAnim.play("TryAgain");
    },

    // update (dt) {},
});

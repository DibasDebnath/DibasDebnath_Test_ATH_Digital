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
        refHolder:{
            default: null,
            type: cc.Node,
        },
        id: {
            default: 0,
            type: cc.Integer,
        },
        value: {
            default: 0,
            type: cc.Integer,
        },
        inputLabel: {
            default: null,
            type: cc.Label,
        },
        sprite: {
            default: null,
            type: cc.Sprite,
        },
        button: {
            default: null,
            type: cc.Button,
        },
        greenSF: {
            default: null,
            type: cc.SpriteFrame,
        },
        blueSF: {
            default: null,
            type: cc.SpriteFrame,
        },
        greySF: {
            default: null,
            type: cc.SpriteFrame,
        },
        goldSF: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.refHolder = cc.find("RefHolder");
    },

    start () {

    },



    OnButPress () {
        console.log("ID "+this.id);
        //this.setScale(1.2,1.2);
        //this.sprite.spriteFrame = this.blueSF;
        this.refHolder.getComponent("UIManager").InputButtonSelect(this.id);
    },


    SetInputNumber(value,total){
        if(value === 0){
            this.inputLabel.string = '-';
        }else{

            if(total == false){
                this.sprite.spriteFrame = this.blueSF;
                this.inputLabel.string = value;
                this.value = value;
            }
            else{
                this.sprite.spriteFrame = this.greenSF;
                this.inputLabel.string = value;
                this.value = value;
            }

            this.button.interactable = false;
        }
    },

    SetSpriteBlue(){
        this.sprite.spriteFrame = this.blueSF;
    },
    SetSpriteGreen(){
        this.sprite.spriteFrame = this.greenSF;
    },
    SetSpriteGrey(){
        this.sprite.spriteFrame = this.greySF;
    },
    SetSpriteGold(){
        this.sprite.spriteFrame = this.goldSF;
    },


    SetValue(value){
        this.value = value;
        if(value === 0){
            this.inputLabel.string = '-';
            this.sprite.spriteFrame = this.greySF;
        }else{
            this.sprite.spriteFrame = this.greenSF;
            this.inputLabel.string = value;

        }
    },

    GetValue(){
        return this.value;
    },
    // update (dt) {},
});

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

        //Mother Node
        refHolder:{
            default: null,
            type: cc.Node,
        },
        number : {
            default : 0,
            type: cc.Integer,
        },
        selectedBool : {
            default : false,
            type: cc.Boolean,
        },
        sprite: {
          default: null,
          type: cc.Sprite,
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
        this.sprite = this.node.getChildByName("Background").getComponent(cc.Sprite);

    },

    OnButPress(){
        console.log("Button Pressed "+this.number);

        if(this.refHolder.getComponent("UIManager").prevID !== 10){
            if(this.selectedBool === false){
                this.refHolder.getComponent("UIManager").NumberButtonSelect(this.number);
                if(this.number !== 0){
                    this.SelectNumber();
                }


            }else{
                console.log("Number Already In used");
            }
        }else{
            console.log("No Button Selected");
        }

    },

    SelectNumber(){
        this.selectedBool = true;
        this.sprite.spriteFrame = this.goldSF;
    },
    DeSelectNumber(){
        this.selectedBool = false;
        this.sprite.spriteFrame = this.greySF;
    },
    Deactivate(){
        this.selectedBool = true;
        this.sprite.spriteFrame = this.blueSF;
        this.getComponent(cc.Button).interactable = false;
    },

    // update (dt) {},
});

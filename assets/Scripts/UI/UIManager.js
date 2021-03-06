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
        refHolder : {
            default : null,
            type : cc.Node,

        },
        rows : {
            default: [],
            type: [cc.Node],
        },
        inputNode : {
            default: null,
            type: cc.Node,
        },
        numberButs : {
            default: [],
            type: cc.Node,
        },
        inputButs : {
            default: [],
            type: cc.Node,
        },
        columns : {
            default: [],
            type: cc.Node,
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
        prevID:{
            default: 10,
            type: cc.Integer,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.numButSprite = [cc.Button];
        for(let i = 0;i<this.numberButs.length;i++){
            this.numButSprite[i] = this.numberButs[i].getChildByName("Background").getComponent(cc.Sprite);
        }

    },



    start () {
        // Holding InputButton Nodes
        //this.CreateColumns();

    },



    CreateColumns(){


        this.butArray = this.refHolder.getComponent("GamePlay").butArray;
        this.oneToNineArrayTmp = this.refHolder.getComponent("GamePlay").oneToNineArray;

        let i = 0;
        let j = 0;
        let k = 0;
        let node = cc.Node;
        for (i = 0;i < this.butArray.length;i++)
        {
            // Calculate Hidden Cell
            let HiddenCellCount = this.GetRndInteger(1,this.butArray[i]+1);
            console.log("Hidden Cell Count "+HiddenCellCount);
            let tmpNumber = 0;
            let totalofRow = 0;
            for(j = 0;j<this.butArray[i];j++)
            {

                this.columns[k] = this.rows[i].getChildByName("Col"+j);
                this.node = cc.instantiate(this.inputNode);

                this.node.parent = this.columns[k];
                this.node.setPosition(0, 0);
                this.node.active = true;
                this.inputButs[k] = this.node;

                this.inputButs[k].getComponent("InputButScript").id = k;


                if(this.butArray[i]-j === HiddenCellCount){
                    this.inputButs[k].getComponent("InputButScript").SetInputNumber(0,false);
                    tmpNumber = this.oneToNineArrayTmp.pop();
                    totalofRow += tmpNumber;
                    HiddenCellCount--;
                }else{
                    if(HiddenCellCount===0){
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(tmpNumber,false);
                        this.numButSprite[tmpNumber].spriteFrame = this.blueSF;
                        this.numberButs[tmpNumber].getComponent(cc.Button).interactable = false;
                    }
                    else if(this.GetRndInteger(0,2) === 0){
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(0,false);
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        HiddenCellCount--;
                    }
                    else{
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(tmpNumber,false);
                        this.numButSprite[tmpNumber].spriteFrame = this.blueSF;
                        this.numberButs[tmpNumber].getComponent(cc.Button).interactable = false;
                    }
                }



                if(j === this.butArray[i]-1){

                    j++;
                    this.tmpNode = this.rows[i].getChildByName("Col"+j);
                    this.node = cc.instantiate(this.inputNode);

                    this.node.parent = this.tmpNode;
                    this.node.setPosition(0, 0);
                    this.node.active = true;
                    this.node.getComponent("InputButScript").SetInputNumber('=',true);



                    j++;
                    this.tmpNode = this.rows[i].getChildByName("Col"+j);
                    this.node = cc.instantiate(this.inputNode);

                    this.node.parent = this.tmpNode;
                    this.node.setPosition(0, 0);
                    this.node.active = true;
                    this.node.getComponent("InputButScript").SetInputNumber(totalofRow,true);





                }

                k++;


                //console.log("asd");
            }



        }

        //console.log(this.columns[3]._name);
    },




    // update (dt) {},

    InputButtonSelect(id){
        if(this.prevID !== 10){
            if(this.inputButs[this.prevID].getComponent("InputButScript").inputLabel.string === "-"){
                this.inputButs[this.prevID].getComponent("InputButScript").SetSpriteGrey();
            }else{
                this.inputButs[this.prevID].getComponent("InputButScript").SetSpriteGreen();
            }

        }
        this.inputButs[id].getComponent("InputButScript").SetSpriteGold();
        this.prevID = id;
    },



    NumberButtonSelect(number){
        console.log("number "+number);
        if(this.prevID !== 10){
            this.inputButs[this.prevID].getComponent("InputButScript").SetLabelText(number);
        }
    },



    GetRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    },
});

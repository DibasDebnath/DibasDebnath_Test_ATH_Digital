// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
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
        refHolder : {
            default : null,
            type : cc.Node,

        },
        //Number of Rows
        rows : {
            default: [],
            type: [cc.Node],
        },
        //Input Button
        inputNode : {
            default: null,
            type: cc.Node,
        },
        //Number Buttons
        numberButs : {
            default: [],
            type: cc.Node,
        },
        selectedNumberButs : {
            default: [],
            type: cc.Boolean,
        },
        inputButs : {
            default: [],
            type: cc.Node,
        },
        tmpInputButs : {
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
        goldSF: {
            default: null,
            type: cc.SpriteFrame,
        },
        prevID:{
            default: 10,
            type: cc.Integer,
        },
        oneToNineArray:{
            default : [],
            type: cc.Integer,
        },
        butArray:{
            default : [],
            type: cc.Integer,
        },
        totalOfRow:{
            default : [],
            type: cc.Integer,
        },

    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.refHolder = cc.find("RefHolder");
        this.numButSprite = [cc.Button];
        for(let i = 0;i<this.numberButs.length;i++){
            this.numButSprite[i] = this.numberButs[i].getChildByName("Background").getComponent(cc.Sprite);
        }

    },



    //start () {    },


    //Genarate Columns
    CreateColumns(){

        //Initialize
        this.butArray = this.refHolder.getComponent("GamePlay").butArray;

        for(let i = 0;i<9;i++){
            this.oneToNineArray[i] = this.refHolder.getComponent("GamePlay").oneToNineArray[i];
        }
        this.oneToNineArrayTmp = this.refHolder.getComponent("GamePlay").oneToNineArray;
        for(let i = 0;i<9;i++){
            this.oneToNineArrayTmp[i] = this.refHolder.getComponent("GamePlay").oneToNineArray[i];
        }

        this.oneToNineArrayTmp.reverse();




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
                    this.numberButs[tmpNumber].getComponent(cc.Button).interactable = true;
                    //this.selectedNumberButs[tmpNumber] = false;
                }else{
                    if(HiddenCellCount===0){
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(tmpNumber,false);
                        this.numButSprite[tmpNumber].spriteFrame = this.blueSF;
                        this.numberButs[tmpNumber].getComponent(cc.Button).interactable = false;
                        //this.selectedNumberButs[tmpNumber] = true;
                    }
                    else if(this.GetRndInteger(0,2) === 0){
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(0,false);
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        HiddenCellCount--;
                        this.numberButs[tmpNumber].getComponent(cc.Button).interactable = true;
                        //this.selectedNumberButs[tmpNumber] = false;
                    }
                    else{
                        tmpNumber = this.oneToNineArrayTmp.pop();
                        totalofRow += tmpNumber;
                        this.inputButs[k].getComponent("InputButScript").SetInputNumber(tmpNumber,false);
                        this.numButSprite[tmpNumber].spriteFrame = this.blueSF;
                        this.numberButs[tmpNumber].getComponent(cc.Button).interactable = false;
                        //this.selectedNumberButs[tmpNumber] = true;
                    }
                }


                // Create The Last Two Nodes With '=' and Total
                if(j === this.butArray[i]-1){

                    j++;
                    this.tmpNode = this.rows[i].getChildByName("Col"+j);
                    this.node = cc.instantiate(this.inputNode);

                    this.node.parent = this.tmpNode;
                    this.node.setPosition(0, 0);
                    this.node.active = true;
                    this.node.getComponent("InputButScript").SetInputNumber('=',true);

                    this.tmpInputButs.push(this.node);

                    j++;
                    this.tmpNode = this.rows[i].getChildByName("Col"+j);
                    this.node = cc.instantiate(this.inputNode);

                    this.node.parent = this.tmpNode;
                    this.node.setPosition(0, 0);
                    this.node.active = true;
                    this.node.getComponent("InputButScript").SetInputNumber(totalofRow,true);

                    this.totalOfRow.push(totalofRow);
                    this.tmpInputButs.push(this.node);



                }

                k++;

            }



        }


    },




    // update (dt) {},

    // Input Button Select Call in UI manager
    InputButtonSelect(id){

        this.refHolder.getComponent('AudioController').PlayTap();
        //Select Input But
        if(this.prevID !== 10) {
            if (this.inputButs[this.prevID].getComponent("InputButScript").GetValue() === 0) {
                this.inputButs[this.prevID].getComponent("InputButScript").SetSpriteGrey();
            } else {
                this.inputButs[this.prevID].getComponent("InputButScript").SetSpriteGreen();
            }
        }
        this.inputButs[id].getComponent("InputButScript").SetSpriteGold();
        this.prevID = id;



    },


    // Number Button Press Call in UI manager
    NumberButtonSelect(number){
        this.refHolder.getComponent('AudioController').PlayTap();
        console.log("number "+number);

        if(this.prevID !== 10){

            if(this.inputButs[this.prevID].getComponent("InputButScript").GetValue() !== 0){
                this.numberButs[this.inputButs[this.prevID].getComponent("InputButScript").GetValue()].getComponent("NumberButScript").DeSelectNumber();
            }
            this.inputButs[this.prevID].getComponent("InputButScript").SetValue(number);

        }


    },

    // Validate Answer
    ValidateAnswer(){
        this.refHolder.getComponent('AudioController').PlayTap();
        let boolValidate = true;

        let anwserText = "";
        let inputText = "";
        // If answer Matches the Input
        for(let i = 0;i< 9 ;i++){
            /*if (boolValidate === false){
                break;
            }*/
            if(this.oneToNineArray[i] !== this.inputButs[i].getComponent("InputButScript").GetValue()){
                boolValidate = false;

            }

            anwserText += this.oneToNineArray[i];
            inputText += this.inputButs[i].getComponent("InputButScript").GetValue();
        }


        console.log("Game status "+boolValidate);
        console.log("Answer "+anwserText);
        console.log("Input "+inputText);


        if(boolValidate === true){

            this.refHolder.getComponent('UIAnimManager').EndMenuIn();
            this.refHolder.getComponent('UIAnimManager').GameMenuOut();

        }else{
            console.log("Not Match");
            this.refHolder.getComponent('UIAnimManager').TryAgain();
        }
    },


    //Normal Reset
    Reset()
    {
        this.refHolder.getComponent('AudioController').PlayTap();
        for(let i = 0;i < this.inputButs.length;i++){

            if(this.inputButs[i].getComponent("InputButScript").button.interactable !== false){
                this.inputButs[i].getComponent("InputButScript").SetValue(0);
            }


        }
        for(let i = 1;i < this.numberButs.length;i++) {


            this.numberButs[i].getComponent("NumberButScript").DeSelectNumber();


        }


        for(let i = 0;i < this.inputButs.length;i++) {
            let value = this.inputButs[i].getComponent("InputButScript").value;
            if(value !== 0){
                this.numberButs[value].getComponent("NumberButScript").Deactivate();
            }

        }
        this.prevID = 10;

    },


    // New Puzzle Hard Reset
    HardReset(){
        this.refHolder.getComponent('AudioController').PlayTap();



        for(let i =0 ; i < this.inputButs.length;i++){
            this.inputButs[i].destroy();
        }
        for(let i =0 ; i < this.tmpInputButs.length;i++){
            this.tmpInputButs[i].destroy();
        }
        this.inputButs = [];
        this.tmpInputButs = [];
        this.prevID = 10;

        this.refHolder.getComponent("GamePlay").butArray = [];
        this.Reset();
        this.refHolder.getComponent("GamePlay").CreatePuzzle();


    },


    //Start Game At Main Menu
    StartButPress(){
        this.refHolder.getComponent('AudioController').PlayTap();
        this.refHolder.getComponent('UIAnimManager').MainMenuOut();
        this.refHolder.getComponent("GamePlay").CreatePuzzle();

        this.refHolder.getComponent('UIAnimManager').GameMenuIn();
    },
    //Start Game At End Menu
    StartEndButPress(){
        this.refHolder.getComponent('AudioController').PlayTap();
        this.refHolder.getComponent('UIAnimManager').EndMenuOut();
        this.HardReset();

        this.refHolder.getComponent('UIAnimManager').GameMenuIn();
    },


    //Exit
    ExitButPress(){
        cc.game.end();
    },


    GetRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    },
});

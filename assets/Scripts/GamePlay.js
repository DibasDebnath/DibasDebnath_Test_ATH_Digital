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
        //Array To Create Puzzle
        oneToNineArray:{
            default : [],
            type: cc.Integer,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.refHolder = cc.find("RefHolder");
    },

    start () {

        this.refHolder.getComponent('UIAnimManager').MainMenuIn();
        /*this.oneToNineArray = [1,2,3,4,5,6,7,8,9];
        this.ShuffleOneTwoNineArray();
        this.butArray = [0];*/
        //this.CreatePuzzle();


    },

    

    //update (dt) {},



    CreatePuzzle()
    {
        //Initialize
        this.oneToNineArray = [1,2,3,4,5,6,7,8,9];
        this.ShuffleOneTwoNineArray();
        this.butArray = [0];

        //Get Random Row Number
        let rowNum = this.GetRndInteger(3,5);
        console.log("row Selected "+rowNum);

        //9 Puzzle Button
        let butLeft = 9;

        // For 3 Row Puzzle
        if(rowNum === 3){

            let fourSelected = false;
            let twoSelected = false;
            let i =0;
            while(i< rowNum)
            {

                let colNum = this.GetRndInteger(2,5)
                if(colNum === 2 && twoSelected){
                    // Only One 2 Column Row
                }else if(colNum === 4 && fourSelected){
                    // Only One 4 Column Row
                }
                else{
                    if(colNum === 2){
                        twoSelected = true;
                    }
                    else if(colNum === 4){
                        fourSelected = true;
                    }

                    butLeft -= colNum;
                    this.butArray[i++] = colNum;
                    if(i ===rowNum-1){
                        this.butArray[i++] = butLeft;
                    }
                }

            }
        }
        // For 4 Row Puzzle
        else{

            let i =0;
            let threeColNum = this.GetRndInteger(0,4);
            console.log("threeColNum " + threeColNum);
            while(i< rowNum)
            {

                if(i === threeColNum){
                    this.butArray[i++] = 3;
                }
                else{
                    this.butArray[i++] = 2;
                }

            }
        }

        let text = "";
        for(let i = 0 ; i <this.butArray.length;i++){
            text += this.butArray[i];
        }
        console.log(text+" ");

        this.refHolder.getComponent("UIManager").CreateColumns();

    },
    // To Shuffle The Answer
    ShuffleOneTwoNineArray(){
        for(let i = this.oneToNineArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = this.oneToNineArray[i]
            this.oneToNineArray[i] = this.oneToNineArray[j]
            this.oneToNineArray[j] = temp
        }
        let text = "";
        for(let i = 0 ; i <this.oneToNineArray.length;i++){
            text += this.oneToNineArray[i];
        }
        console.log("Randomized Array"+text);
    },
    // Random Integer from Range
    GetRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
});

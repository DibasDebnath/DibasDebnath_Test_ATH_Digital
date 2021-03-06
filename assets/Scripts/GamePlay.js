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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        //this.refHolder.getComponent('GamePlay').variable;
        this.oneToNineArray = [1,2,3,4,5,6,7,8,9];
        this.ShuffleOneTwoNineArray();
        this.butArray = [0];
        this.CreatePuzzle();


    },

    

    update (dt) {

        
    },



    CreatePuzzle()
    {

        let rowNum = this.GetRndInteger(3,5);
        console.log("row Selected "+rowNum);

        let butLeft = 9;


        if(rowNum == 3){

            let fourSelected = false;
            let twoSelected = false;
            let i =0;
            while(i< rowNum)
            {

                let colNum = this.GetRndInteger(2,5)
                if(colNum == 2 && twoSelected){

                }else if(colNum == 4 && fourSelected){

                }
                else{
                    if(colNum == 2){
                        twoSelected = true;
                    }
                    else if(colNum == 4){
                        fourSelected = true;
                    }

                    butLeft -= colNum;
                    this.butArray[i++] = colNum;
                    if(i ==rowNum-1){
                        this.butArray[i++] = butLeft;
                    }
                }

            }
        }
        else{

            let i =0;
            let threeColNum = this.GetRndInteger(0,4);
            console.log("threeColNum " + threeColNum);
            while(i< rowNum)
            {

                if(i == threeColNum){
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



        /*let i;
        for (i = 0; i < this.numersUsed.length; i++) {
            text += this.numersUsed[i];
        }
        console.log(text+" ");*/
    },

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

    GetRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
});

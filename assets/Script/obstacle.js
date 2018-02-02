// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
       speed: 0,
       type: 1, // 1 top 2 bottom
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    reset(){
        let node = this.node;
        node.x = cc.winSize.width / 2;

        if (this.type === 1){
            node.y = -cc.random0To1() * node.height;
        }else if(this.type === 2){
            node.y = cc.random0To1() * node.height;
        }
        
        console.log(node.y);
    },

    update (dt) {
        let node = this.node;
        node.x -= this.speed;

        if (node.x <= -cc.winSize.width / 2) {
            this.reset()
        }
    },
});

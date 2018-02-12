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
        speed: -300,
        resetX: -300,
        isStop: false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    stop() {
        this.isStop = true
    },

    update(dt) {
        if (this.isStop) {
            return
        }

        this.node.x += this.speed * dt;

        if (this.node.x <= this.resetX) {
            this.node.x -= this.resetX;
        }
    },
});

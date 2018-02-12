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
        player: {
            default: null,
            type: cc.Node
        },
        pipeLayer: {
            default: null,
            type: cc.Node
        },
        bg: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        score: 0
    },

    onLoad() {
        this.pipeManager = this.pipeLayer.getComponent('pipeManager')

        let bird = this.player.getComponent('bird')
        bird.init(this)
    },

    start() {
    },

    update(dt) {},

    addScore(){
        this.score += 1
        this.scoreLabel.string = this.score
    },

    gameOver() {
        this.bg.getComponent('bg').stop()
        this.pipeManager.stop()
    }
});

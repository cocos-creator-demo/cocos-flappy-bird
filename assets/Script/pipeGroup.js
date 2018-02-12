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
        topPipe: cc.Node,
        bottomPipe: cc.Node,
        speed: 10,
        space: 250, // 缝隙宽度
        pipeHeight: 480,
        isStop: false

    },

    stop(){
        // this.isStop = true
    },
    init(pipeManager){
        this.pipeManager = pipeManager
        this._initPosX()
        this._initPosY()
    },
    _initPosX(){
        let width = cc.winSize.width;
        // 起始x位置,右侧屏幕外100px
        this.node.x = width / 2 + 100;

    },
    _initPosY(){
        // 管子的y轴位置
        let {pipeHeight, space} = this;

        let spaceOffset = cc.random0To1()*space
        // this.topPipe.y = pipeHeight + spaceOffset
        // this.bottomPipe.y = -pipeHeight -(space - spaceOffset)

        this.topPipe.y = 600
        this.bottomPipe.y = -600
    },

    update(dt) {
        if (this.isStop){
            return
        }

        this.node.x -= this.speed * dt;

        let width = cc.winSize.width
        if (this.node.x < -width) {
            this.pipeManager.recyclePipe(this)
        }
    }
});

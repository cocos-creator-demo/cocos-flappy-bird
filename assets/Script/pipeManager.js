// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

let PipeGroup = require('pipeGroup')
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        pipePrefab: cc.Prefab,
        speed: -300, // 管子移动速度
        space: 400, // 管道距离
        pipeArr: [],
        isStop: false
    },
    onLoad() {
        this.pipeArr = []
        this.startCreate()
    },
    getNext() {
        return this.pipeArr.shift();
    },
    startCreate() {
        this._createPipe();
        let spawnInterval = Math.abs(this.space / this.speed);
        this.schedule(this._createPipe, spawnInterval);
    },
    // 从对象池取出管道
    _createPipe() {
        if (this.isStop){
            return
        }
        let pipeGroup = null;
        if (cc.pool.hasObject(PipeGroup)) {
            pipeGroup = cc.pool.getFromPool(PipeGroup);
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab)
        }

        this.node.addChild(pipeGroup);
        pipeGroup.active = true;

        pipeGroup.getComponent('pipeGroup').init(this);
        this.pipeArr.push(pipeGroup);
    },

    // 超出屏幕，回收管道
    recyclePipe(pipe) {
        pipe.node.destroy();
        // pipe.node.removeFromParent();
        // pipe.node.active = false;
        // cc.pool.putInPool(pipe);
    },

    stop() {
        this.isStop = true
        this.pipeArr.forEach(item => {
            item.getComponent('pipeGroup').stop()
        })
    },

});

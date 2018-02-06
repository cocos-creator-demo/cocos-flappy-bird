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
    space: 100, // 裂缝间隙
    minSpace: 50 // 最小间隙
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  reset() {
    let node = this.node;
    node.x = cc.winSize.width / 2;

    let pos = cc.winSize.height / 2;

    if (this.type === 1) {
      node.y = pos + cc.random0To1() * this.space + this.minSpace;
    } else if (this.type === 2) {
      node.y = -pos - cc.random0To1() * this.space - this.minSpace;
    }
  },
  checkCollision() {
    let game = this.game,
      node = this.node;
    if (game) {
      let player = game.player;
      // 基于坐标的简单碰撞检测
      if (Math.abs(player.x - node.x) < node.width) {
        let isCollision =
          (this.type === 1 && player.y < node.y) ||
          (this.type === 2 && player.y < node.y);

        return isCollision;
      }
    }
  },

  update(dt) {
    let node = this.node;
    node.x -= this.speed;

    if (node.x <= -cc.winSize.width / 2 - node.width) {
      this.reset();
    }
  }
});

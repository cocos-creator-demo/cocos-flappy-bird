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
    flyRotation: -20,
    jumpDuration: 0.2,
    jumpHeight: 50,
    dropSpeed: 2
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    var anim = this.getComponent(cc.Animation);
    if (anim) {
      var animState = anim.play("fly");
      animState.wrapMode = cc.WrapMode.Loop;
    }

    this.setInputControl();
  },
  setInputControl() {
    cc.eventManager.addListener(
      {
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: (keyCode, event) => {
          switch (keyCode) {
            case cc.KEY.space:
              this.fly();
              break;
          }
        }
      },
      this.node
    );
  },
  fly() {
    this.isFlying = true

    let node = this.node;
    node.rotation = this.flyRotation;

    let jumpAction = cc.sequence(
        cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)),
        cc.callFunc(function(target) {
            this.isFlying = false;
        }, this)
    );
    node.runAction(jumpAction);
  },
  drop() {
    let node = this.node;
    node.rotation = -this.flyRotation;
    
    let dropAction = cc.moveBy(this.jumpDuration, cc.p(0, -this.dropSpeed));
    node.runAction(dropAction);
    
  },

  start() {},

  update (dt) {
    if (!this.isFlying){
        this.drop();
    }
  },
});

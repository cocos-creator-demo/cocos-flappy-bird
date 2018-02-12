# Cocos_flappy_bird
使用cocos creator制作的flappy bird，该文档整理相关开发笔记

## 为什么选择flappy bird

这个游戏玩法简单，但是包含的内容比较丰富，基本上能涉猎到大部分知识点，入门的不二选择~

加上之前用jQuery也写过一个简陋版的，所以选择实现flappy bird作为cocos creator的入门项目。

## 使用

### 屏幕适配

只需要修改canvas根节点的尺寸即可

### 场景

把游戏划分成不同的场景，每个场景有对应的布局和逻辑，通过场景之间的跳转完成游戏的流程。

其中，导演接口负责管理多个场景

```Js
 cc.director.loadScene('game');
```

每个场景的布局和逻辑可能不一样，但是组件可以在多个场景之间共用~

### 坐标系统

参考

* [Cocos2d-x 3.0坐标系详解](http://www.cocos.com/docs/native/v3/coordinate-system/zh.html)
* [坐标系和变换](http://docs.cocos.com/creator/manual/zh/content-workflow/transform.html)

在游戏中常常需要修改节点的坐标位置，在此之前需要理清的概念是

* cocos世界坐标系，源于笛卡尔坐标系，即左下角为原点
* 本地坐标系，每个节点都有独立的坐标系，节点本地坐标系的原点为节点锚点


将一个节点添加到父节点时，实际上是将节点放在父节点的本地坐标系中；其在父节点上的位置，本质上是设置节点的锚点在父节点坐标系上的位置


### Animation

制作小鸟飞行的逐帧动画，参考

* [官方文档](http://docs.cocos.com/creator/manual/zh/animation/animation-curve.html)
* [Animation动画的制作和使用](https://www.jianshu.com/p/7d9574f179eb)

主要步骤可分为

* 选择节点，打开动画编辑器
* 选择`property`，添加`spriteFrame`属性，然后将需要绘制的帧图片拖拽到时间轴上，控制每帧的播放间隔
* 可选择`warpMode`及进行预览
* 保存动画，可见对应节点上自动添加了`animation`组件
* 在节点的用户脚本组件中，可通过`this.getComponent(cc.Animation)`,设置动画的相关属性（比如`wrapMode`、`repeatCount`等）

需要注意的是在动画编辑器编辑后的动画，需要保存之后才会在模拟器的节点上生效（这里由于没保存导致预览和模拟器动画效果不一致，自己把自己坑了一把~）

### Action

动作模块用来实现节点常见的动作需求，比如移动位置、旋转等，常常搭配游戏逻辑进行处理，cocos creator的动作系统与cocos2d-js基本一致，可以参考

* [在 Cocos Creator 中使用动作系统](http://docs.cocos.com/creator/manual/zh/scripting/actions.html)
* [动作API列表](http://docs.cocos.com/creator/manual/zh/scripting/action-list.html)

使用方式也很简单，先声明一个（或一系列）动作，然后调用`node.runAction`接口

```Js
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
```

需要注意的是动作回调通过`callFunc`注册，并将其放置在动作序列中，这种做法与前端中比较熟悉的事件回调处理有一点差异

PS：虽然API调用十分简单，但是要调试出一个流畅的动作序列真的是蛋疼啊~感觉没天赋

## 遇见的坑

* 在使用cocos creator时，有时候修改右侧属性检查器的属性值会失败，需要重启应用，感觉是我运行时间太长了

## 思考

### 组件的意义

前端意义的组件指的是封装好的、可公用的模块。同理，cocos也是这样。

比如移动的背景在欢迎场景和游戏场景都存在，尽管每个场景都有对应的背景节点，但是移动的逻辑是完全一致的，此时可以通过组件进行封装，并在多个场景中共用。要知道，组合的优势是大于继承的~

### 强类型

我决定学习TypeScript
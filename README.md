# Cocos_flappy_bird
使用cocos creator制作的flappy bird，该文档整理相关开发笔记

## Animation

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
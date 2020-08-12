---
layout: blog-post
title: Vue nextTick 
tags:
  - vue
date: 2020-05-10
description: how and when to use  nextTick
---
### why use nexttick?

1. 异步说明
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新
2. 事件循环说明
简单来说，Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
3. created、mounted
在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。
注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted


``` JS
vm.message = 'changed'

console.log(vm.$el.textContent) // 得不到 changed

// use nexttick
Vue.nextTick(()=>{
   console.log(vm.$el.textContent) 
})
```

![](/img/post/2020-07-27-18-05-44.png)

### when use nexttick 
应用场景：需要在视图更新之后，基于新的视图进行操作。

1. 点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点。
``` JS
showsou(){
  this.showit = true //修改 v-show
  document.getElementById("keywords").focus()  //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
}
```
修改为：
``` JS
showsou(){
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById("keywords").focus()
  })
}
```
2. 点击获取元素宽度。
``` JS
<div id="app">
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
</div>

getMyWidth() {
    this.showMe = true;
    //this.message = this.$refs.myWidth.offsetWidth;
    //报错 TypeError: this.$refs.myWidth is undefined
    this.$nextTick(()=>{
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
  })
}
```
3、使用 swiper 插件通过 ajax 请求图片后的滑动问题。
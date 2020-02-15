# 常见需要手写代码的题目

[学习博客](https://juejin.im/post/5c9edb066fb9a05e267026dc)

## CSS部分

### 两栏布局

>  要求：垂直两栏，左边固定右边自适应。

1. 使用浮动实现

   左边的div固定之后，向左浮动，右边的`margin-left`左边的宽度即可

2. 使用`position`实现1

   父元素相对定位，左边的子元素绝对定位，右边的`margin-left`左边的宽度即可

3. 使用`position`实现2

   父元素相对定位，右边的子元素绝对定位，然后`top:0`，`left`左边的宽度，`right:0`进行长度的拉宽

4. 使用`flex`布局实现

   父元素：`display:flex`

   子元素：

   ​	左边：长度进行固定`flex-basis`，将左边的宽度进行固定，防止在`flex`布局中宽度失效，`flex-grow:0`元素不进行放大，`flex-shrink: 0;`元素不进行缩小

   ​	右边：`flex:auto`，即元素进行放大和缩小，并且宽度不确定

5. 使用`float`

   左边元素：`float:left`，右边元素`margin-left`即可

### 三栏布局

> 要求：垂直三栏布局，左右两栏宽度固定，中间自适应

1. 使用`flex`布局

   左右元素都`flex: 0 0 200px;`，让其宽度不进行缩放并且固定，中间元素`flex: 1;`或者是`auto`

2. 使用相对定位

   父元素相对定位，子元素左右元素都是绝对定位，左元素：`top:0;left:0`，右元素：`top:0;right:0`，中间元素：`margin`左右宽度即可

3. 使用`float`

   左右元素分别向左右浮动，中间元素`margin`左右的宽度即可，在`html`中，需要将中间元素放到最下面

### 圣杯布局 和 双飞翼布局

> 和三栏布局要求相同，不过中间列要写在前面保证优先渲染。

不是很懂？？？

### 三角形

> 实现一个三角形

使用`border`实现，让其`width`和`height`都为0，改变它的`border-width`让其有一定的内容，再将一些边的颜色设置成`transparent`即可，如果需要算等腰、等边或者其他三角形，改变不同边的`border-width`即可

### 正方形

> 使用css是是西安一个宽高自适应的正方形

1. 使用`vw`

   ```css
   {
       width: 10vw;
       hright: 10vw;
   }
   ```

   

2. 使用`padding-top`

   ```css
   {
       width:10%
   	height:0;
   	padding-top:10%;
   }
   ```

3. 使用伪元素

   ```css
   {
       width: 10%;
       overflow: hidden;
   }
   ::after{
       content: '';
       display: block;
       margin-top: 100%;
   }
   ```

### 扇形

> 实现一个1/4圆、任意弧度的扇形

1. 实现1/4的圆

   ```css
   {
       height: 0;
       width: 0;
       border-height: 100px;
       brder-radius: 50%;
       border-style: solid;
       border-color: turquoise tomato tan thistle;
   }
   ```

2. 实现一个扇形

   1. 实现一个半圆

      ```css
      {
          height: 100px;
          width: 200px;
          border-radius: 100px 100px 0 0;
          overflow: hidden;
      }
      ```

   2. 利用伪元素和`border`去改变形状

      ```css
      ::after {
              content: '';
              display: block;
              height: 0;
              width: 0;
              border-style: solid;
              border-width: 100px 58px 0;
              border-color: tomato transparent;
              transform: translate(42px, 0);
      }
      ```

   3. 其他的理解不了

### 水平垂直居中

> 实现子元素水平垂直居中

1. 使用`position`和`margin`

   ```css
   // 缺点：需要知道inner的宽高
   .outer{
       position: relative;
       height: 200px;
       width: 200px;
   }
   .inner{
       height: 100px;
       width: 100px;
   }
   .inner1{
       position: absolute;
       top: 50%;
       left: 50%;
       margin-left: -50px;
       margin-top: -50px;
   }
   ```

   ```css
   // 自动进行拉伸
   .inner2{
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
   }
   ```

2. 使用`position`和`transform`

   ```css
   .inner3{
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
   }
   ```

3. 使用`flex`

   ```css
   .outer{
       display: flex;
       justify-content: center;
       align-items: center;
   }
   ```

### 清除浮动

1. 使用`clear:both`

   ```css
   .outer1::after{
   	clear: both;
   }
   ```

2. 使用`overflow:hidden`

   ```css
   .outer2{
   	overflow:hidden;
   }
   ```

### 弹出框

弹出框的内容，永远在页面的正中间

基础的`html`布局

```html
<div>
    content
</div>
<div class="dialog">
    <div class="content">弹出框内容</div>
</div>
```

有关的`css`布局

```css
.dialog{
    z-index: 100;
    // 实现蒙版
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    // 垂直居中
    display: flex;
    justify-content: center;
    align-items: center;
}
.content{
    // 为了好看点
    background: #fff;
    min-width: 300px;
    height: 300px;
    border-radius: 5px;
    border: 1px solid red;
}
```

### 导航栏

> 要求：一个 `div` 内部放很多水平 `div` ，并可以横向滚动。

1. 使用`flex`布局

   ```css
   .nav { 
       display: flex; 
       height: 30px; 
       border: 1px solid #000;
       padding: 3px; 
       /* 实现滑动 */ 
       overflow-x: auto; 
   } 
   .nav::-webkit-scrollbar {
       display: none; 
   } 
   .item { 
       flex: 0 0 200px; 
       height: 30px; 
       width: 200px;
       background-color: tomato; 
       margin: 0 10px; 
   }
   ```

2. 使用`white-space`和`inline-block`

   ```css
   .nav {
       height: 30px;
       padding: 3px;
       border: 1px solid #000;
       overflow-x: auto;
       /* 保证在一行中显示 */
       white-space: nowrap;
   }
   .nav::-webkit-scrollbar {
       display: none;
   }
   .item {
       display: inline-block;
       height: 30px;
       width: 200px;
       background-color: tomato;
       margin: 0 5px;
   }
   ```


## JavaScript部分

### 手写bind\call\apply

1. 手写bind

   ```js
   Function.prototype.bind = function(context,...bindArgs){
   	// 函数
       let func = this;
       // 需要绑定的this
       context = context || this;
       if(typeof func !== 'function'){
           throw new TypeError('Bind must be a function');
       }
       return function(...callArgs){
           let args = bindArgs.concat(callArgs);
           if(this instanceof func){
               return new func(...args);
           }
           return func.call(context,...args);
       }
   }
   ```

2. 手写call

   ```js
   
   ```

   

1. 手写apply
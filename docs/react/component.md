---
title: 组件
date: 2023/03/31
---

## class组件

ES6的加入让JavaScript直接支持使用class来定义一个类，react创建组件的方式就是使用的类的继承，ES6 class 是目前官方推荐的使用方式，它使用了ES6标准语法来构建。
```js
import React from "react";
class App extends React.Component {
  render() {
    return <div>hello world</div>
  }
}
export default App
```

::: warning
* 组件名称首字母大写
* 虚拟`DOM`必须只有一个根标签
* 如果`return`后回车，需要加上一个()
:::

## 函数式组件

```js
function App() {
  return (
    <div>hello world</div>
  )
}
export default App
```
## 组件的嵌套
```js
import React, { Component } from 'react'
class Narbar extends Component {
  render() {
    return (
      <div>Narbar</div>
    )
  }
}
function Swiper() {
  return (
    <div>Swiper</div>
  )
}
const Tabbar = () => <div>Tabbar</div>
export default class App extends Component {
  render() {
    return (
      <div>
        <Narbar />
        <Swiper />
        <Tabbar />
      </div>
    )
  }
}
```

## 组件的样式

> 标签中混入`JS`表达式是要用{}
> 
> 内联样式，要用`style={{key:value}}`形式。 
>
> 样式的类名指定不要用class，要用className。(与之类型的 for ==> htmlFor)

```js
function App() {
  var obj = {
    backgroundColor: 'yellow'
  }
  return (
    <div>
      {10+20} 
      <div style={obj}>123</div>
      <div style={{background: '#f00'}}>456</div>
      <div className="active"></div>
    </div>
  )
}
export default App
```
::: tip
React推荐我们使用行内样式，因为React觉得每一个组件都是一个独立的整体，其实我们大多数情况下还是大量的在为元素添加类名。
:::

## 事件处理

采用on+事件名的方式来绑定一个事件，注意，这里和原生的事件是有区别的，原生的事件全是小写`onclick` , React里的事件是驼峰 `onClick` ，React的事件并不是原生事件，而是合成事件。
### 绑定事件

::: tip
React并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式
:::

```js
import React, { Component } from 'react'
export default class App extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={() => {
          console.log(this)
        }}>add1</button>
        <button onClick={this.handleClick2.bind(this)}>add2</button>
        <button onClick={this.handleClick3}>add3</button>
        <button onClick={() => {
          this.handleClick4()
        }}>add4</button>
      </div>
    )
  }
  handleClick2() {
    console.log(this)
  }
  handleClick3 = () => {
    console.log(this)
  }
  handleClick4 = () => {
    console.log(this)
  }
}
```
### Event 对象

和普通浏览器一样，事件handler会被自动传入一个 event 对象，这个对象和普通的浏览器 event 对象所包含的方法和属性都基本一致。不同的是 React中的 event 对象并不是浏览器提供的，而是它自
己内部所构建的。它同样具有 `event.stopPropagation` 、 `event.preventDefault` 这种常用的方法

## Ref的应用

1. 给标签设置ref="username" (已废弃)
> 通过这个获取this.refs.username , ref可以获取到应用的真实dom
2. 给组件设置ref="username"
> 通过这个获取this.refs.username ,ref可以获取到组件对象
3. 新的写法

```js
import React, { Component } from 'react'
export default class App extends Component {
  myRef = React.createRef()
  render() {
    return (
      <div>
        <input type="text" ref="mytext" />
        <input type="text" ref={this.myRef}/>
        <button onClick={() => {
          console.log(this.refs.mytext)
          console.log(this.myRef.current)
        }}>add1</button>
      </div>
    )
  }
}
```


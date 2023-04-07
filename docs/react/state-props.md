---
title: 组件的数据挂载方式
date: 2023/04/04
---

## state

状态就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用状态的目的就是为了在不同的状态下使组件的显示不同(自己管理)
```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    text: '收藏'
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({ text: '取消收藏' })
        }}>{this.state.text}</button>
      </div>
    )
  }
}
```
`setState`有两个参数
第一个参数可以是对象，也可以是方法return一个对象，我们把这个参数叫做 updater
* 参数是对象
```js
this.setState({ 
  isLiked: !this.state.isLiked 
})
```
* 参数是方法
```js
this.setState((prevState, props) => { 
  return { 
    isLiked: !prevState.isLiked 
  } 
}, () => {
  console.log('回调里的',this.state.isLiked)
})
```
> 注意的是这个方法接收两个参数，第一个是上一次的state, 第二个是props `setState` 是异步的，所以想要获取到最新的state，没有办法获取，就有了第二个参数，这是一个可选的回调函数

## 循环渲染
```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    list: ['111', '222', '333']
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.list.map(item => 
              <li key={item}>{item}</li>
            )
          }
        </ul>
      </div>
    )
  }
}
```
## 条件渲染
```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    list: []
  }
  render() {
    return (
      <div>
        {this.state.list.length > 0 ? (
          <ul>
            {this.state.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          '暂无数据'
        )}
        {/* this.state.list.length > 0 && <div>暂无数据</div> */}
      </div>
    )
  }
}
```

## dangerouslySetInnerHTML
```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    myText: '<div>123</div>'
  }
  render() {
    return (
      <div>
        <span dangerouslySetInnerHTML={
          {__html: this.state.myText}
        }></span>
      </div>
    )
  }
}
```
## setState同步与异步
react18之前
> - setState 处于同步的逻辑中， 异步更新状态，更新真实DOM
> - setState 处于异步的逻辑中，同步更新状态，同步更新真实DOM
> - setState 接受第二个参数，第二个参数回调函数，状态和dom更新完后就会被触发

react18
> 在react18之后，setState都为异步，无论写在什么样的语法环境中

## 属性（props）
`props`是正常是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更改，但是你可以通过父组件主动重新渲染的方式来传入新的`props`

属性是描述性质、特点的，组件自己不能随意更改。   

之前的组件代码里面有 props 的简单使用，总的来说，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为组件 props 对象的键值。通过箭头函数创建组件，需要通过函数的参数来接收 props :

> 1. 在组件上通过key=value 写属性,通过this.props获取属性
> 2. 注意在传参数时候，如果写成isShow="true" 那么这是一个字符串 如果写成isShow={true} 这个 是布尔值
> 3. {...对象} 展开赋值

```js
import React, { Component } from 'react'
import Navbar from './Navbar'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar title="首页" leftShow={false}/>
        <Navbar title="列表页"/>
        <Navbar title="购物车"/>
      </div>
    )
  }
}
```
### 属性验证
```js
import propTypes from "prop-types"; 
*.propTypes = { 
  name:propTypes.string, 
  age:propTypes.number 
} 

static propTypes = { 
    myname:propTypes.string,
    myshow:propTypes.bool 
}
```
### 属性默认值
```js
import propTypes from "prop-types"; 
*.defaultProps = { 
  name: '张三', 
  age: 18
} 

static defaultProps = { 
    myname: '张三',
    myshow: true
}
```

### 函数式组件使用props
```js
import React from 'react'

export default function Siderbar(props) {
  console.log(props)
  return (
    <div>
      <ul>
        <li>{props.title}</li>
      </ul>
    </div>
  )
}
```
::: tip
属性验证只能写成类的形式
```js
*.defaultProps = { 
  name: '张三', 
  age: 18
} 
```
:::

### 属性vs状态
相似点：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

不同点：
1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值，状态也可以，设置方式不一样
4. 属性不在组件内部修改，状态要在组件内部修改
5. 属性能设置子组件初始值，状态不可以
6. 属性可以修改子组件的值，状态不可以

`state`的主要作用是用于组件保存、控制、修改自己的可变状态。 `state`在组件内部初始化，可以被
组件自身修改，而外部不能访问也不能修改。你可以认为`state`是一个局部的、只能被组件自身控制
的数据源。 `state`中状态可以通过`this.setState` 方法进行更新， `setState`会导致组件的重新渲染。

`props`的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参
数，组件内部无法控制也无法修改。除非外部组件主动传入新的`props`，否则组件的`props`永远保持不变。

没有`state`的组件叫无状态组件（stateless component），设置了`state`的叫做有状态组件
（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有
状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。
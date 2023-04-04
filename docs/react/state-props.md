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
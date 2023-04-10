---
title: 表单中的受控组件与非受控组件
date: 2023/04/07
---

## 非受控组件
React要编写一个非受控组件，可以 使用 ref 来从 DOM 节点中获取表单数据，就是非受控组件。
```js
import React, { Component } from "react";
export default class App extends Component {
  username = React.createRef();
  render() {
    return (
      <div>
        <input type="text" ref={this.username} defaultValue="hello"/>
        <button onClick={() => {
          console.log(this.username.current.value)
        }}>提交</button>
        <button onClick={() => {
          this.username.current.value = ''
        }}>重置</button>
      </div>
    );
  }
}
```
因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集
成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可
以减少你的代码量。否则，你应该使用受控组件。

在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经
常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个
defaultValue 属性，而不是 value

## 受控组件
```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    username: 'hello'
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.username} onChange={(evt) => {
            this.setState({username: evt.target.value})
        }}/>
        <button onClick={() => {
          console.log(this.state.username)
        }}>提交</button>
        <button onClick={() => {
           this.setState({username: ''})
        }}>重置</button>
      </div>
    )
  }
}
```

由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value ，这使得 React 的 state 成为
唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而
更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他
事件处理函数重置，但这意味着你需要编写更多的代码。

>注意: 另一种说法（广义范围的说法），React组件的数据渲染是否被调用者传递的 props 完全控制，控制则为受控组件，否则非受控组件。

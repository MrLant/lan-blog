---
title: 组件间通信
date: 2023/04/08
---

## 父子组件间通信

### 父传子

通过属性传递

### 子传父
通过属性传递一个事件
```js
import React, { Component } from 'react'
class Navbar extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.props.event()
                }}>click</button>
            </div>
        )
    }
}
class Sidebar extends Component {
    render() {
        return (
            <div>
                <ul style={{'backgroundColor': 'red', 'width': '200px'}}>
                    <li>11111</li>
                    <li>11111</li>
                    <li>11111</li>
                    <li>11111</li>
                    <li>11111</li>
                    <li>11111</li>
                </ul> 
            </div>
        )
    }
}
export default class APP extends Component {
  state = {
    isShow: false
  }
  render() {
    return (
      <div>
        <Navbar event = {() => this.handleClick()} />
       {this.state.isShow &&　<Sidebar />} 
      </div>
    )
  }
  handleClick() {
    this.setState({isShow: !this.state.isShow})
  }
}
```
 ref标记 (父组件拿到子组件的引用，从而调用子组件的方法)
 ```js
//  受控组件版本
import React, { Component } from 'react'
class Field extends Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input type={this.props.type} onChange={(evt) => {
          this.props.onChangeEvent(evt.target.value)
        }} value={this.props.value}/>
      </div>
    )
  }
}
export default class App extends Component {
  state = {
    username: '',
    password: ''
  }
  render() {
    return (
      <div>
        <h1>登录页</h1>
        <Field label="用户名：" type="text" value={this.state.username} onChangeEvent={(val) => {
          this.setState({username: val})
        }}/>
        <Field label="密码：" type="password" value={this.state.password} onChangeEvent={(val) => {
           this.setState({password: val})
        }}/>
        <button onClick={() => {
          console.log(this.state.username, this.state.password)
        }}>登录</button>
        <button onClick={() => {
          this.setState({username: '', password: ''})
        }}>取消</button>
      </div>
    )
  }
}
 ```
 ```js
//  ref版本
import React, { Component } from 'react'
class Field extends Component {
    state = {
        inputValue: ''
    }
    clear() {
      this.setState({inputValue: ''})
    }
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input type={this.props.type} onChange={(evt) => {
         this.setState({inputValue: evt.target.value})
        }} value={this.state.inputValue}/>
      </div>
    )
  }
}
export default class App extends Component {
    username = React.createRef()
    password = React.createRef()
  render() {
    return (
      <div>
        <h1>登录页</h1>
        <Field label="用户名：" type="text" ref={this.username}/>
        <Field label="密码：" type="password" ref={this.password}/>
        <button onClick={() => {
         console.log(this.username.current.state.inputValue);
         console.log(this.password.current.state.inputValue);
        }}>登录</button>
        <button onClick={() => {
         this.username.current.clear()
         this.password.current.clear()
        }}>取消</button>
      </div>
    )
  }
}
 ```
 ## 非父子组件间通信
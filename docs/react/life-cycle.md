---
title: react生命周期
date: 2023/04/10
---

## 初始化阶段

* componentWillMount render之前最后一次修改状态的机会
* render 只能访问this.props和this.state，不允许修改状态和DOM输出
* componentDidMount 成功render并渲染完成真实DOM之后触发，可以修改DOM

## 运行中阶段

* componentWillReceiveProps 父组件修改属性触发
* shouldComponentUpdate 返回false会阻止render调用
* componentWillUpdate 不能修改属性和状态
* render 只能访问this.props和this.state，不允许修改状态和DOM输出
* componentDidUpdate 可以修改DOM

## 销毁阶段
* componentWillUnmount 在删除组件之前进行清理操作，比如计时器和事件监听器

## 老生命周期的问题

1. componentWillMount ,在ssr中这个方法将会被多次调用，所以会重复触发多遍，同时在这里如果绑定事件，将无法解绑，导致内存泄漏，变得不够安全高效逐步废弃。
2. componentWillReceiveProps 外部组件多次频繁更新传入多次不同的 props，会导致不必要的异步请求。
3. componetWillupdate, 更新前记录 DOM 状态,  可能会做一些处理，与componentDidUpdate相隔时间如果过长，会导致状态不太信。
## shouldComponentUpdate优化案例
```js
import React, { Component } from 'react'
class Box extends Component {
  render() {
    console.log('render')
    return (
      <div>
        <div 
          style={{ 
            width: '100px', 
            height: '100px', 
            border: this.props.index === this.props.value ? '1px solid #f00' : '1px solid #ccc', 
            marginRight: '20px' }
          }>
        </div>
      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.index === nextProps.value || this.props.index === this.props.value) {
      return true
    }
    return false
  }
}

export default class App extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    value: 0
  }
  render() {
    return (
      <div>
        <input type="number" style={{ marginBottom: '20px' }} onChange={(evt) => {
          this.setState({value: evt.target.value * 1})
        }}/>
        <div style={{ display: 'flex' }}>
          {this.state.list.map((item, index) => (
            <Box key={item} index={index} value={this.state.value}/>
          ))}
        </div>
      </div>
    )
  }
}
```

## componentWillReceiveProps（废弃）
```js
import React, { Component } from 'react'
class Child extends Component{
    state = {
        title:""
    }
    render() {
        return <div>child-{this.state.title}</div>
    }
    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps)

        // 最先获得父组件传来的属性， 可以利用属性进行ajax或者逻辑处理。
        // 把属性转化成孩子自己的状态。

        this.setState({
            title:nextProps.text+"kerwin"
        })
    }
}

export default class App extends Component {
    state = {
        text:"11111111111"
    }
    render() {
        return (
            <div>
                {
                    this.state.text
                }
                <button onClick={()=>{
                    this.setState({
                        text:"222222222222"
                    })
                }}>click</button>
                <Child text={this.state.text}/>
            </div>
        )
    }
}
```
## 新生命周期的替代
getDerivedStateFromProps 第一次的初始化组件以及后续的更新过程中(包括自身状态更新以及父传子) ，
返回一个对象作为新的state，返回null则说明不需要在这里更新state


getSnapshotBeforeUpdate 取代了 componetWillUpdate ,触发时间为update发生的时候，在render之后
dom渲染之前返回一个值，作为componentDidUpdate的第三个参数。

```js
import React, { Component } from 'react'
export default class App extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
  myRef = React.createRef()
  getSnapshotBeforeUpdate() {
    return this.myRef.current.scrollHeight
  }
  componentDidUpdate(prevProps, prevState, value) {
    this.myRef.current.scrollTop = this.myRef.current.scrollTop + (this.myRef.current.scrollHeight - value) 
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ list: [...[11, 12, 13, 14, 15, 16], ...this.state.list] })
          }}
        >
          click
        </button>
        <div style={{ height: '200px', overflow: 'auto' }} ref={this.myRef}>
          {this.state.list.map((item) => (
            <div key={item} style={{ height: '100px', background: '#ff0' }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```

## react中性能优化的方案
1. shouldComponentUpdate
   
控制组件自身或者子组件是否需要更新，尤其在子组件非常多的情况下， 需要进行优化。

2. PureComponent
   
PureComponent会帮你 比较新props 跟 旧的props， 新的state和老的state（值相等,或者
对象含有相同的属性、且属性值相等 ），决定shouldcomponentUpdate 返回true 或者
false， 从而决定要不要呼叫 render function

::: tip
如果你的 state 或 props 『永远都会变』，那 PureComponent 并不会比较快，因为shallowEqual 也需要花时间。
:::
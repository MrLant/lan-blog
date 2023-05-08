---
title: Redux(v5版本)
date: 2023/05/06
---

## Redux

Redux 最主要是用作应用状态的管理。简言之，Redux 用一个单独的常量状态树（state 对象）保存这一整个应用的
状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建（使用 actions 和 reducers），这
样就可以进行数据追踪。

redux 介绍及设计和使用的三大原则

- state 以单一对象存储在 store 对象中
- state 只读（每次都返回一个新的对象）
- 使用纯函数 reducer 执行 state 更新

```js
// store.js
import { legacy_createStore } from 'redux'
const reducer = (prevState = { show: true }, action) => {
  const newState = { ...prevState }
  switch (action.type) {
    case 'show':
      newState.show = true
      return newState
    case 'hide':
      newState.show = false
      return newState
    default:
      return prevState
  }
}
const store = legacy_createStore(reducer)
export default store
// 订阅
store.subscribe(() => {
  this.setState({ show: store.getState().show })
})

// 分发
store.dispatch({
  type: 'hide'
})

// 简易版实现store
function createMyStore(params) {
  var list = []
  var state = reducer(undefined, {})
  function subscribe(callback) {
    list.push(callback)
  }
  function dispatch(action) {
    state = reducer(state, action)
    for (var i in list) {
      list[i] && list[i]()
    }
  }

  function getState() {
    return state
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}
```

## redux 中间件

在 redux 里，action 仅仅是携带了数据的普通 js 对象。action creator 返回的值是这个 action 类型的
对象。然后通过 store.dispatch()进行分发。同步的情况下一切都很完美，但是 reducer 无法处理异
步的情况。那么我们就需要在 action 和 reducer 中间架起一座桥梁来处理异步。这就是 middleware。

### redux-thunk

```js
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
const store = createStore(fetchReducer, applyMiddleware(thunk))
const getComingSoon = () => {
  //进行异步请求
  return (dispatch, store) => {}
}
```

### redux-promise

```js
import promiseMiddleware from 'redux-promise'
const store = createStore(fetchReducer, applyMiddleware(thunk, promiseMiddleware))
const getComingSoon = () => {
  //进行异步请求
  return axios.get(`****`).then((res) => {
    return { type: 'cominglist', info: res.data.data }
  })
}
```

## react-redux

React-Redux 提供 Provider 组件，可以让容器组件拿到 state。

```js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

React-Redux 提供 connect 方法，用于从 UI 组件生成容器组件。connect 的意思，就是将这两种组件连起来

```js
const mapStateToProps = (state) => {
  return {
    list: state.CinemaReducer.list
  }
}
const mapDispatchToProps = {
  changeCityName: (item) => ({
    type: 'city-change',
    payload: item
  }),
  getCinemaListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Cinemas)
```

HOC 与 context 通信在 react-redux 底层中的应用

- connect 是 HOC， 高阶组件
- Provider 组件，可以让容器组件拿到 state ， 使用了 context

HOC 不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。

1. 代码复用，代码模块化
2. 增删改 props
3. 渲染劫持

```js
import React, { useEffect } from 'react'

function NotFound(props) {
  useEffect(() => {
    console.log(props)
  }, [])

  return <div>NotFound</div>
}

const myConnect = (cb, obj) => {
  const state = cb()
  return (MyComponent) => {
    return function a(props) {
      return (
        <div>
          <MyComponent {...state} {...props} {...obj} />
        </div>
      )
    }
  }
}
const mapStateToProps = () => {
  return {
    a: 1,
    b: 2
  }
}
const mapDispatchToProps = {
  c: () => {}
}
export default myConnect(mapStateToProps, mapDispatchToProps)(NotFound)
```

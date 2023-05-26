---
title: react-saga
date: 2023/05/17
---

## 生成器函数

用 function \* 定义的函数称之为生成器函数，返回值是一个 Generator 对象，不能直接使用，需要通过调用 next() 方法来使用。

yield 关键字可以让生成器函数变成异步函数。yield 作用是暂停运行代码，直至下一次 next() 方法被调用。

```js
import React from 'react'

export default function App() {
  return <div>1-生成器</div>
}

function getData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(11111)
    }, 1000)
  })
}

function getData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(22222)
    }, 1000)
  })
}

function getData3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(33333)
    }, 1000)
  })
}

function* gen() {
  const res1 = yield getData1()
  console.log(res1)
  const res2 = yield getData2()
  console.log(res2)
  const res3 = yield getData3()
  console.log(res3)
}

function run(fn) {
  const n = fn()
  function next(data) {
    const res = n.next(data)
    if (res.done) {
      return res.value
    }
    res.value.then((ele) => {
      next(ele)
    })
  }
  next()
}

run(gen)
```

## redux-saga 使用

```js
// App.js
import React from 'react'
import store from './redux/store'

export default function App() {
  return (
    <div>
      <button onClick={() => {
        if (store.getState().list.length === 0) {
          store.dispatch({
            type: 'get-list'
          })
        } else {
          console.log("缓存", store.getState().list)
        }
      }}>test</button>
    </div>
  )
}
// store.js
import { applyMiddleware, legacy_createStore } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import watchSaga from './saga'
const sagaMiddleware = createSagaMiddleware()
const store = legacy_createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchSaga)
export default store
// reducer.js
const reducer = (
  preState = {
    list: []
  },
  action
) => {
  const newState = {...preState}
  switch (action.type) {
    case 'change-list':
    newState.list = action.playload
    return newState
    default:
      return preState
  }
}

export default reducer
// saga.js
import { takeEvery, call, put} from 'redux-saga/effects'

function *watchSaga() {
  yield takeEvery("get-list", getList);
}

function *getList() {
  const res = yield call(getListAction)
  yield put({
    type: 'change-list',
    playload: res
  })
}

function getListAction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['111', '222', '333'])
    }, 1000)
  })
}

export default watchSaga
```

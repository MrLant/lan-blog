---
title: mobx
date: 2023/05/09
---

## mobx 基本使用

```js
import React from 'react'
import { observable, autorun } from 'mobx'

var number = observable.box(10)
var name = observable.box('张三')

// 观察对象 通过map
// const map = observable.map({key: 'value'})
// map.set('key', 'new value')
// map.get('key')

// 观察对象，不通过map
// const map = observable({key: 'value'})
// map.key = 'new value'

// 观察数组
// const list = observable([1,2,3])
// list[2] = 3

autorun(() => {
  console.log(number.get())
})

autorun(() => {
  console.log(name.get())
})

setTimeout(() => {
  number.set(20)
}, 1000)
export default function App() {
  return <div>App</div>
}
```

## mobx 使用（非装饰器）

```js
const store = observable(
  {
    show: true,
    changeShow() {
      this.show = true
    },
    changeHide() {
      this.show = false
    }
  },
  {
    changeHide: action,
    changeShow: action //标记两个方法是action，专门修改可观测的value
  }
)
```

## mobx 使用（装饰器 + 异步请求）

```js
class Store {
  @observable show = true
  @action changeShow() {
    this.show = true
  }
  @action changeHide() {
    this.show = false
  }

  @action async getList() {
    const res = await axios({
      url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=1166056',
      method: 'get'
    })
    // 异步请求
    runInAction(() => {
      this.list = res.data.data.cinemas
    })
  }
}
```

## 支持装饰器

> npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env

创建.babelrc

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```

创建 config-overrides.js

```js
const path = require('path')
const { override, addDecoratorsLegacy } = require('customize-cra')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
    config.externals = { react: 'React', 'react-dom': 'ReactDOM' }
  }
  return config
}
module.exports = override(addDecoratorsLegacy(), customize())
```

安装依赖

> npm i customize-cra react-app-rewired

修改 package.json

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
}
```

修改 vscode 配置

勾选 experimentalDecorators

## mobx-react

```js
// index.js
import { Provider } from 'mobx-react'
import store from './08-mobx/mobx/store'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

装饰器模式
@inject("store")
@observer

函数式组件
import { Observer } from 'mobx-react'
<Observer>
      {() => {
        return (
          <div>
            <ul style={{ height: '600px', overflow: 'auto' }}>
              {store.list.map((item) => (
                <li style={{ fontSize: '12px', paddingLeft: '20px' }} key={item.cinemaId}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )
      }}
</Observer>
```

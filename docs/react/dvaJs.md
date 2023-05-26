---
title: dvaJs
date: 2023/05/18
---

## 非异步使用

```js
import { connect } from 'dva'
import React, { Component } from 'react'
import Tabbar from '../components/Tabbar'

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {this.props.isShow && <Tabbar/>}
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        a:1,
        isShow:state.maizuo.isShow
    }
})(App)

// Detail.js
import { connect } from 'dva'
import React, { Component } from 'react'

class Detail extends Component {
    componentDidMount() {
        console.log(`接受上个页面传来的id,利用此id取数据`,this.props.match.params.myid)
        this.props.dispatch({
            type:"maizuo/hide"
        })
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:"maizuo/show"
        })
    }
    render() {
        return (
            <div>
                Detail
            </div>
        )
    }
}

export default connect()(Detail)

// model.js
import { getCinemaListService } from "../services/maizuo"
export default {
    namespace: 'maizuo',
    state: {
        isShow:true,
    },
    reducers:{
        hide(prevState,action){
            return {...prevState,isShow:false}
        },
        show(prevState,action){
            return {...prevState,isShow:true}
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            console.log("初始化")
        }
    }
}
```

## 异步使用

```js
import { connect } from 'dva'
import React, { Component } from 'react'

class Cinema extends Component {
  componentDidMount() {
    if (this.props.list.length === 0) {
      //dispatch
      this.props.dispatch({
        type: 'maizuo/getCinemaList'
      })
    } else {
      console.log('缓存', this.props.list)
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.list.map((item) => (
            <li key={item.cinemaId}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  list: state.maizuo.list
})
export default connect(mapStateToProps)(Cinema)

import { getCinemaListService } from '../services/maizuo'
export default {
  namespace: 'maizuo',
  state: {
    list: []
  },
  reducers: {
    changeCinemaList(prevState, { payload }) {
      return { ...prevState, list: payload }
    }
  },
  //异步- redux-saga
  effects: {
    *getCinemaList(action, { call, put }) {
      var res = yield call(getCinemaListService)
      yield put({
        type: 'changeCinemaList',
        payload: res.data.data.cinemas
      })
    }
  }
}
```

## webpackrc 中配置跨域

```json
{
  "proxy": {
    "/api": {
      "target": "https://i.maoyan.com",
      "changeOrigin": true
    }
  }
}
```

## .roadhogrc.mock.js 中配置跨域

```js
const mockobj = require('./mock/api')
export default {
  ...mockobj
}
// /mock/api
export default {
  'GET /users': { name: 'kerwin', age: 100, location: 'dalian' },

  'POST /users/login': (req, res) => {
    if (req.body.username === 'kerwin' && req.body.password === '123') {
      res.send({ ok: 1 })
    } else {
      res.send({ ok: 0 })
    }
  }
}
```

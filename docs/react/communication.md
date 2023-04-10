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

 ### 状态提升
 React中的状态提升概括来说,就是将多个组件需要共享的状态提升到它们最近的父组件
上.在父组件上改变这个状态然后通过props分发给子组件.
```js
import React, { Component } from 'react'
import axios from 'axios'
export default class APP extends Component {
  state = {
    filmList: [],
    filmDetail: ''
  }
  componentDidMount() {
    axios.get('/hot.json').then(res => {
      this.setState({filmList: res.data})
    })
  }
  render() {
    return (
      <div>
        {this.state.filmList.map(item => 
          <FilmItem {...item} key={item.id} getFilmDetail={(val) => {
            this.setState({filmDetail: val})
          }}/>
        )}
        <FilmDetail filmDetail={this.state.filmDetail}/>
      </div>
    )
  }
}

class FilmItem extends Component {
  render() {
    const {nm, img, videoName} = this.props
    return (
      <div>
        <h4 onClick={() => {
          this.props.getFilmDetail(videoName)
        }}>{nm}</h4>
        <img src={img} alt={nm} width={200} height={200}/>
      </div>
    )
  }
}

class FilmDetail extends Component {
  render() {
    return (
      <div style={{position: 'fixed', top: '20px', left: '300px'}}>{this.props.filmDetail}</div>
    )
  }
}
```

### 发布订阅模式
```js
import React, { Component } from 'react'
import axios from 'axios'

var bus = {
  list: [],
  subscribe(callback) {
    this.list.push(callback)
  },
  publish(val) {
    this.list.forEach(callback => {
      callback && callback(val)
    })
  }
}

export default class APP extends Component {
  state = {
    filmList: [],
  }
  componentDidMount() {
    axios.get('/hot.json').then(res => {
      this.setState({filmList: res.data})
    })
  }
  render() {
    return (
      <div>
        {this.state.filmList.map(item => 
          <FilmItem {...item} key={item.id} />
        )}
        <FilmDetail />
      </div>
    )
  }
}

class FilmItem extends Component {
  render() {
    const {nm, img, videoName} = this.props
    return (
      <div>
        <h4 onClick={() => {
          bus.publish(videoName)
        }}>{nm}</h4>
        <img src={img} alt={nm} width={200} height={200}/>
      </div>
    )
  }
}

class FilmDetail extends Component {
  constructor() {
    super()
    this.state = {
      info: ''
    }
    bus.subscribe((val) => {
      this.setState({info: val})
    })
  }
  render() {
    return (
      <div style={{position: 'fixed', top: '20px', left: '300px'}}>{this.state.info}</div>
    )
  }
}
```

### context状态树传参
```js
import React, { Component } from 'react'
import axios from 'axios'

var GlobalContext = React.createContext()
export default class APP extends Component {
  state = {
    filmList: [],
    info: ''
  }
  componentDidMount() {
    axios.get('/hot.json').then(res => {
      this.setState({filmList: res.data})
    })
  }
  render() {
    return (
      <GlobalContext.Provider value={{info: this.state.info, changeInfo: (val) => {
        this.setState({info: val})
      }}}>
        <div>
          {this.state.filmList.map(item => 
            <FilmItem {...item} key={item.id} />
          )}
          <FilmDetail />
        </div>
      </GlobalContext.Provider>
    )
  }
}

class FilmItem extends Component {
  render() {
    const {nm, img, videoName} = this.props
    return (
      <GlobalContext.Consumer>
        {
          (value) => (
            <div>
              <h4 onClick={() => {
                value.changeInfo(videoName)
                }}>{nm}
              </h4>
              <img src={img} alt={nm} width={200} height={200}/>
            </div>
          )
        }
      </GlobalContext.Consumer>
      
    )
  }
}

class FilmDetail extends Component {

  render() {
    return (
      <GlobalContext.Consumer>
        {
          (value) => (
            <div style={{position: 'fixed', top: '20px', left: '300px'}}>{value.info}</div>
          )
        }
      </GlobalContext.Consumer>
      
    )
  }
}

```

::: tip
GlobalContext.Consumer内必须是回调函数，通过context方法改变根组件状态
:::
> 缺点：react组件树中某个上级组件shouldComponetUpdate 返回false,当context更新时，不会引起下级组件更新
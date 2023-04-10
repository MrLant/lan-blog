---
title: 插槽
date: 2023/04/10
---

```js
import React, { Component } from 'react'
class Navbar extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
       {this.props.children[0]}
       {this.props.children[1]}
       {this.props.children[2]}
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <div>11111</div>
          <div>22222</div>
          <div>33333</div>
        </Navbar>
      </div>
    )
  }
}
```
> 1. 为了复用 
> 2. 一定程度减少了父子通信
---
title: react生命周期
date: 2023/04/10
---






## scu优化案例
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
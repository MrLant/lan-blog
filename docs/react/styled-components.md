---
title: styled-components
date: 2023/05/17
---

## 透传 props

```js
import React, { Component } from 'react'
import { styled } from 'styled-components'
export default class App extends Component {
  render() {
    const StyledInput = styled.input`
      color: red;
    `
    const StyledButton = styled.button`
      background: ${(props) => props.bg};
    `
    return (
      <div>
        <StyledInput type="text" placeholder="请输入" />
        <StyledButton bg="red">click</StyledButton>
      </div>
    )
  }
}
```

## 样式化任意组件

```js
import React, { Component } from 'react'
import { styled } from 'styled-components'
export default class App extends Component {
  render() {
    const StyledChild = styled(Child)`
      background: red;
    `
    return (
      <div>
        <StyledChild />
      </div>
    )
  }
}

function Child(props) {
  return <div className={props.className}>123</div>
}
```

## 扩展样式

```js
import React from 'react'
import { styled } from 'styled-components'
export default function App() {
  const StyledButton = styled.button`
    width: 100px;
    height: 100px;
  `
  const ButtonRed = styled(StyledButton)`
    background: red;
  `
  return (
    <div>
      <ButtonRed>Click</ButtonRed>
    </div>
  )
}
```

## 动画

```js
import styled, { keyframes } from 'styled-components'
const rotate360 = keyframes` 
from { 
  transform: rotate(0deg); 
}
to {
  transform: rotate(360deg); 
} 
`
const Rotate = styled.div`
  width: 100px;
  height: 100px;
  background: yellow;
  animation: ${rotate360} 1s linear infinite;
`
```

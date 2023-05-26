---
title: react补充
date: 2023/05/17
---

## portal

Portals 提供了一个最好的在父组件包含的 DOM 结构层级外的 DOM 节点渲染组件的方法。

> ReactDOM.createPortal(child,container);

第一个参数 child 是可渲染的 react 子项，比如元素，字符串或者片段等。第二个参数 container 是一个 DOM 元素。

```js
import React from 'react'
import { createPortal } from 'react-dom'
export default function Dialog() {
  return createPortal(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
      }}
    >
      Dialog
    </div>,
    document.body
  )
}
```

::: tip
虽然通过 portal 渲染的元素在父组件的盒子之外，但是渲染的 dom 节点仍在 React 的元素树上，在那个 dom 元素上
的点击事件仍然能在 dom 树中监听到。
:::

## lazy

`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件），其实就是懒加载。

实现原理

当 Webpack 解析到该语法时，它会自动地开始进行代码分割(Code Splitting)，分割成一个文件，当使用到这个文件的时候会这段代码才会被异步加载。

在 React.lazy 和常用的三方包 react-loadable ，都是使用了这个原理，然后配合 webpack 进行代码打包拆分达
到异步加载，这样首屏渲染的速度将大大的提高。

由于 React.lazy 不支持服务端渲染，所以这时候 react-loadable 就是不错的选择。

```js
const Commingsoon = React.lazy(() => import('./components/Commingsoon'))

export default function App() {
  const [type, settype] = useState(0)
  return (
    <div>
      <button
        onClick={() => {
          settype(1)
        }}
      >
        Nowplaying
      </button>
      <button
        onClick={() => {
          settype(2)
        }}
      >
        Commingsoon
      </button>
      <Suspense fallback={<div>Loading。。。</div>}>
        {type === 1 && <Nowplaying />}
        {type === 2 && <Commingsoon />}
      </Suspense>
    </div>
  )
}
```

## forwordRef

引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用 ref 的技术。对于应用者的大多数组件来说没什么作用。但是对于有些重复使用的组件，可能有用。例如某些 input 组件，需要控制其 focus，本来是可以使用 ref 来 控制，但是因为该 input 已被包裹在组件中，这时就需要使用 Ref forward 来透过组件获得该 input 的引用。可以透传多层。

```js
import React, { forwardRef, useRef } from 'react'

export default function App() {
  const myText = useRef(null)
  return (
    <div>
      <button
        onClick={() => {
          myText.current.focus()
          myText.current.value = ''
        }}
      >
        change
      </button>
      <Child ref={myText} />
    </div>
  )
}

const Child = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} defaultValue={123} />
    </div>
  )
})
```

## memo

组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲 染流程。但是 React.memo()，我们可以仅仅让某些组件进行渲染。

```js
import {memo} from 'react'
const Child = memo(()=>{ return <div><input type="text" /></div> })
// 或者
const Child = ()=>{ return <div> <input type="text" /> </div> })
const MemoChild = memo(Child)
```

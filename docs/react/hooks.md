---
title: hooks
date: 2023/04/14
---

## useState

```js
import React from 'react'
import { useState } from 'react'
export default function App() {
  const [name, setName] = useState('张三')
  return (
    <div>
      <button onClick={() => { setName('李四') }}>click</button>
      <div>{name}</div>
    </div>
  )
}
```

## useEffect

```js
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function App() {
  const [type, setType] = useState(1)
  return (
    <div>
      <button onClick={() => setType(1)}>正在热映</button>
      <button onClick={() => setType(2)}>即将热映</button>
      <FilmList type={type} />
    </div>
  )
}

function FilmList(props) {
  const [filmList, setFilmList] = useState([])
  useEffect(() => {
    axios({
      url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=1
      &pageSize=10&type=${props.type}&k=4822854`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1",
        "e":"16814592963043615689408513","bc":"440300"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      setFilmList(res.data.data.films)
    })
  }, [props.type])

  return (
    <div>
      <ul>
        {filmList.map((item) => ( <li key={item.filmId}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

::: tip
不要对 Dependencies 撒谎, 如果你明明使用了某个变量，却没有申明在依赖中，你等于向 React 撒了谎，后果
就是，当依赖的变量改变时，useEffect 也不会再次执行, eslint 会报警告
:::

```js
import React, {useState, useEffect}from 'react'
export default function App() {
  const [isShow, setIsShow] = useState(true)
  return (
    <div>
      <button onClick={() => {
        setIsShow(!isShow)
      }}>click</button>
      { isShow && <Child /> }
    </div>
  )
}

function Child() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('timer')
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div>Child</div>
  )
}
```

> useEffect和useLayoutEffect有什么区别？

简单来说就是调用时机不同， useLayoutEffect 和原来 componentDidMount & componentDidUpdate 一致，在
react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而 useEffect 是会在整个页面渲染完才会调用的
代码。
官方建议优先使用 useEffect

> However, we recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.

在实际使用时如果想避免页面抖动（在 useEffect 里修改DOM很有可能出现）的话，可以把需要操作DOM的代码
放在 useLayoutEffect 里。在这里做点dom操作，这些dom修改会和 react 做出的更改一起被一次性渲染到屏幕
上，只有一次回流、重绘的代价。

## useCallback

防止因为组件重新渲染，导致方法被重新创建，起到缓存作用; 只有第二个参数变化了，才重新声明一次

```js
var handleClick = useCallback(()=>{ 
  console.log(name) 
},[name]) 
<button onClick={()=>handleClick()}>hello</button> 
//只有name改变后， 这个函数才会重新声明一次， 
//如果传入空数组， 那么就是第一次创建后就被缓存， 如果name后期改变了,拿到的还是老的name。 
//如果不传第二个参数，每次都会重新声明一次，拿到的就是最新的name.
```

## useMemo
useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

```js
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)
```
唯一的区别是：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并
且将函数执行结果返回给你。所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。


所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数
计算得到一个确定的值，比如记忆组件。

## useRef(保存引用值)

```js
const myswiper = useRef(null); 
<Swiper ref={myswiper}/>
```

```js
import React, { useState, useRef } from 'react'
export default function App() {
  const [count, setcount] = useState(0)
  const mycount = useRef(0)
  return (
    <div>
      <button
        onClick={() => {
          setcount(count + 1)
          mycount.current++
        }}
      >add</button>
      {count}-{mycount.current}
    </div>
  )
}
```

## useContext

```js
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

var GlobalContext = React.createContext()
export default function App() {
  const [info, setinfo] = useState('')
  const [filmList, setfilmList] = useState([])

  useEffect(() => {
    axios.get('/hot.json').then((res) => {
      setfilmList(res.data)
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        info,
        changeInfo: (val) => {
          setinfo(val)
        }
      }}
    >
      <div>
        {filmList.map((item) => (
          <FilmItem {...item} key={item.id} />
        ))}
        <FilmDetail />
      </div>
    </GlobalContext.Provider>
  )
}

function FilmItem(props) {
  const { nm, img, videoName } = props
  const value = useContext(GlobalContext)
  return (
    <div>
      <h4 onClick={() => {
        value.changeInfo(videoName)
      }}>{nm}</h4>
      <img src={img} alt={nm} width={200} height={200} />
    </div>
  )
}

function FilmDetail() {
  const value = useContext(GlobalContext)
  return (
    <div style={{ position: 'fixed', top: '20px', left: '300px' }}>{value.info}</div>
  )
}

```
## useReducer

```js
import React, {useReducer, useContext} from 'react'
const initState = {
  value1: '',
  value2: ''
}

const reducer = (preState, action) => {
  const newState = {...preState}
  switch(action.type) {
    case 'child1':
      newState.value1 = action.value
      return newState
    case 'child2':
      newState.value2 = action.value
      return newState
    default:
      return preState
  }
}

var GlobalContext = React.createContext()
export default function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <div>
      <GlobalContext.Provider value={{state, dispatch}}>
        <Child1 />
        <Child2 />
        <Child3 />
      </GlobalContext.Provider>
    </div>
  )
}

function Child1() {
  const {dispatch} = useContext(GlobalContext)
  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'child1',
          value: 123456
        })
      }}>修改child2</button>
      <button onClick={() => {
        dispatch({
          type: 'child2',
          value: 789456
        })
      }}>修改child3</button>
      <div>child1</div>
    </div>
  )
}

function Child2() {
  const {state} = useContext(GlobalContext)
  return (
    <div>child2-{state.value1}</div>
  )
}

function Child3() {
  const {state} = useContext(GlobalContext)
  return (
    <div>child3-{state.value2}</div>
  )
}
```
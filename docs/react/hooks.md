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

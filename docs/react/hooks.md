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

---
title: react-router（v5版本）
date: 2023/05/04
---

## 什么是理由？

路由是根据不同的 url 地址展示不同的内容或页面。

## 定义路由以及重定向

```js
<HashRouter>
  <Switch>
    <Route path="/films" component={Films} />
    <Route path="/center" component={Center} />
    <Route path="/cinemas" component={Cinemas} exact />
    <Redirect from="/" to="/films" />
    {/*
        <Redirect from="/" to="/films" exact/>
        <Route path="*" component={NotFound}/>
      */}
  </Switch>
</HashRouter>
```

> exact 精确匹配（Redirect 即使使用了 exact，外面还要嵌套 Switch 来用）

## 嵌套路由

```js
// 在需要嵌套的组件中
<Switch>
  <Route path="/films/nowplaying" component={Nowplaying} />
  <Route path="/films/comingsoon" component={Comingsoon} />
  <Redirect from="/films" to="/films/nowplaying" />
</Switch>
```

## 路由跳转方式

- 声明式导航

```js
<NavLink to="/films" activeClassName="active">films</NavLink>
<NavLink to="/cinemas" activeClassName="active">cinemas</NavLink>
<NavLink to="/center" activeClassName="active">center</NavLink>
```

- 编程式导航

```js
this.props.history.push(`/center`)
```

## 路由传参

- 声明式

```js
  <NavLink to={`/detail/${item.filmId}`}>{item.name}</NavLink>

  <Route path="/detail/:id" component={Detail} />
```

- 编程式

```js
this.props.history.push({ pathname: '/user', query: { day: 'Friday' } })
this.props.location.query.day

this.props.history.push({ pathname: '/user', state: { day: 'Friday' } })
this.props.location.state.day
```

## 路由拦截

```js
<Route path="/center" render={(props) => (isAuth() ? <Center /> : <Login />)} />
```

## withRouter

```js
import { withRouter } from 'react-router'
withRouter(MyComponent)
```

## 反向代理

>  npm install http-proxy-middleware --save

```js
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
}
```

---
title: nestjs Session
date: 2023/05/29
---

session 是服务器 为每个用户的浏览器创建的一个会话对象 这个 session 会记录到 浏览器的 cookie 用来区分用户
我们使用的是 nestjs 默认框架 express 他也支持 express 的插件 所以我们就可以安装 express 的 session

> npm i express-session --save

需要智能提示可以装一个声明依赖

> npm i @types/express-session -D

然后在 main.ts 引入 通过 app.use 注册 session

```js
import * as session from 'express-session'
app.use(session())
```

## 参数配置详解

<table>
  <tr>
    <td>secret</td>
    <td>生成服务端session 签名 可以理解为加盐</td>
  </tr>
  <tr>
    <td>name</td>
    <td>生成客户端cookie 的名字 默认 connect.sid</td>
  </tr>
  <tr>
    <td>cookie </td>
    <td>设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。</td>
  </tr>
  <tr>
    <td>rolling</td>
    <td>在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)</td>
  </tr>
</table>

```js
app.use(session({ secret: "test", name: "test.session", rolling: true, cookie: { maxAge: null } }))
```
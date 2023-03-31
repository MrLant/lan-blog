---
title: 构建react工程化项目
date: 2023/03/30
---

## create-react-app创建项目

全局安装create-react-app
```sh
npm install -g create-react-app
```
创建一个项目
```sh
create-react-app your-app
```

如果不想全局安装，可以直接使用npx
```sh
npx create-react-app your-app
```

一个react项目中，默认会安装

- react: react框架的核心
- react-dom: react视图渲染的核心（基于react构建html页面））
- react-scripts:脚手架为了让项目目录看起来干净一些，把webpack打包的规则及相关的插件/loader等都隐藏到了node_modules目录下，react-scripts就是脚手架中自己对打包命令的一种封装

## 编写第一个react应用程序

```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<h1>欢迎进入React的世界</h1>, document.getElementById('root'))
```
---
title: 控制器
date: 2023/05/29
---

nestjs 提供了方法参数装饰器 用来帮助我们快速获取参数 如下

| 装饰器                  | 参数                          |
| ----------------------- | ----------------------------- |
| @Request()              | req                           |
| @Response()             | res                           |
| @Next()                 | next                          |
| @Session()              | req.session                   |
| @Param(key?: string)    | req.params/req.params[key]    |
| @Body(key?: string)     | req.body/req.body[key]        |
| @Query(key?: string)()  | req.query/req.query[key]      |
| @Headers(name?: string) | req.headers/req.headers[name] |
| @HttpCode               |                               |

## 获取 get 请求传参

```js
@Get()
find(@Request() req) {
  console.log(req.query);
  return { code: 200 };
}

@Get()
find(@Query('name') name) {
  console.log(name);
  return { code: 200 };
}
```

## 获取 post 请求传参

```js
@Post()
create(@Request() req) {
  console.log(req.body)
  return { code: 200 };
}

@Post()
create(@Body() body) {
  console.log(body)
  return { code: 200 };
}
```

## 获取动态路由参数

```js
@Get(':id')
find(@Request() req) {
  console.log(req.params.id)
  return { code: 200 };
}

@Get(':id')
find(@Param('id') id) {
  console.log(id)
  return { code: 200 };
}
```

## 读取 header信息

```js
@Get(':id')
find(@Headers() header) {
  console.log(header)
  return { code: 200 };
}
```

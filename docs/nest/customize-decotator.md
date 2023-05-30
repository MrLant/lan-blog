---
title: 自定义装饰器
date: 2023/05/30
---

## 参数装饰器

在 Node.js 中，会经常将需要传递的值加到请求对象的属性中。然后在每个路由处理程序中手动提取它们，使用如下代码

```ts
const user = req.user
```

为了使代码更具可读性和透明性，我们可以创建一个 @User() 装饰器并在所有控制器中使用它。

```js
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
```

现在你可以在任何你想要的地方很方便地使用它。

```js
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

```

## 装饰器聚合

Nest 提供了一种辅助方法来聚合多个装饰器。例如，假设您要将与身份验证相关的所有装饰器聚合到一个装饰器中。这可以通过以下方法实现：

```js
import { applyDecorators } from '@nestjs/common'

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' })
  )
}
```

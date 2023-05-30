---
title: 守卫
date: 2023/05/30
---

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。

::: tip
守卫在每个中间件之后执行，但在任何拦截器或管道之前执行
:::

```js
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

全局守卫

为了设置一个全局守卫，使用 Nest 应用程序实例的 useGlobalGuards() 方法

```js
const app = await NestFactory.create(AppModule)
app.useGlobalGuards(new RolesGuard())
```

Nest 提供了通过 @SetMetadata() 装饰器将定制元数据附加到路由处理程序的能力。这些元数据提供了我们所缺少的角色数据，而守卫需要这些数据来做出决策。让我们看看使用@SetMetadata():
```js
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}

```
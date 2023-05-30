---
title: 模块
date: 2023/05/29
---

模块是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构

每个 Nest 应用程序至少有一个模块，即根模块。根模块是 Nest 开始安排应用程序树的地方。事实上，根模块可能是应用程序中唯一的模块，特别是当应用程序很小时，但是对于大型程序来说这是没有意义的。在大多数情况下，您将拥有多个模块，每个模块都有一组紧密相关的功能。

## 共享模块

实际上，每个模块都是一个共享模块。一旦创建就能被任意模块重复使用。假设我们将在几个模块之间共享 CatsService 实例。 我们需要把 CatsService 放到 exports 数组中

```ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

现在，每个导入 CatsModule 的模块都可以访问 CatsService ，并且它们将共享相同的 CatsService 实例。

## 模块再导出

可以重新导出他们导入的模块。 在下面的示例中，UserModule 被导入到 ListModule 中并从中导出，使其可用于导入此模块的其他模块（RoleController）

```js
// list.module.ts
@Module({
  imports: [UserModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [UserModule],
})

// role.moudle.ts
@Module({
  imports: [ListModule],
  controllers: [RoleController],
  providers: [RoleService],
})

// role.controller.ts
// 可以直接使用UserService
constructor(
  private readonly roleService: RoleService,
  private readonly userService: UserService,
) {}
```

## 全局模块

@Global 装饰器使模块成为全局作用域。 全局模块应该只注册一次，最好由根或核心模块注册。 在上面的例子中，CatsService 组件将无处不在，而想要使用 CatsService 的模块则不需要在 imports 数组中导入 CatsModule。

```js
import { Module, Global } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

## 动态模块

```js
import { Module, DynamicModule } from '@nestjs/common'
import { createDatabaseProviders } from './database.providers'
import { Connection } from './connection.provider'

@Module({
  providers: [Connection]
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities)
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers
    }
  }
}
```

> forRoot() 方法可以同步或异步返回一个动态模块

如果要在全局范围内注册动态模块，请将 global 属性设置为 true。

```js
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}

```

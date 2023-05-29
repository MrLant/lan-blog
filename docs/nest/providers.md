---
title: nestjs 提供者
date: 2023/05/29
---

Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。


## 自定义名称

```js
// module.ts
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'root',
      useClass: AppService,
    },
  ],
})

// controller.ts
constructor(@Inject('root') private readonly appService: AppService) {}
```

## 自定义注入值
```js
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'listInfo',
      useValue: ['吃饭', '睡觉', '打豆豆'],
    },
  ],
})
// controller.ts
  constructor(
    @Inject('listInfo') private listInfo: string[],
  ) {}
```

## 工厂模式

```js
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    UserService,
    {
      provide: 'FactoryMode',
      inject: [UserService],
      useFactory(UserService: UserService) {
        console.log(UserService.getHello());
        return 123;
      },
    },
  ],
})

// controller.ts
@Controller()
export class AppController {
  constructor(
    @Inject('FactoryMode') private FactoryMode: number,
  ) {}

  @Get()
  getHello(): number {
    return this.FactoryMode;
  }
}
```

## 异步模式

```js
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    UserService,
    {
      provide: 'FactoryMode',
      inject: [UserService],
      async useFactory(UserService: UserService) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(UserService.getHello());
          }, 2000);
        });
      },
    },
  ],
})
```
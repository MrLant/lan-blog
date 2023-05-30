---
title: 管道
date: 2023/05/30
---

## 内置管道

`Nest`自带九个开箱即用的管道

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe

为了使用管道，我们需要将一个管道类的实例绑定到合适的情境。在我们的 ParseIntPipe 示例中，我们希望将管道与特定的路由处理程序方法相关联，并确保它在该方法被调用之前运行。我们使用以下构造来实现，并其称为在方法参数级别绑定管道:

```js
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

```

## 自定义管道

::: tip
PipeTransform<T, R> 是每个管道必须要实现的泛型接口。泛型 T 表明输入的 value 的类型，R 表明 transfrom() 方法的返回类型
:::

```js
@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const dto = plainToInstance(metadata.metatype, value);
    const errors = await validate(dto);
    console.log(errors);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

 @Post()
  create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
```

Nest 与 class-validator 配合得很好。这个优秀的库允许您使用基于装饰器的验证。装饰器的功能非常强大，尤其是与 Nest 的 Pipe 功能相结合使用时，因为我们可以通过访问 metatype 信息做很多事情.

> npm i --save class-validator class-transformer

## 全局管道

由于 ValidationPipe 被创建为尽可能通用，所以我们将把它设置为一个全局作用域的管道，用于整个应用程序中的每个路由处理器。

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
```

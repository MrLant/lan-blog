---
title: 拦截器与异常过滤器
date: 2023/05/30
---

## 拦截器

拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

- 在函数执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据特定条件完全重写函数 (例如, 出于缓存目的)

每个拦截器都有 intercept() 方法，它接收 2 个参数。 第一个是 ExecutionContext 实例（与守卫完全相同的对象）。 ExecutionContext 继承自 ArgumentsHost 。 ArgumentsHost 是传递给原始处理程序的参数的一个包装 ，它根据应用程序的类型包含不同的参数数组。

第二个参数是 CallHandler。如果不手动调用 handle() 方法，则主处理程序根本不会进行求值。这是什么意思？基本上，CallHandler 是一个包装执行流的对象，因此推迟了最终的处理程序执行。

比方说，有人提出了 POST /cats 请求。此请求指向在 CatsController 中定义的 create() 处理程序。如果在此过程中未调用拦截器的 handle() 方法，则 create() 方法不会被计算。只有 handle() 被调用（并且已返回值），最终方法才会被触发。

```js
// eg: 返回值拦截器

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          success: true,
          message: '成功'
        }
      })
    )
  }
}

// main.ts

app.useGlobalInterceptors(new ResponseInterceptor())
```

## 异常过滤器

内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理类型 HttpException（及其子类）的异常。每个发生的异常都由全局异常过滤器处理, 当这个异常无法被识别时 (既不是 HttpException 也不是继承的类 HttpException ) , 用户将收到以下 JSON 响应:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

全局异常拦截器

```js
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      status,
      time: new Date().toDateString(),
      path: request.url,
    });
  }
}
// main.ts
 app.useGlobalFilters(new HttpExceptionFilter());
```

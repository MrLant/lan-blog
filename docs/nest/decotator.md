---
title: ts装饰器
date: 2023/05/26
---

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression 这种形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

## 类装饰器

```js
const classDecotator: ClassDecorator = (target) => {
  target.prototype.text = 'hello world'
}

@classDecotator
class TestDecotator {
  constructor() {}
}

const obj: any = new TestDecotator()
console.log(obj.text)
```

## 属性装饰器

```js
const propertyDecotator: PropertyDecorator = (target: any, propertyKey) => {
  target[propertyKey] = '123'
}

class TestPropertyDecotator {
  @propertyDecotator
  public name = '456'
}

const obj1 = new TestPropertyDecotator()
console.log(TestPropertyDecotator.prototype.name) // '123'
console.log(obj1.name) // '456'



const VisitDecorator:PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
    let value: string | undefined;
    Object.defineProperty(target,propertyKey,{
      get: () => {
        return value?.toLowerCase();
      },
      set: (v:string) => {
         value = v;
      }
    })
  }
  class Visit {
    @VisitDecorator
    title: string | undefined
  }
  const obj = new Visit();
  obj.title = 'JEKS;FKSLFSFS';
  console.log(obj.title);

```

## 方法装饰器

```js
const methodDecotator: MethodDecorator = (target, propertyKey, descriptor: PropertyDescriptor) => {
  descriptor.value = () => {
    console.log(789)
  }
}

class TestMethodDecotator {
  @methodDecotator
  public getName() {
    console.log(123)
  }
}

new TestMethodDecotator().getName() // 779
```

## 参数装饰器

```js
const requiredDecorator: ParameterDecorator =  (target: any, propertyKey, parameterIndex: number)  => {
  let requiredParams: number[] = []
  requiredParams.push(parameterIndex)
}
class ValidateUser {
  find(name: string, @requiredDecorator id: number) {
    console.log(id)
  }
}
```

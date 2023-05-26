---
title: IOC控制反转 DI依赖注入
date: 2023/05/26
---

## IOC

Inversion of Control 字面意思是控制反转，具体定义是高层模块不应该依赖低层模块，二者都应该依赖其抽象；抽象不应该依赖细节；细节应该依赖抽象。

## DI

依赖注入（Dependency Injection）其实和 IoC 是同根生，这两个原本就是一个东西，只不过由于控制反转概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护对象关系），又给出了一个新的名字：“依赖注入”。 类 A 依赖类 B 的常规表现是在 A 中使用 B 的 instance。

## IOC 示例

```js
class A {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

class C {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
//中间件用于解耦
class Container {
  modeuls: any
  constructor() {
    this.modeuls = {}
  }
  provide(key: string, modeuls: any) {
    this.modeuls[key] = modeuls
  }
  get(key) {
    return this.modeuls[key]
  }
}

const mo = new Container()
mo.provide('a', new A('小满1'))
mo.provide('c', new C('小满2'))

class B {
  a: any
  c: any
  constructor(container: Container) {
    this.a = container.get('a')
    this.c = container.get('c')
  }
}

new B(mo)
```

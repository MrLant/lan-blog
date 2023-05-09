---
title: immutable
date: 2023/05/08
---

每次修改一个 Immutable 对象时都会创建一个新的不可变的对象，在新对象上操作并不会影响到原对象的数据。

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要
保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用
了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，
其它节点则进行共享。

## Map

```js
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') + ' vs. ' + map2.get('b')
```

## List

```js
const { List } = require('immutable')
const list1 = List([1, 2])
const list2 = list1.push(3, 4, 5)
const list3 = list2.unshift(0)
const list4 = list1.concat(list2, list3)
assert.equal(list1.size, 2)
assert.equal(list2.size, 5)
assert.equal(list3.size, 6)
assert.equal(list4.size, 13)
assert.equal(list4.get(0), 1) //push, set, unshift or splice 都可以直接用，返回一个新的immutable对象
```

## merge concat

```js
const { Map, List } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3, d: 4 })
const map2 = Map({ c: 10, a: 20, t: 30 })
const obj = { d: 100, o: 200, g: 300 }
const map3 = map1.merge(map2, obj)
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
const list1 = List([1, 2, 3])
const list2 = List([4, 5, 6])
const array = [7, 8, 9]
const list3 = list1.concat(list2, array)
// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## fromJs toJs

```js
import React, { Component } from 'react'
import { fromJS } from 'immutable'

export default class App extends Component {
  state = {
    info: {
      name: '张三',
      age: 18,
      location: {
        address: '广东省',
        city: '深圳市'
      },
      hobby: ['抽烟', '喝酒', '烫头']
    }
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            const info = fromJS(this.state.info)
            this.setState({
              info: info
                .set('name', '李四')
                .setIn(['location', 'city'], '广州市')
                .update('hobby', (list) => list.splice(0, 1))
                .toJS()
            })
          }}
        >
          change
        </button>
        <div>
          {this.state.info.name} - {this.state.info.age}
        </div>
      </div>
    )
  }
}
```

数据获取

```js
import React, { Component } from 'react'
import { fromJS } from 'immutable'

export default class App extends Component {
  state = {
    info: fromJS({
      name: '张三',
      age: 18,
      location: {
        address: '广东省',
        city: '深圳市'
      },
      hobby: ['抽烟', '喝酒', '烫头']
    })
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              info: this.state.info
                .set('name', '李四')
                .setIn(['location', 'city'], '广州市')
                .updateIn(['hobby'], (list) => list.splice(0, 1))
            })
          }}
        >
          change
        </button>
        <div>
          {this.state.info.get('name')} - {this.state.info.get('age')}
        </div>
        <div>
          {this.state.info.get('location').get('address')}
           - 
          {this.state.info.getIn(['location', 'city'])}
        </div>
        <ul>
          {this.state.info.get('hobby').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
}
```

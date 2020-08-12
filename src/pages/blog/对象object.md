---
layout: blog-post
title: Js Object
tags:
  - js
date: 2020-03-10
description: detail of Js Object
---

## object
- [namespace 命名](#namespace命名)
- [enumerable and traversal](#枚举和遍历)
  - [5 ways to traversal properties of a object](#5种遍历属性的方法)
- [super](#super)
- [destructure](#解构赋值)  on left side
- [Spread operator](#扩展运算符) on right side



### namespace 命名
- [object](#object)
  - [namespace 命名](#namespace-命名)
    - [对象属性的命名规则](#对象属性的命名规则)
    - [纯数字属性名的特殊性](#纯数字属性名的特殊性)
    - [采用[]操作符读取对象属性时，js解释器执行的动作](#采用操作符读取对象属性时js解释器执行的动作)
  - [表达式 自定义命名](#表达式-自定义命名)
  - [枚举和遍历](#枚举和遍历)
    - [5种遍历属性的方法](#5种遍历属性的方法)
- [最后遍历所有 Symbol 键，按照加入时间升序排列。](#最后遍历所有-symbol-键按照加入时间升序排列)
  - [super](#super)
  - [解构赋值](#解构赋值)
  - [扩展运算符](#扩展运算符)

#### 对象属性的命名规则
通过[]操作符为对象添加属性时，属性名称可以是任何字符串（包括只包含空格的字符串和空字符串）；
通过.操作符为对象添加属性时，属性名称必须是合法的标识符名称；
如果属性名包含非法的标识符字符，则只能采用obj[“propertyName”]的形式；
如果属性名是合法的标识符，读取时即可以采用obj.propertyName,也可以采用obj[“propertyName”]的形式；

#### 纯数字属性名的特殊性

读取的方式有两种：

obj[number]
obj["number"]
需要注意，采用obj.number的方式读取纯数字属性名称时浏览器会报错，如下

#### 采用[]操作符读取对象属性时，js解释器执行的动作

采用obj[propertyName]的形式读取或创建对象属性时，解释器首先会检查propertyName是值类型字面量还是用户定义的变量，如果propertyName是值类型的字面量，则解释器自动将其转换为字符串后再读取或创建属性，如obj[1]，obj[true]会被转换成obj["1"]、obj["true"].

如果propertyName是变量名称（或者是表达式），则解释器会读取变量内容（或对表达式求值），如果变量的值是字符串，则直接读取属性，如果是其他类型的数据，则转换为字符串后再读取属性。

```JS
var obj:{1:'first',2:'second',3:'third'}

var a = 1, b=2

obj[a+b]   // 'third'

obj[undefined] = 'undefined'
// undefined

var c
//undefined

obj[c]  // 'undefined'
```

### 表达式 自定义命名 

``` JS
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```
注意，属性名表达式与简洁表示法，不能同时使用，会报错。

``` JS
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

### 枚举和遍历
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

``` JS
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

目前，有四个操作会忽略enumerable为false的属性。

- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。


ES6 规定，所有 Class 的原型的方法都是不可枚举的。
``` JS
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```
#### 5种遍历属性的方法

ES6 一共有 5 种方法可以遍历对象的属性。

**（1）for...in**

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

首先遍历所有数值键，按照数值升序排列。
其次遍历所有字符串键，按照加入时间升序排列。
最后遍历所有 Symbol 键，按照加入时间升序排列。
---

### super

super，指向当前对象的原型对象。 即 super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

``` JS
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

### 解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象
``` JS
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误
```
解构赋值必须是最后一个参数，否则会报错。

``` JS
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```
注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

``` JS
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```
另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
``` JS
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o2.a //1
o3 // { b: 2 }
o3.a // undefined
```
---
### 扩展运算符

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
``` JS
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```
对象的扩展运算符等同于使用Object.assign()方法。
``` JS
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```
上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
``` JS
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```
上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。

扩展运算符可以用于合并两个对象。
```JS
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
这用来修改现有对象部分的属性就很方便了。

```JS
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};
```

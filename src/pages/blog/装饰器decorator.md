---
layout: blog-post
title: Decorator 
tags:
  - js
date: 2020-03-03
description: Es6 decorator 
---

### Decorator

- [#### class decorator](#h4-idclass-decorator-6class-decoratorh4)
- [#### class function decorator](#h4-idclass-function-decorator-6class-function-decoratorh4)
- [#### why decorator cant use at function](#h4-idwhy-decorator-cant-use-at-function-6why-decorator-cant-use-at-functionh4)
- [#### mixins](#h4-idmixins-6mixinsh4)

- trait : (module)    Trait 也是一种装饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等

装饰器的主要实现基本上是依赖 object.assgin() Object.defineProperty() 去修改object的prototype 或者 properties 来实现的
通过类的继承也可以实现

#### class decorator
---
**添加静态属性**
```js 
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false

```
注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

**添加实例属性**
```js
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

``` JS
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'


//  use object.assign() to implement 
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```

原理上就是 使用 object.assgin()  修改prototype 


using Redeux and React: 
``` JS
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
//  could rewrite as 
@connect(mapStateToProps, mapDispatchToProps)
class MyReactComponent extends React.Component {}
```


#### class function decorator
---

``` JS
Object.defineProperty()
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```
装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时target参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。

如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
``` JS
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

#### why decorator cant use at function
---
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

``` JS
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```
实际结果是
``` JS
@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};
```
另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。
``` JS
function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
```

#### mixins
---
mixins 的本质 就是 讲方法混入别的对象  用object.assgin()
``` JS
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```

``` JS
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```
但是这样会污染目标对象的prototype 
解决办法是用类继承来实现mixin

``` JS
class MyClass extends MyBaseClass {
  /* ... */
}
```
``` JS
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
};
```
``` JS
class MyClass extends MyMixin(MyBaseClass) {
  /* ... */
}

let c = new MyClass();
c.foo(); // "foo from MyMixin"
```



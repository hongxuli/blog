---
layout: blog-post
title: Es6 
tags:
  - js
date: 2020-03-01
description: features of Es6
---

### var vs let vs const 
 var |let|const 
-----|-----|-----|
globally/function scoped |block scoped|block scoped|
re-declared |update /no re-declared | no update and re-declared|
hositing |no hosting | no hosting|



### destructure 
if the pattern of both side of = is equal, let the variable of left side of = equal to the value of right side of = 
``` JS
// destructure of array
let [x, y] = [1,2,3]
// x 1
// y 2


// destructure of object
// let log = console.log; 
const {log} = console
log('hello') // hello 
```



### spread opreation 
- spread of array
``` JS
 
function f(a,b,c,d,e,){

}
const args = [0,1]
f(-1,...args, 2,...[3])
```
-  substituted apply 
```JS
// ES5 
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
// cause only apply accepet arrary as second parameter
f.apply(null, args);

// ES6
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```
- copy array 
``` JS
// es5 
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

// es6
const a1 = [1,2]
const a2 = [...a1]
```
- use with destructure
``` JS
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

// notice if use spread opreation in destructure, you can only place the sapred opreation at the last position in array

const [...butLast, last] = [1, 2, 3, 4, 5];
// error

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// error
```
- spread string 
``` JS
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```


### promise 
there are three states of promise: pending, fullfulled, rejected.
``` JS
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* success */){
    resolve(value);
  } else {
    reject(error);
  }
});

//  then accept two callback functions 
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
--- 

- promisde.prototype.catch
  - use to catch error when promise rejected or there is error happend in callback function in then()
  - try use catch at the end of the promise instead of use second callback of then.
  - even there is error handing for promise, the error inside of the promise wont affect the outside's code 
  - catch also return a promise, so you can use then after catch 
``` JS
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
---

- promise.prototype.finally()
it will be excuted whatever the result of the promise is.

finally doesnot accepet any parameter, so you wont know the state of the promise. which means the opreation in finally should be not related to the state of promise.
``` JS
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
--- 

- promise.all()
wrap multiple promise into a new promise.
``` JS
const p = Promise.all([p1, p2, p3]);
```

states: 

fulfilled when p1,p2,p3 all fulfilled. the result of p1,p2,p3 is returned as an array pass to the callback function of p

rejectd when any one of the p1,p2,p3 is rejected.  the result of rejected promise will be passd to the callback function of p 

---

- promise.race()
also warp multiple promise into a new promise.

almost same as promise.all()

return the first promise that changes the state to the p 

### class
- this 
``` JS
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
this in printName is point to the Logger. if you use this funtion independently. this ganna point to the caller, so it;s undefined

to slove this problem, you can bind this in constructor or use arrow function
- bind
``` JS
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  // bind return a copy of original function 
  // ...
}
```
- arrow function 
``` JS
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
```


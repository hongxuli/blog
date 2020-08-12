---
layout: blog-post
title: AMD CMD CommonJS ES6
tags:
  - JS
date: 2020-03-15
description: Difference between JS modules
---

### AMD (Asynchronous Module Definition)

also known as RequireJS, it's mostly used on the browser side. The module loading will not affect the opreration of the following statements.

define a module first then require it
define(id,[dependencies], factory)
id(module name)
factory(the module initalizes a function or object)(a callback function)

usage:
``` JS
// Create a module with an id (template name) of "alpha" using a module named: require, exports, beta
define('alpha',['require','exports','beta'],function(require, exports, beta){
     exports.verb=function() {
           return beta.verb()
           }
})

// module2.js
// An anonymous module that returns an object:
define(["alpha"], function (alpha) {
       return {
         verb:function(){
           return alpha.verb() +2;
         }
       };
   });

// define main.js to load the module
require(['module2'],function (m2) {
    m2.verb()
})

//load main.js in html via RequireJS
<script data-main="main" src="require.js"></script>
```



### CMD
CMD recommend load module as lazy as possiabe.(loading when it's needed)
usage:
``` JS
define(function(require,exports,module){
    var a = require('./a')
    a.doSomething()

    // / omit 1000 lines here
    var b = require('./b')
    b.doSomething()
})
```


### CommonJS(standard of nodeJS)
- every file is a module. 
- load file with require. 
- exports object in module.  
- load file synchronously(execute statements after mouldes have been loaded)

``` JS
// module.js 
var A = function(){
    console.log('Im  a module')
}
exports.test = A


// test.js
var module = require('./module')
module.test()


// node test.js
// output: Im  a module
```


### ES6 Module
``` JS
// a.js
var name = 'king'
var age = 28
export {name, age}
// b.js
import {name,age} from './a.js'
console.log(name,age);

// or 

// a.js
var name = 'king'
var age = 28
export default function (){
    return info = {
        name,age
    }

// b.js
import a1 from './a.js'
console.log(a1());
```


### CommonJS vs ES6
1. CommonJS loading at runtime, module outputs the interface at compile pase
2. CommonJS outputs the entire module. module could load specific interface in a module
3. CommonJS outputs a copy. module outputs the refernce
4. CommonJS, this point to the current module, module, this point to undefined.
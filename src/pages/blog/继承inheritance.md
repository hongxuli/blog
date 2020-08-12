---
layout: blog-post
title: Js Inheritance
tags:
  - js
date: 2020-03-17
description: 3 ways of Inheritance in Js
---


### combination inheritance 

the principle is share prototype.
create a constrctor. make that constrctor point to the parent instance.
so the new subtype can use the parents function via prototype chian.

``` JS
    function SuperType(name){  
  
      this.name = name;  
        
      this.colors = ["red","blue","green"];  
        
      }  

            
      SuperType.prototype.sayName = function(){  
        
      alert(this.name);  
        
      }  


      function SubType(name, age){
        //   second time invoke constrctor of supertype
          SuperType.call(this,name) // use SuperType's constrctor and bind this to Subtype
          this.age = age
      }
    
       SubType.prototype = new SuperType() //    first time invoke constrctor of supertype

        SubType.prototype.sayAge = function(){  
        SubType.prototype.constructor = SubType; 
      alert(this.age);  
  
    }  

      
```

注意：不能使用子类prototype直接指向父类，如果你直接写 子类.prototype = 父类.prototype，那你对子类的prototype的任何修改都会同时修改父类的prototype。


在第一次调用SuperType构造函数时，SubType.prototype得到两个属性，name和colors（这两个通过原型继承来的属性是多余的）。当创建instance实例调用SubType的构造函数时会再一次调用SuperType的构造函数，这一次又在新对象上创建了实例属性name和colors，也就是重写了原型对象的属性，屏蔽了原型中两个同名属性。
为了避免这种两次调用超类构造函数导致子类原型对象创建了多余属性的缺陷，可以使用寄生组合式继承。


----


### parasitic combination inheritance
什么是寄生组合式继承？即通过借用构造函数来继承属性，通过原型链的混成方式来继承方法。
``` JS
function Parent (name){
    this.name = name
}
Parent.prototype.sayName = function(){
    console.log(this.name)
}

function Child(name,age){
    Parent.call(this,name)
    this.age = age
}
inheritance(Child,Parent)






// return a copy of Supertype.prototype
function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}


function inheritance(subType,superType){
    var prototype = object(superType.prototype)  // 注意需要创建
    
    // make supertype.prototype become subtype.prototype
    subType.prototype = prototype  //增强对象
    prototype.constructor =  subType // 指定对象
}
```




-----



### class inheritance
``` JS
class A{
    constrctor(x,y){
        this.x = x
        this.y = y
    }

    // add on to the A.prototype
    test(){
        return 1
    }
}

class B extends A {
    constructor(){
        // A.prototype.constructor.call(this)
        super(1,2)
    }
}
```
extend 

step1: let B.prototype = Object.create(A.prototype,{constrctor:{value:B}})

i.e. B.prototype.__proto__ = A.prototype

step2:Obejct.setPrototypeOf(B,A)

i.e. B.__proto__=A






reference: https://my.oschina.net/geeway/blog/670618
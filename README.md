Dojozax
=======

Zax is a small MV framework based on dojo.

#Basics 

Structural unit of dojo zax is a html tag with data-dojo-type attribute (called zax node) when constraint link of coincident class (use dojo declare). This class must be inherits of zax/mv base class. For default parsing you must on parseOnLoad setting in  [dojoConfig](http://dojotoolkit.org/documentation/tutorials/1.9/dojo_config/).

Dojo zax works as follows: 
  1. Parsing. 
  2. Binding.
  
All subsequent steps with the DOM occur at the level of adding\removing nodes with special core methods - injectBoundHTML and removeBoundNode. 

#Quick Start

Donwload zax source code.

Include zax package in your app:

```
 {
            name: "zax",
            location: "/js/zax"
 }
```

Create a your first Zax Node like this:

```
  <div data-dojo-type="app/zax">
    {{name}}
    <input type="text" value="{{name}}"/>
  </div>
```

In app/zax.js create a new class inherits of mv in zax library and create "name" property in your model:

```
define([
        "dojo/_base/declare",
        "zax/mv"
    ],
    function (declare,mv) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'John',
            }
        });
    }
);

```

Open your app, and change input values... 

#Data binding

Zax registrate all needed bindings with help of z-bind attribute. After parsing this attribute automatically sets of all binding nodes. All of necessary data will associate with current node. (Context and other...)

Default context for current zax node call - model. For data binding you can set some property in model. 

```
model: {
    name: 'John',
    newProperty: 2012
}
```

If newProperty will be added in body of zax node then dojo zax will be watching newProperty changes.

#Evaluate expressions

You can evaluate expression in {{ }}. 

```
  {{name + ' superMan'}}
```

But, zax not evaluate a expression without model property:

```
  {{ 2+5 }} // Dont evaluate
```

# Attributes

Custom attribute data binding:

```
<div data-attr="{{name}}"></div>
```

if you change "name" model property you atomatically change data-attr of this node.

## Value

Value attribute, in the main, bind some input element like input or textarea with coincident model property. 

```
 <input type="text" value="{{name}}"/>
```

That code bind "name" model property with this node.

List of supported elements: input,input[type="checkbox"],input[type="radio"],textarea,select

// See more example in index.html of this repo.

## Hidden

Hide element. Is work in ie8.

```
<div  hidden="{{hide}}">HIDDEN CONTENT</div>
```

Hide if model.hide = true, show if model.hide = false...

## Checked 
Bind model data with checked node attribute.

```
    <input id="radio1" type="radio" checked="{{radio == '1'}}" value="1" name="radioGroup"/>
    <input id="radio2" type="radio" checked="{{radio == '2'}}" value="2" name="radioGroup"/>
```

Change model property:

```
this.model.radio = 2;
```

This switched radio1 on radio2. 





 







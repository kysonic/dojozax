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


```
 <input type="text" value="{{name}}" disabled="{{inputDisabled}}"/>
```

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

## z-if

Add\remove innerHtml of node with z-if attribute. 

```
<div z-if="{{ifData}}">
        Added content with name ({{name}}) model property. 
</div>
```

## z-each

The z-each directive instantiates a template once per item from a collection of model property. (Collection is a array of objects with some same properties.) Bind each item of collection with generated DOM elements.

```
<div z-each="{{persons}}">
    <hr/>
    <div>{{name}}</div>
    <div>{{lastName}}</div>
    <div>{{age}}</div>
    <hr/>
</div>
```
In js:
```
persons: [
    {name: 'John',lastName: 'Doe',age:55},
    {name: 'Jim',lastName: 'Stranger',age:28},
    {name: 'Frank',lastName: 'Moon',age:67}
]
```
From persons model property available array methods like push, pop, splice, shift, unshift for change model and automaticly change quantity of template. (No redrawing, only add\remove nodes). Also availble additional methods: query and resetQuery.

### Query

query method - show\hide template elements for something query in model property. Example:

```
//We have a persons model property of previous example... 
this.model.persons.query({name:'John'}); // Show template with items when name is 'John'
this.model.persons.query({name:/J/i}); // Show template with items when name have "J" or 'j' symbol
this.model.persons.resetQuery(); // Show all
```

#Filters

Execute some function with current value and return his result. All filters adding in filters object (like a model). If function not added in filters object he not be working.

```
<div id="filters">{{name | upper}}</div>
```
js:
```
filters: {
          upper: function(value){
              return value.toUpperCase();
          }
}
```
#Binding events

For binding events enough set in z-<event> attribute of node, in which will be executed some function, name of this function.

```
<div class="button" z-click="{{clicker}}">OK</div>
```
in js: 
```
clicker: function(e){
  console.log(e);
}
```
List of available attributes z-

'click','dblclick','select','scroll','resize','play','playing','play','pause','mousewheel','mouseup','mouseover','mouseout','mousemove','mouseleave','mouseenter','mousedown','keyup','keypress','keydown','input','focus','drop','dragstart','dragover','dragleave','dragenter','dragend','drag','change','blur','wheel','abort'

// See more example in index.html of this repo.




 







Dojozax
=======

Zax is a small MV framework based on dojo.

#Basics 

Structural unit of dojo zax is a html tag with data-dojo-type attribute when constraint link of coincedent class (use dojo declare). This class must be inherits of zax/mv base class. For default parsing you must on parseOnLoad setting in  [dojoConfig](http://dojotoolkit.org/documentation/tutorials/1.9/dojo_config/).

**index.html**
```
<div data-dojo-type="mypack/test"></div>
```
**js/mypack/test.js**
```
define([
    "dojo/_base/declare",
    "zax/mv"
],
    function (declare, mv) {
        return declare("mypack.test", [mv], {
            options: null,
            model: {

            },
            views: {

            },
            constructor: function (options, node) {
                console.log('my element is load...')
            }
        });
    }
);
```

#Zax Attributes 

Every dojo zax attributes has z- prefix. *Example: z-node*. 

#z-node

Collect dom nodes. 

**HTML**
```
<div data-dojo-type="mypack/test">
    <div z-node="myDiv">DivInnerHTML</div>
</div>
```
**JS**
```
define([
    "dojo/_base/declare",
    "zax/mv"
],
    function (declare, mv) {
        return declare("mypack.test", [mv], {
            options: null,
            model: {

            },
            views: {

            },
            // ready function
            constructor: function (options, node) {
                 console.log(this.nodes.myDiv) // Element here
            },
            // z-event function
            zClickFunction: function(args,mv){
                console.log(mv.nodes.myDiv) // Element here
            }
        });
    }
);
```
##z-model

Base data binding tools of a dojo zax. He connect dom nodes and javascript dojo class model property. **All model variables must be added in class model property!** z-model attribute work with all inputs element: input, textarea, select, checkbox, radio...

**HTML**
```
<input type="text" z-model="data"/>
```
**JS**
```
return declare("tel.test.zax", [mv], {
            options: null,
            model: {
                data:'someData'
            }
        });
```
##z-model-event 

Work with z-model. Define a event for model change. z-model-event may be one of this list: input, change, keydown, keyup, mouseover, mouseleave, click. (all of dojo on available events)

**HTML**
```
<input type="text" z-model="data" z-model-event="input" />
```

##z-bind

Bind data of model variables to static element. 

**HTML**
```
<input type="text" z-model="data" z-model-event="input" /><div z-bind="data"></div>
```
##z-func 
Function execute when connect node model is changed. This attribute can use like a filter.

**HTML**
```
<input type="text" z-model="data" z-model-event="input" z-func="filter" z-click="clickFunc" />
```

**JS**
```
return declare("tel.test.zax", [mv], {
            options: null,
            model: {
                data:'someData'
            },
            filter: function(node,value){
                console.log(this); // current class.
                this.store.set('data.data','newData');
                domClass.add(node,'error');
            }
        });
```
##z-show 

Show/hide attribute

**HTML**
```
<input type="text" z-model="data" z-model-event="input" z-func="filter" z-click="clickFunc" /><div z-show="data" z-bind="data"></div>
```

##z-enabled 
Enable\disable element
**HTML**
```
<input type="text" z-model="data" z-model-event="input" z-enabled="data" />
```
##z-each
Repeat construction on nested node of current. Bind data in format [{},{},{}] or ['1','2','3']. Automaticly create a Store event in mv.zStore dojo Memory object. with name of current model. In element z-each="presons" we have a mv.zStore['persons'] Memory object. In this Memory object you can execute query. See [Dojo Memory](http://dojotoolkit.org/reference-guide/1.10/dojo/store/Memory.html). In body of z-each have a access to current item object. You can write a \`nameOfItemParam\`. It is evaluate expression in context current item. Example:

**HTML**

```
<div z-each="person"  z-node="person" z-model="start,ages,count"  z-query='{age:`ages`},{start:`start`,count:`count`}' z-id="person">
            <div class="p-wrapper">
                <hr/>
                <span>PERSON NAME: </span><div z-show="password" z-id="`name`">`name`</div><br/>
                <span>PERSON AGE: </span><div>`age`</div><br/>
                <span>PERSON STATUS: </span><div>`status`</div>
                <hr/>
            </div>
</div>
```
**JS**
```
define([
        "dojo/_base/declare",
        "zax/mv",
        "dojo/query",
        "dojo/dom-attr",
        "dojo/dom-class"
    ],
    function (declare, mv,query,domAttr,domClass) {
        return declare("app.zax", mv, {
            options: null,
            model: {
                name: 'hide',
                show: false,
                person: [
                    {id: 2, name: 'John Doe', age: 22, status: 'employer'},
                    {id: 3, name: 'Edward Snouden', age: 22, status: 'spy'},
                    {id: 1, name: 'Eric Kripke', age: 22, status: 'make a supernatural'},
                    {id: 8, name: 'Arseny Jazenuh', age: 22, status: 'betrayer'},
                    {id: 10, name: 'Oby Van Kenoby', age: 22, status: 'jedi'},
                    {id: 22, name: 'Han Baty', age: 22, status: 'conquer'},
                    {id: 22, name: 'Oliver Kan', age: 25, status: 'goalkeeper'}
                ],
                ages: 22,
                count: 2,
                start: 0
            }
        });
    }
);
```
## z-view
Adding child view for some tag. View under tags has evaluated automaticly.

**HTML**
```
<div z-view="views.someView"></div>
```
**JS**
```
return declare("tel.test.zax", [mv], {
            options: null,
            model: {
                data:'someData'
            },
            views: {
                someView: '<div z-click="plusClick">+</div>'
            },
            plusClick: function(args,mv){
                console.log(this);
            }
    });        
```

#Bind events.

Currently dojo zax supports event: z-click,z-change,z-mouseover,z-mouseout,z-doubleclick. z-event define callback to event in class methods. 

**HTML**
```
<input type="text" z-model="data" z-model-event="input" z-click="clickFunc" />
```
**JS**
```
return declare("tel.test.zax", [mv], {
            options: null,
            model: {
                data:'someData'
            },
            clickFunc: function(args,mv){
                console.log(this); // Current node
                console.log(args); // arguments [e - event,...]
                console.log(mv); // Link of current associate class
                console.log(mv.store.data.data); // current model data keep in dojo Memory. He calls store. store.data = model
                mv.store.set('data.data','newValue'); // setter
                console.log(mv.model.data); // getter with model
                console.log(mv.store.data.data); //getter with store
                mv.model.data = 'Another value'; // Don't work
                //But he change model and store
                console.log(mv.model.data);
                console.log(mv.store.data.data);
                // Not changed dom element value
                // In dojo zax use dojo Stateful with setter methods... Object Observer dont supports ie8
            }
        });
```

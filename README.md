Dojozax
=======

Zax is a small MV framework based on dojo.

#Basics 

Structural unit of dojo zax is a html tag width data-dojo-type attribute when constraint link of coincedent class (use dojo declare). This class must be inherits of zax/mv base class. For default parsing you must on parseOnLoad setting in  [dojoConfig](http://dojotoolkit.org/documentation/tutorials/1.9/dojo_config/).

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
##Bind events.

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

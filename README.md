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

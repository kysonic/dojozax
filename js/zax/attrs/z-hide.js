define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "zax/polyfills/getComputedStyle"

],
    function (declare,domClass) {
        /**
         * Parser entity
         */
        return declare("z-hide", null, {
            constructor: function(action){
                declare.safeMixin(this,action);
            },
            "z-hide": function(p,o,n){
                this.attrExecutor();
                if(!!n) domClass.add(this.node,'hide'); else domClass.remove(this.node,'hide');
            }
        });
    }
);



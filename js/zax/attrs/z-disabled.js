define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "zax/polyfills/getComputedStyle"

],
    function (declare,domClass) {
        /**
         * Parser entity
         */
        return declare("z-disabled", null, {
            constructor: function(action){
                declare.safeMixin(this,action);
            },
            "z-disabled": function(p,o,n){
                this.attrExecutor();
                this.node.disabled = !!n;
            }
        });
    }
);



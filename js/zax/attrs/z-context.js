define([
    "dojo/_base/declare",
    "dojo/_base/lang"
],
    function (declare,lang) {
        /**
         * Context Entity
         */
        return declare("zContext", null, {
            constructor: function(action){
                declare.safeMixin(this,action);
            },
            "z-context": function(p,o,n){
                if(!this.node.context) {
                    this.mv.injectBoundHTML(this.node.bindData.template,this.node,n);
                    this.context[p] = this.node.context;
                }
            }
        });
    }
);



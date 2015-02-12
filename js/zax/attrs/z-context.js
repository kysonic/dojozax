define([
    "dojo/_base/declare",
    "dojo/_base/lang"
],
    function (declare,lang) {
        /**
         * Context Entity
         */
        return declare("zContext", null, {
            "z-context": function(p,o,n){
                if(!this.node.context) {
                    this.mv.injectBoundHTML(this.node.data.template,this.node,n);
                    this.context[p] = this.node.context;
                }
            }
        });
    }
);



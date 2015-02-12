define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/NodeList-traverse"
],
    function (declare,lang,query) {
        /**
         * Parser entity
         */
        return declare("zIf", null, {
            "z-if": function(p,o,n){
                var self = this;
                this.attrExecutor();
                console.log(p,o,n)
                if(!n){
                    query(' > *',this.node).forEach(function(node){
                        self.mv.removeBoundNode(node);
                    });
                    this.node.innerHTML = '';
                }else {
                    self.mv.injectBoundHTML(this.node.data.template,this.node,this.context._context);
                }
            }
        });
    }
);



define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-construct"
],
    function (declare,lang,query,domConstruct) {
        /**
         * Parser entity
         */
        return declare("zIf", null, {
            "z-if": function(p,o,n){
                var self = this;
                this.attrExecutor();
                if(!n){
                    query(' > *',this.node).forEach(function(node){
                        self.mv.removeBoundNode(node);
                    });
                    this.node.innerHTML = '';
                }else {
                    self.mv.injectBoundHTML(this.node.data.template,this.node);
                }
            }
        });
    }
);



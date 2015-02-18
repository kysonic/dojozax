define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/NodeList-traverse"
],
    function (declare,lang,query,domConstruct) {
        /**
         * Parser entity
         */
        return declare("zIf", null, {
            constructor: function(action){
                declare.safeMixin(this,action);
            },
            "z-if": function(p,o,n){
                var self = this;
                this.attrExecutor();
                if(!n){
                    query(' > *',this.node).forEach(function(node){
                        self.mv.removeBoundNode(node);
                    });
                    domConstruct.empty(this.node);
                }else {
                    self.mv.injectBoundHTML(this.node.bindData.template,this.node);
                    this.context[p] = this.node.context;
                }
            }
        });
    }
);



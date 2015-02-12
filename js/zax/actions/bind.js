define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "zax/actions/Action",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/_base/array"
],
    function (declare,lang,Action,query,domAttr,array) {
        /**
         * Parser entity
         */
        return declare("Binder", null, {
            bindExpr: {
                expression: /{{(.*?)}}/,
                innerExpression: /^{{(.*?)}}$/,
                modelProperty: /[0-9a-zA-Z_]+/g,
                arrayExpression: /[0-9a-zA-Z_]+\[.*\]\.[0-9a-zA-Z_]+/g
            },
            /**
             * Prebinding node
             */
            bind: function(zaxNode){
                var self = this;
                query('*[z-bind]', zaxNode).forEach(function (node) {
                    // attributes
                    node.models = {};
                    node.models.attrs = [];
                    node.models.inner = [];
                    node.attrs = [];
                    node.bindEvents = {};
                    node.actions = [];
                    node.actionNode = zaxNode.linkActionNode ? zaxNode.linkActionNode : zaxNode;
                    // Bind Attributes
                    for (var i = 0, atts = node.attributes, n = atts.length, arr = []; i < n; i++){
                        var attr = atts[i];
                        if(self.bindExpr.expression.test(attr.nodeValue)) {
                            node.models.attrs = self.getModelProperties(attr.nodeValue,zaxNode);
                            array.forEach(node.models.attrs,function(item){
                                zaxNode.actions[item] = zaxNode.actions[item] || [];
                                if(zaxNode.linkActionNode) zaxNode.linkActionNode.actions[item] = zaxNode.linkActionNode.actions[item] || [];
                                zaxNode.models.push(item);
                                var action = new Action({node:node,attr:attr.nodeName.toLowerCase(),expression:attr.nodeValue,model:item,context:zaxNode.context});
                                if(zaxNode.linkActionNode) zaxNode.linkActionNode.actions[item].push(action);
                                else zaxNode.actions[item].push(action);
                                node.actions.push(action);
                            });
                        }
                    }
                    // Bind innerHtml
                    if(self.bindExpr.innerExpression.test(node.innerHTML)) {
                        node.models.inner  = self.getModelProperties(node.innerHTML,zaxNode);
                        array.forEach(node.models.inner,function(item){
                            zaxNode.actions[item] = zaxNode.actions[item] || [];
                            if(zaxNode.linkActionNode) zaxNode.linkActionNode.actions[item] = zaxNode.linkActionNode.actions[item] || [];
                            zaxNode.models.push(item);
                            var action = new Action({node:node,innerText:true,expression:node.innerText || node.textContent,model:item,context:zaxNode.context});
                            if(zaxNode.linkActionNode) zaxNode.linkActionNode.actions[item].push(action);
                            else zaxNode.actions[item].push(action);
                            node.actions.push(action);
                        });
                    }
                });
                this.dataBinding(zaxNode);
            },
            /**
             * Data binding
             */
            dataBinding: function(zaxNode){
                var self = this;
                for (var property in zaxNode.actions) {
                    if(!zaxNode.context[property]) {
                        var currentNode = zaxNode.linkActionNode ? zaxNode.linkActionNode : zaxNode;
                        currentNode.context.watch(property, function (p, o, n) {
                            currentNode.context._context[p] = n;
                            if(self[p+'Changed']) self[p+'Changed'].call(self,o,n);
                            array.forEach(currentNode.actions[p],function(item){
                                if(item) item.execute(self,p, o, n);
                                return n;
                            });
                            return n;
                        });
                    }
                }
            }
        });
    }
);



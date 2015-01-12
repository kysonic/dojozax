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
                modelProperty: /[0-9a-zA-Z_]+/g
            },
            /**
             * Prebinding node
             */
            bind: function(){
                var self = this;
                query('*[z-bind]', this.currentNode).forEach(function (node) {
                    // attributes
                    node.models = {};
                    node.models.attrs = [];
                    node.models.inner = [];
                    node.attrs = [];
                    node.bindEvents = {};
                    node.actions = [];
                    // Bind Attributes
                    for (var i = 0, atts = node.attributes, n = atts.length, arr = []; i < n; i++){
                        var attr = atts[i];
                        if(self.bindExpr.expression.test(attr.nodeValue)) {
                            node.models.attrs = self.getModelProperties(attr.nodeValue);
                            array.forEach(node.models.attrs,function(item){
                                self.baseNode.actions[item] = self.baseNode.actions[item] || [];
                                self.currentNode.models.push(item);
                                var action = new Action({node:node,attr:attr.nodeName.toLowerCase(),expression:attr.nodeValue,model:item});
                                self.baseNode.actions[item].push(action);
                                node.actions.push(action);
                            });
                        }
                    }
                    // Bind innerHtml
                    if(self.bindExpr.innerExpression.test(node.innerHTML)) {
                        node.models.inner  = self.getModelProperties(node.innerHTML);
                        array.forEach(node.models.inner,function(item){
                            self.baseNode.actions[item] = self.baseNode.actions[item] || [];
                            self.currentNode.models.push(item);
                            var action = new Action({node:node,innerText:true,expression:node.innerText || node.textContent,model:item});
                            self.baseNode.actions[item].push(action);
                            node.actions.push(action);
                        });
                    }
                });

                this.dataBinding();
            },
            /**
             * Data binding
             */
            dataBinding: function(){
                var self = this;
                for (var property in this.baseNode.actions) {
                    if(!this.watchers[property]) {
                        this.watchers[property] = true;
                        this.model.watch(property, function (p, o, n) {
                            array.forEach(self.baseNode.actions[p],function(item){
                                self._model[p] = n;
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



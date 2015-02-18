define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/_base/array",
    "dojo/dom-construct",
    "zax/actions/Action"
],
    function (declare,lang,query,domAttr,array,domConstruct,Action) {
        /**
         * Parser entity
         */
        return declare("Binder", null, {
            templateAttrs: ['z-context','z-each','z-if'],
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
                // seach z-bind attribute to deep.
                this.searchZBind(zaxNode,zaxNode);
                this.dataBinding(zaxNode);
            },
            searchZBind: function(entryNode,zaxNode){
                var self = this;
                query(' > *', entryNode).forEach(function(node){
                    if(domAttr.has(node,'z-bind')){
                        node.bindData = node.bindData || {};
                        node.bindData.models = node.bindData.models || {};
                        node.bindData.models.attrs = node.bindData.models.attrs || {};
                        node.bindData.models.inner = node.bindData.models.inner || {};
                        // Node template (z-each, z-context, z-if)
                        node.bindData.template = node.bindData.template || null;
                        // Binding events
                        node.bindData.bindEvents = node.bindData.bindEvents || {};
                        // z-* events
                        node.bindData.zEvents = node.bindData.zEvents || {};
                        node.bindData.actionNode = node.bindData.actionNode || zaxNode;
                        // Actions
                        node.bindData.actions = node.bindData.actions || [];
                        // Attrs template
                        node.bindData.attrTemplates = node.bindData.attrTemplates || {};
                        self.checkTemplate(node);
                        self.createAction(node,zaxNode);
                    }
                    self.searchZBind(node,zaxNode);
                });
            },
            /**
             * Creating action for current node with z-bind attribute, if we have a expressions
             * @param entryNode - Node. Meaby a deep searching node
             * @param zaxNode - zaxNode with context
             */
            createAction: function(entryNode,zaxNode){
                var self = this;
                // Check all attributes of current node
                for (var i = 0, atts = entryNode.attributes, n = atts.length, arr = []; i < n; i++){
                    var attr = atts[i];
                    if(self.bindExpr.expression.test(attr.nodeValue)) {
                        entryNode.bindData.models.attrs = self.getModelProperties(attr.nodeValue,zaxNode);
                        array.forEach(entryNode.bindData.models.attrs,function(item){
                            var action = new Action({node:entryNode,attr:attr.nodeName.toLowerCase(),expression:attr.nodeValue,model:item,context:zaxNode.context});
                            //Global node
                            zaxNode.context.actionNode.zaxData.actions[item] = zaxNode.context.actionNode.zaxData.actions[item] || [];
                            zaxNode.context.actionNode.zaxData.actions[item].push(action);
                            zaxNode.zaxData.models.push(item);
                            // Current Node action uid
                            entryNode.bindData.actions.push(action.uid);
                            // Attribute templates
                            entryNode.bindData.attrTemplates[attr.nodeName] = attr.nodeValue;
                        });
                    }
                }
                // Research innerHTML
                if(self.bindExpr.innerExpression.test(lang.trim(entryNode.innerHTML))) {
                    entryNode.bindData.models.inner  = self.getModelProperties(entryNode.innerHTML,zaxNode);
                    array.forEach(entryNode.bindData.models.inner,function(item){
                        var action = new Action({node:entryNode,innerText:true,expression:entryNode.innerText || entryNode.textContent,model:item,context:zaxNode.context});
                        zaxNode.context.actionNode.zaxData.actions[item] = zaxNode.context.actionNode.zaxData.actions[item] || [];
                        //console.log(zaxNode,zaxNode.zaxData.actions)
                        zaxNode.context.actionNode.zaxData.actions[item].push(action);
                        zaxNode.zaxData.models.push(item);
                        // Current Node action uid
                        entryNode.bindData.actions.push(action.uid);
                    });
                }
            },
            /**
             * Watch all property of all actions of this zaxNode
             * @param zaxNode
             */
            dataBinding: function(zaxNode){
                var self = this;
                for (var property in zaxNode.context.actionNode.zaxData.actions) {
                    //If current property dont watch
                    if(zaxNode.context[property]==undefined) {
                        zaxNode.context.watch(property, function (p, o, n) {
                            zaxNode.context._context[p] = n;
                            if(domAttr.has(zaxNode.context.actionNode,'data-zax-mark')) self.marker(zaxNode.context.actionNode,domAttr.get(zaxNode.context.actionNode,'data-zax-mark'),p,o,n);
                            array.forEach(zaxNode.context.actionNode.zaxData.actions[p],function(item){
                                if(item) item.execute(self,p, o, n);
                                return n;
                            });
                            setTimeout(function(){
                                if(self[p+'Changed']) self[p+'Changed'].call(self,o,n);
                                if(self[domAttr.get(zaxNode.context.actionNode,'data-zax-model')+'Changed']) self[domAttr.get(zaxNode.context.actionNode,'data-zax-model')+'Changed'].call(self,o,n);
                            },0);
                            return n;
                        });
                    }
                }
            },
            /**
             * Additional marker connection function. Connext all z-each new created elements.
             * @param ActionNode - Host action node
             * @param mark - mark (persons-1)
             * @param p - property
             * @param o - oldValue
             * @param n - newValue
             */
            marker: function(ActionNode,mark,p,o,n){
                var self = this;
                query('*[data-zax-mark="'+mark+'"]',this.baseNode).forEach(function(node,i){
                    if(domAttr.get(ActionNode,'data-zax-uid')!=domAttr.get(node,'data-zax-uid')) {
                        array.forEach(node.zaxData.actions[p],function(item){
                            if(item) item.execute(self,p, o, n);
                        });
                    }
                });
            },
            /**
             * Check node for templates
             * @param node
             */
            checkTemplate: function(node) {
                var setTemplate = false;
                array.forEach(this.templateAttrs,function(attr){
                    if(domAttr.get(node,attr)) setTemplate = true;
                });
                if(setTemplate && !node.bindData.template) {
                    node.bindData.template = lang.trim(node.innerHTML);
                    domConstruct.empty(node);
                }
            },
            getModelProperties: function(expression,zaxNode){
                var self = this;
                var modelProperties = [];
                array.forEach(expression.match(this.bindExpr.modelProperty),function(item){
                    if(zaxNode.context._context[item]!=undefined) modelProperties.push(item);
                });
                return modelProperties;
            }
        });
    }
);



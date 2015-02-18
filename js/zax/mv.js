define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "dojo/query",
    "zax/utils/utils",
    "zax/core/bind",
    "zax/core/bindEvents",
    "zax/core/zWidget",
    "zax/utils/watch",
    "dojo/NodeList-traverse"
],
    function (declare,array,lang,domConstruct,domAttr,query,Utils,Bind,bindEvents,zWidget) {
        /**
         *  MV Entity.
         */
        return declare("zax.mv", [Bind,bindEvents,zWidget], {
            possibleAttr: ['value','z-context','z-disabled','z-each','z-hide','z-if'],
            options: null,
            baseNode: null,
            $:{},
            /**
             * Constructor
             * @param options - attributes\options
             * @param node - base dom node.
             */
            constructor: function (options, node, model) {
                this.model = model || this.model;
                this.options = options;
                this.baseNode = node;
                this.baseNode.actions = {};
                this.initialize();
            },
            /**
             * Init function
             */
            initialize: function () {
                this.parseNode(this.baseNode,this.model);
                this.model = this.baseNode.context;
            },
            /**
             * Base function - set dom node and model context.
             * @param node - node for parsing and binding
             * @param context - context for binding
             */
            parseNode: function(zaxNode,context){
                // Clone pure context
                var _context = context._context || context;
                zaxNode.context = context._context ? context : createWatcher(context);
                zaxNode.context._context = context._context ? context._context : _context;
                zaxNode.context.actionNode = context.actionNode ? context.actionNode : zaxNode;
                // Set node
                domAttr.set(zaxNode,'data-zax-uid',Utils.createUID());
                zaxNode.zaxData = zaxNode.zaxData || {};
                zaxNode.context.actionNode.zaxData.actions = zaxNode.context.actionNode.zaxData.actions || {};
                zaxNode.zaxData.models = zaxNode.zaxData.models || [];
                // Basic operations
                this.getNodes(zaxNode);
                this.bind(zaxNode);
                this.bindEvents(zaxNode);
                this.basicSet(zaxNode);
                this.zWidget(zaxNode);
            },
            /**
             * Base method of dynamically zax nodes creating
             * @param template - HTML template of new zax node
             * @param node - Where placing a new element?
             * @param context - Set context of new zax node
             * @returns {*}
             */
            injectBoundHTML: function(template,node,context){
                if(!node) return console.error('Container node not found!');
                node.innerHTML= template;
                this.parseNode(node, context || query(node).parents('*[data-zax-uid]')[0].context);
            },
            /**
             * Remove Zax node. Remove all events and properties connected with this node.
             * @param node - zax node.
             * @returns {*}
             */
            removeBoundNode: function(node){
                if(!node) return console.error('Removed node not found!');
                // Destroy associate actions.
                if(node.bindData) {
                    if(node.bindData && node.bindData.actionNode && node.bindData.actionNode.zaxData.actions){
                        for (var property in node.bindData.actionNode.zaxData.actions) {
                            var actionSet = node.bindData.actionNode.zaxData.actions[property];
                            array.forEach(node.bindData.actions,function(uid) {
                                var match = false;
                                for(var actionKey in actionSet) {
                                    var action = actionSet[actionKey];
                                    if(action.uid==uid) {
                                        actionSet.splice(actionKey,1);
                                    }
                                }
                            });
                        }
                    }
                    // If we have widget - destroy him
                    if(node.widget) node.widget.destroy();
                    for(var eventName in node.bindData.bindEvents) {
                        node.bindData.bindEvents[eventName].remove();
                    }
                    for(var eventName in node.bindData.zEvents) {
                        node.bindData.zEvents[eventName].remove();
                    }
                }
                domConstruct.destroy(node);
            },
            /**
             * Get all nodes with id and placed he in $ object.
             * @param node - ZaxNode
             */
            getNodes: function(node){
                var self = this;
                query('*[id]',node).forEach(function(node){
                    self.$[domAttr.get(node,'id')] = node;
                });
            },
            basicSet: function(zaxNode){
                var self = this;
                array.forEach(Utils.uniqueArray(zaxNode.zaxData.models),function(property){
                    zaxNode.context[property] = zaxNode.context._context[property];
                });
            }
        });
    }
);


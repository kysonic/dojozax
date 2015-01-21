define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "dojo/query",
    "zax/utils/utils",
    "zax/actions/parse",
    "zax/actions/bind",
    "zax/utils/watch",
    "zax/polyfills/indexOf"
],
    function (declare,array,lang,domConstruct,domAttr,query,Utils,Parse,Bind) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv", [Parse,Bind], {
            options: null,
            baseNode: null,
            currentNode: null,
            currentContext: {},
            $:{},
            templates: {
                zIf:[],
                zEach:[]
            },
            /**
             * Constructor
             * @param options - attributes\options
             * @param node - base dom node.
             */
            constructor: function (options, node, model) {
                if(model) this.model = model;
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
            parseNode: function(node,context){
                // Pure context object
                if(!context._context) {
                    var _context = context;
                    node.context = createWatcher(context);
                    node.context._context = _context;
                    node.context.actionNode = node;
                }else {
                    node.context = context;
                    node.context._context = context._context;
                    node.linkActionNode = context.actionNode;
                }
                // Set node
                node.models = [];
                node.actions = [];
                // Basic operations
                this.parse(node);
                this.getNodes(node);
                this.bind(node);
                this.basicSet(node);
            },
            getModelProperties: function(expression,zaxNode){
                var self = this;
                var modelProperties = [];
                /*expression = expression.replace(this.bindExpr.arrayExpression,function(){
                    modelProperties.push(arguments[0]);
                    return '';
                });*/
                array.forEach(expression.match(this.bindExpr.modelProperty),function(item){
                    if(zaxNode.linkActionNode!=undefined){
                        if(zaxNode.linkActionNode.context._context[item]!=undefined) modelProperties.push(item);
                    }
                    else{
                        if(zaxNode.context._context[item]!=undefined) modelProperties.push(item);
                    }
                });
                return modelProperties;
            },
            basicSet: function(zaxNode){
                var self = this;
                var models = Utils.uniqueArray(zaxNode.models);
                array.forEach(models,function(property){
                    if(zaxNode.linkActionNode) {
                        zaxNode.linkActionNode.context[property] = zaxNode.linkActionNode.context._context[property];
                    }
                    else{
                        zaxNode.context[property] = zaxNode.context._context[property];
                    }
                });
            },
            injectBoundHTML: function(template,node,context){
                if(!node) return console.error('Container node not found!');
                node.innerHTML= template;
                this.parseNode(node, context || this.baseNode.context);
            },
            removeBoundNode: function(node){
                if(!node) return console.error('Removed node not found!');
                if(node.actionNode.actions){
                    for (var property in node.actionNode.actions) {
                        var actionSet = node.actionNode.actions[property];
                        array.forEach(node.actions,function(action) {
                            if(actionSet instanceof Array) {
                                var idx = actionSet.indexOf(action);
                                if(-1!==idx) {
                                    actionSet.splice(idx,1);
                                }
                            }
                        });
                    }
                }
                node.actions = null;
                for(var eventName in node.bindEvents) {
                    node.bindEvents[eventName].remove;
                }
                node.bindEvents = null;
                domConstruct.destroy(node);
            },
            getNodes: function(node){
                var self = this;
                query('*[id]',node).forEach(function(node){
                    self.$[domAttr.get(node,'id')] = node;
                });
            }
        });
    }
);


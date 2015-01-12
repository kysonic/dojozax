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
            actions: ['z-bind','z-each','z-if'],
            watchers: {},
            template: null,
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
            constructor: function (options, node) {
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
                this.getNodes();
            },
            /**
             * Base function - set dom node and model context.
             * @param node - node for parsing and binding
             * @param context - context for binding
             */
            parseNode: function(node,context){
                // Pure model object
                node._context = context;
                node.context = createWatcher(context);
                // Set node
                this.currentNode = node;
                this.currentNode.models = [];
                // Basic operations
                this.parse();
                this.bind();
                this.basicSet(Utils.uniqueArray(this.currentNode.models));
            },
            getModelProperties: function(expression){
                var self = this;
                var modelProperties = [];
                array.forEach(expression.match(this.bindExpr.modelProperty),function(item){
                    if(self.currentNode._context[item]!=undefined) modelProperties.push(item);
                });
                return modelProperties;
            },
            basicSet: function(model){
                var self = this;
                array.forEach(model,function(property){
                    self.currentNode.context[property] = self.currentNode._context[property];
                });
            },
            injectBoundHTML: function(template,node,context){
                if(!node) return console.error('Injected node not found!');
                var like  = like || 'first';
                var container =  domConstruct.create('div');
                container.innerHTML = template;
                var parse = domConstruct.place(container,node,like);
                this.parseNode(parse,context || this.model);
                this.getNodes();
                Utils.unWarp(container);
            },
            removeBoundNode: function(node){
                if(!node) return console.error('Removed node not found!');
                for (var property in this.baseNode.actions) {
                    var actionSet = this.baseNode.actions[property];
                        array.forEach(node.actions,function(action) {
                            var idx = actionSet.indexOf(action);
                            if(-1!==idx) {
                                actionSet.splice(idx,1);
                            }
                        });
                }
                node.actions = null;
                for(var eventName in node.bindEvents) {
                    node.bindEvents[eventName].remove;
                }
                node.bindEvents = null;
                domConstruct.destroy(node);
            },
            getNodes: function(){
                var self = this;
                query('*[id]',this.currentNode).forEach(function(node){
                    self.$[domAttr.get(node,'id')] = node;
                });
            }
        });
    }
);


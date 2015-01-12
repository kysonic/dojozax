define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "dojo/query",
    "zax/utils/utils",
    "zax/actions/parse",
    "zax/actions/bind",
    "zax/utils/watch",
    "zax/polyfills/indexOf"
],
    function (declare,array,domConstruct,domAttr,query,Utils,Parse,Bind) {
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
            $:{},
            templates: {
                zIf:[],
                zEach:[]
            },
            /**
             * Конструктор
             * @param options - опции\атрибуты
             * @param node - узел привязки
             */
            constructor: function (options, node) {
                /*Declare*/
                this.options = options;
                this.baseNode = node;
                this.initialize();
            },
            initialize: function () {
                var self = this;
                // Pure model object
                this._model = this.model;
                this.model = createWatcher(this.model);
                this.baseNode.actions = {};
                this.parseNode(this.baseNode);
                this.getNodes();
                //this.basicSet();
                //console.log(this.baseNode.actions)
            },
            parseNode: function(node){
                this.currentNode = node;
                this.currentNode.models = [];
                this.currentNode.template = node.innerHTML;
                this.parse();
                this.bind();
                this.basicSet(Utils.uniqueArray(this.currentNode.models));
            },
            getModelProperties: function(expression){
                var self = this;
                var modelProperties = [];
                array.forEach(expression.match(this.bindExpr.modelProperty),function(item){
                    if(self._model[item]!=undefined) modelProperties.push(item);
                });
                return modelProperties;
            },
            basicSet: function(model){
                var self = this;
                array.forEach(model,function(property){
                    self.model[property] = self._model[property];
                });
            },
            injectBoundHTML: function(template,node,like){
                if(!node) return console.error('Injected node not found!');
                var like  = like || 'first';
                var container =  domConstruct.create('div');
                container.innerHTML = template;
                var parse = domConstruct.place(container,node,like);
                this.parseNode(parse);
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


define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/dom-attr",
    "zax/actions/baseAction",
    "zax/actions/parseNodes",
    "zax/actions/zGlobal",
    "zax/actions/zCache",
    "zax/actions/zWidget",
    "zax/actions/setStore",
    "zax/actions/operand",
    "zax/actions/bindEvents"
],
    function (declare,array,domAttr,baseAction,parseNodes,zGlobal,zCache,zWidget,setStore,operand,bindEvents) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv.mv", [baseAction,parseNodes,zGlobal,zWidget,zCache,setStore,operand,bindEvents], {
            options: null,
            nodes: [],
            baseNode: null,
            watcher: {},
            zEachTemplate: {},
            zStore: [],
            actions: ['z-each','z-model','z-bind','z-show','z-enabled','z-class','z-view'],
            executors: {},
            /**
             * Конструктор
             * @param options - опции\атрибуты
             * @param node - узел привязки
             */
            constructor: function (options, node) {
                /*Declare*/
                this.options = options;
                this.baseNode = node;
                this.domNode = node;
                this.initialize();
            },
            initialize: function (emptyStore) {
                this.parseNodes();
                this.operand();
                if (!emptyStore) this.setStore();
                this.zGlobal();
                this.zCache();
                this.bindEvents();
                this.zWidget();
                this.setActions();
                this.setWatchers();
            },
            setActions: function(){
                var self = this;
                array.forEach(this.actions,function(item){
                    self.baseAction(item);
                });
            },
            convertToCamel: function(str){
                return str.replace(/\-(\D+?)/g,function(){
                    return arguments[1].toUpperCase();
                });
            },
            parseView:function(node){
                this.baseNode = node;
                this.initialize(true);
                this.baseNode = this.domNode;
            },
            parseViewWith: function(node){
                this.baseNode= this.domNode = node;
                this.initialize(true);
            }
        });
    }
);


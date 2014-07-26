define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "zax/actions/baseAction",
    "zax/actions/parseNodes",
    "zax/actions/setStore",
    "zax/actions/operand",
    "zax/actions/bindEvents"
],
    function (declare,array,baseAction,parseNodes,setStore,operand,bindEvents) {
        /**
         * Сущность mv.
         */
        return declare("zax.mv.mv", [baseAction,parseNodes,setStore,operand,bindEvents], {
            options: null,
            nodes: [],
            baseNode: null,
            watcher: {},
            zEachTemplate: {},
            zStore: [],
            actions: ['z-model','z-bind','z-show','z-enabled','z-class','z-view','z-each'],
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
                if (!emptyStore) this.setStore();
                this.operand();
                this.bindEvents();
                this.setActions();
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
            }
        });
    }
);


define([
    "dojo/_base/declare",
    "dojo/dom-attr",
    "dojo/_base/lang",
    "dojo/_base/array",
    "zax/utils/utils",
    "zax/attrs/value",
    "zax/attrs/checked",
    "zax/attrs/hidden",
    "zax/attrs/z-if",
    "zax/attrs/z-each"
],
    function (declare,domAttr,lang,array,Utils,value,checked,hidden,zIf,zEach) {
        /**
         * Parser entity
         */
        return declare("Action", [value,checked,hidden,zIf,zEach], {
            node: {},
            attr: '',
            innerText: false,
            expression: '{{}}',
            mv: {},
            model: [],
            template: '',
            context: {},
            _context: {},
            constructor: function(options){
                for(var prop in options) {
                    if(this[prop]!=undefined) this[prop] = options[prop];
                }
            },
            execute: function(mv,p,o,n){
                var self = this;
                this.mv = mv;
                if(this.attr) if(typeof this[this.attr]=='function') this[this.attr](p,o,n); else this.attrExecutor(p,o,n);
                if(this.innerText) this.innerTextExecutor(p,o,n);
            },
            evaluateExpression: function(){
                var filter = Utils.deleteMustaches(this.expression).split('|');
                if(!filter[1]) with (this._context) return eval(lang.trim(filter[0]));
                if(this.mv.filters[lang.trim(filter[1])]) with (this._context) return this.mv.filters[lang.trim(filter[1])](eval(lang.trim(filter[0])));
            },
            innerTextExecutor: function(p,o,n){
                this.node.innerHTML = this.evaluateExpression();
            },
            attrExecutor: function(){
                domAttr.set(this.node,this.attr,this.evaluateExpression());
            }
        });
    }
);



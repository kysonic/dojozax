define([
    "dojo/_base/declare",
    "dojo/ready",
    "dojo/dom-attr",
    "dojo/_base/lang",
    "dojo/_base/array",
    "zax/utils/utils"
],
    function (declare,ready,domAttr,lang,array,Utils) {
        /**
         * Parser entity
         */
        return declare("Action", null, {
            node: {},
            attr: '',
            uid: '',
            innerText: false,
            expression: '{{}}',
            mv: {},
            model: [],
            context: {},
            constructor: function(options){
                for(var prop in options) {
                    if(this[prop]!=undefined) this[prop] = options[prop];
                }
                this.uid = options.model +'-'+Utils.createUID();
            },
            execute: function(mv,p,o,n){
                var self = this;
                this.mv = mv;
                if(this.attr) {
                    if(-1!=array.indexOf(this.mv.possibleAttr,this.attr)){
                        require(["zax/attrs/"+this.attr], function(Action){
                            ready(function(){
                                if(Action){
                                    var action = new Action(self);
                                    action[self.attr](p,o,self.evaluateExpression(n));
                                }
                            });
                        });
                    }else {
                        if(console) console.log('Attribute '+this.attr+' is not define... We execute a basic function...')
                        this.attrExecutor();
                    }
                }
                if(this.innerText) this.innerTextExecutor(p,o,n);
            },
            evaluateExpression: function(){
                var self = this;
                var filter = Utils.deleteMustaches(this.expression).split('#');
                if(!filter[1]) with (this.context._context) return eval(lang.trim(filter[0]));
                if(this.mv.filters[lang.trim(filter[1])]) with (this.context._context) return this.mv.filters[lang.trim(filter[1])].call(this.mv,eval(lang.trim(filter[0])),this.node);
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



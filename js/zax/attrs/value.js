define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/on"
],
    function (declare,lang,domAttr,on) {
        /**
         * Parser entity
         */
        return declare("value", null, {
            value: function(){
                this.attrExecutor();
                if(this.valueBinding[this.node.tagName.toLowerCase()+'Binding']) this.valueBinding[this.node.tagName.toLowerCase()+'Binding'].call(this);
            },
            valueBinding: {
                inputBinding: function(){
                    if(domAttr.get(this.node,'type')) {
                        if(this.valueBinding[domAttr.get(this.node,'type')+'InputBinding']) this.valueBinding[domAttr.get(this.node,'type')+'InputBinding'].call(this);
                    }else  {
                        this.valueBinding['textInputBinding'].call(this);
                    }
                },
                textInputBinding: function(){
                    var self = this;
                    var event = /MSIE (8|9)/.test(window.navigator.userAgent) ? 'keyup' : 'input';
                    if(this.node.bindEvents && !this.node.bindEvents[event]){
                        this.node.bindEvents[event]= on(this.node,event,function(event){
                            lang.setObject(self.model,event.target.value,self.context);
                        });
                    }
                },
                checkboxInputBinding: function(){
                    var self = this;
                    var event = /MSIE 8/.test(window.navigator.userAgent) ? 'click' : 'change';;
                    this.node.checked = this.context._context[this.model];
                    if(!this.node.bindEvents[event]){
                        this.node.bindEvents[event]= on(this.node,event,function(event){
                            lang.setObject(self.model,event.target.checked,self.context);
                        });
                    }
                },
                selectBinding: function(){
                    var self = this;
                    var event = 'change';
                    if(!this.node.bindEvents[event]){
                        this.node.bindEvents[event]= on(this.node,event,function(event){
                            lang.setObject(self.model,event.target.value,self.context);
                        });
                    }
                },
                textareaBinding: function(){
                    var self = this;
                    var event = /MSIE (8|9)/.test(window.navigator.userAgent) ? 'keyup' : 'input';
                    if(!this.node.bindEvents[event]){
                        this.node.bindEvents[event]= on(this.node,event,function(event){
                            lang.setObject(self.model,event.target.value,self.context);
                        });
                    }
                }
            }
        });
    }
);



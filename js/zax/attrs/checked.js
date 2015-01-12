define([
    "dojo/_base/declare",
    "dojo/dom-attr",
    "dojo/on"
],
    function (declare,domAttr,on) {
        /**
         * Parser entity
         */
        return declare("checked", null, {
            checked: function(p,o,n){
                this.attrExecutor();
                if(this.checkedBinding[this.node.tagName.toLowerCase()+'Binding']) this.checkedBinding[this.node.tagName.toLowerCase()+'Binding'].call(this);
            },
            checkedBinding: {
                inputBinding: function(){
                    if(domAttr.get(this.node,'type') && this.checkedBinding[domAttr.get(this.node,'type')+'InputBinding']) this.checkedBinding[domAttr.get(this.node,'type')+'InputBinding'].call(this);
                },
                radioInputBinding: function(){
                    var self = this;
                    var event = /MSIE (8|9)/.test(window.navigator.userAgent) ? 'click' : 'change';
                    if(!this.node.bindEvents[event]){
                        this.node.bindEvents[event]= on(this.node,event,function(event){
                            lang.setObject(self.model,event.target.value,self.mv.model);
                        });
                    }
                }
            }
        });
    }
);



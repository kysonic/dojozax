define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/date/locale"
],
    function (declare,lang,domAttr,on,locale) {
        /**
         * Parser entity
         */
        return declare("value", null, {
            value: function(){
                this.attrExecutor();
                if(this.valueBinding[this.node.tagName.toLowerCase()+'Binding']) this.valueBinding[this.node.tagName.toLowerCase()+'Binding'].call(this);
                /**
                 * Widget binding
                 */
                if(this.node.widget) {
                    var f = this.valueBinding[this.node.widget.declaredClass.replace('dijit.form.','')+'Binding'];
                    if(f) f.call(this);
                    else this.valueBinding['WidgetBinding'].call(this);
                }
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
                    var event = /MSIE 8/.test(window.navigator.userAgent) ? 'click' : 'change';
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
                },
                DateTextBoxBinding: function(){
                    var self = this;
                    this.node.widget.set({value:locale.parse(this.context._context[this.model],{selector: "date",datePattern: "dd.MM.yyyy"}),canSet:false});
                    if(!this.node.widget.zaxEvent) {
                        this.node.widget.zaxEvent = this.node.widget.onChange = function(){
                            try{
                                var value = locale.format(self.node.widget.get('value'),{selector: "date",datePattern: "dd.MM.yyyy"});
                            }catch(e){
                                console.error('Value is not correct... Model not be saved...')
                            }
                            if(self.node.widget.canSet) lang.setObject(self.model,value,self.context);
                            self.node.widget.canSet = true;
                        }
                    }
                },
                TimeTextBoxBinding: function(){
                    var self = this;
                    this.node.widget.set({value:locale.parse(this.context._context[this.model],{selector: "time",timePattern: "HH:mm"}),canSet:false});
                    if(!this.node.widget.zaxEvent) {
                        this.node.widget.zaxEvent = this.node.widget.onChange = function(){
                            try{
                                var value = locale.format(self.node.widget.get('value'),{selector: "time",timePattern: "HH:mm"});
                            }catch(e){
                                console.error('Value is not correct... Model not be saved...')
                            }
                            if(self.node.widget.canSet) lang.setObject(self.model,value,self.context);
                            self.node.widget.canSet = true;
                        }
                    }
                },
                WidgetBinding: function(){
                    var self = this;
                    this.node.widget.set({value:this.context._context[this.model],canSet:false});
                    if(!this.node.widget.zaxEvent) {
                        this.node.widget.zaxEvent = this.node.widget.onChange = function(v){
                            if(self.node.widget.canSet) lang.setObject(self.model,v,self.context);
                            self.node.widget.canSet = true;
                        }
                    }
                }
            }
        });
    }
);



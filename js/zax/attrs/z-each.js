define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "zax/utils/utils"
],
    function (declare,lang,array,query,domConstruct,domAttr,utils) {
        /**
         * Parser entity
         */
        return declare("zEach", null, {
            zEachWarp: 'div',
            "z-each": function(p,o,n){
                var self = this;
                query(' > *', this.node).forEach(function(node) {
                    self.mv.removeBoundNode(node);
                });
                var i = 0;
                this.zEachWarp = domAttr.get(this.node,'z-warp') || this.zEachWarp;
                array.forEach(n,function(item){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,item);
                    self.node.appendChild(container);
                    self.mv.model[p][i] = container.context;
                    //utils.unWarp(container);
                    i++;
                });
                this.decorateArrayMethods(self.mv.model[p],p);
            },
            decorateArrayMethods: function(array,modelProperty){
                var self = this;
                utils.decorateMethod(array,'push',function(args){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,args[0]);
                    self.node.appendChild(container);
                    return container;
                },function(container){
                    self.mv.model[modelProperty][self.mv.model[modelProperty].length-1] = container.context;
                   // utils.unWarp(container);
                });
                utils.decorateMethod(array,'pop',function(args){
                    var items = query(' > '+self.zEachWarp,self.node);
                    query('*[z-bind]', items[items.length-1]).forEach(function(childNode) {
                          self.mv.removeBoundNode(childNode);
                    });
                    domConstruct.destroy(items[items.length-1]);
                });
                utils.decorateMethod(array,'splice',function(args){
                    var items = query(' > '+self.zEachWarp,self.node);
                    for(var i=args[0]; i<args[0]+(args[1]!=undefined ? args[1] : 1); i++) {
                        if(items[i]){
                            query('*[z-bind]', items[i]).forEach(function(childNode) {
                                self.mv.removeBoundNode(childNode);
                            });
                            domConstruct.destroy(items[i]);
                        }
                    }
                    if(args.length>2) {

                    }
                    return true;
                },function(){

                    self.reassignment(modelProperty);
                });
                utils.decorateMethod(array,'shift',function(args){
                    var items = query(' > '+self.zEachWarp,self.node);
                    query('*[z-bind]', items[0]).forEach(function(childNode) {
                        self.mv.removeBoundNode(childNode);
                    });
                    domConstruct.destroy(items[0]);
                },function(){
                    self.reassignment(modelProperty);
                });
                utils.decorateMethod(array,'unshift',function(args){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,args[0]);
                    self.node.appendChild(container);
                    return true;
                },function(){
                    self.reassignment(modelProperty);
                });
            },
            reassignment: function(modelProperty){
                var self = this;
                query(' > '+self.zEachWarp,self.node).forEach(function(item,key){
                    self.mv.model[modelProperty][key] = item.context;
                });
            }
        });
    }
);



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
                /**
                 * After Append
                 */
                var afterAppendName = domAttr.get(self.node,'z-after-append');
                var f = afterAppendName && this.mv[afterAppendName.replace('{{','').replace('}}','')] ?
                    this.mv[afterAppendName.replace('{{','').replace('}}','')] : null;
                array.forEach(n,function(item){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,item);
                    self.node.appendChild(container);
                    self.context[p][i] = container.context;
                    container.sn = i;
                    if(f) f.call(self.mv,container);
                    //utils.unWarp(container);
                    i++;
                });
                this.decorateArrayMethods(self.context[p],p);
            },
            decorateArrayMethods: function(arry,modelProperty){
                var self = this;
                utils.decorateMethod(arry,'push',function(args){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,args[0]);
                    self.node.appendChild(container);
                    return container;
                },function(container){
                    self.context[modelProperty][self.context[modelProperty].length-1] = container.context;
                    container.sn = self.context[modelProperty].length-1;
                    // utils.unWarp(container);
                });
                utils.decorateMethod(arry,'pop',function(args){
                    var items = query(' > '+self.zEachWarp,self.node);
                    query('*[z-bind]', items[items.length-1]).forEach(function(childNode) {
                        self.mv.removeBoundNode(childNode);
                    });
                    domConstruct.destroy(items[items.length-1]);
                });
                utils.decorateMethod(arry,'splice',function(args){
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
                utils.decorateMethod(arry,'shift',function(args){
                    var items = query(' > '+self.zEachWarp,self.node);
                    query('*[z-bind]', items[0]).forEach(function(childNode) {
                        self.mv.removeBoundNode(childNode);
                    });
                    domConstruct.destroy(items[0]);
                },function(){
                    self.reassignment(modelProperty);
                });
                utils.decorateMethod(arry,'unshift',function(args){
                    var container = domConstruct.create(self.zEachWarp);
                    self.mv.injectBoundHTML(self.node.data.template,container,args[0]);
                    self.node.appendChild(container);
                    return true;
                },function(){
                    self.reassignment(modelProperty);
                });
                /**
                 * Query method. Additional method for z-each model property;
                 * @param query
                 */
                arry['query'] = function(qry){
                    var result = [];
                    for(var key in this) {
                        var item = this[key];
                        if(typeof item !='function'){
                            var counter = 0;
                            for(var k in qry){
                                var property = qry[k];
                                if(item[k]==property || (property.test && property.test(item[k]))) counter++;
                            }
                            if(counter==utils.objectSize(qry)) result.push(key);
                        }
                    }
                    query(' > '+self.zEachWarp,self.node).forEach(function(item,key){
                        item.oldDisplayStyle = item.oldDisplayStyle || getComputedStyle(item).display;
                        item.style.display = 'none';
                    });
                    array.forEach(result,function(item){
                        var node = query(' > '+self.zEachWarp,self.node)[item];
                        node.style.display = node.oldDisplayStyle;
                    });
                }
                arry['resetQuery'] = function(){
                    query(' > '+self.zEachWarp,self.node).forEach(function(item,key){
                        item.style.display = item.oldDisplayStyle || 'block';
                    });
                }
            },
            reassignment: function(modelProperty){
                var self = this;
                query(' > '+self.zEachWarp,self.node).forEach(function(item,key){
                    self.context[modelProperty][key] = item.context;
                    item.sn = key;
                });
            }
        });
    }
);



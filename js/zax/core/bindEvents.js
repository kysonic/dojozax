define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/query",
        "dojo/on",
        "dojo/dom-attr"
    ],
    function (declare,array,query,on,domAttr) {
        /**
         * Parser entity
         */
        return declare("bindEvents", null, {
            possibleEvent: [
                'dblclick','click',
                'select','scroll','resize','play',
                'playing','play','pause','mousewheel','mouseup',
                'mouseover','mouseout','mousemove','mouseleave',
                'mouseenter','mousedown','keyup','keypress','keydown',
                'input','focus','drop','dragstart','dragover','dragleave',
                'dragenter','dragend','drag','change','blur','wheel','abort'
            ],
            bindEvents: function(zaxNode){
                var self = this;
                /*array.forEach(this.possibleEvent,function(item){
                    query('*[z-'+item+']',zaxNode).forEach(function(node){
                        var f = self[domAttr.get(node,'z-'+item).replace('{{','').replace('}}','')];
                        // Only is set to node z-bind
                        if(node.data && node.data.zEvents){
                            node.data.zEvents[item] = on(node,item,function(event){
                                f.call(self,event);
                            });
                        }
                    });
                });*/
                query('*[z-event]',zaxNode).forEach(function(node){
                    var zEvent = domAttr.get(node,'z-event').split('#');
                    var f = self[zEvent[0].replace('{{','').replace('}}','')];
                    var eventName = zEvent[1] ? zEvent[1].replace('}}','') : 'click';
                    if(-1==array.indexOf(self.possibleEvent,eventName)) console.error('Your event is not support...');
                    if(node.bindData && node.bindData.zEvents){
                        node.bindData.zEvents[eventName] = on(node,eventName,function(event){
                            f.call(self,event);
                        });
                    }
                });
            }
        });
    }
);




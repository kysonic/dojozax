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
                'click','dblclick',
                'select','scroll','resize','play',
                'playing','play','pause','mousewheel','mouseup',
                'mouseover','mouseout','mousemove','mouseleave',
                'mouseenter','mousedown','keyup','keypress','keydown',
                'input','focus','drop','dragstart','dragover','dragleave',
                'dragenter','dragend','drag','change','blur','wheel','abort'
            ],
            bindEvents: function(zaxNode){
                var self = this;
                array.forEach(this.possibleEvent,function(item){
                    query('*[z-'+item+']',zaxNode).forEach(function(node){
                        var f = self[domAttr.get(node,'z-'+item).replace('{{','').replace('}}','')];
                        on(node,item,function(event){
                            f.call(self,event);
                        });
                    });
                });
            }
        });
    }
);




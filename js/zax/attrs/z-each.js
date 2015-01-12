define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/dom-attr"
],
    function (declare,lang,array,query,domConstruct,domAttr) {
        /**
         * Parser entity
         */
        return declare("zEach", null, {
            "z-each": function(p,o,n){
                var self = this;
                this.context = lang.trim(domAttr.get(this.node,'z-each').replace('{{','').replace('}}','').split('as')[1]);
                array.forEach(n,function(item){
                    self.mv.injectBoundHTML(self.node.data.template,self.node);
                });
            }
        });
    }
);



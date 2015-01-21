define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/parser"
],
    function (declare,lang,query,parser) {
        /**
         * Parser entity
         */
        return declare("zWidget", null, {
            "z-widget": function(p,o,n){
                console.log(p,o,n)
                var self = this;
                //this.attrExecutor();
                parser.parse(this.node.parentNode).then(function (widgets) {
                    widgets.forEach(function (widget) {
                        console.log(widget)
                    });
                });
            }
        });
    }
);



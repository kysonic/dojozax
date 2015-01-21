define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-construct",
    "zax/utils/utils"
],
    function (declare,lang,query,domConstruct,Utils) {
        /**
         * Parser entity
         */
        return declare("Parser", null, {
            constructor: function(){

            },
            parserExpr: {
                inline: /(([a-zA-Z0-9-]+)\=("|'|){{(.*?)}}("|'|))|({{(.*?)}})/g,
                attribute: /(\=("|')$)/g
            },
            parse: function(zaxNode){
                var self = this;
                //Collect Templates
                query('*[z-if]', zaxNode).forEach(function (node) {
                    self.templates.zIf.push(lang.trim(node.innerHTML));
                    domConstruct.empty(node);
                });
                query('*[z-each]', zaxNode).forEach(function (node) {
                    self.templates.zEach.push(lang.trim(node.innerHTML));
                    domConstruct.empty(node);
                });
                // Basic parsing
                zaxNode.template = zaxNode.innerHTML;
                zaxNode.template = zaxNode.template.replace(this.parserExpr.inline,function(){
                    if(/\=/.test(arguments[0]) || /\<\//.test(arguments[0])) return ' z-bind '+arguments[0];
                    return '<div z-bind>'+arguments[0]+'</div>';
                });
                zaxNode.innerHTML = zaxNode.template;
                //Set templates after parsing
                var i = 0;
                query('*[z-if]', zaxNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zIf[i];
                    i++;
                });
                // Each
                i=0;
                query('*[z-each]', zaxNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zEach[i];
                    i++;
                });
            }
        });
    }
);



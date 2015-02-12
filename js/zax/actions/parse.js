define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "zax/utils/utils"
],
    function (declare,lang,query,domConstruct,domAttr,Utils) {
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
                zaxNode.zaxUid = Utils.createUID();
                domAttr.set(zaxNode,'data-zax-uid',zaxNode.zaxUid);
                query('*[z-each]', zaxNode).forEach(function (node) {
                    self.templates.zEach[zaxNode.zaxUid] = self.templates.zEach[zaxNode.zaxUid] || [];
                    self.templates.zEach[zaxNode.zaxUid].push(lang.trim(node.innerHTML));
                    //domConstruct.empty(node);
                });
                query('*[z-if]', zaxNode).forEach(function (node) {
                    self.templates.zIf[zaxNode.zaxUid] = self.templates.zIf[zaxNode.zaxUid] || [];
                    self.templates.zIf[zaxNode.zaxUid].push(lang.trim(node.innerHTML));
                    //domConstruct.empty(node);
                });
                query('*[z-context]', zaxNode).forEach(function (node) {
                    self.templates.zContext[zaxNode.zaxUid] = self.templates.zContext[zaxNode.zaxUid] || [];
                    self.templates.zContext[zaxNode.zaxUid].push(lang.trim(node.innerHTML));
                   //domConstruct.empty(node);
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
                    node.data.template = self.templates.zIf[zaxNode.zaxUid][i];
                    i++;
                });
                // Each
                i=0;
                query('*[z-each]', zaxNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zEach[zaxNode.zaxUid][i];
                    i++;
                });
                i=0;
                query('*[z-context]', zaxNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zContext[zaxNode.zaxUid][i];
                    i++;
                });
            }
        });
    }
);



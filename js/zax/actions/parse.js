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
            parserExpr: {
                inline: /(([a-zA-Z0-9-]+)\=("|'|){{(.*?)}}("|'|))|({{(.*?)}})/g,
                attribute: /(\=("|')$)/g
            },
            parse: function(){
                var self = this;
                //Collect Templates
                query('*[z-if]', this.currentNode).forEach(function (node) {
                    self.templates.zIf.push(lang.trim(node.innerHTML));
                    domConstruct.empty(node);
                });
                query('*[z-each]', this.currentNode).forEach(function (node) {
                    self.templates.zEach.push(lang.trim(node.innerHTML));
                    domConstruct.empty(node);
                });
                // Basic parsing
                this.currentNode.template = this.currentNode.innerHTML;
                this.currentNode.template = this.currentNode.template.replace(this.parserExpr.inline,function(){
                    if(/\=/.test(arguments[0]) || /\<\//.test(arguments[0])) return ' z-bind '+arguments[0];
                    return '<div z-bind>'+arguments[0]+'</div>';
                });
                this.currentNode.innerHTML = this.currentNode.template;
                //Set templates after parsing
                var i = 0;
                query('*[z-if]', this.currentNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zIf[i];
                    i++;
                });
                // Each
                i=0;
                query('*[z-each]', this.currentNode).forEach(function (node) {
                    node.data = {};
                    node.data.template = self.templates.zEach[i];
                    i++;
                });
            }
        });
    }
);


